import { Urbanist } from 'next/font/google';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

 function MyApp({ Component, pageProps }) {
  return (
    <main className={urbanist.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;