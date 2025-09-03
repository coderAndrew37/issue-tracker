import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { issueSchema } from "@/app/validationSchemas";
const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
