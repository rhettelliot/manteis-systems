import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black">
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#0057FF]">
        404 // NODE_NOT_FOUND
      </p>
      <h1 className="font-display text-4xl md:text-6xl mt-6 mb-4 text-white">
        Route does not exist
      </h1>
      <p className="text-sm mb-12 text-neutral-500">
        This path is outside the sovereign node&apos;s topology.
      </p>
      <Link
        href="/"
        className="font-mono text-[10px] tracking-[0.25em] uppercase px-8 py-4 border border-[#0057FF] text-[#0057FF] transition-colors duration-200 hover:bg-[#0057FF] hover:text-black"
      >
        Return to base
      </Link>
    </main>
  );
}
