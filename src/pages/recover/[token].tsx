import Head from 'next/head';
import Recover from '../../components/Recover/recover';
import prisma from '../../lib/prisma';

export async function getServerSideProps(context) {
  const { token } = context.query;

  const recoverToken = await prisma.RecoverToken.findUnique({
    where: { token },
    select: { token: true, expires: true, active: true, userId: true }
  });
  if (recoverToken) {
    const date = new Date();
    const expireDate = new Date(recoverToken.expires);

    const diff = (expireDate.getTime() - date.getTime()) / 36e5;

    const valid = diff <= 2;

    if (!valid || !recoverToken.active) {
      return {
        redirect: {
          destination: '/recover',
          permanent: false
        }
      };
    }
  } else {
    return {
      redirect: {
        destination: '/recover',
        permanent: false
      }
    };
  }
  return {
    props: {}
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
