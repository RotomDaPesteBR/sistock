import { useSession } from 'next-auth/react';
import styled from 'styled-components';

const Bar = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  max-width: 20rem;
  padding: 2rem;
`;

export default function Sidebar() {
  const session = useSession();
  return (
    <Bar>
      <h3>{`${session.data?.user.name}`}</h3>
    </Bar>
  );
}
