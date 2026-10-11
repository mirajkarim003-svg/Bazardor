import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// During `next build` the env vars may be absent; the build must still pass.
// At runtime a missing value fails loudly with a clear message instead.
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

const uri = process.env.MONGODB_URI;
if (!uri && !isBuild) {
  throw new Error(
    "MONGODB_URI is missing. Copy .env.example to .env.local and fill in the values."
  );
}

// Reuse the client across hot reloads / serverless invocations.
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };
const client = globalForMongo._mongoClient ?? new MongoClient(uri ?? "mongodb://localhost:27017");
if (process.env.NODE_ENV !== "production") globalForMongo._mongoClient = client;

const db = client.db(process.env.MONGODB_DB || "bazardor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET || (isBuild ? "build-time-placeholder-secret" : undefined),
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    // After sign up the user is sent to the sign in page (assignment requirement).
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
});
