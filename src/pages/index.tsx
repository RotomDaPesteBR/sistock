import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const a = true;
  if (a) {
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
        <meta
          name="description"
          content="Sistema de gerenciamento de estoque"
        />
      </Head>
      <header>
        <h1>Sistock</h1>
      </header>
      <main>
        <div className="container">
          <h1>{/* `${session?.user?.name}`' */}</h1>
          <Link href="/login">Entrar</Link>
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
