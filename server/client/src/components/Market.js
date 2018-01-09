import React from "react";

const Market = ({ props }) => {
  return (
    <div className="market-container">
      <h3>{props.product}</h3>
      <p>Side: {props.side}</p>
      <p>Open: {props.open_24h}</p>
      <p>High: {props.high_24h}</p>
      <p>Low: {props.low_24h}</p>
      <h1>{props.spotPrice}</h1>
    </div>
  );
};

export default Market;
