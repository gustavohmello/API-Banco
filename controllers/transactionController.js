import trasactionServices from "../services/trasactionServices.js";

const getTransaction = async (req, res, next) => {
    try {
        const transaction = await trasactionServices.getTransaction();
        res.json(transaction)
    } catch (error) {
        next(error);
    }
}


export default {
    getTransaction

};