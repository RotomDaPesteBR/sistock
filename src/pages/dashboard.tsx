import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Dashboard from '../components/Dashboard/dashboard';
import Navbar from '../components/Navbar/Navbar';
import prisma from '../lib/prisma';

function getUserId(user) {
  return user.id;
}

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

  const id = getUserId(session.user);

  const establishment = await prisma.User.findUnique({
    where: { id },
    select: { establishmentName: true }
  });

  const products = await prisma.Product.findMany({
    where: { userId: id },
    select: {
      id: true,
      name: true,
      brand: true,
      unit: true,
      limit: true,
      stock: true,
      active: true
    },
    orderBy: {
      stock: 'asc'
    }
  });

  if (products) {
    return {
      props: {
        session,
        name: { ...establishment },
        initial: {
          products: { ...products }
        }
      }
    };
  }

  return {
    props: {
      session,
      name: { ...establishment }
    }
  };
}

export default function Home(props) {
  const { name, initial } = props;

  return (
    <div>
      <Head>
        <title>Sistock</title>
        <meta name="description" content="" />
      </Head>
      <header>
        <Navbar name={name} />
      </header>
      <main>
        <div className="container" id="content">
          <Dashboard initial={initial} />
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
