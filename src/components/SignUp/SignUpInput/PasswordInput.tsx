import styled from 'styled-components';

const Input = styled.input`
  font-size: 1rem;
  width: 25rem;
  height: 3rem;
  border: 0;
  border-radius: 10px;
  margin: 0.5rem;
  text-align: center;
  @media (max-width: 500px) {
    width: 100%;
    margin-left: 0;
  }
  &::placeholder {
    font-size: 1.2rem;
  }
`;

export default function SignUpInput(props) {
  return <Input {...props} />;
}
