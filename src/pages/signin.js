import Signin from "@/components/Signin/signin";
import Head from "next/head";

function SiginPage() {
  return (
    <>
      <Head>
        <title>Signin Page</title>
        <meta name="description" content="Signin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <Signin />
    </>
  )
}

export default SiginPage;
