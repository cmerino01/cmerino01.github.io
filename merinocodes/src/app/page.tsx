import Nav from "@/components/nav";
import { Terminal } from "@/components/terminal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Nav />
      <Terminal />
    </main>
  );
}
