import accountServices from "../services/accountServices.js";

const createAccount = async (req, res, next) => {
    try {
        const Account = await accountServices.createAccount(req.body);
        res.status(201).json(Account);
    } catch (error) {
        next(error);
    }
};

const getAccount = async (req, res, next) => {
    try {
        const Account = await accountServices.getAccount();
        res.json(Account);
    } catch (error) {
        next(error);
    }
};

const getAccountById = async (req, res, next) => {
    try {
        const Account = await accountServices.getAccountById(req.params.id);
        res.json(Account);
    } catch (error) {
        next(error);
    }
};

const getByNumberCount = async (req,res,next ) => {
    try{
        const Account =await accountServices.getByNumberCount(req.params.getByNumberCount);
        res.json(Account);
    }catch (error) {
        next (error);
    }
} 

const getAccountByBalance = async (req,res,next) => {
    try{
        const Account= await accountServices.getAccountByBalance(req.params.id);
        res.json(Account);
    }catch (error){
        next (error);
    }
}

const postAccountDeposit = async (req,res, next) => {
    try{
        const Account= await accountServices.postAccountDeposit(req.params.id, req.body);
        res.json(Account);
    }catch (error){
        next(error);
    }
}

    

export default {
    createAccount,
    getAccount,
    getAccountById,
    getByNumberCount,
    getAccountByBalance,
    postAccountDeposit

}