import styled from 'styled-components';

const Button = styled.button`
  width: 5%;
  height: 5%;
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
