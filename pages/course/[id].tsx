import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";

const CoursePage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  let userId = session?.user?.id!;
  let id = router.query.id as string;

  const courseQuery = trpc.user.course.useQuery({ userId, courseId: id });
  console.log(courseQuery?.data?.units);
  if (courseQuery?.isLoading) {
    return <div>Loading or invalid input...</div>;
  }

  if (courseQuery?.error) {
    return <div>Error: {courseQuery.error.message}</div>;
  }

  const course = courseQuery?.data?.course;

  return (
    <div>
      <h1>title: {course?.name}</h1>
      <p> desc: {course?.description}</p>
      <div>
        {course?.units?.map((unit, unitIndex) => (
          <div key={unitIndex}>
            <h2>unit : {unit.title}</h2>
            <ul>
              {unit.subunits.map((subunit, subunitIndex) => (
                <li key={subunitIndex}>
                  sbut: {subunit.title} - Progress:{" "}
                  {courseQuery.data?.units[unitIndex].subunits[subunitIndex]
                    .progress ?? "N/A"}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
