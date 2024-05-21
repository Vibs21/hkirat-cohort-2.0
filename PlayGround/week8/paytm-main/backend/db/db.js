const mongoose = require('mongoose');
const { DB_CONNECTION } = require('../config');

const db = mongoose.connect(DB_CONNECTION);

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  password: { type: String, require: true },
  balance: Number,
  date: Date,
});

const TransactionSchema = new mongoose.Schema({
  entry: { type: String, require: true },
  amount: { type: Number, required: true },
  benefeciaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
});

const AccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  balance: {type: Number, required: true}
})

const User = mongoose.model('User', UserSchema);
const Transactions = mongoose.model('Transactions', TransactionSchema);
const Account = mongoose.model('Account', AccountSchema)

//fire query using userModel

module.exports = { User, Transactions, Account };
