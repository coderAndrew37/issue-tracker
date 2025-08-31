"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch {
      console.error("Error creating issue:", error);
      setError("Failed to create issue");
    }
  };

  // Clear error after 3 seconds

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <>
      <ErrorMessage error={error} />
      <form className=" max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")} />

        {errors.title && <ErrorMessage error={errors.title.message} />}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />

        {errors.description && (
          <ErrorMessage error={errors.description.message} />
        )}

        <Button type="submit" disabled={!isValid}>
          Submit New Issue
        </Button>
      </form>
    </>
  );
};

export default NewIssuePage;
