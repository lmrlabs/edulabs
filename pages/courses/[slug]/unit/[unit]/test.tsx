import "katex/dist/katex.min.css";
import React from "react";
import { InlineMath } from "react-katex";
import CourseLayout from "../../../../../components/course-layout";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/router";
import {
  CourseProgress,
  SectionProgress,
} from "../../../../../components/course-progress";
import { BarChart } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../../../components/ui/popover";

interface CourseTestProps {}

const MCQ: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto">
      <p>
        Given the function <InlineMath math="g(x)=\dfrac{e^x}{x^e}" />, find{" "}
        <InlineMath math="\dfrac{d g(x)}{dx}" />.
      </p>
      <form className="grid gap-4 mt-4">
        <label className="inline-flex items-center">
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
        <div className="flex gap-2 mt-4">
          <Button className="w-full">Check</Button>
          <Button className="w-full" variant="outline">
            Skip
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <BarChart className="h-4 w-4 mr-2" />
                Show stats
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={8}>
              <CourseProgress />
            </PopoverContent>
          </Popover>
        </div>
      </form>
    </div>
  );
};

const CourseTest: React.FC<CourseTestProps> = () => {
  const { query } = useRouter();

  return (
    <CourseLayout>
      <div className="p-4 px-5 py-12"></div>
    </CourseLayout>
  );
};

export default CourseTest;
