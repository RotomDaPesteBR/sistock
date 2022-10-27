import styled from 'styled-components';
import Graphics from './Graphics/graphics';

const Reports = styled.div`
  display: flex;
  width: 90%;
  max-width: 70rem;
  padding-top: 55px;
  align-items: start;
  justify-content: center;
`;

export default function Relatorios() {
  return (
    <Reports>
      <Graphics />
    </Reports>
  );
}
