import React from "react";

const Market = ({ data }) => {
  if (!data) {
    return (
      <div className="market-container">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="market-container">
      <h3>{data.product}</h3>
      <p>Side: {data.side}</p>
      <p>Open: {data.open_24h}</p>
      <p>High: {data.high_24h}</p>
      <p>Low: {data.low_24h}</p>
      <h1>{data.spotPrice}</h1>
    </div>
  );
};

export default Market;
