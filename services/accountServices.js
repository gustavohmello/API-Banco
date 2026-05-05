import Account from "../models/account.js";

const createAccount = async (dataAccouts) => {
    const {userId, numberCount, agency, type, balance, limit} = dataAccouts;
    return Account.create({userId, numberCount, agency, type, balance, limit});
}

const getAccount = async () => {
    return Account.find();
}

const getAccountById = async (id) => {
    return Account.findById(id);
}

export default {
    createAccount,
    getAccount,
    getAccountById

}