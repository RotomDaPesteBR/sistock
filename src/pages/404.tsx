import Head from 'next/head';
import NotFound from '../components/NotFound/NotFound';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Página não encontrada</title>
        <meta name="description" content="" />
      </Head>
      <header>
        <div>
          <p />
        </div>
      </header>
      <main>
        <div className="container">
          <NotFound />
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
