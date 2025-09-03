import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
//grab the id from the params
interface Props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <h1>{issue.title}</h1>
      <p>{issue.description}</p>
      <p>Status: {issue.status}</p>
      <p>Created at: {issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailsPage;
