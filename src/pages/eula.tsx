import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sistock</title>
        <meta name="description" content="" />
      </Head>
      <header>
        <h1>Eula</h1>
      </header>
      <main>
        <div className="container">
          <h1>{/* `${session?.user?.name}`' */}</h1>
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
