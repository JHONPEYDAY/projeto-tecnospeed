import React from "react";

const AdditionalSection: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        color: "#fff",
        backgroundColor: "#16213E",
        marginTop: "40px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Sobre o Monitoramento Bancário
      </h2>
      <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
        Nosso sistema de monitoramento bancário foi criado para oferecer **transparência e
        confiabilidade** no uso de APIs bancárias. Com ele, você pode visualizar o status dos serviços de
        cobrança e consulta em tempo real, identificar falhas rapidamente e garantir uma experiência mais
        estável para os seus clientes.
      </p>
      <p style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>
        Além disso, o <strong>Plugboleto</strong> da <strong>Tecnospeed</strong> é a solução ideal para integrar e
        automatizar a emissão de boletos. Nosso produto é projetado para oferecer simplicidade,
        eficiência e compatibilidade com os principais bancos do mercado.
      </p>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3 style={{ marginBottom: "20px" }}>Conheça o Plugboleto</h3>
        <div>
          <img
            src="https://tecnospeed.com.br/images/plugboleto-feature1.png"
            alt="Plugboleto Integração"
            style={{
              width: "100%",
              maxWidth: "400px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
        <div>
          <img
            src="https://tecnospeed.com.br/images/plugboleto-feature2.png"
            alt="Plugboleto Facilidades"
            style={{
              width: "100%",
              maxWidth: "400px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <a
          href="https://tecnospeed.com.br/boleto/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          Saiba Mais sobre o Plugboleto
        </a>
      </div>
    </div>
  );
};

export default AdditionalSection;
