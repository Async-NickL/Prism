"use server";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const LoggedUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    if (LoggedUser) {
      return LoggedUser;
    } else {
      const name = `${user.firstName} ${user.lastName}`;
      const newUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          name: name,
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0].emailAddress,
        },
      });
      return newUser;
    }
  } catch (error) {
    throw new Error("Failed to check/create user: " + error.message);
  }
};
