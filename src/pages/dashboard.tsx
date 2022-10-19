import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import Graphics from '../components/Reports/Graphics/graphics';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
  return {
    props: {
      session
    }
  };
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sistock</title>
        <meta name="description" content="" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="container" id="content">
          <h1>{/* `${session?.user?.name}`' */}</h1>
          <Graphics />
        </div>
      </main>
      <footer>
        <div>
          <p />
        </div>
      </footer>
    </div>
  );
}
