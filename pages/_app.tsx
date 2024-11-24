import "@/styles/globals.css"; // Importando estilos globais
import type { AppProps } from "next/app"; // Importando tipos do Next.js
import React, { useEffect, useState } from "react"; // Importando React e hooks
import styled, { createGlobalStyle } from "styled-components"; // Importando styled-components
import ResponseTimeTable from "@/Components/ResponseTimeTable"; // Isso assume que você está usando a configuração de alias '@'

const GlobalStyle = createGlobalStyle`
  @import url('//fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
`;

// Estilizando o Container principal
const Container = styled.div`
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"; 
  background-color: #1C5688; 
  color: #000000; 
  min-height: 100vh;
  padding: 0; 
`;

// Estilizando o Header
const Header = styled.div<{ isScrolled: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isScrolled }) => (isScrolled ? '#1C5688' : 'transparent')}; 
  padding: 15px 200px; 
  position: fixed; 
  width: 100%; 
  z-index: 1030; 
  transition: background-color 0.3s; 

  @media (max-width: 768px) {
    padding: 10px 20px; 
    flex-direction: column; 
    align-items: flex-start; 
  }
`;

// Estilizando o Menu
const Menu = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')}; 
    flex-direction: column; 
    position: absolute;
    top: 70px; 
    right: 20px; 
    background-color: #ffffff; 
    padding: 10px; 
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
    z-index: 999; 
    width: 200px; 
  }
`;

// Estilizando o botão comum
const Button = styled.button`
  background: #1C5688; 
  border-radius: 7px;
  padding: 12px 24px; 
  font-weight: bold; 
  border: 1px solid #1C5688; 

  &:hover {
    text-decoration: underline; 
    color: #ffffff; 
  }
`;

// Estilizando o botão "Entrar" com uma aparência especial
const EnterButton = styled(Button)`
  background: #1C5688; 
  padding: 12px 24px; 
  font-weight: bold; 
  border: 1px solid #1C5688; 

  &:hover {
    background-color: #0072EF; 
    border-color: #0072EF; 
  }
`;

// Estilizando o botão de menu (hambúrguer)
const MenuButton = styled.button`
  position: fixed; 
  top: 15px; 
  right: 20px; 
  display: none; 
  flex-direction: column;
  background: transparent;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex; 
  }

  div {
    width: 30px;
    height: 3px;
    background-color: #0E336D; 
    margin: 4px 0; 
    transition: all 0.3s;
  }
`;

// Estilizando o Container abaixo do Header
const ContentContainer = styled.div`
  padding: 80px 20px; 
  max-width: 1400px; 
  margin: 0 auto; 
`;

// Estilizando o novo Container com título e subtítulo
const HeroSection = styled.div`
  background-image: url('https://atendimento.tecnospeed.com.br/hc/theming_assets/01HZFNA8VYAA05QPJ983WZYT51');
    background-size: cover; // This will ensure the image covers the entire section
  background-position: center; // This will center the image
  color: white; // Cor do texto
  text-align: center; // Centraliza o texto
  padding: 85px 20px; // Adiciona padding
`;

const Title = styled.h1`
  font-size: 2.9rem; // Tamanho do título
  margin: 20px 0 5px 0; // Margem superior reduzida e margem inferior ajustada
`;

const Subtitle = styled.span`
  font-family: Roboto;
  font-size: 1.20rem; // Tamanho do subtítulo
  margin: 0; // Remove a margem superior
`;

// Componente App
export default function App({ Component, pageProps }: AppProps) {
  const [isScrolled, setIsScrolled] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Atualiza o estado com base na rolagem
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Limpeza do listener
    };
  }, []);

  // Função para rolar até o final da página
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth' // Rolagem suave
    });
  };

  return (
    <Container>
      <Header isScrolled={isScrolled}>
        <img 
          src="https://tecnospeed.com.br/images/tecnospeed-white.svg" 
          alt="Logotipo" 
          width="140" 
          height="40" 
          className="img-fluid" 
        />
        
        <Menu isOpen={menuOpen}>
          <Button onClick={() => {
            setMenuOpen(false);
            scrollToBottom(); // Chama a função para rolar até o final
          }}>
            Plug Boleto ▼
          </Button>
          <EnterButton onClick={() => {
            setMenuOpen(false);
            window.location.href = 'https://tecnospeed.zendesk.com/auth/v2/login/signin?return_to=https%3A%2F%2Fatendimento.tecnospeed.com.br%2Fhc%2Fpt-br&theme=hc&locale=pt-br&brand_id=360000386474&auth_origin=360000386474%2Ctrue%2Ctrue';
          }}>
            Entrar
          </EnterButton>
        </Menu>

        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </MenuButton>
      </Header>

      {/* Novo Container com Título e Subtítulo */}
      <HeroSection>
        <Title>Monitorador Webservices Bancários</Title>
        <Subtitle>Gestão e Monitoramento em Tempo Real de Serviços Bancários!</Subtitle>
      </HeroSection>

      <ContentContainer>
        <Component {...pageProps} />
      </ContentContainer>
    </Container>
  );
}