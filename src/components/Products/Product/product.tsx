import { darken } from 'polished';
import styled from 'styled-components';

const Item = styled.div`
  padding: 1rem;
  margin: 0.25rem;
  width: 100%;
  border: 1px solid;
  border-radius: 10px;
  background: ${({ theme }) => darken(0.01, theme.background)};
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default function Produto({ product }, ...props) {
  return (
    <Item {...props}>
      <Label>
        <div>{`${product.name || ''} - ${product.brand || ''}`}</div>
        <div>{`${product.Stock || ''}`}</div>
      </Label>
    </Item>
  );
}
