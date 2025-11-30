import {
  getTransactionsService,
  getArchivedTransactionsService,
  getTransactionByIdService,
  createTransactionService, 
  updateTransactionByIdService,
  archiveTransactionService,
  restoreTransactionService,
  deleteTransactionService
} from '../services/transactions.service.js';


// GET /transactions
const getTransactionsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;

    const tx = await getTransactionsService(userId, type);

    const responseObj = {
      success: true,
      message: 'Fetched all transactions successfully!',
      data: tx,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  };
};

// GET /transactions/archived
const getArchivedTransactionsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;

    const tx = await getArchivedTransactionsService(userId, type);

    const responseObj = {
      success: true,
      message: 'Fetched all archived transactions successfully!',
      data: tx,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// GET /transactions/:id
const getTransactionsByIdController = async (req, res) => {
  try {
    const txId = req.params.id;
    const userId = req.user._id;

    const tx = await getTransactionByIdService(txId, userId);

    if (!tx) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found!',
      });
    }

    const responseObj = {
      success: true,
      message: 'Fetched the transaction successfully!',
      data: tx,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// POST /transactions
const createTransactionController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { account, category, type, amount, description, date } = req.body;

    const tx = await createTransactionService(userId, { account, category, type, amount, description, date });

    const responseObj = {
      success: true,
      message: 'Created a transaction successfully!',
      data: tx,
    };

    res.status(201).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// PATCH /transactions/:id
const updateTransactionByIdController = async (req, res) => {
  try {
    const txId = req.params.id;
    const userId = req.user._id;
    const { account, category, type, amount, description, date } = req.body;

    const tx = await updateTransactionByIdService(txId, userId, { account, category, type, amount, description, date });
    
    if (!tx) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found!',
      })
    };

    const responseObj = {
      success: true,
      message: 'Transaction updated successfully!',
      data: tx,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// PATCH /transactions/:id/archive
const archiveTransactionController = async (req, res) => {
  try {
    const txId = req.params.id;
    const userId = req.user._id;

    const tx = await archiveTransactionService(txId, userId);

    if (!tx) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found!',
      })
    }

    const responseObj = {
      success: true,
      message: 'Transaction archived successfully!',
      data: tx,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// PATCH /transactions/:id/restore
const restoreTransactionController = async (req, res) => {
  try {
    const txId = req.params.id;
    const userId = req.user._id;

    const tx = await restoreTransactionService(txId, userId);

    if (!tx) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found!',
      })
    }

    const responseObj = {
      success: true,
      message: 'Transaction restored successfully!',
      data: tx,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// DELETE /transactions/:id
const deleteTransactionController = async (req, res) => {
  try {
    const txId = req.params.id;
    const userId = req.user._id;

    const tx = await deleteTransactionService(txId, userId);

    if (!tx) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found!',
      })
    }

    const responseObj = {
      success: true,
      message: 'Transaction deleted successfully!',
      data: tx,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}


export {
  getTransactionsController,
  getArchivedTransactionsController,
  getTransactionsByIdController,
  createTransactionController,
  updateTransactionByIdController,
  archiveTransactionController,
  restoreTransactionController,
  deleteTransactionController
};