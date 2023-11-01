import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import "katex/dist/katex.min.css";
import React, { useEffect } from "react";
import {
  apBiology_chemistryOfLife_mcq,
  apPhysics1_dynamics_frq,
  apPhysics1_kinematics_mcq,
} from "@/keys";
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

export const MCQ: React.FC<{
  courseCode: string;
  unit: number;
  course: any;
  filters: z.infer<typeof FormSchema>;
}> = ({ courseCode, unit, course, filters }) => {
  const [question, setQuestion] = React.useState<any>(null);
  function questionBank() {
    if (
      courseCode === "ap-physics-1" &&
      unit === 1 &&
      filters.questionType === "mcq"
    ) {
      return apPhysics1_kinematics_mcq;
    }
    if (
      courseCode === "ap-physics-1" &&
      unit === 2 &&
      filters.questionType === "frq-short"
    ) {
      return apPhysics1_dynamics_frq;
    }
    if (
      courseCode === "ap-biology" &&
      unit === 1 &&
      filters.questionType === "mcq"
    ) {
      return apBiology_chemistryOfLife_mcq;
    }
    return [];
  }

  function regenerate() {
    const list = questionBank().filter((x) => {
      if (filters.subunit === "all") return true;
      return x.metadata.subunit === filters.subunit;
    });
    const random = Math.floor(Math.random() * list.length) + 1;
    setQuestion(list[random]);
  }

  useEffect(() => {
    regenerate();
  }, []);

  const updateProgress = trpc.user.updateProgress.useMutation();

  return (
    <div className="max-w-xl mx-auto">
      {question === undefined ? "No questions found" : null}
      <p>
        {/* Given the function <InlineMath math="g(x)=\dfrac{e^x}{x^e}" />, find{" "}
        <InlineMath math="\dfrac{d g(x)}{dx}" />. */}
        {question?.question}
      </p>
      <form
        className="grid gap-4 mt-4"
        onSubmit={async (e) => {
          console.log(course);

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
            await updateProgress.mutateAsync({
              courseId: course._id,
              unitId: course.units[unit - 1]._id,
              subunitId: course.units[unit - 1].subunits.find(
                (x: any) => x.title === question.metadata.subunit
              )._id,
            });
            regenerate();
            // clear form
            (
              document.querySelector(
                'input[name="radio"]:checked'
              ) as HTMLInputElement
            ).checked = false;
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
            type="button"
            name="skip"
            className="w-full"
            variant="secondary"
            onClick={regenerate}
          >
            Skip
          </Button>
        </div>
      </form>
    </div>
  );
};

export const FRQ: React.FC<{
  shortAnswer?: boolean;
  courseCode: string;
  unit: number;
  filters: z.infer<typeof FormSchema>;
}> = ({ shortAnswer = true, courseCode, unit, filters }) => {
  const [question, setQuestion] = React.useState<any>(null);
  function questionBank() {
    if (
      (courseCode === "ap-physics-1" &&
        unit === 1 &&
        filters.questionType === "mcq") ||
      filters.questionType === "all"
    ) {
      return apPhysics1_kinematics_mcq;
    }
    if (
      (courseCode === "ap-physics-1" &&
        unit === 2 &&
        filters.questionType === "frq-short") ||
      filters.questionType === "all"
    ) {
      return apPhysics1_dynamics_frq;
    }
    if (
      (courseCode === "ap-biology" &&
        unit === 1 &&
        filters.questionType === "mcq") ||
      filters.questionType === "all"
    ) {
      return apBiology_chemistryOfLife_mcq;
    }
    return [];
  }

  function regenerate() {
    const list = questionBank().filter((x) => {
      if (filters.subunit === "all") return true;
      return x.metadata.subunit === filters.subunit;
    });
    const random = Math.floor(Math.random() * list.length) + 1;
    setQuestion(list[random]);
  }

  useEffect(() => {
    regenerate();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <p>
        {/* Given the function <InlineMath math="g(x)=\dfrac{e^x}{x^e}" />, find{" "}
        <InlineMath math="\dfrac{d g(x)}{dx}" />. */}
        {question?.question}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // get radio value
          // check if correct
          const value = (
            document.querySelector('input[name="answer"]') as HTMLInputElement
          ).value;
          if (question.options.find((x: string) => value === x.trim())) {
            alert("Correct!");
          } else {
            alert("Wrong!");
          }
        }}
      >
        {shortAnswer ? (
          <Input name="answer" placeholder="Answer" className="mt-4" />
        ) : (
          <Textarea
            name="answer"
            placeholder="Paragraph answer"
            className="mt-4"
          />
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
