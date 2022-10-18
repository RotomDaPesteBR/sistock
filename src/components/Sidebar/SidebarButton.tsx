import styled from 'styled-components';

const Button = styled.button`
  padding: 1rem;
  width: 3.4375rem;
  height: 3.4375rem;
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
