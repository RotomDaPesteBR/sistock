import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 55px;
  @media (max-width: 800px) {
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const Button = styled.div`
  display: flex;
  height: 22rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 2rem;
  cursor: pointer;
  margin: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 800px) {
    justify-content: start;
  }
`;

const Icone = styled.img`
  height: 80%;
  padding: 2rem;
`;

const Titulo = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textDark};
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
  left: 0;
  right: 0;
  background: #00000055;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 90%;
  height: 40%;
  max-width: 40rem;
  min-height: 25rem;
  border-radius: 10px;
`;

const ProductModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  width: 90%;
  height: 60%;
  max-width: 40rem;
  min-height: 35rem;
  border-radius: 10px;
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
  text-align: center;
`;

const Input = styled.input`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

const ModalButton = styled.button`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const ToastContent = styled.div`
  text-align: center;
`;

export default function Cadastrar() {
  const [modalDespesas, showModalDespesas] = useState(false);
  const [modalProdutos, showModalProdutos] = useState(false);
  const [modalMercadorias, showModalMercadorias] = useState(false);

  const [nomeProduto, setNomeProduto] = useState('');
  const [marcaProduto, setMarcaProduto] = useState('');
  const [unidadeProduto, setUnidade] = useState('');
  const [limiteProduto, setLimiteProduto] = useState(undefined);

  const [nomeMercadoria, setNomeMercadoria] = useState('');

  const [nomeDespesa, setNomeDespesa] = useState('');

  const session = useSession();

  async function registerProduct(data, user) {
    const promise = await axios
      .post('api/db/register/products', { data: { ...data, user: user.id } })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise) {
      toast(<ToastContent>Cadastrado com sucesso</ToastContent>);
      setNomeProduto('');
      setMarcaProduto('');
      setUnidade('');
      setLimiteProduto(undefined);
      showModalProdutos(false);
    }
  }

  async function registerGood(data, user) {
    const promise = await axios
      .post('api/db/register/goods', { data: { ...data, user: user.id } })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise) {
      toast(<ToastContent>Cadastrado com sucesso</ToastContent>);
      setNomeMercadoria('');
      showModalMercadorias(false);
    }
  }

  async function registerExpense(data, user) {
    const promise = await axios
      .post('api/db/register/expenses', { data: { ...data, user: user.id } })
      .then(response => response.data)
      .catch(error => error.response);
    if (promise) {
      toast(<ToastContent>Cadastrado com sucesso</ToastContent>);
      setNomeDespesa('');
      showModalDespesas(false);
    }
  }

  function cadastrarProduto() {
    if (
      nomeProduto !== '' &&
      marcaProduto !== '' &&
      unidadeProduto !== '' &&
      limiteProduto !== ''
    ) {
      const dados = {
        nome: nomeProduto,
        marca: marcaProduto,
        unidade: unidadeProduto,
        limite: parseInt(limiteProduto, 10)
      };
      registerProduct(dados, session.data.user);
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
    }
  }

  function cadastrarMercadorias() {
    if (nomeMercadoria !== '') {
      const dados = {
        nome: nomeMercadoria
      };
      registerGood(dados, session.data.user);
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
    }
  }

  function cadastrarDespesa() {
    if (nomeDespesa !== '') {
      const dados = {
        nome: nomeDespesa
      };
      registerExpense(dados, session.data.user);
    } else {
      toast(<ToastContent>Preencha todos os campos</ToastContent>);
    }
  }

  function handleClickScreen() {
    showModalDespesas(false);
    showModalProdutos(false);
    showModalMercadorias(false);
  }

  function handleClickModal(e) {
    e.stopPropagation();
  }

  function handleShowProducts() {
    showModalProdutos(true);
    setNomeProduto('');
    setMarcaProduto('');
    setUnidade('');
    setLimiteProduto(undefined);
  }

  function handleShowGoods() {
    showModalMercadorias(true);
    setNomeMercadoria('');
  }

  function handleShowExpenses() {
    showModalDespesas(true);
    setNomeDespesa('');
  }

  return (
    <Buttons>
      <Toaster />
      {modalProdutos ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <ProductModal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Cadastrar Produtos</Title>
              <Input
                type="text"
                placeholder="Nome"
                value={nomeProduto}
                onChange={e => setNomeProduto(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Marca"
                value={marcaProduto}
                onChange={e => setMarcaProduto(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Unidade de medida"
                title="Unidade de medida do produto (ex.: 5Kg)"
                value={unidadeProduto}
                onChange={e => setUnidade(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Limite mínimo"
                title="Limite mínimo para o produto"
                value={limiteProduto === undefined ? '' : limiteProduto}
                onChange={e => setLimiteProduto(e.target.value)}
              />
              <ModalButtons>
                <ModalButton
                  type="button"
                  id="cancelar"
                  onClick={() => showModalProdutos(false)}
                >
                  Cancelar
                </ModalButton>
                <ModalButton
                  type="button"
                  id="confirmar"
                  onClick={() => cadastrarProduto()}
                >
                  Adicionar
                </ModalButton>
              </ModalButtons>
            </Form>
          </ProductModal>
        </ModalScreen>
      ) : null}
      {modalMercadorias ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Cadastrar Mercadorias</Title>
              <Input
                type="text"
                placeholder="Nome"
                value={nomeMercadoria}
                onChange={e => setNomeMercadoria(e.target.value)}
              />
              <ModalButtons>
                <ModalButton
                  type="button"
                  id="cancelar"
                  onClick={() => showModalMercadorias(false)}
                >
                  Cancelar
                </ModalButton>
                <ModalButton
                  type="button"
                  id="confirmar"
                  onClick={() => cadastrarMercadorias()}
                >
                  Adicionar
                </ModalButton>
              </ModalButtons>
            </Form>
          </Modal>
        </ModalScreen>
      ) : null}
      {modalDespesas ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Cadastrar Despesas</Title>
              <Input
                type="text"
                placeholder="Nome"
                value={nomeDespesa}
                onChange={e => setNomeDespesa(e.target.value)}
              />
              <ModalButtons>
                <ModalButton
                  type="button"
                  id="cancelar"
                  onClick={() => showModalDespesas(false)}
                >
                  Cancelar
                </ModalButton>
                <ModalButton
                  type="button"
                  id="confirmar"
                  onClick={() => cadastrarDespesa()}
                >
                  Adicionar
                </ModalButton>
              </ModalButtons>
            </Form>
          </Modal>
        </ModalScreen>
      ) : null}
      <Button onClick={() => handleShowProducts()}>
        <Icone src="/produtos.png" alt="" draggable={false} />
        <Titulo>Produtos</Titulo>
      </Button>
      <Button onClick={() => handleShowGoods()}>
        <Icone src="/mercadorias.png" alt="" draggable={false} />
        <Titulo>Mercadorias</Titulo>
      </Button>
      <Button onClick={() => handleShowExpenses()}>
        <Icone src="/despesas.png" alt="" draggable={false} />
        <Titulo>Despesas</Titulo>
      </Button>
    </Buttons>
  );
}
