import Transaction from "../models/transaction.js";

const getAllTrans = async () => {
    return await Transaction.find().sort({ date: -1 });
};

const getIdTrans = async (id) => {
    const trans = await Transaction.findById(id);
    if (!trans) throw new Error("Transaction not found");
    return trans;
};

const getType = async (type) => {
    const validTypes = ["deposito", "saque", "transferencia_enviada", "transferencia_recebida", "estorno", "taxa"];
    if (!validTypes.includes(type)) throw new Error("Invalid transaction type");
    return await Transaction.find({ type });
};

const getValueRange = async (min, max) => {
    return await Transaction.find({ amount: { $gte: min, $lte: max } });
};

const getByYear = async (year) => {
    const start = new Date(`${year}-01-01`);
    const end = new Date(`${year}-12-31T23:59:59`);
    return await Transaction.find({ date: { $gte: start, $lte: end } });
};

export default {
    getAllTrans,
    getIdTrans,
    getType,
    getValueRange,
    getByYear,
};