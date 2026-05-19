import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user";

const register = async (data) => {
    const {Name, Email, CPF, Telefone,Idade, password,role} = data;

    if (!Name || !Email || !Idade || !password) {
        throw new Error("Nome, email, e senha são obrigatorios")
    }

    const userExists = await UserActivation.findOne({Email});

    if (userExists) {
     throw new Error("Já existe um usuário com este email")
    } 

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserActivation.create ({
        Name,
        Email,
        CPF,
        password: hashedPassword,
        Telefone,
        Idade,
        role: role || "user",
        ativo: true,
    });

    return {
        _id: user._id,
        Name: user.Name,
        Email: user.Email,
        CPF: user.CPF,
        Telefone: user.Email,
        Idade: user.Idade,
        role: user.role,
        ativo: user.ativo,
    }
    
}

const login = async (data) => {
    const { Email, password} = data;

    if(!Email || !password) {

        throw new Error ("Email e senha são obrigatorios")

    }
}

export default {
    register,
}

