import styled from 'styled-components';
import Graphics from '../Reports/Graphics/dashboardGraphics';

const ContainerDashboard = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 55px;
`;

export default function Dashboard() {
  return (
    <ContainerDashboard>
      <Graphics />
    </ContainerDashboard>
  );
}
