import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-[60vh] w-full bg-light flex items-center justify-center px-5">
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-bold text-gray uppercase tracking-wide">404</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-dark">
          Page Not Found
        </h1>
        <p className="mt-3 text-base text-gray max-w-sm">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded px-6 py-2.5 bg-accent text-dark font-semibold hover:brightness-95 transition"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}
