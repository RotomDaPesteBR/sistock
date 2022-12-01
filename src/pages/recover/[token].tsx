import Head from 'next/head';
import Recover from '../../components/Recover/recover';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sistock</title>
        <meta name="description" content="" />
      </Head>
      <header>
        <p />
      </header>
      <main>
        <div className="loginContainer">
          <Recover />
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
