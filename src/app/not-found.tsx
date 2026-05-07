import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[200px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent-light/[0.03] rounded-full blur-[150px]" />

      <div className="text-center px-6 relative z-10">
        {/* 404 number */}
        <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none text-gradient opacity-20">
          404
        </h1>

        {/* Message */}
        <div className="-mt-8 md:-mt-12">
          <span className="text-xs font-mono text-accent tracking-[0.3em] uppercase">
            {"// Page Not Found"}
          </span>
          <h2 className="text-2xl md:text-4xl font-semibold mt-4 text-white">
            Lost in the void
          </h2>
          <p className="text-sm text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Decorative line */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-8 mb-8" />

        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-accent-light text-primary text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
