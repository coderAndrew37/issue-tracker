import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, description, status } = await request.json();

  const result = issueSchema.safeParse({ title, description, status });

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
