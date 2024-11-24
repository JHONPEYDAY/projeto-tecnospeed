import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface BankService {
  code: string;
  name: string;
  icon: string;
  status: string;
  responseTime: number;
  lastUpdated: Date;
  isActive: boolean; // Ativo/Inativo
}

const banks: BankService[] = [
  { code: "001", name: "Banco do Brasil", icon: "https://play-lh.googleusercontent.com/1-aNhsSPNqiVluwNGZar_7F5PbQ4u1zteuJ1jumnArhe8bfYHHaVwu4aVOF5-NAmLaA", status: "Normal", responseTime: 1.8, lastUpdated: new Date(), isActive: true },
  { code: "341", name: "Itaú", icon: "https://seeklogo.com/images/I/Itau-logo-0BE09A6D22-seeklogo.com.png", status: "Lento", responseTime: 4.2, lastUpdated: new Date(), isActive: true },
  { code: "756", name: "Sicoob", icon: "https://www.sicoob.com.br/documents/20128/1206594/0NOVO_app-sicoob.png/ce38aa2d-4664-7ca0-2316-b2bc1923ae54?t=1576101519271", status: "Normal", responseTime: 1.2, lastUpdated: new Date(), isActive: true },
  { code: "748", name: "Sicredi", icon: "https://play-lh.googleusercontent.com/yTaFNMenVIz0MW_Msc9IbUxVbBpTF49aOcI__Z2ppoK7a8Un_MWIqzZ92U2-VUXTNA", status: "Muito Lento", responseTime: 12.5, lastUpdated: new Date(), isActive: true },
  { code: "104", name: "Caixa", icon: "https://play-lh.googleusercontent.com/ubV0x2kGJIEe10shxuFnH9Cy21OgHARwVUZ89nyE0YOZN9c25ov_dyHdk1rMgbPvoDI=w240-h480-rw", status: "Normal", responseTime: 1.9, lastUpdated: new Date(), isActive: true },
  { code: "033", name: "Santander", icon: "https://play-lh.googleusercontent.com/g_QDzrOlw8Belx8qb47fUu0MPL6AVFzDdbOz_NJZYQDNLveHYxwiUoe09Wvkxf-_548q", status: "Timeout", responseTime: 35.0, lastUpdated: new Date(), isActive: true },
  { code: "041", name: "Banrisul", icon: "https://play-lh.googleusercontent.com/EesIfzYxpFnep4xcOBAV7uyhx_L4gvfcCN2eatEDSxW6yjy75Q8MmLQNasQ20J585D4", status: "Lento", responseTime: 3.8, lastUpdated: new Date(), isActive: true },
  { code: "077", name: "Inter", icon: "https://play-lh.googleusercontent.com/DABQ3z4xA93QNsK9wqR2LdnamoDHkaKc-h1AueqJrVE7pP9GkIvZqf_URfxOIiNbFyzK=w240-h480-rw", status: "Normal", responseTime: 0.8, lastUpdated: new Date(), isActive: true },
];

const updateBankData = (services: BankService[]): BankService[] => {
  return services.map((bank) => {
    const newResponseTime = parseFloat((Math.random() * 40).toFixed(1));
    let status = "Normal";
    if (newResponseTime > 30) status = "Timeout";
    else if (newResponseTime > 10) status = "Muito Lento";
    else if (newResponseTime > 3) status = "Lento";
    return { ...bank, responseTime: newResponseTime, status, lastUpdated: new Date() };
  });
};

