import React, { useState, useEffect } from "react";
import axios from "axios";

const BitcoinData = () => {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        // Fetch Bitcoin data
        const bitcoinResponse = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        setBitcoinData(bitcoinResponse.data);

        // Fetch GitHub data
        const githubResponse = await axios.get(
          "https://api.github.com/repos/robbfox/bitcoin"
        );
        setGithubData(githubResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBitcoinData();
  }, []);

  return (
    <div style={{ background: "#f0f0f0", padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Robb's Bitcoin Data Page
      </h1>
      {bitcoinData && githubData && (
        <div style={{ fontSize: "20px", marginBottom: "20px" }}>
          <p>Updated: {bitcoinData.time.updated}</p>
          <p>USD: {bitcoinData.bpi.USD.rate}</p>
          <p>GBP: {bitcoinData.bpi.GBP.rate}</p>
          <p>EUR: {bitcoinData.bpi.EUR.rate}</p>
          <p>Disclaimer: {bitcoinData.disclaimer}</p>
          <p>GitHub Repo Name: {githubData.full_name}</p>
          <p>Stars: {githubData.stargazers_count}</p>
          <p>Watchers: {githubData.watchers_count}</p>
          {/* Add more data fields as needed */}
        </div>
      )}
    </div>
  );
};

export default BitcoinData;
