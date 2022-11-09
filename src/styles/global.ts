// import { lighten } from 'polished';
import { darken } from 'polished';
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
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textDark};
    font: 400 1rem 'Montserrat', sans-serif;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .loginContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: url('/background.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
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

  html {
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  #content {
    padding: 3.4375rem;
    @media (max-width:800px) {
      padding: 0;
    }
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
  
  .logo {
    margin: -1.5rem;
    width: auto;
    height:20rem;
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

  .active {
    background: white;
    border: solid !important;
    border-width: 2px 0 0 !important;
    border-color: ${({ theme }) => theme.primary} !important;
  }

  .selected-item {
    background: ${({ theme }) => darken(0.05, theme.background)};
    border-radius: 10px;
  }

  #content-safearea {
    padding-top: 3.4375rem;
  }

  .pencil {
    height: 1rem;
  }

  .trash {
    height: 1rem;
  }

  #SafeArea h1{
    padding: 2.5rem;
  }

  .falta{
    color: #ff0000;
  }

  .indisponível{
    color: #ff0000;
  }

  .disponivel{
    color: ${({ theme }) => theme.textDark};
  }

  .sobrando {
    color: #00ff00;
  }

  #product-control{
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 2rem;
  }

  #edit-line {
    flex-wrap: wrap;
  }

  #sale-edit-line {
    width: 100%;
  }

  #expense-edit-line {
    width: 100%;
  }

  #edit-top-left{
    @media (max-width: 500px) {
      margin-right: 0.25rem;
      margin-bottom: 0.25rem;
    }
  }

  #edit-top-right{
    @media (max-width: 500px) {
      margin-left: 0.25rem;
      margin-bottom: 0.25rem;
    }
  }

  #edit-bottom-left{
    @media (max-width: 500px) {
      margin-top: 0.25rem;
      margin-right: 0.25rem;
    }
  }

  #edit-bottom-right{
    @media (max-width: 500px) {
      margin-top: 0.25rem;
      margin-left: 0.25rem;
    }
  }

  #cancelar {
    margin-left: 0;
    @media (max-width: 500px) {
      margin-right: 0;
    }
  }

  #confirmar {
    margin-right: 0;
    @media (max-width: 500px) {
      margin-left: 0;
    }
  }

  #products-container {
    align-items: start;
    padding-top: 3.4375rem;
    padding-bottom: 3.4375rem;
    height: 100%;
    min-height: 100vh;
  }

  .selected {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }

  .striped {
    background: ${({ theme }) => darken(0.05, theme.background)};
  }

  .notifierIn{
    animation: 2s forwards notificationIn;
  }

  .notifierOut{
    animation: 2s forwards notificationOut;
  }

  @keyframes notificationIn {
    0% {
      top: -120px
    }
  
    100% {
      top: 70px;
    }
  }

  @keyframes notificationOut {
    0% {
      top: 70px;
    }
  
    100% {
      top: -120px;
    }
  }

  .loginNotifierIn{
    animation: 2s forwards loginNotificationIn;
  }

  .loginNotifierOut{
    animation: 2s forwards loginNotificationOut;
  }
  
  @keyframes loginNotificationIn {
    0% {
      top: -120px
    }
  
    100% {
      top: 120px;
    }
  }

  @keyframes loginNotificationOut {
    0% {
      top: 120px;
    }
  
    100% {
      top: -120px;
    }
  }

  #cadastro-container {
    @media (max-width: 800px) {
      align-items: start;
    }
  }

  #reports-container {
      align-items: start;
  }
`;
