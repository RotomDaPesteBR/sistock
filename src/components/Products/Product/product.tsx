/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { useRouter } from 'next/router';
import { darken, lighten } from 'polished';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Item = styled.div`
  margin: 0.25rem;
  width: 90%;
  border: 1px solid;
  border-radius: 10px;
  border-color: #999999;
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

const Disponíveis = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-align: center;
  line-height: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Adicionar = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 5px;
  margin-right: 0.25rem;
  color: ${({ theme }) => theme.text};
`;

const Remover = styled.button`
  width: 2rem;
  height: 2rem;
  font-size: 1.25rem;
  background: red;
  border: none;
  border-radius: 5px;
  margin-left: 0.25rem;
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
  width: 22.5%;
  border: 1px solid;
  border-color: #999999;
  border-radius: 10px;
  @media (max-width: 500px) {
    width: calc(50% - 0.25rem);
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
`

const Button = styled.button`
  padding: 1rem;
  width: 100%;
  max-width: 35rem;
  margin: 0.25rem;
  border-radius: 10px;
  border: 1px solid;
  border-color: #999999;
`;

export default function Produto(
  { product, insertModal, withdrawModal, getProducts },
  ...props
) {
  const [info, showInfo] = useState(false);
  const [selected, selectedItem] = useState('');
  const [edit, showEdit] = useState(false);
  const [disponibilidade, setDisponibilidade] = useState('');
  const [modalDelete, showModalDelete] = useState(false);

  const [editNome, setEditNome] = useState('');
  const [editMarca, setEditMarca] = useState('');
  const [editUnidade, setEditUnidade] = useState('');
  const [editLimite, setEditLimite] = useState('');

  const router = useRouter();

  function handleClick() {
    const state = info;
    showInfo(!state);
    if (!state) {
      selectedItem('selected-item');
    } else {
      selectedItem('');
    }
    const SafeArea = document.getElementById('SafeArea');
    let activeItems = parseInt(SafeArea.className, 10);
    if (!state) {
      SafeArea.className = `${activeItems + 1}`;
      activeItems += 1;
      SafeArea.style.marginTop = `${4.6875 * activeItems - 4.6875}rem`;
    } else {
      if (activeItems > 0) {
        SafeArea.className = `${activeItems - 1}`;
        activeItems -= 1;
      }
      if (activeItems === 0) {
        SafeArea.style.marginTop = `${0}rem`;
      } else {
        SafeArea.style.marginTop = `${4.6875 * activeItems - 4.6875}rem`;
      }
    }
  }

  function handleEdit() {
    showEdit(!edit);
    setEditNome(product.name);
    setEditMarca(product.brand);
    setEditUnidade(product.unit);
    setEditLimite(product.limit);
  }

  async function handleSave() {
    const dados = {
      produto: product.id,
      nome: editNome,
      marca: editMarca,
      unidade: editUnidade,
      limite: parseInt(editLimite, 10)
    };

    // eslint-disable-next-line no-unused-vars
    const promise = await axios
      .post('api/db/product/update', { data: dados })
      .then(response => response.data)
      .catch(error => error.response);
      getProducts();
  }

  async function deleteProduct(id) {
    // eslint-disable-next-line no-unused-vars
    const promise = await axios
      .post('api/db/product/delete', { data: id })
      .then(response => response.data)
      .catch(error => error.response);
    getProducts();
  }

  function disponivel() {
    if (product.stock === 0) {
      setDisponibilidade('indisponível');
    } else if (product.stock < product.limit) {
      setDisponibilidade('falta');
    } else {
      setDisponibilidade('disponivel');
    }
  }

  function handleDelete() {
    showModalDelete(true);
  }

  function handleAdicionar(e) {
    e.stopPropagation();
    insertModal();
  }

  function handleRemover(e) {
    e.stopPropagation();
    withdrawModal();
  }

  function handleClickScreen() {
    showModalDelete(false);
  }

  function handleClickModal(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    disponivel();
  }, []);

  return (
    <Item {...props}>
      {modalDelete ? 
        <ModalScreen onClick={() => handleClickScreen()}>
          <Modal onClick={e => handleClickModal(e)}>
            <Form>
              <Title>Tem certeza que deseja deletar o produto?</Title>
              <ButtonsDelete>
                <Button type="button" onClick={()=>showModalDelete(false)}>Cancelar</Button>
                <Button type="button" onClick={()=>deleteProduct(product.id)}>Deletar</Button>
              </ButtonsDelete>
            </Form>
          </Modal>
        </ModalScreen> 
      : null}
      <div>
        <Label className={selected} onClick={() => handleClick()}>
          <div>{`${product.name || ''} ${product.brand || ''} - ${
            product.unit || ''
          }`}</div>
          <div id="product-control" className={disponibilidade}>
            <Disponíveis>{`${
              product.stock ?? (product.stock || 0)
            } Disponíveis`}</Disponíveis>
            <Buttons>
              <Adicionar onClick={e => handleAdicionar(e)}>+</Adicionar>
              <Remover onClick={e => handleRemover(e)}>-</Remover>
            </Buttons>
          </div>
        </Label>
        {info ? (
          <div>
            {!edit ? (
              <Info>
                <InfoLine>
                  <div style={{ lineHeight: '2rem' }}>{`Limite: ${
                    product.limit || ''
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
                <InfoLine id="edit-line">
                  <InfoEdit
                    id="edit-top-left"
                    type="text"
                    value={editNome}
                    onChange={e => setEditNome(e.target.value)}
                  />
                  <InfoEdit
                    id="edit-top-right"
                    type="text"
                    value={editMarca}
                    onChange={e => setEditMarca(e.target.value)}
                  />
                  <InfoEdit
                    id="edit-bottom-left"
                    type="text"
                    value={editUnidade}
                    onChange={e => setEditUnidade(e.target.value)}
                  />
                  <InfoEdit
                    id="edit-bottom-right"
                    type="number"
                    value={editLimite}
                    onChange={e => setEditLimite(e.target.value)}
                  />
                </InfoLine>
                <br />
                <InfoLine>
                  <div />
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
