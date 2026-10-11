"use client";

import { createAuthClient } from "better-auth/react";

// No baseURL needed: the client talks to the same origin (/api/auth/*).
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
