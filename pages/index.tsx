import { Layout, Text, Page } from "@vercel/examples-ui";

export default function Home({ data }: { data: any }) {
  return (
    <Page>
      <section className="flex flex-col gap-6">
        <Text variant="h1">1Hive Cors Service</Text>
      </section>
      <section className="grid gap-6 mt-10 pt-10 border-t border-gray-300">
        <div className="flex flex-col gap-12"></div>
      </section>
    </Page>
  );
}

Home.Layout = Layout;
