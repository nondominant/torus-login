import { useState } from "react";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import wordmark from "./logo.svg";
import "./App.css";
import {login} from "./login.js";

function App() {
//each state hook returns a pair, [0] is the variable, [1] is the 
//function used to update the variable
  const [account, setAccount] = useState();
  const [ethAddress, setEthAddress] = useState();
  const [connection, setCluster] = useState();
  const [solanaWallet, setSolanaWallet] = useState();
  const [solanaAccount, setSolanaAccount] = useState();
  const [visible, setVisible] = useState(true);
  const [test, setTest] = useState(false);


  const onClickLogin = async () => {
        setVisible(!visible);
	await login(
	  setAccount,
	  setEthAddress,
	  setCluster,
	  setSolanaWallet,
	  setSolanaAccount
	); 
  }; 

  const testfunction = async () => {
        setTest(!test);
  }; 

  return (
    <div className="App">
      <header className="App-header">
        <img src={wordmark} className="App-logo" alt="logo" />
        {account ? (
          <div className="App-info">
            <p>
              <strong>Address</strong>: {account.address}
            </p>
            <p>
              <strong>Balance</strong>: {account.balance}
            </p>
            <button className="Test" onClick={testfunction}>
		Test
            </button>
		{test && <div><strong>Ethereum network Address</strong>: {ethAddress}</div>}
	   </div>
        ) : (
          <>
            <p>You didn't login yet. Login to see your account details.</p>
            <button className="App-link" onClick={onClickLogin}>
		{visible && <div>Login</div>}
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

