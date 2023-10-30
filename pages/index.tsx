import { MainNavigationBar } from "@/components/main-navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import { Button } from "../components/ui/button";
import { Check } from "lucide-react";

export default function Home() {
  const courses = trpc.course.getCourses.useQuery();
  const addCourseMutation = trpc.user.addCourse.useMutation();
  const myCourses = trpc.user.myCourses.useQuery();

  console.log(myCourses);

  return (
    <div>
      <MainNavigationBar />
      <main className="px-16 py-16">
        <H1>AP Test Prep</H1>
        <div className="grid gap-6 grid-cols-2 pt-16">
          {courses.data?.map((course) => {
            const isEnrolled = myCourses.data?.courses.find(
              (c) => c._id === course._id
            );
            return (
              <Card key={course._id}>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                  <Button
                    variant={isEnrolled ? "secondary" : "outline"}
                    onClick={async () => {
                      !isEnrolled &&
                        (await addCourseMutation.mutateAsync({
                          courseId: course._id,
                        }));
                    }}
                  >
                    {isEnrolled ? "Enrolled" : "Enroll"}
                    {isEnrolled && <Check className="ml-2 w-4 h-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    {course.units.map((unit, i) => (
                      <li>
                        <Link
                          href={`/courses/${course.courseCode}/unit-${i + 1}`}
                          className="hover:underline"
                        >
                          Unit {i + 1}: {unit.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
