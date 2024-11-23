import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #0066b2;
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00549b;
  padding: 15px;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Menu = styled.div`
  display: flex;
  gap: 15px;

  button {
    background: none;
    color: white;
    border: 1px solid white;
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: #ffffff;
      color: #00549b;
    }
  }
`;

const ChartContainer = styled.div`
  margin-top: 30px;
  background-color: #001d5b;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const ChartTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px; /* Adicione o valor que deseja */
`;
