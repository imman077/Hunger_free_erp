import mongoose from 'mongoose';
import { Need } from './models/Need';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hunger_free_erp';

async function check() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
  const need = await Need.findById('6a17dea8e4bbd0af6ca7660f');
  console.log('Need Document in MongoDB:', JSON.stringify(need, null, 2));
  await mongoose.disconnect();
}

check().catch(console.error);
