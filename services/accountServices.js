import Account from "../models/account.js";

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

export default {
    createAccount,
    getAccount,
    getAccountById,
    getByNumberCount

}