import { darken } from 'polished';
import { useState } from 'react';
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

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default function Produto({ product }, ...props) {
  const [info,showInfo] = useState(false);
  function handleClick(){
    let state = info;
    showInfo(!state);
  }
  return (
    <Item {...props}>
      <div>
      <Label onClick={()=>handleClick()}>
        <div>{`${product.name || ''} - ${product.brand || ''}`}</div>
        <div>{`${product.stock || ''}`}</div>
      </Label>
      {info ? (<Info>
        <div>{`Limite: ${product.limit || ''}`}</div>
        <div>{`${product.unit || ''}`}</div>
      </Info>) : null}
      </div>
    </Item>
  );
}
