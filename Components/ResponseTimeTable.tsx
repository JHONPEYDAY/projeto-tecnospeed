import React, { useState, useEffect } from "react";

interface ResponseTimeData {
  timestamp: Date;
  responseTime: number;
  status: "Normal" | "Slow" | "Timeout" | "Error";
}

const ResponseTimeTable: React.FC = () => {
  const [responseTimeData, setResponseTimeData] = useState<ResponseTimeData[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate fetching data from an API or backend
      const newResponseTimeData: ResponseTimeData[] = [];
      for (let i = 0; i < 20; i++) {
        const timestamp = new Date();
        timestamp.setSeconds(timestamp.getSeconds() + i);
        const responseTime = Math.random() * 10; // Simulated response time in milliseconds
        let status: "Normal" | "Slow" | "Timeout" | "Error";

        // Determine the status based on the response time
        if (responseTime <= 2) {
          status = "Normal";
        } else if (responseTime <= 5) {
          status = "Slow";
        } else if (responseTime <= 30) {
          status = "Timeout";
        } else {
          status = "Error";
        }

        newResponseTimeData.push({
          timestamp,
          responseTime,
          status,
        });
      }
      setResponseTimeData((prevData) => [...prevData, ...newResponseTimeData]);
    }, 1000); // Update every 1 second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h2>Response Time Monitor</h2>
      <table className="response-time-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Response Time (ms)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {responseTimeData.map((data) => (
            <tr key={data.timestamp.getTime()}>
              <td>{data.timestamp.toLocaleTimeString()}</td>
              <td>{data.responseTime.toFixed(2)}</td>
              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseTimeTable; // Exporte o componente

