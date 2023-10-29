import React, { useRef } from "react";
import { CourseSidebar } from "./course-sidebar";

interface CourseLayoutProps extends React.PropsWithChildren {}

const CourseLayout: React.FC<CourseLayoutProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex">
      <CourseSidebar ref={ref} />
      <main
        style={{
          marginLeft: ref.current?.getBoundingClientRect().width ?? 320,
        }}
        className="w-full h-screen p-10"
      >
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;
