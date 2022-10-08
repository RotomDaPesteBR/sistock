import styled from 'styled-components';

const Button = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background: none;
  border: 0;
`;

export default function SidebarButton(props) {
  return (
    <Button type="button" {...props}>
      <img src="/menu.png" alt="" />
    </Button>
  );
}
