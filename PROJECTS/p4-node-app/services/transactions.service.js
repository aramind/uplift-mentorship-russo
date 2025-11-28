import Transaction from '../models/Transaction.js';
import Account from '../models/Account.js';
import Category from '../models/Category.js';

/*
  ENDPOINTS:
  GET /transactions
  GET /transactions/archived
  GET /transactions/:id
  POST /transactions
  PATCH /transactions/:id
  PATCH /transactions/archive
  PATCH /transactions/restore
  DELETE /transactions
*/

// GET /transactions
const getTransactionsService = async (userId, type) => {
  let txFilter = { user: userId, isDeleted: false };

  if (type) {
    txFilter.type = type;
  }
  
  const tx = await Transaction.find(txFilter);

  return tx;
}

// GET /transactions/archived
const getArchivedTransactionsService = async (userId, type) => {
  let txFilter = { user: userId, isDeleted: true };

  if (type) {
    txFilter.type = type;
  }

  const tx = await Transaction.find(txFilter);

  return tx;
}

// GET /transactions/:id
const getTransactionByIdService = async (txId, userId) => {
  const txFilter = { _id: txId, user: userId };
  const tx = await Transaction.findOne(txFilter);

  return tx;
}

// POST /transactions
const createTransactionService = async (userId, data) => {
  const { account, category, type } = data;
  const accOwnershipFilter = { _id: account, user: userId, isDeleted: false };
  const catOwnershipFilter = { _id: category, user: userId, isDeleted: false };

  const acc = await Account.findOne(accOwnershipFilter);
  if (!acc) {
    throw new Error('Invalid or unauthorized account!');
  }

  const cat = await Category.findOne(catOwnershipFilter);
  if (!cat) {
    throw new Error('Invalid or unauthorized category!');
  }

  if (cat.type !== type) {
    throw new Error(`Type mismatch! Category type is "${cat.type}" but Transaction type is "${type}".`);
  }

  const newTx = { user: userId, ...data };
  const tx = await Transaction.create(newTx);

  return tx;
}

// PATCH /transactions/:id
const updateTransactionByIdService = async (txId, userId, data) => {
  const txFilter = { _id: txId, user: userId, isDeleted: false };

  const oldTx = await Transaction.findOne(txFilter).populate('category');
  if (!oldTx) {
    return null;
  }


  if (data.account) {
    const acc = await Account.findOne({ _id: data.account, user: userId,  isDeleted: false });
    if (!acc) {
      throw new Error('Invalid or unauthorized account!');
    }
  }

  let newCategory = null;
  if (data.category) {
    newCategory = await Category.findOne({ _id: data.category, user: userId, isDeleted: false });
    if (!newCategory) {
      throw new Error('Invalid or unauthorized category!');
    }
  }

  // if user updates category ONLY
  if (data.category && !data.type) {
    if (newCategory.type !== oldTx.type) {
      throw new Error(`Type mismatch: Transaction type "${oldTx.type}" does not match Category type "${newCategory.type}".`);
    }
  }

  // if user updates type ONLY
  if (!data.category && data.type) {
    if (data.type !== oldTx.category.type) {
      throw new Error(`Type mismatch: Category type "${oldTx.category.type}" does not match new Transaction type "${data.type}".`);
    }
  }

  // if user updates BOTH
  if (data.category && data.type){
    if (newCategory.type !== data.type) {
      throw new Error(`Type mismatch: Category type "${newCategory.type}" does not match Transaction type "${data.type}".`);
    }
  }

  const updatedTx = await Transaction.findOneAndUpdate(txFilter, data, { new: true });

  
  return updatedTx;
}

// PATCH /transactions/:id/archive
const archiveTransactionService = async (txId, userId) => {
  const txFilter = { _id: txId, user: userId };

  const updatedTx = await Transaction.findOneAndUpdate(txFilter, { isDeleted: true }, {new: true });

  return updatedTx;
}

// PATCH /transactions/:id/restore
const restoreTransactionService = async (txId, userId) => {
  const txFilter = { _id: txId, user: userId };

  const updatedTx = await Transaction.findOneAndUpdate(txFilter, { isDeleted: false }, {new: true });

  return updatedTx;
}

// DELETE /transactions/:id
const deleteTransactionService = async (txId, userId) => {
  const txFilter = { _id: txId, user: userId};

  const deletedTx = await Transaction.findOneAndDelete(txFilter);

  return deletedTx;
}

export {
  getTransactionsService,
  getArchivedTransactionsService,
  getTransactionByIdService,
  createTransactionService, 
  updateTransactionByIdService,
  archiveTransactionService,
  restoreTransactionService,
  deleteTransactionService
};