const BankMonitoring: React.FC = () => {
  const [banksData, setBanksData] = useState<BankService[]>(banks);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isCobrançaFilter, setIsCobrançaFilter] = useState(false);
  const [isPagamentoFilter, setIsPagamentoFilter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBanksData((prevBanks) => updateBankData(prevBanks));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleBankSelection = (bankCode: string | null) => {
    setSelectedBank(bankCode);
    setDropdownVisible(false);
  };

  const filterByCobrança = () => {
    setIsCobrançaFilter(true);
    setIsPagamentoFilter(false);
    setSelectedBank(null);
  };

  const filterByPagamento = () => {
    setIsPagamentoFilter(true);
    setIsCobrançaFilter(false);
    setSelectedBank(null);
  };

  const toggleBankActive = (code: string) => {
    setBanksData((prevData) =>
      prevData.map((bank) =>
        bank.code === code ? { ...bank, isActive: !bank.isActive } : bank
      )
    );
  };

  const filteredBanks = isCobrançaFilter
    ? banksData.filter((bank) => bank.status === "Lento" || bank.status === "Muito Lento")
    : isPagamentoFilter
    ? banksData.filter((bank) => bank.status === "Normal" || bank.status === "Timeout")
    : selectedBank
    ? banksData.filter((bank) => bank.code === selectedBank)
    : banksData;

  const chartData = {
    labels: filteredBanks.map((bank) => bank.name),
    datasets: [
      {
        label: "Tempo de Resposta (s)",
        data: filteredBanks.map((bank) => bank.responseTime),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Tempo de Resposta por Banco",
      },
    },
  };

  return (
    <div style={{ padding: "20px", color: "#fff", backgroundColor: "#1a1a2e", minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Monitoramento Bancário em Tempo Real</h2>
        <div style={{ display: "flex", gap: "10px", position: "relative" }}>
          <button style={buttonStyle} onClick={filterByCobrança}>
            Cobrança
          </button>
          <button style={buttonStyle} onClick={filterByPagamento}>
            Pagamentos
          </button>
          <button style={buttonStyle} onClick={() => setIsCobrançaFilter(false) || setIsPagamentoFilter(false)}>
            Todos
          </button>
          <div>
            <button style={{ ...buttonStyle, display: "flex", alignItems: "center" }} onClick={toggleDropdown}>
              Selecionar Banco ▼
            </button>
            {dropdownVisible && (
              <div style={dropdownStyle}>
                {banks.map((bank) => (
                  <div
                    key={bank.code}
                    style={dropdownItemStyle}
                    onClick={() => handleBankSelection(bank.code)}
                  >
                    <img
                      src={bank.icon}
                      alt={bank.name}
                      style={{ width: "20px", height: "20px", marginRight: "10px", verticalAlign: "middle" }}
                    />
                    {bank.name}
                  </div>
                ))}
                <div style={dropdownItemStyle} onClick={() => handleBankSelection(null)}>
                  Todos os Bancos
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "40px" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "#fff",
          backgroundColor: "#24344d",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Código</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Banco</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Status</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Tempo de Resposta (s)</th>
            <th style={{ padding: "10px", border: "1px solid #444" }}>Ativo/Inativo</th>
          </tr>
        </thead>
        <tbody>
          {filteredBanks.map((bank) => (
            <tr key={bank.code}>
              <td style={{ padding: "10px", border: "1px solid #444" }}>{bank.code}</td>
              <td style={{ padding: "10px", border: "1px solid #444" }}>{bank.name}</td>
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #444",
                  color:
                    bank.status === "Normal"
                      ? "green"
                      : bank.status === "Lento"
                      ? "orange"
                      : "red",
                }}
              >
                {bank.status}
              </td>
              <td style={{ padding: "10px", border: "1px solid #444" }}>{bank.responseTime.toFixed(1)}</td>
              <td style={{ padding: "10px", border: "1px solid #444", textAlign: "center" }}>
                <label style={{ display: "inline-flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={bank.isActive}
                    onChange={() => toggleBankActive(bank.code)}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  />
                  <span
                    style={{
                      color: bank.isActive ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {bank.isActive ? "Ativo" : "Inativo"}
                  </span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

const dropdownStyle = {
  position: "absolute",
  top: "40px",
  right: "0",
  backgroundColor: "#24243e",
  border: "1px solid #444",
  borderRadius: "5px",
  zIndex: 1000,
};

const dropdownItemStyle = {
  padding: "10px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: "#fff",
  borderBottom: "1px solid #444",
};

export default BankMonitoring;
