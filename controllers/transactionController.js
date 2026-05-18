
import transactionServices from "../services/transactionServices.js";

const getAllTrans = async (req, res, next) => {
    try {
        const transaction = await transactionServices.getAllTrans();
        res.json(transaction);
    } catch (error) {
        next(error);
    }
};

const getIdTrans = async (req, res, next) => {
    try {
        const transaction = await transactionServices.getIdTrans(req.params.id);
        res.json(transaction);
    } catch (error) {
        next(error);
    }
};

const getType = async (req, res, next) => {
    try {
        const transaction = await transactionServices.getType(req.params.type);
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getValue = async (req, res, next) => {
    try {
        const { min, max } = req.params;
        const transaction = await transactionServices.getValueRange(Number(min), Number(max));
        res.json(transaction);
    } catch (error) {
        next(error);
    }
};

const getYear = async (req, res, next) => {
    try {
        const transaction = await transactionServices.getByYear(req.params.year);
        res.json(transaction);
    } catch (error) {
        next(error);
    }
};

export default {
    getAllTrans,
    getIdTrans,
    getType,
    getValue,
    getYear
};