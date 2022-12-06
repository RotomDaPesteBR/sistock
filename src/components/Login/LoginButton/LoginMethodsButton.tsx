import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 1.2rem;
  background: white;
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

const Image = styled.img`
  height: 100%;
  padding: 0.5rem;
`;

export default function LoginMethodsButton(props) {
  const [imageUrl, setImage] = useState('/');
  const { method } = props;

  useEffect(() => {
    if (method === 'Google') {
      setImage('/google.svg');
    } else {
      setImage('/facebook.svg');
    }
  }, []);

  return (
    <Button {...props}>
      <Image src={imageUrl} alt="" draggable={false} />
    </Button>
  );
}
