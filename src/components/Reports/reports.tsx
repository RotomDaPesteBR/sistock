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
  /* function printPDF() {
      var newWin = window.open('/relatorios/mensal','winname','directories=0, titlebar=0, toolbar=0, location=0, status=0, menubar=0, scrollbars=no,resizable=yes, height=650, width=1000');
  } */
  return (
    <Reports>
      <Graphics />
      {/* <button onClick={() => printPDF()}>Imprimir</button> */}
    </Reports>
  );
}
