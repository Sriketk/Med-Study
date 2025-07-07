"use server";
import { auth } from "@/lib/auth/auth";

export const signIn = async () => {
  await auth.api.signInEmail({
    body: {
      email: "user@email.com",
      password: "password",
    },
  });
};

export const signup = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "user@email.com",
      password: "password",
      name: "John Doe",
    },
  });
};
