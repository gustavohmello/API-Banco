import User from "../models/user.js";
import Account from "../models/account.js";
import Transaction from "../models/transaction.js";
import admin from "../models/admin.js";

const getUsersByStatus = async (isActive) => {
    return await User.find({ active: isActive });
}
//4
const setUserStatus = async (userId, activate) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (!activate) {
    const accounts = await Account.find({ userId: user._id, balance: { $gt: 0 } });
    if (accounts.length > 0) throw new Error("It is not possible to deactivate a user with a positive balance.");
  }

  user.active = activate;
  await user.save();
  return { message: `User ${activate ? 'activated' : 'deactivated'} successfully` };
}

const getAccountsByStatus = async (isActive) => {
  return await Account.find({ active: isActive });
}
//7
const  setAccountBlockStatus = async (accountId, block) => {
  const account = await Account.findById(accountId);
  if (!account) throw new Error("Account not found");
  if (block && account.blocked) return { message: "The account is already blocked." };

  account.blocked = block;
  await account.save();
  return { message: `Conta ${block ? 'blocked' : 'unblocked'} successfully` };
}
//9
const closeAccount = async (accountId) => {
  const account = await Account.findById(accountId);
  if (!account) throw new Error("Account not found");
  
  
  if (account.balance !== 0) throw new Error("The account can only be closed with a zero balance.");

  account.active = false;
  await account.save();
  return { message: "Account successfully closed." };
}

const applyMonthlyFee = async (accountId, value, description) => {
  const account = await Account.findById(accountId);
  if (!account || !account.active || account.blocked) throw new Error("Account unavailable");
  if (value <= 0) throw new Error("Value must be greater than zero");

  const available = account.balance + account.limit;
  if (value > available) throw new Error("Insufficient funds for fee");

  account.balance -= value;
  await account.save();

  await Transaction.create({
    accountId,
    type: "taxa",
    amount: value,
    currentBalance: account.balance,
    description,
    date: new Date()
  });

  return { message: "Fee applied successfully", newBalance: account.balance };
}
//11
const refundTransaction = async (transactionId) => {
  const originalTransaction = await Transaction.findById(transactionId);
  if (!originalTransaction) throw new Error("Transaction not found");
  
  const allowedTypes = ["deposit", "withdrawal", "fee"];
  if (!allowedTypes.includes(originalTransaction.type)) throw new Error("This transaction type cannot be refunded");

  const account = await Account.findById(originalTransaction.accountId);
  

  if (originalTransaction.type === "deposit") account.balance -= originalTransaction.amount;
  else account.balance += originalTrans.amount; 

  await account.save();

  return await Transaction.create({
    accountId: account._id,
    type: "reversal",
    amount: originalTransaction.amount,
    description: `Reversal of: ${originalTransaction.description}`,
    date: new Date()
  });
}





export default {
    getUsersByStatus,
    refundTransaction,
    applyMonthlyFee,
    closeAccount,
    setUserStatus,
    getAccountsByStatus,
    setAccountBlockStatus,
}