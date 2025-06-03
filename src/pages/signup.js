import Signup from "@/components/Signup/Signup";
import Head from "next/head";


function SignupPage() {
  return (
    <>
      <Head>
        <title>Signup Page</title>
        <meta name="description" content="Signup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
      </Head>
      <Signup />
    </>
  )
}

export default SignupPage;
