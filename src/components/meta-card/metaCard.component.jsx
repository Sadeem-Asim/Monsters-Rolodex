import React, { useState } from "react";
import { ethers } from "ethers";
// import "./metaCard.styles.sass";

const MetaCard = () => {
  //   const accountDisplay = "8923678627396";
  const [userBalance, setUserBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
        });
    } else {
      setErrorMessage("Install MetaMask");
    }
  };
  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount);
  };

  const getUserBalance = (address) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };
  return (
    <div className="meta-card">
      <h1>Connection To Meta Wallet</h1>
      <button onClick={connectWalletHandler}>Connect Wallet</button>
      <div className="account">
        <h3>Address : {defaultAccount}</h3>
      </div>
      <div className="balance">
        <h3>Balance : {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
};

export default MetaCard;
