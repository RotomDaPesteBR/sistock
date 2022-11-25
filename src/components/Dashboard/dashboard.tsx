import styled from 'styled-components';
import Alerts from '../Alerts/alerts';
import Graphics from '../Reports/Graphics/dashboardGraphics';

const ContainerDashboard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: start;
  align-items: center;
  padding-top: 55px;
  flex-direction: column;
  @media (max-width: 800px) {
    justify-content: center;
  }
`;

const Space = styled.div`
  padding: 27.5px;
  @media (max-width: 800px) {
    padding: 0;
  }
`;

export default function Dashboard() {
  return (
    <ContainerDashboard>
      <Graphics />
      <Alerts />
      <Space />
    </ContainerDashboard>
  );
}
