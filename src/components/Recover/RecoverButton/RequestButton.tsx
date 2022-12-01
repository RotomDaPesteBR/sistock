import styled from 'styled-components';

const Button = styled.button`
  font-size: 1.2rem;
  background: ${({ theme }) => theme.primary};
  width: 25rem;
  height: 3rem;
  border: 0;
  border-radius: 10px;
  margin: 0.5rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  @media (max-width: 500px) {
    width: 80%;
  }
`;

export default function SignUpButton(props) {
  return <Button {...props}>Recuperar</Button>;
}
