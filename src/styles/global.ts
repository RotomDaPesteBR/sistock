// import { lighten } from 'polished';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;

    ::-webkit-scrollbar {
      width: 8px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.primary};
      border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #ffffff;
    }

  }

  body {
    background: ${({ theme }) => theme.backgroundLight};
    color: ${({ theme }) => theme.textDark};
    font: 400 1rem 'Montserrat', sans-serif;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .loginContainer {
    background-image: url('/background.png'); 
  }

  img{
    width: 100%;
    max-width: 100%;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .login {
    background: ${({ theme }) => theme.backgroundLogin};
    color: ${({ theme }) => theme.text};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 10px;
    width: 100%;
    height: 80vh;
    margin: 0;
    max-width: 40rem;
    padding: 0 1rem;
    @media(max-width:800px) {
      max-width: 30rem;
    }
    @media(max-width:500px) {
      max-width: 25rem;
    }
    @media(max-width:425px) {
      max-width: 22.5rem;
      padding: 0;
    }
  }

  .form {
    color: ${({ theme }) => theme.text};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .titulo {
    padding: 2rem;
    font-size: 3rem;
  }

  .loginInput {
    width: 25rem;
    height: 3rem;
    border: 0;
    border-radius: 10px;
    margin: 0.5rem;
    text-align: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    @media(max-width:500px) {
      width: 80%;
    }
  }

  .loginButton {
    background: ${({ theme }) => theme.primary};
    width: 25rem;
    height: 3rem;
    border: 0;
    border-radius: 10px;
    margin: 0.5rem;
    text-align: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    @media(max-width:500px) {
      width: 80%;
    }
  }

  .sidebarFadeIn {
    animation: 0.5s forwards slidein;
  }

  .screenFadeIn {
    animation: 1s forwards fadein;
  }

  .sidebarFadeOut {
    animation: 0.5s forwards slideout;
  }

  .screenFadeOut {
    animation: 1s forwards fadeout;
  }

  @keyframes slidein {
    0% {
      transform: translateX(-20rem);
    }
  
    100% {
      transform: translateX(0);
    }
  }

  @keyframes fadein {
    0% {
      background: 00000000;
    }
  
    100% {
      background: 00000055;
    }
  }

  @keyframes slideout {
    0% {
      transform: translateX(0);
    }
  
    100% {
      transform: translateX(-20rem);
    }
  }

  @keyframes fadeout {
    0% {
      background: 00000055;
    }
  
    100% {
      background: 00000000;
    }
  }
`;
