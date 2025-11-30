import Account from '../models/Account.js';

/*
  ENDPOINTS:
  GET /accounts
  GET /accounts/archived
  GET /accounts/:id
  POST /accounts
  PATCH /accounts/:id
  PATCH /accounts/:id/archive
  PATCH /accounts/:id/restore
  DELETE /accounts/:id
*/

// GET /accounts
const getUserAccountsService = async (userId, type) => {
  let accFilter = { user: userId, isDeleted: false };

  if (type) {
    accFilter.type = type;
  }

  const acc = await Account.find(accFilter);

  return acc;
}

// GET /accounts/archived
const getArchivedAccountsService = async (userId, type) => {
  let accFilter = { user: userId, isDeleted: true };

  if (type) {
    accFilter.type = type;
  }
  const acc = await Account.find(accFilter);

  return acc;
}

// GET /accounts/:id
const getAccountByIdService = async (accountId, userId) => {
  const accFilter = { _id: accountId, user: userId };
  const acc = await Account.findOne(accFilter);

  return acc;
}

// POST /accounts
const createAccountService = async (userId, data) => {
  const newAcc = { user: userId, ...data };
  const acc = await Account.create(newAcc);

  return acc;
}

// PATCH /accounts/:id (can only edit non-archived accounts)
const updateAccountService = async (accountId, userId, data) => {
  const accFilter = { _id: accountId, user: userId };
  const acc = await Account.findOneAndUpdate(accFilter, data, { new: true });

  return acc;
} 

// PATCH /accounts/:id/archive (soft deletion)
const archiveAccountService = async (accountId, userId) => {
  const accFilter = { _id: accountId, user: userId };
  const acc = await Account.findOneAndUpdate(accFilter, { isDeleted: true }, { new: true });

  return acc;
}

// PATCH /accounts/:id/restore
const restoreAccountService = async (accountId, userId) => {
  const accFilter = { _id: accountId, user: userId, isDeleted: true };
  const acc = await Account.findOneAndUpdate(accFilter, { isDeleted: false }, { new: true });

  return acc;
}

// DELETE /accounts/:id
const deleteAccountService = async (accountId, userId) => {
  const accFilter = { _id: accountId, user: userId };
  const acc = await Account.findOneAndDelete(accFilter);

  return acc;
}



export {
  getUserAccountsService,
  getArchivedAccountsService,
  getAccountByIdService,
  createAccountService,
  updateAccountService,
  archiveAccountService,
  restoreAccountService,
  deleteAccountService,
}