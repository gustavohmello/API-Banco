import accountServices from "../services/accountServices.js";

const createAccount = async (req, res, next) => {
    try {
        const Account = await accountServices.createAccount(req.body);
        res.status(201).json(Account);
    } catch (error) {
        next(error);
    }
};

const getAccount = async (req, res, next) => {
    try {
        const Account = await accountServices.getAccount();
        res.json(Account);
    } catch (error) {
        next(error);
    }
};

const getAccountById = async (req, res, next) => {
    try {
        const Account = await accountServices.getAccountById(req.params.id);
        res.json(Account);
    } catch (error) {
        next(error);
    }
};

const getByNumberCount = async (req, res, next) => {
    try {
        const Account = await accountServices.getByNumberCount(req.params.getByNumberCount);
        res.json(Account);
    } catch (error) {
        next(error);
    }
}

const getAccountByBalance = async (req, res, next) => {
    try {
        const Account = await accountServices.getAccountByBalance(req.params.id);
        res.json(Account);
    } catch (error) {
        next(error);
    }
}

const postAccountDeposit = async (req, res, next) => {
    try {
        const result = await accountServices.postAccountDeposit(req.params.id, req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
}

const withdraw = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { value, descricao } = req.body;
      if (!value || value <= 0) {
        return res.status(400).json({ error: "It has to be greater than zero." });
      }
  
      const result = await accountService.withdraw(id, value, descricao);
      
      res.status(200).json(result);
    } catch (error) {
      
      if (error.message === "Insufficient funds") {
          return res.status(400).json({ error: "Insufficient funds to make the withdrawal." });
      }
      next(error);
    }
  };
  const postTransfer = async (req, res, next) => {
    try {
      const { fromAccountId, toAccountId, value, descricao } = req.body;
  
      if (!value || value <= 0) {
        return res.status(400).json({ error: "invalid value" });
      }
      if (fromAccountId === toAccountId) {
        return res.status(400).json({ error: "It is not possible to transfer to the same account." });
      }
  
      const result = await accountService.transfer(fromAccountId, toAccountId, value, descricao);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const getStatement = async (req, res, next) => {
    try {
      const { id } = req.params;
      const statement = await accountService.getStatement(id);
      res.status(200).json(statement);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  const postSimulateWithdraw = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { value } = req.body;
      const simulation = await accountService.simulateWithdraw(id, value);
      res.status(200).json(simulation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  
  const postSimulateTransfer = async (req, res, next) => {
    try {
      const { fromAccountId, toAccountId, value } = req.body;
      const simulation = await accountService.simulateTransfer(fromAccountId, toAccountId, value);
      res.status(200).json(simulation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };




export default {
    createAccount,
    getAccount,
    getAccountById,
    getByNumberCount,
    getAccountByBalance,
    postAccountDeposit,
    withdraw,
    postTransfer,
    getStatement,
    postSimulateTransfer,
    postSimulateWithdraw

}