import {
  getUserAccountsService,
  getArchivedAccountsService,
  getAccountByIdService,
  createAccountService,
  updateAccountService,
  archiveAccountService,
  restoreAccountService,
  deleteAccountService
} from '../services/accounts.service.js';


// GET /accounts
const getAllAccsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;
    const accs = await getUserAccountsService(userId, type);

    const responseObj = {
      success: true,
      message: 'Fetched all accounts successfully!',
      data: accs,
    }

    res.status(200).json(responseObj);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

// GET /accounts/archived
const getArchivedAccsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type } = req.query;
    const archivedAccs = await getArchivedAccountsService(userId, type);

    const responseObj = {
      success: true,
      message: 'Fetched all archived accounts successfully!',
      data: archivedAccs,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  };
};

// GET /accounts/:id
const getAccByIdController = async (req, res) => {
  try {
    const accountId = req.params.id;
    const userId = req.user._id;
    const userAcc = await getAccountByIdService(accountId, userId);

    if (!userAcc) {
      return res.status(404).json({
        success: false,
        message:'Account not found!',
      })
    }

    const responseObj = {
      success: true,
      message: 'Fetched your account successfully!',
      data: userAcc,
    }

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  };
};

// POST /accounts
const makeAccController = async (req, res) => {
  try {
    const { name, type, balance } = req.body;
    const userId = req.user._id;

    const newAcc = await createAccountService(userId, { name, type, balance });

    const responseObj = {
      success: true,
      message: 'Made an account successfully!',
      data: newAcc,
    };

    res.status(201).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  };
};

// PATCH /accounts/:id
const updateAccByIdController = async (req, res) => {
  try {
    const accId = req.params.id;
    const userId = req.user._id;
    const { name, type, balance } = req.body;

    const updatedAcc = await updateAccountService(accId, userId, { name, type, balance });

    if (!updatedAcc) {
      return res.status(404).json({
        success: false,
        message: 'Account not found!',
      })
    }

    const responseObj = {
      success: true,
      message: 'Account updated successfully!',
      data: updatedAcc,
    }

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  };
};

// PATCH /accounts/:id/archive (soft deletion)
const archiveAccController = async (req, res) => {
  
  try {
    const accId = req.params.id;
    const userId = req.user._id;

    const archivedAcc = await archiveAccountService(accId, userId);

    if (!archivedAcc) {
      return res.status(404).json({
        success: false,
        message: 'Account not found!',
      });
    };

    const responseObj = {
      success: true,
      message: 'Account archived successfully!',
      data: archivedAcc,
    }

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  };
};

// PATCH /accounts/:id/restore
const restoreAccController = async (req, res) => {
  try {
    const accId = req.params.id;
    const userId = req.user._id;

    const restoredAcc = await restoreAccountService(accId, userId);

    if (!restoredAcc) {
      return res.status(404).json({
        success: false,
        message: 'Account not found!',
      })
    }

    const responseObj = {
      success: true, 
      message: 'Account restored successfully!',
      data: restoredAcc,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  };
};

// DELETE /accounts/:id
const deleteAccController = async (req, res) => {
  try {
    const accId = req.params.id;
    const userId = req.user._id;

    const deletedAcc = await deleteAccountService(accId, userId);

    if (!deletedAcc) {
      return res.status(404).json({
        success: false,
        message: 'Account not found!',
      });
    };

    const responseObj = {
      success: true,
      message: 'Account deleted successfully!',
      data: deletedAcc,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  };
};

export {
  getAllAccsController,
  getArchivedAccsController,
  getAccByIdController,
  makeAccController,
  updateAccByIdController,
  archiveAccController,
  restoreAccController,
  deleteAccController
};