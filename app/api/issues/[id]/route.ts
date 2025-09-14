import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchemas";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const issueId = parseInt(params.id);
  const body = await request.json();

  const result = issueSchema.safeParse(body);
  // Validate the request body against the schema
  if (!result.success) {
    return NextResponse.json(result.error.message, { status: 400 });
  }

  const { title, description } = result.data;

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.update({
    where: { id: issueId },
    data: { title, description },
  });

  return NextResponse.json(issue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }
  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({ message: "Issue deleted successfully" });
}
