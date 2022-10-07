import axios from 'axios';
import { useSession } from 'next-auth/react';
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
  padding: 1rem;
`;

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [timer, setTimer] = useState(undefined);
  const [screenFade, setScreenFade] = useState('screenFadeIn');
  const [sidebarFade, setSidebarFade] = useState('sidebarFadeIn');
  const [restaurant, setRestaurant] = useState('');
  const session = useSession();

  async function getRestaurant(email) {
    const name = await axios
      .get('/api/db/restaurant', { params: { email } })
      .then(response => response)
      .catch(error => {
        console.log(error.response);
      });

    const { data } = name;
    const { restaurantName } = data;
    setRestaurant(restaurantName);
  }

  const { email } = session.data.user;

  getRestaurant(email);

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
        }, 1000)
      );
    } else {
      clearTimeout(timer);
      document.getElementById('screen').style.display = 'flex';
      fadein();
      setShowSidebar(!showSidebar);
    }
  }

  function handleClickScreen(e) {
    if (e.target.getAttribute('class') != null) {
      if (e.target.getAttribute('class').includes('sidebar-screen')) {
        fadeout();
        setShowSidebar(!showSidebar);
      }
    }
  }

  return (
    <Bar>
      <Nav>
        <List>
          <Item>
            <SidebarButton onClick={() => handleClick()} />
          </Item>
          <Item>
            <h3>{restaurant}</h3>
          </Item>
        </List>
      </Nav>

      <Sidebar
        screen={screenFade}
        sidebar={sidebarFade}
        onClick={e => handleClickScreen(e)}
      />
    </Bar>
  );
}
