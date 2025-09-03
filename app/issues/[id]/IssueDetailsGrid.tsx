import { IssueStatusBadge } from "@/app/components";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

const IssueDetailsGrid = ({
  issue,
}: {
  issue: {
    title: string;
    status: Status;
    createdAt: Date;
    description: string;
  };
}) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3 my-2 items-center">
        <IssueStatusBadge status={issue.status} />{" "}
        <Text>Created at: {issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose lg:prose-xl">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetailsGrid;
