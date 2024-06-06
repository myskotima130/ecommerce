import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExpiredPage() {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-4xl font-bold">Download Expired</h1>
      <Button asChild size="lg">
        <Link href="/orders">Get New Link</Link>
      </Button>
    </div>
  );
}
