import CourseFlashcard from "@/components/course-flashcard";
import CourseLayout from "@/components/course-layout";
import { CourseProgress } from "@/components/course-progress";
import { FRQ, MCQ, QuizSettings } from "@/components/quiz-forms";
import { Button } from "@/components/ui/button";
import ImageButton from "@/components/ui/mainicon";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { H3, Muted } from "@/components/ui/typography";
import { BarChart, Plus } from "lucide-react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { trpc } from "../../../../utils/trpc";
import { useState } from "react";

function CoursePage({
  courseCode,
  unit,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const course = trpc.course.getCourse.useQuery({ courseCode: courseCode! });

  return (
    <CourseLayout courseCode={courseCode!} unit={parseInt(unit)}>
      <H3>
        Unit {unit.toString()}. {course.data?.units[parseInt(unit) - 1].title}
      </H3>
      <div className="flex items-center gap-2 mt-4">
        <Button variant="outline">1-by-1 view</Button>
        <Button variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New card
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">
              <BarChart className="h-4 w-4 mr-2" />
              Show stats
            </Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={8}>
            <CourseProgress courseCode={courseCode!} unit={parseInt(unit)} />
          </PopoverContent>
        </Popover>
        <QuizDialog course={course.data} courseCode={courseCode!} unit={unit} />
      </div>
      <div className="mt-4">
        <CourseFlashcard />
      </div>
    </CourseLayout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const courseCode = context.params?.slug?.toString();
  const unit = context.params?.unit?.toString();
  return {
    props: {
      courseCode,
      unit: unit!.replace("unit-", ""),
    },
  };
};

export default CoursePage;

const QuizDialog: React.FC<{
  course: any;
  courseCode: string;
  unit: string;
}> = ({ courseCode, unit, course }) => {
  const [filters, setFilters] = useState({
    questionType: "",
    subunit: "",
  });

  const [showSettings, setShowSettings] = useState(true);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            setShowSettings(true);
            setFilters({
              questionType: "",
              subunit: "",
            });
          }, 500);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>Quiz me</Button>
      </DialogTrigger>
      <DialogContent>
        {showSettings ? (
          <>
            <DialogHeader>
              <DialogTitle>Configure Quiz</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <QuizSettings
                courseCode={courseCode!}
                unit={parseInt(unit)}
                setFilters={(x: any) => {
                  setFilters(x);
                  setShowSettings(false);
                }}
              />
            </DialogDescription>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Quiz</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {filters.questionType === "mcq" ? (
                <MCQ
                  course={course}
                  courseCode={courseCode}
                  unit={parseInt(unit)}
                  filters={filters}
                />
              ) : (
                <FRQ
                  course={course}
                  courseCode={courseCode}
                  unit={parseInt(unit)}
                  filters={filters}
                />
              )}
            </DialogDescription>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
