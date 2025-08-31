import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createIssueSchema } from "../../validationSchemas";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { title, description, status } = await request.json();

  const result = createIssueSchema.safeParse({ title, description, status });

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
