import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar';
import SidebarButton from '../Sidebar/SidebarButton';

const Bar = styled.div`
  width: 100%;
  height: auto;
  background: #ffffff;
  position: fixed;
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
  height: 100%;
  width: auto;
  padding: 0;
`;

const EstablishmentName = styled.h3`
  padding: 1rem;
  white-space: nowrap;
  cursor: pointer;
`;

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [timer, setTimer] = useState(undefined);
  const [screenFade, setScreenFade] = useState('screenFadeIn');
  const [sidebarFade, setSidebarFade] = useState('sidebarFadeIn');
  const [establishment, setEstablishment] = useState('');
  const session = useSession();

  async function getEstablishment(user) {
    const promise = await axios
      .post('api/db/establishment', { data: user.id })
      .then(response => response.data)
      .catch(error => error.response);
    setEstablishment(promise?.establishmentName);
  }

  getEstablishment(session.data.user);

  function fadein() {
    setScreenFade('screenFadeIn');
    setSidebarFade('sidebarFadeIn');
  }

  function fadeout() {
    setScreenFade('screenFadeOut');
    setSidebarFade('sidebarFadeOut');
  }

  function handleClick() {
    if (showSidebar) {
      fadeout();
      setShowSidebar(!showSidebar);
      setTimer(
        setTimeout(() => {
          document.getElementById('screen').style.display = 'none';
          fadein();
        }, 1000)
      );
    } else {
      clearTimeout(timer);
      fadein();
      document.getElementById('screen').style.display = 'flex';
      setShowSidebar(!showSidebar);
    }
  }

  function handleClickScreen() {
    fadeout();
    setShowSidebar(!showSidebar);
    setTimer(
      setTimeout(() => {
        document.getElementById('screen').style.display = 'none';
        fadein();
      }, 1000)
    );
  }

  return (
    <Bar>
      <Nav>
        <List>
          <Item>
            <SidebarButton onClick={() => handleClick()} />
          </Item>
          <Item>
            <Link href="/">
              <EstablishmentName>
                {establishment || 'Estabelecimento'}
              </EstablishmentName>
            </Link>
          </Item>
        </List>
      </Nav>

      <Sidebar
        screen={screenFade}
        sidebar={sidebarFade}
        onClick={() => handleClickScreen()}
      />
    </Bar>
  );
}
