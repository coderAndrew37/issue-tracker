import { Button } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <div className="mb-4">
      <Button>
        <Link href="/issues/new">Create New Issue</Link>
      </Button>

      <IssueStatusFilter />
    </div>
  );
};

export default IssueActions;
