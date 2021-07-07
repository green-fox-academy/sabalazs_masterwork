/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  },
});

// new user's password is automatically hashed before it will be saved into the database
UserSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// TODO: include all property from User object
UserSchema.methods.createToken = function () {
  return jwt.sign({
    id: this._id,
    email: this.email,
    role: this.role,
  },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRE });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

/*
Mongoose automatically looks for the plural, lowercased version of your model name.
The model User is for the users collection in the database.
*/
const User = mongoose.model('User', UserSchema);

export { UserSchema };
export default User;
