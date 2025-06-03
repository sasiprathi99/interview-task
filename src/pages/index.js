import Home from "@/components/Home/Home";
import Head from "next/head";

function HomePage() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Create, edit, and manage notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <Home />
    </>
  )
}

export default HomePage;
