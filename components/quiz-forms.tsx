import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import "katex/dist/katex.min.css";
import React, { useEffect } from "react";
import { apPhysics1_kinematics_mcq } from "@/keys";
import { InlineMath } from "react-katex";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { trpc } from "../utils/trpc";

const FormSchema = z.object({
  questionType: z.string(),
  subunit: z.string(),
});

export const QuizSettings: React.FC<{
  setFilters: (x: z.infer<typeof FormSchema>) => void;
  courseCode: string;
  unit: number;
}> = ({ courseCode, setFilters, unit }) => {
  const course = trpc.course.getCourse.useQuery({ courseCode: courseCode! });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFilters(data);
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="questionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Multiple choice or free response?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mcq">MCQ</SelectItem>
                    <SelectItem value="frq-short">
                      FRQ (Short Answer)
                    </SelectItem>
                    <SelectItem value="frq">FRQ (Essay)</SelectItem>
                    <SelectItem value="all">All types</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subunit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subunit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Which subunit to focus on?" />
                  </SelectTrigger>
                  <SelectContent>
                    {course.data?.units[unit - 1].subunits.map((subunit, i) => (
                      <SelectItem value={subunit.title}>
                        <span className="capitalize">
                          {String.fromCharCode(97 + i)}.{" "}
                        </span>
                        {subunit.title}
                      </SelectItem>
                    ))}
                    <SelectItem value="all">All subunits</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Ok, quiz me
          </Button>
        </form>
      </Form>
    </div>
  );
};

export const MCQ: React.FC = () => {
  const [question, setQuestion] = React.useState<any>(null);

  useEffect(() => {
    const random =
      Math.floor(Math.random() * apPhysics1_kinematics_mcq.length) + 1;
    setQuestion(apPhysics1_kinematics_mcq[random]);
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <p>
        {/* Given the function <InlineMath math="g(x)=\dfrac{e^x}{x^e}" />, find{" "}
        <InlineMath math="\dfrac{d g(x)}{dx}" />. */}
        {question?.question}
      </p>
      <form
        className="grid gap-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          // get radio value
          // check if correct
          const value = (
            document.querySelector(
              'input[name="radio"]:checked'
            ) as HTMLInputElement
          ).value;
          // make value into a-z
          const letter = String.fromCharCode(
            97 + parseInt(value)
          ).toUpperCase();
          if (letter === question?.correct_answer) {
            alert("Correct!");
          } else {
            alert("Wrong!");
          }
        }}
      >
        {/* <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-dark border-zinc-300"
            name="radio"
            value="1"
          />
          <span className="ml-2">
            <InlineMath math="e^x x^{-1-e}(-e+x)" />
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-dark border-zinc-300"
            name="radio"
            value="2"
          />
          <span className="ml-2">
            <InlineMath math="e^x x^{1+e}(-e+x)" />
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-dark border-zinc-300"
            name="radio"
            value="3"
          />
          <span className="ml-2">
            <InlineMath math="e^{-x} x^{1+e}(-e+x)" />
          </span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-primary-dark border-zinc-300"
            name="radio"
            value="3"
          />
          <span className="ml-2">None of the above</span>
        </label> */}
        {question?.options.map((option: string, i) => (
          <label className="inline-flex items-center" key={i}>
            <input
              type="radio"
              className="form-radio text-primary-dark border-zinc-300"
              name="radio"
              value={i}
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
        <div className="space-y-2 mt-2">
          <Button type="submit" name="check" className="w-full">
            Check
          </Button>
          <Button
            type="submit"
            name="skip"
            className="w-full"
            variant="secondary"
          >
            Skip
          </Button>
        </div>
      </form>
    </div>
  );
};

export const FRQ: React.FC<{ shortAnswer?: boolean }> = ({
  shortAnswer = false,
}) => {
  return (
    <div className="max-w-xl mx-auto">
      <p>
        Given the function <InlineMath math="g(x)=\dfrac{e^x}{x^e}" />, find{" "}
        <InlineMath math="\dfrac{d g(x)}{dx}" />.
      </p>
      <form>
        {shortAnswer ? (
          <Input placeholder="Answer" className="mt-4" />
        ) : (
          <Textarea placeholder="Paragraph answer" className="mt-4" />
        )}
        <div className="space-y-2 mt-2">
          <Button type="submit" name="check" className="w-full">
            Check
          </Button>
          <Button
            type="submit"
            name="skip"
            className="w-full"
            variant="secondary"
          >
            Skip
          </Button>
        </div>
      </form>
    </div>
  );
};
