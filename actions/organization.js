"use server";

import { db } from "@/lib/prisma";
import { auth, createClerkClient } from "@clerk/nextjs/server";


export async function getOrganization(slug) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized user");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found, please login!");
    }

    if (!slug) {
      throw new Error("Organization slug is required");
    }

    const clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    let organization;
    try {
      organization = await clerkClient.organizations.getOrganization({
        slug,
      });
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }

    if (!organization) return null;

    const membershipList =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: organization.id,
      });

    const members = membershipList.data;

    const isMember = members.find(
      (member) => member.publicUserData.userId === userId
    );

    if (!isMember) return null;

    return organization;
  } catch (error) {
    throw new Error("Failed to get organization: " + error.message);
  }
}

export async function getOrganizationUsers(orgId) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });
  const organizationMemberships =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  const userIds = organizationMemberships.data.map(
    (membership) => membership.publicUserData.userId
  );

  const users = await db.user.findMany({
    where: {
      clerkUserId: {
        in: userIds,
      },
    },
  });

  return users;
}