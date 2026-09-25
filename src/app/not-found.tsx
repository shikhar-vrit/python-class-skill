import Link from "next/link";
import { FileWarning } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-900 text-white">
        <FileWarning size={19} strokeWidth={1.8} />
      </span>
      <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight">
        Day not found
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone-500">
        This route has no slide deck yet. New days appear automatically once
        their folder is pushed and deployed.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
      >
        Back to overview
      </Link>
    </main>
  );
}
