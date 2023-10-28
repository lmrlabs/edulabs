import { CourseSidebar } from "@/components/course-sidebar";
import { ChevronDown, Pencil, Plus } from "lucide-react";
import { useRef } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { H3, Muted } from "../../components/ui/typography";
import CourseFlashcard from "../../components/course-flashcard";
import CourseProgress from "../../components/course-progress";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";

function CoursePage() {
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
        <H3>Unit 2. Differentiation I</H3>
        <Muted>Equiv. AP Unit II: Definition and fundamental properties</Muted>
        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline">1-by-1 view</Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New card
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button variant="secondary">Show stats</Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={8}>
              <CourseProgress />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Test me
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8}>
              <DropdownMenuItem>Section 2.A</DropdownMenuItem>
              <DropdownMenuItem>Section 2.B</DropdownMenuItem>
              <DropdownMenuItem>Section 2.C</DropdownMenuItem>
              <DropdownMenuItem>Everything</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4">
          <CourseFlashcard />
        </div>
      </main>
    </div>
  );
}

export default CoursePage;
