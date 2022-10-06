import { signOut } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import SidebarButton from '../Sidebar/SidebarButton';

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const Bar = styled.div`
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  `;

  const Nav = styled.div`
    width: 100%;
    height: 5%;
  `;

  const List = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const Item = styled.li`
    padding: 1rem;
  `;

  function handleClick() {
    setShowSidebar(!showSidebar);
  }

  return (
    <Bar>
      <Nav>
        <List>
          <Item>
            <SidebarButton onClick={() => handleClick()} />
          </Item>
          <Item>
            <button type="button" onClick={() => signOut()}>
              Logout
            </button>
          </Item>
        </List>
      </Nav>
      {showSidebar ? <Sidebar /> : null}
    </Bar>
  );
}
