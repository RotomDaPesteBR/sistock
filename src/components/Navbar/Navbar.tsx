import { signOut, useSession } from 'next-auth/react';
import styled from 'styled-components';

export default function Navbar() {
  const session = useSession();
  const Nav = styled.div`
    width: 100%;
    height: 5%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  `;

  const List = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const Item = styled.li`
    padding: 1rem;
  `;

  return (
    <Nav>
      <List>
        <Item>
          <h3>{`Bem vindo ${session.data?.user.name}`}</h3>
        </Item>
        <Item>
          <button type="button" onClick={() => signOut()}>
            Logout
          </button>
        </Item>
      </List>
    </Nav>
  );
}
