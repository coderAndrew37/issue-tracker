"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const deleteIssue = async () => {
    try {
      // delete the issue
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues", undefined);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete the issue:", error);
      setError(true);
    }
  };

  return (
    <>
      {" "}
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="outline">
            <TrashIcon />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex className="justify-end gap-2 mt-4">
            {" "}
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button variant="outline">Cancel</Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Failed to delete the issue. Please try again.
          </AlertDialog.Description>
          <Flex className="justify-end mt-4">
            <AlertDialog.Cancel>
              <Button variant="outline" onClick={() => setError(false)}>
                Close
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
