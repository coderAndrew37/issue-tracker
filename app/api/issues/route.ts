import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//validate data using zod
const schema = z.object({
  title: z.string().min(2).max(255),
  description: z.string().min(2).max(1000),
});

export async function POST(request: NextRequest) {
  const { title, description, status } = await request.json();

  const result = schema.safeParse({ title, description, status });

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: title,
      description: description,
    },
  });

  return NextResponse.json(newIssue);
}
