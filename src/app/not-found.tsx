import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site grid min-h-screen place-items-center">
      <div className="wrap max-w-2xl py-24">
        <p className="kicker">
          <span className="text-signal">404</span> — Not found
        </p>
        <h1 className="display mt-5 text-[clamp(3rem,9vw,6.5rem)]">
          This page <em className="text-signal">doesn&apos;t exist.</em>
        </h1>
        <p className="lede mt-6">It may have moved when the site was reorganised.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-solid">Home</Link>
          <Link href="/projects" className="btn btn-line">See the work</Link>
        </div>
      </div>
    </div>
  );
}
