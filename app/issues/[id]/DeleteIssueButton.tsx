"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import router from "next/router";
import React from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
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
            <Button
              color="red"
              onClick={() => {
                // delete the issue
                // redirect to issues page with refresh
                router.push("/issues", undefined);
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="outline">Cancel</Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
