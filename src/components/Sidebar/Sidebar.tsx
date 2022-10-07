import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const Screen = styled.div`
  background: #00000055;
  position: absolute;
  height: 100%;
  width: 100%;
  animation: 1s fadein;
`

const Bar = styled.div`
  background: #ffffff;
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 20rem;
  animation: 0.5s slidein;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Item = styled.li`
  text-align: center;
  padding: 2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.textDark};
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`;

const Logout = styled.button`
  padding: 2rem;
  width: 100%;
  height: 100%;
  border: 0;
  background: #ffffff;
  color: ${({ theme }) => theme.textDark};
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
`

export default function Sidebar(props) {
  const session = useSession();

  return (
    <Screen id="screen" className={`sidebar-screen`} {...props}>
      <Bar id="sidebar">
        <List>
          <Item>
          <h3>{`${session.data?.user.name}`}</h3>
          </Item>
          <Item>
            <Link href="/produtos">Produtos</Link>
          </Item>
          <Logout type="button" onClick={() => signOut()}>
            Logout
          </Logout>
        </List>
      </Bar>
    </Screen>
  );
}
