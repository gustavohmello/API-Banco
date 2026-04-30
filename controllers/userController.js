import userServices from "../services/userServices.js"

const createUser = async (req, res, next) => {
    try{
        const user = await userServices.createUser(req.body);
        res.status(201).json(user);
    } catch (error){
        next(error);
    }
};

const listUser = async (req,res,next) => {
    try {
        const user = await userServices.listUser();
        res.json(user); 
    }catch (error){
        next(error);
    }
};

const listUserID = async (req,res,next) => {
    try{
        const user = await userServices.listUserID(req.params.id);
        res.json(user);
    }catch (error){
        next(error);
    }
};

const updateUser = async (req,res,next) => {
    try{
        const user = await userServices.updateUser(req.params.id, req.body);
        res.json(user);
    }catch (error){
        next(error);
    }
};

const userDelet = async (req,res,next) => {
    try{
        const user = await userServices.userDelet(req.params.id);
        res.json({ menssage: "Usuario deletado com sucesso", user});
    }catch (error){
        next(error);
    }
}

const getUserAndCpf = async (req,res,next) => {
    try{
        const user = await userServices.getUserAndCpf(req.params.CPF);
        res.json({user});

    }catch (error){
        next(error);
    }
}

const getUserAndEmail = async (req,res,next) => {
    try{
    const user = await userServices.getUserAndEmail(req.params.Email);
    res.json({user});
    }catch (error) {
        next(error)
    }
}

export default {
    createUser,
    listUser,
    listUserID,
    updateUser,
    userDelet,
    getUserAndCpf,
    getUserAndEmail

};