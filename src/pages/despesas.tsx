import { getSession } from 'next-auth/react';
import Head from 'next/head';
import _ from 'lodash';
import Navbar from '../components/Navbar/Navbar';
import Despesas from '../components/Expenses/expenses';
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

  const expenses = await prisma.Expenses.findMany({
    where: { userId: id },
    select: {
      id: true,
      name: true,
      active: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  if (expenses) {
    return {
      props: {
        session,
        name: { ...establishment },
        expenses: { ...expenses }
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
  const { expenses, name } = props;

  const actives = _.filter(expenses, ['active', true]);

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
        <div className="container" id="products-container">
          <Despesas initial={actives} />
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
