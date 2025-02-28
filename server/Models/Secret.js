import mongoose from 'mongoose';

const secretSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  secret: { type: String, required: true },
  expiredAfterViews: { type: Number, required: true },
  expireAfter: { type: Number, required: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Secret = mongoose.model('Secret', secretSchema, "secrets");

export default Secret;