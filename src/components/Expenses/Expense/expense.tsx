/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { darken, lighten } from 'polished';
import { useState } from 'react';
import styled from 'styled-components';

const Item = styled.div`
  margin: 0.25rem;
  width: 90%;
  border: 1px solid;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.border};
  background: ${({ theme }) => darken(0.01, theme.background)};
`;

const Label = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Adicionar = styled.button`
  width: 8rem;
  height: 2rem;
  font-size: 1.25rem;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
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
`;

const Editar = styled.button`
  line-height: 0.1rem;
  width: 2rem;
  height: 2rem;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  margin-right: 0.25rem;
  color: ${({ theme }) => theme.text};
`;

const Excluir = styled.button`
  line-height: 0.1rem;
  width: 2rem;
  height: 2rem;
  background: red;
  border: none;
  border-radius: 5px;
  margin-left: 0.25rem;
  color: ${({ theme }) => theme.text};
`;

const InfoEdit = styled.input`
  padding: 0.5rem;
  width: 30%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.border};
  border-radius: 10px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const EditButtons = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Cancelar = styled.button`
  height: 2.5rem;
  width: 7.5rem;
  background: ${({ theme }) => lighten(0.2, theme.textDark)};
  border: none;
  border-radius: 5px;
  margin-right: 0.25rem;
  color: ${({ theme }) => theme.text};
  @media (max-width: 500px) {
    width: 50%;
  }
`;

const Salvar = styled.button`
  height: 2.5rem;
  width: 7.5rem;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  margin-left: 0.25rem;
  color: ${({ theme }) => theme.text};
  @media (max-width: 500px) {
    width: 50%;
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
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000055;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  width: 90%;
  height: 40%;
  max-width: 30rem;
  border-radius: 10px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
`;

const Title = styled.h1`
  padding: 1rem;
  width: 90%;
  text-align: center;
  font-size: 2rem;
  padding-top: 0;
`;

const ButtonsDelete = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
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
  border-color: ${({ theme }) => theme.border};
`;

export default function Despesa(props) {
  const [info, showInfo] = useState(false);
  const [selected, selectedItem] = useState('');
  const [edit, showEdit] = useState(false);
  const [modalDelete, showModalDelete] = useState(false);

  const [editNome, setEditNome] = useState('');

  const { expense, getExpenses, insertModal } = props;

  function handleClick() {
    const state = info;
    showInfo(!state);
    if (!state) {
      selectedItem('selected-item');
    } else {
      selectedItem('');
    }
  }

  function handleEdit() {
    showEdit(!edit);
    setEditNome(expense.name);
  }

  async function handleSave() {
    const dados = {
      produto: expense.id,
      nome: editNome
    };

    // eslint-disable-next-line no-unused-vars
    const promise = await axios
      .post('api/db/expense/update', { data: dados })
      .then(response => response.data)
      .catch(error => error.response);
    getExpenses();
  }

  async function deleteExpense(id) {
    // eslint-disable-next-line no-unused-vars
    const promise = await axios
      .post('api/db/expense/delete', { data: id })
      .then(response => response.data)
      .catch(error => error.response);
    getExpenses();
  }

  function handleDelete() {
    showModalDelete(true);
  }

  function handleAdicionar(e) {
    e.stopPropagation();
    insertModal();
  }

  function handleClickScreen() {
    showModalDelete(false);
  }

  function handleClickModal(e) {
    e.stopPropagation();
  }

  return (
    <Item>
      {modalDelete ? (
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Tem certeza que deseja deletar o produto?</Title>
              <ButtonsDelete>
                <Button type="button" onClick={() => showModalDelete(false)}>
                  Cancelar
                </Button>
                <Button type="button" onClick={() => deleteExpense(expense.id)}>
                  Deletar
                </Button>
              </ButtonsDelete>
            </Form>
          </Modal>
        </ModalScreen>
      ) : null}
      <div>
        <Label className={selected} onClick={() => handleClick()}>
          <div>{`${expense.name || ''} ${expense.brand || ''}`}</div>
          <Buttons>
            <Adicionar onClick={e => handleAdicionar(e)}>Inserir</Adicionar>
          </Buttons>
        </Label>
        {info ? (
          <div>
            {!edit ? (
              <Info>
                <InfoLine>
                  <div style={{ lineHeight: '2rem' }}>{`${
                    expense.unit || ''
                  }`}</div>
                  <div>
                    <Editar onClick={() => handleEdit()}>
                      <img className="pencil" src="/pencil.svg" alt="" />
                    </Editar>
                    <Excluir onClick={() => handleDelete()}>
                      <img className="trash" src="/trash.svg" alt="" />
                    </Excluir>
                  </div>
                </InfoLine>
              </Info>
            ) : null}
            {edit ? (
              <Info>
                <InfoLine>
                  <div id="expense-edit-line">
                    {`Nome: `}
                    <InfoEdit
                      id="edit-top-left"
                      type="text"
                      value={editNome}
                      onChange={e => setEditNome(e.target.value)}
                    />
                  </div>
                  <EditButtons>
                    <Cancelar onClick={() => handleEdit()}>Cancelar</Cancelar>
                    <Salvar onClick={() => handleSave()}>Salvar</Salvar>
                  </EditButtons>
                </InfoLine>
              </Info>
            ) : null}
          </div>
        ) : null}
      </div>
    </Item>
  );
}
