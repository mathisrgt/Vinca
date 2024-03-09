
import { Link, Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/dashboard"><Button className="bg-violet-700 text-white">Lunch App</Button></Link>
    </main>
  );
}
