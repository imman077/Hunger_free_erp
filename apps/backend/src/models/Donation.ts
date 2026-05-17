import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  foodType: { type: String, required: true },
  category: { type: String, required: true },
  dietaryType: { type: String, required: true },
  preparationType: { type: String, required: true },
  quantity: { type: String, required: true },
  ngo: { type: String }, // Optional until NGO accepts
  date: { type: String, required: true },
  status: { type: String, required: true, default: 'PENDING' },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String }, // Optional until NGO accepts
  description: { type: String, required: true },
  volunteer: {
    name: String,
    phone: String,
    rating: String
  },
  image: String,
  timeline: [{
    status: String,
    date: String,
    time: String,
    completed: Boolean
  }]
}, {
  timestamps: true
});

export const Donation = mongoose.model('Donation', donationSchema);
