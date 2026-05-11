import Transaction from "../models/transaction.js";

const getTransaction = async () => {
    return await Transaction.find();
} 


export default {
    getTransaction

 }