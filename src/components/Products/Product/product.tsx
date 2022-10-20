import axios from 'axios';
import { useRouter } from 'next/router';
import { darken, lighten } from 'polished';
import { useState } from 'react';
import styled from 'styled-components';

const Item = styled.div`
  margin: 0.25rem;
  width: 100%;
  border: 1px solid;
  border-radius: 10px;
  border-color: #999999;
  background: ${({ theme }) => darken(0.01, theme.background)};
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  flex-direction: column;
`;

const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  @media (max-width: 500px) {
    justify-content: center;
  }
`; 

const Editar = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  margin-right: 0.25rem;
  color: ${({ theme }) => theme.text};
`
const Excluir = styled.button`
  width: 2.5rem;
  height: 2.5rem; 
  background: red;
  border: none;
  border-radius: 5px;
  margin-left: 0.25rem;
  color: ${({ theme }) => theme.text};
`

const Cancelar = styled.button`
  height: 2.5rem;
  width: 7.5rem;
  background: ${({ theme }) => lighten(0.2,theme.textDark)};
  border: none;
  border-radius: 5px;
  margin-right: 0.25rem;
  color: ${({ theme }) => theme.text};
  @media (max-width: 500px) {
    margin-right: 0;
    margin-bottom: 0.25rem;
    width: 100%;
  }
`

const Salvar = styled.button`
  height: 2.5rem;
  width: 7.5rem;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  margin-left: 0.25rem;
  color: ${({ theme }) => theme.text};
  @media (max-width: 500px) {
    margin-left: 0;
    margin-top: 0.25rem;
    width: 100%;
  }
`

export default function Produto({ product }, ...props) {
  const [info,showInfo] = useState(false);
  const [selected,selectedItem] = useState('');

  const router = useRouter()
  
  function handleClick(){
    let state = info;
    showInfo(!state);
    if(!state){
      selectedItem('selected-item');
    }else{
      selectedItem('');
    }
    const activeItems = document.getElementById('SafeArea');
    if(!state){
      activeItems.className = `${parseInt(activeItems.className) + 1}`;
      if (parseInt(activeItems.className) < 5) {
        activeItems.style.marginTop = `${5 * parseInt(activeItems.className)}rem`;
      } else {
        activeItems.style.marginTop = `${10 * parseInt(activeItems.className) - 15}rem`;
      }
    }else{
      if(parseInt(activeItems.className) > 0){
        activeItems.className = `${parseInt(activeItems.className) - 1}`;
      }
      if (parseInt(activeItems.className) < 5) {
        activeItems.style.marginTop = `${5 * parseInt(activeItems.className)}rem`;
      } else {
        activeItems.style.marginTop = `${10 * parseInt(activeItems.className) - 15}rem`;
      }
    }
  }

  async function deleteProduct(id) {
    const promise = await axios
      .post('api/db/product/delete', { data: id })
      .then(response => response.data)
      .catch(error => error.response);
      router.reload();
  }

  return (
    <Item {...props}>
      <div>
      <Label className={selected} onClick={()=>handleClick()}>
        <div>{`${product.name || ''} - ${product.brand || ''}`}</div>
        <div>{`${product.stock || ''}`}</div>
      </Label>
      {info ? (
        <Info>
          <InfoLine>
            <div />
            <div>
              <Editar onClick={() => console.log(product.id)}><img className='pencil' src='/pencil.svg' /></Editar>
              <Excluir onClick={() => deleteProduct(product.id)}><img className='trash' src='/trash.svg' /></Excluir>
            </div>
          </InfoLine>
          <br />
          <InfoLine>
            <div>{`Limite: ${product.limit || ''}`}</div>
            <div>{`${product.unit || ''}`}</div>
          </InfoLine>
          <br />
          <InfoLine>
            <div />
            <div>
            <Cancelar>Cancelar</Cancelar>
            <Salvar>Salvar</Salvar>
            </div>
          </InfoLine>
        </Info>

      ) : null}
      </div>
    </Item>
  );
}