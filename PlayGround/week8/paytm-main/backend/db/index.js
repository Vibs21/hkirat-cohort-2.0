const mongoose = require('mongoose');

const db = mongoose.connect(
  'mongodb+srv://vaibhavbajpayee2109:1YaMUvGf8HPeKiqK@paytm.oaoeo4b.mongodb.net/paytm'
);

const UserSchema = new mongoose.Schema({
  userName: { type: String, require: true, unique: false },
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

const User = mongoose.model('User', UserSchema);
const Transactions = mongoose.model('Transactions', TransactionSchema);

//fire query using userModel

module.exports = { User, Transactions };
