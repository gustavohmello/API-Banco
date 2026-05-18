import adminServices from "../services/adminServices.js";

const getUsersByStatus = async (req, res, next) => {
    try {
      const { status } = req.params;
      const users = await adminServices.getUsersByStatus(status);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
  
  // 4
  const setUserStatus = async (req, res, next) => {
    try {
      const { id, action } = req.params;
      const result = await adminServices.setUserStatus(id, action);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // 5
  const getAccountsByStatus = async (req, res, next) => {
    try {
      const { status } = req.params;
      const accounts = await adminServices.getAccountsByStatus(status);
      res.json(accounts);
    } catch (error) {
      next(error);
    }
  }
  
  // 7
  const setAccountBlockStatus = async (req, res, next) => {
    try {
      const { id, action } = req.params;
  
      const result = await adminServices.setAccountBlockStatus(id, action );
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // 9
  const closeAccount = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await adminServices.closeAccount(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // 10
  const applyMonthlyFee = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { value, description } = req.body;
      const result = await adminServices.applyMonthlyFee(id, value, description);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // 11
  const refundTransaction = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await adminServices.refundTransaction(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  // 12
  const getGeneralReport = async (req, res, next) => {
    try {
      const report = await adminServices.getGeneralReport();
      res.json(report);
    } catch (error) {
      next(error);
    }
  };
  
  // 13
  const getFinancialReport = async (req, res, next) => {
    try {
      const report = await adminServices.getFinancialReport();
      res.json(report);
    } catch (error) {
      next(error);
    }
  };
  
  // 15
  const getTopBalances = async (req, res, next) => {
    try {
      const { limit } = req.params;
      const topAccounts = await adminServices.getTopBalances(limit);
      res.json(topAccounts);
    } catch (error) {
      next(error);
    }
  };
  
  
  const openAccount = async (req, res, next) => {
    try {
      const { userId, type, limit } = req.body;
      if (!userId || !type) {
        return res.status(400).json({ error: "userId and type (corrente/poupanca) are required" });
      }
      const newAccount = await accountServices.createAcco({ userId, type, limit });
      res.status(201).json({ message: "Conta aberta com sucesso!", account: newAccount });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

export default {
    getUsersByStatus,
    setUserStatus,
    getAccountsByStatus,
    setAccountBlockStatus,
    closeAccount,
    applyMonthlyFee,
    refundTransaction,
    getGeneralReport,
    getFinancialReport,
    getTopBalances,
    openAccount
}
