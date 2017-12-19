import React from "react";

const Market = ({ props }) => {

return (
    <div className="market-container">
      <h1>{props.spotPrice}</h1>
    </div>
  );
};

export default Market;
