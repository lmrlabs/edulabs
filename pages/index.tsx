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

export default function Home() {
  const courses = trpc.course.getCourses.useQuery();

  return (
    <div>
      <MainNavigationBar />
      <main className="px-16 py-16">
        <H1>AP Test Prep</H1>
        <div className="grid gap-6 grid-cols-2 pt-16">
          {courses.data?.map((course) => (
            <Card>
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
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
          ))}
          {/* <Link href="/courses/calc-ab">
            <Card className="group">
              <CardHeader>
                <CardTitle className="group-hover:underline">
                  AP Calculus AB
                </CardTitle>
                <CardDescription>8 Units</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>Unit 1: Limits and Continuity</li>
                  <li>
                    Unit 2: Differentiation: Definition and Fundamental
                    Properties
                  </li>
                  <li>
                    Unit 3: Differentiation: Composite, Implicit, and Inverse
                    Functions
                  </li>
                  <li>Unit 4: Contextual Applications of Differentiation</li>
                  <li>Unit 5: Analytical Applications of Differentiation</li>
                  <li>Unit 6: Integration and Accumulation of Change</li>
                  <li>Unit 7: Differential Equations</li>
                  <li>Unit 8: Applications of Integration</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
          <Link href="/courses/physics-1">
            <Card className="group">
              <CardHeader>
                <CardTitle className="group-hover:underline">
                  AP Physics 1
                </CardTitle>
                <CardDescription>7 Units</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>Unit 1: Kinematics</li>
                  <li>Unit 2: Dynamics</li>
                  <li>Unit 3: Circular motion and gravitation</li>
                  <li>Unit 4: Energy</li>
                  <li>Unit 5: Momentum</li>
                  <li>Unit 6: Simple harmonic motion</li>
                  <li>Unit 7: Torque and rotational motion</li>
                </ul>
              </CardContent>
            </Card>
          </Link> */}
        </div>
      </main>
    </div>
  );
}
