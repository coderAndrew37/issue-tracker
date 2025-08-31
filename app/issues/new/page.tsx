"use client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  const { register, handleSubmit, control } = useForm<IssueForm>();

  return (
    <form className=" max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder="Title" {...register("title")} />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE {...field} placeholder="Description" />
        )}
      />

      <Button className="cursor-pointer">Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
