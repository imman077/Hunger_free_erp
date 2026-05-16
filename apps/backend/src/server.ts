import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hunger_free_erp';

import { Donation } from './models/Donation';
import { User } from './models/User';
import { Need } from './models/Need';
import { Inventory } from './models/Inventory';
import { Reward } from './models/Reward';
import { Enquiry } from './models/Enquiry';
import { Document as AppDocument } from './models/Document';
import { LuckySpinPrize, LuckySpinDraw } from './models/LuckySpin';

// Basic Schema
const typeDefs = `#graphql
  type VolunteerInfo {
    name: String
    phone: String
    rating: String
  }

  type Timeline {
    status: String
    date: String
    time: String
    completed: Boolean
  }

  type Donation {
    id: ID!
    foodType: String!
    quantity: String!
    ngo: String!
    date: String!
    status: String!
    pickupAddress: String
    deliveryAddress: String
    description: String
    volunteer: VolunteerInfo
    image: String
    timeline: [Timeline]
  }

  type DonorProfile {
    businessName: String
    businessType: String
    verificationLevel: String
    registrationId: String
    profileCompleteness: Int
  }

  type NGOProfile {
    name: String
    registrationId: String
    category: String
    currentTier: String
    stats: NGOStats
  }

  type NGOStats {
    totalDonations: Int
    beneficiariesHelped: Int
    activeNeeds: Int
  }

  type VolunteerProfile {
    zone: String
    skills: [String]
    rating: Float
    tasksCompleted: Int
    status: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    isVerified: Boolean
    donorProfile: DonorProfile
    ngoProfile: NGOProfile
    volunteerProfile: VolunteerProfile
  }

  type Reward {
    id: ID!
    name: String!
    description: String
    pointsRequired: Int!
    category: String!
    role: String!
    amount: String
    available: Boolean
  }

  type Need {
    id: ID!
    itemName: String!
    category: String!
    quantity: Int
    unit: String
    urgency: String
    status: String
  }

  type LuckyPrize {
    id: ID!
    label: String!
    prizeType: String
    value: Float
    icon: String
  }

  type Query {
    donations: [Donation]
    users: [User]
    rewards: [Reward]
    needs: [Need]
    prizes(role: String): [LuckyPrize]
    hello: String
  }

  type Mutation {
    seedData: String
    verifyPickup(id: ID!, otp: String!): Donation
  }
`;

// Resolvers
const resolvers = {
  Query: {
    donations: async () => await Donation.find(),
    users: async () => await User.find(),
    rewards: async () => await Reward.find(),
    needs: async () => await Need.find(),
    prizes: async (_: any, { role }: { role: string }) => await LuckySpinPrize.find(role ? { role } : {}),
    hello: () => 'Hello from Hunger Free ERP API!',
  },
  Mutation: {
    verifyPickup: async (_: any, { id, otp }: { id: string, otp: string }) => {
      const donation = await Donation.findById(id);
      if (!donation) throw new Error("Donation not found");
      
      // In a real app, check the OTP. For demo, we'll accept '123456' as per UI
      if (otp !== '123456') throw new Error("Invalid OTP");

      donation.status = 'PICKED_UP';
      donation.timeline.push({
        status: 'Picked Up',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        completed: true
      });

      await donation.save();
      return donation;
    },
    seedData: async () => {
      // Clear all
      await Donation.deleteMany({});
      await Need.deleteMany({});
      await User.deleteMany({});
      await AppDocument.deleteMany({});
      await LuckySpinPrize.deleteMany({});
      await LuckySpinDraw.deleteMany({});
      await Reward.deleteMany({});

      // Seed Users with Nested Profiles (MongoDB Style)
      const donorUser = await User.create({
        username: 'star_hotel',
        email: 'info@starhotel.com',
        role: 'DONOR',
        isVerified: true,
        donorProfile: {
          businessName: "The Star Grand Hotel",
          businessType: "Hotel",
          subCategory: "5-STAR HOTEL",
          verificationLevel: "Level III",
          registrationId: "REG-998877",
          profileCompleteness: 95
        }
      });

      const ngoUser = await User.create({
        username: 'helping_hands',
        email: 'contact@helpinghands.org',
        role: 'NGO',
        isVerified: true,
        ngoProfile: {
          name: "Helping Hands NGO",
          registrationId: "NGO-12345",
          category: "Social Service",
          currentTier: "Silver",
          stats: {
            totalDonations: 150,
            beneficiariesHelped: 1200,
            activeNeeds: 5
          }
        },
        paymentMethods: {
          bankAccounts: [{
            bankName: "HDFC Bank",
            accountHolder: "Helping Hands Foundation",
            accountNumber: "50100234567890",
            ifscCode: "HDFC0001234",
            isPrimary: true
          }],
          upiIds: [{ vpa: "helpinghands@okaxis", label: "Primary UPI", isPrimary: true }]
        }
      });

      const volunteerUser = await User.create({
        username: 'john_v',
        email: 'john@gmail.com',
        role: 'VOLUNTEER',
        isVerified: true,
        volunteerProfile: {
          zone: "North Mumbai",
          skills: ["Driving", "First Aid"],
          rating: 4.8,
          tasksCompleted: 24,
          status: "available"
        }
      });

      // Seed Lucky Prizes
      await LuckySpinPrize.create([
        { role: 'NGO', label: '₹25,000 GRANT', prizeType: 'GRANT', value: 25000, icon: 'gift' },
        { role: 'NGO', label: '5,000 POINTS', prizeType: 'POINTS', value: 5000, icon: 'star' },
        { role: 'VOLUNTEER', label: '₹500 FUEL', prizeType: 'CASH', value: 500, icon: 'zap' }
      ]);

      // Seed Needs
      await Need.create({
        ngo: ngoUser._id,
        itemName: "Rice Bags",
        category: "Dry Grains",
        quantity: 10,
        unit: "Bags (25kg)",
        urgency: "High Priority",
        status: "Open"
      });

      // Seed Donations
      await Donation.create([
        {
          foodType: "Buffet Surplus",
          quantity: "50 Meals",
          ngo: "Helping Hands NGO",
          date: "May 16, 2026",
          status: "PENDING",
          pickupAddress: "Star Grand Hotel, Lobby Entrance",
          deliveryAddress: "Helping Hands Center, Mumbai",
          description: "Freshly prepared mixed continental buffet surplus.",
          timeline: [{ status: "Created", date: "May 16, 2026", time: "11:00 AM", completed: true }]
        }
      ]);

      return "Database REFACTORED to native MongoDB structure and seeded successfully!";
    }
  }
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log('🚀 Connected to MongoDB');

    // Auto-seed data
    const seedResult = await (resolvers.Mutation.seedData as () => Promise<string>)();
    console.log(`🌱 ${seedResult}`);

    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(PORT) },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('❌ Error starting server:', error);
  }
}

startServer();
