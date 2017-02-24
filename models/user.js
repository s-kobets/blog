import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-as-promised';

const UserSchema = new Schema({
  login: { type: String, unique: true, lowercase: true, index: true },
  password: String
});

// запускается при сохранении пароля
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  // хэшируем пароль
  this.password = hash;
  next();
});

// запускается при проверки пароля
UserSchema.methods.comparePasswords = function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);