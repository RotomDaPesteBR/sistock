import Link from 'next/link';
import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  width: 100%;
  background: white;
  font-size: 1rem;
  border-radius: 10px;
  padding: 1rem;
  flex-direction: row;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
`;

const Label = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 800px) {
    font-size: 0.75rem;
  }
`;

const Stock = styled.div`
  color: red;
`;

export default function Alert({ product }) {
  return (
    <Link href="/produtos">
      <Item>
        <Label>
          <div>{`${product.name || ''} ${product.brand || ''}`}</div>
          <Stock>{`${product.stock || 0} Disponíveis`}</Stock>
        </Label>
      </Item>
    </Link>
  );
}
