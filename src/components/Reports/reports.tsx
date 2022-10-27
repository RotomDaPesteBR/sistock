import styled from 'styled-components';
import Graphics from './Graphics/graphics';

const Reports = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 55px;
  justify-content: center;
`;

export default function Relatorios() {
  return (
    <Reports>
      <Graphics />
    </Reports>
  );
}
