import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import SidebarButton from '../Sidebar/SidebarButton';

const Bar = styled.div`
  background: #ffffff;
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

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  function handleClick() {
    setShowSidebar(!showSidebar);
  }

  function handleClickScreen(e) {
    if (e.target.getAttribute('class') != null) {
      if (e.target.getAttribute('class').includes('sidebar-screen')) {
        fadeout();
        setTimeout(() => setShowSidebar(false), 1000);
      }
    }
  }

  function fadeout() {
    const screen = document.getElementById('screen');
    const sidebar = document.getElementById('sidebar');
    document.getElementById('screen').style.animation="0.5s slideout";
    document.getElementById('sidebar').style.animation="1s fadeout";
    document.getElementById('screen').style.animation="0.5s slidein";
    document.getElementById('sidebar').style.animation="1s fadeout";
  } 

  return (
    <Bar>
      <Nav>
        <List>
          <Item>
            <SidebarButton onClick={() => handleClick()} />
          </Item>
        </List>
      </Nav>
      {showSidebar ? <Sidebar onClick={e => handleClickScreen(e)} /> : null}
    </Bar>
  );
}
