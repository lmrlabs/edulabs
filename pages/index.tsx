import { MainNavigationBar } from "@/components/main-navbar";
import { H1 } from "@/components/ui/typography";

export default function Home() {
  return (
    <div>
      <MainNavigationBar />
      <main className="flex px-16 py-12">
        <H1>AP Test Prep</H1>
      </main>
    </div>
  );
}
