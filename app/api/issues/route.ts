import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//validate data using zod
const schema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(255, { message: "Title must be at most 255 characters" }),

  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" })
    .max(1000, { message: "Description must be at most 1000 characters" }),
});

export async function POST(request: NextRequest) {
  const { title, description, status } = await request.json();

  const result = schema.safeParse({ title, description, status });

  if (!result.success) {
    return NextResponse.json(
      {
        error: result.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      },
      { status: 400 }
    );
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: title,
      description: description,
    },
  });

  return NextResponse.json(newIssue);
}

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}
