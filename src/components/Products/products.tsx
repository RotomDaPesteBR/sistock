import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Produto from './Product/product';

const Lista = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 70rem;
  height: auto;
  padding: 5%;
  flex-direction: column;
  font-size: 1rem;
  @media (max-width: 800px) {
    font-size: 0.75rem;
  }
`;

export default function Produtos(props) {
  const [products, setProducts] = useState('');
  const session = useSession();

  async function getProducts(user) {
    const promise = await axios
      .post('api/db/products', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    const result = promise.map(product => (
      <Produto key={product.id} product={product} />
    ));
    setProducts(result);
  }

  useEffect(() => {
    getProducts(session.data.user);
  }, []);

  return <Lista {...props}>{products}</Lista>;
}
