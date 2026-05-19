import authService from "../services/authServices.js";

const register = async (req,res,next) => {
    try{
        const user = await authService.register(req.body);

        res.status(201).json({
            menssage: "Usuário registrado com sucesso",
            deta: user,
        })
    }catch (error){
        next(error)
    }
}

const login = async (req,res,next) => {
    try{
        const result = await authService.login(req.body);

        res.status(200).json({
            menssage: "login realizado com sucesso",
            data: result,

        })
    }catch (error) {
        next(error);
    }
}

export default {
    register,
    login,
}