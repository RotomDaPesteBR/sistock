import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Screen = styled.div`
  background: #00000055;
  position: absolute;
  height: 100vh;
  width: 100%;
  display: none;
  z-index: 50;
`;

const Bar = styled.div`
  background: #ffffff;
  min-height: 10vh;
  height: auto;
  position: relative;
  width: 50vh;
  max-width: 20rem;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Group = styled.div`
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${({ theme }) => theme.textDark};
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;

const Profile = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  padding: 2rem;
  margin-top: -2rem;
  border-radius: 100%;
`;

const Logout = styled.button`
  padding: 2rem;
  width: 100%;
  height: 100%;
  padding-bottom: 5.5rem;
  border: 0;
  font-size: 1.25rem;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;

export default function Sidebar({ screen, sidebar, ...props }) {
  const session = useSession();

  const [screenFade, setScreenFade] = useState(screen);
  const [sidebarFade, setSidebarFade] = useState(sidebar);

  function handleClickSidebar(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    setScreenFade(screen);
    setSidebarFade(sidebar);
  }, [screen, sidebar]);

  return (
    <Screen id="screen" className={`sidebar-screen ${screenFade}`} {...props}>
      <Bar
        id="sidebar"
        className={sidebarFade}
        onClick={e => handleClickSidebar(e)}
      >
        <List>
          <Group>
            <Profile>
              <ProfileImage
                src={
                  session.data.user.image
                    ? session.data.user.image
                    : '/blank-profile.png'
                }
                alt=""
              />
              <h3>{`${
                session.data?.user.name ? session.data?.user.name : ' '
              }`}</h3>
            </Profile>
            <Link href="/">
              <Item>Início</Item>
            </Link>
            <Link href="/produtos">
              <Item>Produtos</Item>
            </Link>
            <Link href="/mercadorias">
              <Item>Mercadorias</Item>
            </Link>
            <Link href="/despesas">
              <Item>Despesas</Item>
            </Link>
            <Link href="/cadastro">
              <Item>Cadastro</Item>
            </Link>
            <Link href="/relatorios">
              <Item>Relatórios</Item>
            </Link>
            <Link href="/historico">
              <Item>Histórico</Item>
            </Link>
            <Link href="/configuracao">
              <Item>Configuração</Item>
            </Link>
          </Group>
          <Group>
            <Logout type="button" onClick={() => signOut()}>
              Sair
            </Logout>
          </Group>
        </List>
      </Bar>
    </Screen>
  );
}
