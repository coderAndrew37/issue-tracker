import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetails = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex className="space-x-3 my-2 items-center">
        <Skeleton width={100} />
        <Skeleton width={100} />
      </Flex>
      <Card className="prose lg:prose-xl">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetails;
