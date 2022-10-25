import styled from 'styled-components';
import Graphics from './Graphics/graphics';

const Reports = styled.div`
    display: flex;
    width: 90%;
    max-width: 35rem;
    height: 60%;
`;

export default function Relatorios () {
    return (
        <Reports>
            <Graphics />
        </Reports>
    );
}