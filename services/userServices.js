import User from "../models/user.js";

const createUser = async (dataUser) => {
    const { Name, Email,CPF, Telefone,Idade} = dataUser;
    return User.create({Name, Email,CPF,Telefone,Idade});
}

const listUser = async () => {
    return User.find();
}

const listUserID = async (id) => {
    return User.findById(id);
}

const updateUser = async (id, data) => {
    const user = await User.findByIdAndUpdate(id,data, {
        returnDocument : 'after',
        runValidators: true,
    });

    if (!user) {
        const error = new Error("Usuario não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const userDelet = async (id) => {
    const deleteUser = await User.countDocuments({userId: id });

    if (deleteUser > 0 ){
        const error = new Error ("Não é possivel deletar um usuario que possui uma conta 'ativa'");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        const error = new Error("usuario não encontrado");
        error.statusCode = 404;
        throw error;
    }
    return user
}

const getUserAndCpf = async (CPF) => {
    const user = await User.findOne({CPF});

    if (!user) {
        const error = new Error("usuario não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const getAccountUser = async (id) => {
    const user = await User.find({id});

    if (!user) {
        const error = new Error("usuario não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const getUserAndEmail = async (Email) => {
    const user = await User.findOne({Email});

    if (!user){
    const error = new Error("usuario não encontrado");
    error.statusCode = 404;
    throw error;
    }

    return user;
}






export default {
    createUser,
    listUser,
    listUserID,
    updateUser,
    userDelet,
    getUserAndCpf,
    getAccountUser,
    getUserAndEmail
}