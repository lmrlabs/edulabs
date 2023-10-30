import React, { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import Link from "next/link";
import { signIn } from "next-auth/react";

// @ts-ignore

const StarButton = ({ courseId }) => {
  const { data: session, status } = useSession();
  const addCourseMutation = trpc.user.addCourse.useMutation();

  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
  }, [status]);

  if (!isUser) {
    return (
      <div>
        <h1>You need to be logged in to view this page.</h1>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    );
  }

  const addCourseToUser = async () => {
    // console.log(courseId)
    try {
      const returned = await addCourseMutation.mutateAsync({
        userId: session?.user.id!, // Replace this with the actual user ID
        courseId,
      });
      // console.log(returned);
      alert("Course added successfully");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return <button onClick={addCourseToUser}>Star</button>;
};

// @ts-ignore

const Dashboard = ({ courses }) => {
  return (
    <div>
      <h1>Course Dashboard</h1>
      <ul>
        {/* @ts-ignore */}
        {courses &&
          courses.map((course) => (
            <li key={course._id}>
              {course.name}
              <StarButton courseId={course._id} />
            </li>
          ))}
      </ul>
    </div>
  );
};

const DashboardPage = () => {
  const { data: session, status } = useSession();

  const coursesQuery = trpc.course.getCourses.useQuery();

  // const isUser = !!session?.user;

  // useEffect(() => {
  //   if (status === "loading") return; // Do nothing while loading
  // }, [status]);

  // if (!isUser) {
  //   return (
  //     <div>
  //       <h1>You need to be logged in to view this page.</h1>
  //       <button onClick={() => signIn("google")}>Sign in</button>
  //     </div>
  //   );
  // }

  if (coursesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (coursesQuery.error) {
    return <div>Error: {coursesQuery.error.message}</div>;
  }

  return <Dashboard courses={coursesQuery.data.courses} />;
};

export default DashboardPage;
