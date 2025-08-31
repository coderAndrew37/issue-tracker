import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import React from "react";

interface ErrorMessageProps {
  error: string | undefined | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <b>Error</b>
            <div>{error}</div>
          </Callout.Text>
        </Callout.Root>
      )}
    </>
  );
};

export default ErrorMessage;
