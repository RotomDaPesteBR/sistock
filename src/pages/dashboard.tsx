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

  const productsExpenses = await prisma.ProductIn.findMany({
    where: { userId: id },
    select: {
      id: true,
      date: true,
      value: true,
      quantity: true,
      productId: true,
      userId: true,
      product: { select: { name: true, brand: true } }
    },
    orderBy: {
      date: 'desc'
    }
  });

  const goods = await prisma.SalesRec.findMany({
    where: { userId: id },
    select: {
      id: true,
      date: true,
      value: true,
      quantity: true,
      prodsaleId: true,
      userId: true,
      prodsale: { select: { name: true } }
    },
    orderBy: {
      date: 'desc'
    }
  });

  const expenses = await prisma.ExpensesRec.findMany({
    where: { userId: id },
    select: {
      id: true,
      date: true,
      value: true,
      expensesId: true,
      userId: true,
      expenses: { select: { name: true } }
    },
    orderBy: {
      date: 'desc'
    }
  });

  if (products) {
    return {
      props: {
        session,
        name: { ...establishment },
        initial: {
          products: { ...products },
          reports: {
            products: JSON.parse(JSON.stringify(productsExpenses)),
            goods: JSON.parse(JSON.stringify(goods)),
            expenses: JSON.parse(JSON.stringify(expenses))
          }
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
