import { useState } from "react";
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import wordmark from "./logo.svg";
import "./App.css";

export async function login(e) {
e.preventDefault();

//This is a highly configured way to instantiate a torus login
const torus = new Torus({
  buttonPosition: "top-right", // The position of the Torus button. Supported values are top-left bottom-left top-right bottom-right.
});
await torus.init({
  showTorusButton: true, // Set to false to hide Torus button.
  enabledVerifiers: {
    facebook: false, // Hide certain types of logins (default will show all)
  },
  loginConfig: {
    // Customize login provider configurations.
    google: {
      description: "Login with google",
      clientId: "CLIENT_ID",
      logoHover: "https://sample.com/google-logo-hover.svg",
      logoLight: "https://sample.com/google-logo-light.svg",
      logoDark: "https://sample.com/google-logo-dark.svg",
      showOnModal: true,
    },
    // Customize brand logo, colors, and translation
    whitelabel: {
      theme: {
        isDark: false,
        colors: {
          torusBrand1: "#282c34",
        },
      },
      logoDark: "https://tkey.surge.sh/images/Device.svg", // Dark logo for light background
      logoLight: "https://tkey.surge.sh/images/Device.svg", // Light logo for dark background
      topupHide: false,
      featuredBillboardHide: true,
      disclaimerHide: true,
      defaultLanguage: "en",
    },
  },
});
await torus.login();
const web3 = new Web3(torus.provider);
const address = (await web3.eth.getAccounts())[0];
const balance = await web3.eth.getBalance(address);
setAccount({address,balance});
 
};
 
//This is the default way ton instantiate a new torus instance
//    const torus = new Torus({});
//    await torus.init({
//      enableLogging: false,
//    });
//
//    await torus.login();
//
//    const web3 = new Web3(torus.provider);
//    const address = (await web3.eth.getAccounts())[0];
//    const balance = await web3.eth.getBalance(address);
//    setAccount({ address, balance });
//  };


