import { CourseSidebar } from "@/components/course-sidebar";
import { useRef } from "react";
import { H3, Muted } from "../../components/ui/typography";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu";

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
        <div className="flex gap-2 mt-4">
          <Button variant="outline">1-by-1 view</Button>
          <Button variant="secondary">New card</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Test me</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Section 2.A</DropdownMenuItem>
              <DropdownMenuItem>Section 2.B</DropdownMenuItem>
              <DropdownMenuItem>Section 2.C</DropdownMenuItem>
              <DropdownMenuItem>Everything</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </main>
    </div>
  );
}

export default CoursePage;
