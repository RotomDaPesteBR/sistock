import styled from 'styled-components';

const Button = styled.button`
  font-size: 1.2rem;
  background: ${({ theme }) => theme.primary};
  width: 12rem;
  height: 3rem;
  border: 0;
  border-radius: 10px;
  margin: 0.5rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export default function LoginMethodsButton(props) {
  const { label } = props;
  return <Button {...props}>{label}</Button>;
}
