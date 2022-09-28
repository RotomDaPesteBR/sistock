import styled from 'styled-components';

const Input = styled.input`
  font-size: 1.2rem;
  width: 25rem;
  height: 3rem;
  border: 0;
  border-radius: 10px;
  margin: 0.5rem;
  text-align: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 500px) {
    width: 80%;
  }
`;

export default function LoginInput(props) {
  return <Input {...props} />;
}
