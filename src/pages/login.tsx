import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Login from '../components/Login/Login';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
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
    <div className="loginContainer">
      <Head>
        <title>Sistock</title>
        <meta name="description" content="Entre na sua conta" />
      </Head>

      <main>
        <div className="container">
          <Login />
        </div>
      </main>
    </div>
  );
}
