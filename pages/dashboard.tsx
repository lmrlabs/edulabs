import React from 'react';
import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const DashboardPage = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id!;
  const coursesQuery = trpc.user.courses.useQuery({userId });

  if (!userId) {
    return (
      <div>
        <h1>You need to be logged in to view this page.</h1>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    );
  }




  if (coursesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (coursesQuery.error) {
    return <div>Error: {coursesQuery.error.message}</div>;
  }

  return (
    <div>
      <h1>Your Courses</h1>
      {coursesQuery.data?.courses.map((course) => (
        <div key={course._id}>
          <h2>name: {course.name}</h2>
          <p>description: {course.description}</p>
          <ul>
            {course.units.map((unit) => (
              <li key={unit._id}>
                unit: {unit.title}
                <ul>
                  {unit.subunits.map((subunit) => (
                    <li key={subunit._id}>subunit: {subunit.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
