import { Box } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const LoadingNewIssuePage = () => {
  return (
    <Box className=" max-w-xl space-y-3">
      <Skeleton height={40} />

      <Skeleton height={200} />
    </Box>
  );
};

export default LoadingNewIssuePage;
