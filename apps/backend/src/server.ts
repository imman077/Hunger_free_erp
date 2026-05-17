import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hunger_free_erp';

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connected to MongoDB');

    // Auto-seed on startup
    const seedFn = resolvers.Mutation.seedData as () => Promise<string>;
    const seedResult = await seedFn();
    console.log(`🌱 ${seedResult}`);

    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(PORT) },
    });
    console.log(`🚀 GraphQL Server ready at ${url}`);
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

startServer();
