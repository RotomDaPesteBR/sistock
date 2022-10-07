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
`;

const Bar = styled.div`
  background: #ffffff;
  min-height: 100%;
  height: auto;
  position: absolute;
  width: 100%;
  max-width: 20rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
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
  border-radius: 100%;
`;

const Logout = styled.button`
  padding: 2rem;
  width: 100%;
  height: 100%;
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

  useEffect(() => {
    setScreenFade(screen);
    setSidebarFade(sidebar);
  }, [screen, sidebar]);

  return (
    <Screen id="screen" className={`sidebar-screen ${screenFade}`} {...props}>
      <Bar id="sidebar" className={sidebarFade}>
        <List>
          <Group>
            <Profile>
              <ProfileImage src={session.data.user.image} alt="" />
              <h3>{`${session.data?.user.name}`}</h3>
            </Profile>
            <Link href="/">
              <Item>Início</Item>
            </Link>
            <Link href="/produtos">
              <Item>Produtos</Item>
            </Link>
            <Link href="/">
              <Item>Cadastro</Item>
            </Link>
            <Link href="/">
              <Item>Relatórios</Item>
            </Link>
            <Link href="/">
              <Item>Histórico</Item>
            </Link>
            <Link href="/">
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
