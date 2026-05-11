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
       const {id} = req.params;
       const { valor, descricao } = req. body;
       if (!valor || valor <= 0){
        return res.status(400).json({ error: "Tem que ser maior que zero" });
       }

       const result = await accountServices.postAccountDeposit(id, valor, descricao);
       res.status(200).json(result);
    }catch (error){
        res.status(400).json({ error: error.mensage});
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