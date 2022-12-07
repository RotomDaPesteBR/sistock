import _ from 'lodash';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Navbar from '../components/Navbar/Navbar';
import Produtos from '../components/Products/products';
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
        products: { ...products }
      }
    };
  }

  return {
    props: {
      session
    }
  };
}

export default function Home(props) {
  const { products } = props;

  const actives = _.filter(products, ['active', true]);

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
        <div className="container" id="products-container">
          <Produtos initial={actives} />
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
