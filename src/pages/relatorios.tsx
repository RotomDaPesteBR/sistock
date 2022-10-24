import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Notifier from '../components/Notifier/notifier';

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
  const [notifier,showNotifier] = useState(false);

  function handleClick() {
    showNotifier(!notifier);
  }

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
        <div className="container">
          <button type="button" onClick={() => handleClick()}>Notifier</button>
          <Notifier text="Produto Adicionado" delay={3000} visibility={notifier} />
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
