import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const users = await prisma.user.findMany();
  if (!users) {
    return NextResponse.json({ message: "No users found" }, { status: 404 });
  }

  return NextResponse.json(users);
};
