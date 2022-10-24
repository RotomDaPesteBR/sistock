import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Historic from './Historic/historic';

const Lista = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-width: 70rem;
  height: auto;
  padding: 1rem;
  flex-direction: column;
  font-size: 1rem;
  @media (max-width: 800px) {
    font-size: 0.75rem;
  }
`;

const ModalScreen = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  top: 0;
  bottom: 0;
  background: #00000055;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 90%;
  height: 40%;
  max-width: 30rem;
  border-radius: 10px;
  @media (max-width: 500px) {
    height: 50%;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const Title = styled.h1`
  padding: 1rem;
  padding-top: 0;
  font-size: 2.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: #999999;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

const Button = styled.button`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: #999999;
`;

const HeaderLista = styled.div`
  width: 90%;
  border: 1px solid;
  border-color: #999999;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const HeaderItem = styled.div`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default function Historicos(props) {
  const [historicProductIn, setHistoricProductIn] = useState('');
  const [historicProductOut, setHistoricProductOut] = useState('');
  const [historico, toggleHistorico] = useState(false);
  const [withdraw, showWithdraw] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [quantity, setQuantity] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [motivo, setMotivo] = useState('');

  const session = useSession();

  async function getHistoric(user) {
    const promiseProductIn = await axios
      .post('api/db/historic/productIn', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    const promiseProductOut = await axios
      .post('api/db/historic/productOut', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    if (promiseProductIn?.status !== 500) {
      let stripe = false;
      const resultProductIn = promiseProductIn.map(historic => {
        stripe = !stripe;
        return (
          <Historic
            key={historic.id}
            historic={historic}
            stripe={stripe}
            type="in"
          />
        );
      });
      setHistoricProductIn(resultProductIn);
    }
    if (promiseProductOut?.status !== 500) {
      let stripe = false;
      const resultProductOut = promiseProductOut.map(historic => {
        stripe = !stripe;
        return (
          <Historic
            key={historic.id}
            historic={historic}
            stripe={stripe}
            type="out"
          />
        );
      });
      setHistoricProductOut(resultProductOut);
    }
  }

  function handleClick(e) {
    toggleHistorico(e);
  }

  function handleClickScreen() {
    showInsert(false);
    showWithdraw(false);
  }

  function handleClickModal(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    getHistoric(session.data.user);
  }, []);

  return (
    <Lista {...props}>
      <div id="SafeArea">
        <h1>Histórico:</h1>
      </div>
      <HeaderLista>
        <HeaderItem
          className={!historico ? 'selected' : ''}
          onClick={() => handleClick(false)}
          style={{ cursor: 'pointer' }}
        >
          Entrada
        </HeaderItem>
        <HeaderItem
          className={historico ? 'selected' : ''}
          onClick={() => handleClick(true)}
          style={{ cursor: 'pointer' }}
        >
          Saida
        </HeaderItem>
      </HeaderLista>
      <br />
      {!historico ? (
        <>
          <HeaderLista>
            <HeaderItem>Quantidade</HeaderItem>
            <HeaderItem>Data</HeaderItem>
            <HeaderItem>Produto</HeaderItem>
            <HeaderItem>Valor</HeaderItem>
          </HeaderLista>
          {historicProductIn}
        </>
      ) : null}
      {historico ? (
        <>
          <HeaderLista>
            <HeaderItem>Quantidade</HeaderItem>
            <HeaderItem>Data</HeaderItem>
            <HeaderItem>Produto</HeaderItem>
            <HeaderItem>Motivo</HeaderItem>
          </HeaderLista>
          {historicProductOut}
        </>
      ) : null}
    </Lista>
  );
}
