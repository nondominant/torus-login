import { useState } from "react";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import wordmark from "./logo.svg";
import * as solanaWeb3 from '@solana/web3.js';
import "./App.css";
import { testMint } from "./mint.js";

export async function login(
	setAccount,
	setEthAddress,
	setCluster,
	setSolanaWallet,
	setSolanaAccount,
	setSignature
) {
//e.preventDefault();
    const torus = new Torus({});
    await torus.init({
      enableLogging: false,
    });
    await torus.login();
    const web3 = new Web3(torus.provider);
    const address = (await web3.eth.getAccounts())[0];
    const balance = await web3.eth.getBalance(address);
	//debug
	console.log("address: " + address);


	var connection = new solanaWeb3.Connection(
	solanaWeb3.clusterApiUrl('devnet'),
	'confirmed',
	);


	var wallet = solanaWeb3.Keypair.generate();
	var airdropSignature = await connection.requestAirdrop(
	wallet.publicKey,
	solanaWeb3.LAMPORTS_PER_SOL,
	);
	//debug
	await connection.confirmTransaction(airdropSignature);
	// get account info
	// account data is bytecode that needs to be deserialized
	// serialization and deserialization is program specic
	let account = await connection.getAccountInfo(wallet.publicKey);
	//debug

    setAccount({ address, balance });
    setEthAddress({address});
    setCluster(5);
    setSolanaWallet({wallet});
    setSolanaAccount({account});
testMint(setSignature);//lets see if this works

};




//	//This is a highly configured way to instantiate a torus login
//	const torus = new Torus({
//	  buttonPosition: "top-right", // The position of the Torus button. Supported values are top-left bottom-left top-right bottom-right.
//	});
//	await torus.init({
//	  showTorusButton: true, // Set to false to hide Torus button.
//	  enabledVerifiers: {
//	    facebook: false, // Hide certain types of logins (default will show all)
//	  },
//	  loginConfig: {
//	    // Customize login provider configurations.
//	    google: {
//	      description: "Login with google",
//	      clientId: "CLIENT_ID",
//	      logoHover: "https://sample.com/google-logo-hover.svg",
//	      logoLight: "https://sample.com/google-logo-light.svg",
//	      logoDark: "https://sample.com/google-logo-dark.svg",
//	      showOnModal: true,
//	    },
//	    // Customize brand logo, colors, and translation
//	    whitelabel: {
//	      theme: {
//		isDark: false,
//		colors: {
//		  torusBrand1: "#282c34",
//		},
//	      },
//	      logoDark: "https://tkey.surge.sh/images/Device.svg", // Dark logo for light background
//	      logoLight: "https://tkey.surge.sh/images/Device.svg", // Light logo for dark background
//	      topupHide: false,
//	      featuredBillboardHide: true,
//	      disclaimerHide: true,
//	      defaultLanguage: "en",
//	    },
//	  },
//	});
//	await torus.login();
//	const web3 = new Web3(torus.provider);
//	const address = (await web3.eth.getAccounts())[0];
//	const balance = await web3.eth.getBalance(address);
//	setAccount({address,balance});
//	 
//	};
