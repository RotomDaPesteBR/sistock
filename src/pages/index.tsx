import Head from 'next/head';
import Login from '../components/Login/Login';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sistock</title>
        <meta name="description" content="Generated by create next app" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <header>
        <div>
          <p />
        </div>
      </header>
      <main>
        <div className="container">
          <div className="login" id="login">
            <Login />
          </div>
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
