import Account from "../models/account.js";
import Transaction from "../models/transaction.js";

const createAccount = async (dataAccouts) => {
    const { userId, numberCount, agency, type, balance, limit } = dataAccouts;
    return Account.create({ userId, numberCount, agency, type, balance, limit });
}

const getAccount = async () => {
    return await Account.find();
}

const getAccountById = async (id) => {
    return Account.findById(id);
}

const getByNumberCount = async (numberCount) => {
    const account = await Account.findOne(numberCount)

    if (!account) {
        const error = new Error("ususario não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return account;
}

const getAccountByBalance = async (id) => {

    const account = await Account.findById(id);
    const availabeBalance = account.balance + account.limit;
    return { balance: account.balance, limit: account.limit, availabeBalance }



}

const postAccountDeposit = async (id, data) => {
    const account = await Account.findById(id);

    const { value, descripition } = data;

    if (!account) {
        throw new Error("Account not found");
    }

    if (account.active === false) {
        throw new Error("The account is blocked");
    }

    account.balance = account.balance + value;
    await account.save();

    return await Transaction.create({
        AccountId: id,
        type: "deposit",
        value: Number(value),
        description: descripition,
        currentBalance: account.balance
    })
};

const withdraw = async (id, value, description) => {
    const account = await Account.findById(id);
    if (!account) throw new Error("Account not found");
    if (account.status !== "active" || account.blocked) throw new Error("Account restricted");

    const available = account.type === "poupanca" ? account.balance : account.balance + account.limit;
    if (value > available) throw new Error("Insufficient funds");

    const previousBalance = account.balance;
    account.balance -= value;
    await account.save();

    await Transaction.create({
        accountId: id,
        type: "saque",
        amount: value,
        previousBalance,
        currentBalance: account.balance,
        description,
        date: new Date()
    });

    return { message: "Withdrawal successful", currentBalance: account.balance };
}

const postTransfer = async (fromId, toId, value, description) => {
    const fromAcc = await Account.findById(fromId);
    const toAcc = await Account.findById(toId);

    if (!fromAcc || !toAcc) throw new Error("Accounts not found");
    if (fromAcc.status !== 'active' || toAcc.status !== 'active') throw new Error("Accounts must be active");

    const available = fromAcc.type === 'poupanca' ? fromAcc.balance : fromAcc.balance + fromAcc.limit;
    if (value > available) throw new Error("Insufficient funds");

    fromAcc.balance -= value;
    toAcc.balance += value;

    await fromAcc.save();
    await toAcc.save();

    await Transaction.create([
        { accountId: fromId, type: "transferencia_enviada", amount: value, description },
        { accountId: toId, type: "transferencia_recebida", amount: value, description }
    ])

    return { message: "Transfer successful", fromBalance: fromAcc.balance, toBalance: toAcc.balance };
}

const getStatement = async (id) => {
    return await Transaction.find({ accountId: id }).sort({ date: -1 })
}

const postSimulateWithdraw = async (id, value) => {
    const account = await Account.findById(id);
    const available = account.type === 'poupanca' ? account.balance : account.balance + account.limit;
    const canWithdraw = value <= available && value > 0;
    return { canWithdraw, currentBalance: account.balance, withdrawalValue: value, balanceAfter: canWithdraw ? account.balance - value : account.balance }
};

 

export default {
    createAccount,
    getAccount,
    getAccountById,
    getByNumberCount,
    getAccountByBalance,
    postAccountDeposit,
    withdraw,
    postTransfer,
    getStatement,
    postSimulateWithdraw,
    getAllAcco: () => Account.find(), getIdAcco: (id) => Account.findById(id)


}