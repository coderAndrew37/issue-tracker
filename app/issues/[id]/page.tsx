import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
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
      <Grid
        columns={{ initial: "1", md: "5" }}
        className="mb-4"
        gap="3 col-span-4"
      >
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex className="space-x-3 my-2 items-center">
            <IssueStatusBadge status={issue.status} />{" "}
            <Text>Created at: {issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose lg:prose-xl">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </Card>
        </Box>
        <Box>
          <Flex direction={"column"} gap="3">
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      </Grid>
    </div>
  );
};

export default IssueDetailsPage;
