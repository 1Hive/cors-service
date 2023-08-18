// import { Layout, Text, Page } from "@vercel/examples-ui";

import Link from "next/link";

export default function Home({ data }: { data: any }) {
  return (
    <div>
      <section className="flex flex-col gap-6">
        <h1>1Hive Cors Service</h1>
        <Link href="/api">Check version</Link>
      </section>
      <section className="grid gap-6 mt-10 pt-10 border-t border-gray-300">
        <div className="flex flex-col gap-12"></div>
      </section>
    </div>
  );
}

// Home.Layout = Layout;
