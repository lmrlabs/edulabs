import { forwardRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { trpc } from "../utils/trpc";
import Link from "next/link";

const ChevronIcon: React.FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 12.5219L6 4.48126C6 3.92501 6.67188 3.64688 7.06563 4.04063L11.0875 8.05938C11.3312 8.30313 11.3312 8.70001 11.0875 8.94376L7.06563 12.9625C6.67188 13.3563 6 13.0781 6 12.5219Z"
        fill="currentColor"
      />
    </svg>
  );
};

const PaletteIcon: React.FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.3841 0.657348C3.2778 1.26361 0.774631 3.76052 0.162121 6.85745C-0.994147 12.7013 4.27781 17.0576 8.24975 16.442C9.53727 16.242 10.1685 14.7357 9.5779 13.5763C8.85601 12.1575 9.88728 10.5013 11.4811 10.5013H13.9717C15.0905 10.5013 15.9967 9.57624 15.9999 8.4606C15.9842 3.53552 11.5029 -0.339543 6.3841 0.657348ZM2.99967 10.5013C2.44653 10.5013 1.99965 10.0544 1.99965 9.50124C1.99965 8.94811 2.44653 8.50122 2.99967 8.50122C3.5528 8.50122 3.99968 8.94811 3.99968 9.50124C3.99968 10.0544 3.5528 10.5013 2.99967 10.5013ZM3.99968 6.50119C3.44655 6.50119 2.99967 6.05431 2.99967 5.50118C2.99967 4.94804 3.44655 4.50116 3.99968 4.50116C4.55282 4.50116 4.9997 4.94804 4.9997 5.50118C4.9997 6.05431 4.55282 6.50119 3.99968 6.50119ZM7.99975 4.50116C7.44661 4.50116 6.99973 4.05428 6.99973 3.50114C6.99973 2.94801 7.44661 2.50113 7.99975 2.50113C8.55288 2.50113 8.99976 2.94801 8.99976 3.50114C8.99976 4.05428 8.55288 4.50116 7.99975 4.50116ZM11.9998 6.50119C11.4467 6.50119 10.9998 6.05431 10.9998 5.50118C10.9998 4.94804 11.4467 4.50116 11.9998 4.50116C12.5529 4.50116 12.9998 4.94804 12.9998 5.50118C12.9998 6.05431 12.5529 6.50119 11.9998 6.50119Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CourseSidebar = forwardRef<
  HTMLDivElement,
  { courseCode: string; unit: string }
>(({ courseCode, unit: theUnit }, ref) => {
  const course = trpc.course.getCourse.useQuery({ courseCode: courseCode! });

  return (
    <aside
      ref={ref}
      className="fixed top-0 left-0 max-w-xs h-screen w-full border-r border-zinc-200 px-4 py-6"
    >
      <h1 className="font-bold mb-2">{course.data?.name}</h1>
      <Input placeholder="Search" />
      <ul className="py-2 text-zinc-500">
        {course.data?.units.map((unit, i) => (
          <li key={unit.id}>
            <Link href={`/courses/${courseCode}/unit-${i + 1}`}>
              <Button
                variant={i + 1 === parseInt(theUnit) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <ChevronIcon
                  className={`mr-2 h-4 w-4 flex-shrink-0 ${
                    i + 1 === parseInt(theUnit) ? "rotate-90" : ""
                  }`}
                />
                <span className="truncate">
                  Unit {i + 1}: {unit.title}
                </span>
              </Button>
            </Link>
            {i + 1 === parseInt(theUnit) && (
              <div>
                {unit.subunits.map((subunit, i) => (
                  <Button
                    key={subunit.id}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    <ChevronIcon className="mr-2 ml-5 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{subunit.title}</span>
                  </Button>
                ))}
              </div>
            )}
          </li>
        ))}
        <li>
          <Button variant="ghost" className="w-full justify-start">
            <PaletteIcon className="mr-2 h-4 w-4" />
            Customize Theme
          </Button>
        </li>
      </ul>
    </aside>
  );
});
