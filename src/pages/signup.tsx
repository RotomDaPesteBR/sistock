import { getSession } from 'next-auth/react';
import Head from 'next/head';
import SignUp from '../components/SignUp/SignUp';

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
    <div>
      <Head>
        <title>Sistock</title>
        <meta name="description" content="Cadastre-se" />
      </Head>

      <main>
        <div className="loginContainer">
          <SignUp />
        </div>
      </main>
    </div>
  );
}
