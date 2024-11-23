import "@/styles/globals.css"; // Importando estilos globais
import type { AppProps } from "next/app"; // Importando tipos do Next.js
import React from "react"; // Importando React
import styled from "styled-components"; // Importando styled-components

// Estilizando o Container principal
const Container = styled.div`
  font-family: Arial, sans-serif; // Mantendo a fonte Arial
  background-color: #00549b; // Mudando para a nova cor de fundo
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
`;

// Estilizando o Header
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00549b; // Mantendo a cor de fundo do Header
  padding: 15px;
  border-radius: 8px;
`;

// Estilizando o título
const Title = styled.h1`
  font-size: 24px;
`;

// Estilizando o Menu
const Menu = styled.div`
  display: flex;
  gap: 15px;

  button {
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    color: #ffffff; // Adicionando cor ao texto do botão
    transition: background-color 0.3s; // Transição suave para o fundo

    &:hover {
      background-color: rgba(255, 255, 255, 0.2); // Efeito de hover
    }
  }
`;

// Componente App
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Title>Tecnospeed</Title>
        <Menu>
          <button>Plug Boleto</button>
          <button>Filtro</button>
        </Menu>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}