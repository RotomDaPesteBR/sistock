import axios from 'axios';
import { useSession } from 'next-auth/react';
import { darken } from 'polished';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import Alert from './Alert/alert';

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 90%;
  max-width: 70rem;
  background: ${({ theme }) => darken(0.01, theme.background)};
  height: auto;
  padding: 1.5%;
  flex-direction: column;
  font-size: 1rem;
  @media (max-width: 800px) {
    font-size: 0.75rem;
  }
`;

const Title = styled.h1`
  padding-bottom: 2rem;
  @media (max-width: 800px) {
    padding-bottom: 1rem;
  }
`;

const AlertsContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 20rem;
  overflow: auto;
`;

export default function Alerts() {
  const [alertsProducts, setAlertsProducts] = useState('');

  const session = useSession();

  async function getProducts(user) {
    const promise = await axios
      .post('api/db/products', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise?.status !== 500) {
      const products = _.filter(promise, p => {
        console.log(p.stock < p.limit);
        return p.stock < p.limit;
      });
      console.log(products);
      const result = products.map(product => (
        <Alert key={product.id} product={product} />
      ));
      setAlertsProducts(result);
    }
  }

  useEffect(() => {
    getProducts(session.data.user);
  }, []);

  return (
    <Container>
      <Title>Alertas</Title>
      <AlertsContainer>{alertsProducts}</AlertsContainer>
    </Container>
  );
}
