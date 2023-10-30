import React from "react";
import { cn } from "../lib/utils";
import { trpc } from "../utils/trpc";

interface SectionProgressProps {
  name: string;
  section: string;
  done: number;
  todo: number;
}

export const SectionProgress: React.FC<SectionProgressProps> = ({
  section,
  name,
  done,
  todo,
}) => {
  const color = {
    0: "ring-red-300 bg-red-300",
    0.25: "ring-red-300 bg-red-300",
    0.5: "ring-yellow-300 bg-yellow-300",
    0.75: "ring-green-300 bg-green-300",
    1: "ring-primary-light bg-primary-light",
  };
  const colorKey = (Math.round((done / todo) * 4) / 4) as 0.25 | 0.5 | 0.75;
  const colorClass = color[colorKey];
  return (
    <div>
      <h2 className="font-semibold text-sm text-zinc-500">
        <span className="capitalize">{section}</span>. {name}
      </h2>
      <div className="flex items-center gap-3.5 px-1 py-2">
        {Array.from({ length: todo }, (_, i) =>
          i < done ? (
            <div
              className={cn(
                "w-6 h-6 rounded-sm ring-4 ring-offset-2 ring-offset-white",
                colorClass
              )}
            ></div>
          ) : (
            <div className="w-6 h-6 rounded-sm ring-2 ring-offset-2 ring-offset-white ring-zinc-200"></div>
          )
        )}
      </div>
    </div>
  );
};

export const CourseProgress: React.FC<{ courseCode: string }> = ({
  courseCode,
}) => {
  const myCourse = trpc.user.course.useQuery({ courseCode });

  return (
    <div className="flex flex-col gap-4">
      <SectionProgress name="Limit definition" section="a" todo={6} done={2} />
      <SectionProgress name="Power rule" section="b" todo={6} done={5} />
      <SectionProgress name="Log and e rule" section="c" todo={6} done={3} />
      <SectionProgress
        name="Power and quotient rule"
        section="d"
        todo={6}
        done={1}
      />
    </div>
  );
};
