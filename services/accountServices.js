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
        throw new ERROR("Account not found");
    }

    if (account.status !== "active") {
        throw new ERROR("The account is blocked");
    }

    account.balance += value;
    await account.save();

    return await Transaction.create({
        AccountId: id,
        type: "deposit",
        descripition: descripition,
    })
};


export default {
    createAccount,
    getAccount,
    getAccountById,
    getByNumberCount,
    getAccountByBalance,
    postAccountDeposit

}