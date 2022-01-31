import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";

import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";


const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet(), getSolletWallet(), getMathWallet() ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button" >
          <img src="/icons/close.svg" alt="" onClick={toggleMenu}/>
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/Users/jacobwong/Desktop/candymachine-v2-boiler-mint-site-noFLP/src/logo.png" alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
              A
            </a>
          </li>
          {/* <li>
            <a href="/#link2" onClick={toggleMenu}>
              B
            </a>
          </li> */}
          
          <li>
            <a href="/#link4" onClick={toggleMenu}>
              D
            </a>
          </li>
          <li>
            <div className="social-icons">
              
              <img className="nav-social" src="/icons/twitter.svg" alt="twitter.com" />
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo_gif.gif" alt="" />
          <a className="hide-800" href="/#link1">
            Mint
          </a>
          {/* <a className="hide-800" href="/#link2">
            About Sol Eyes
          </a> */}
          
          <a className="hide-800" href="/#link4">
            About Sol Eyes
          </a>
          <div className="social-icons hide-800">
            <a href="https://twitter.com/SolanaEyesNFT">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
          <header className="card" id="link1">
            <div style={{ padding: "0 24px 0 24px 0" }}>
              <h3 className="text-secondary-color">Welcome To</h3>
              <h1 className="pb-3">Sol Eyes</h1>
              <p className="text-secondary-color">
              Your view of the metaverse 0_0
              </p>
            </div>
            <div>
              <ThemeProvider theme={theme}>
                <ConnectionProvider endpoint={endpoint}>
                  <WalletProvider wallets={wallets} autoConnect>
                    <WalletDialogProvider>
                      
                        <Minter
                          candyMachineId={candyMachineId}
                          
                          connection={connection}
                          startDate={startDateSeed}
                          txTimeout={txTimeout}
                          rpcHost={rpcHost}
                        />
                      
                    </WalletDialogProvider>
                  </WalletProvider>
                </ConnectionProvider>
              </ThemeProvider>
            </div>
          </header>

          {/* <div id="link2" className="container">
            Sol Eyes 
          </div> */}

          

          <div id="link4" className="container faq">
            <h1 style={{ padding: "0 0 24px 0" }}>FAQ</h1>
            <div>
              <h4>1. What are Sol Eyes?</h4>
              <p>
                Sol Eyes are a generative art collection of 222 on the Solana blockchain. Mint price 0.22 Sol.
              </p>

              <hr />
            </div>

            <div>
              <h4>2. Why Eyes?</h4>
              <p>
                Eyes are how we experience the MEATverse. Sol Eyes are how we experience the METAverse. Sol Eyes are the genesis collection for a series of generative art projects. Our vision is to be a platform for generative artists to showcase their work on the Solana blockchain.
              </p>

              <hr />
            </div>

            <div>
              <h4>3. Roadmap?</h4>
              <p>
                Art only. Vibes only. Or??
              </p>

              <hr />
            </div>

            <div>
              <h4>4. Team?</h4>
              <p>
                Banksy? Zuck? Shkreli?
              </p>

              <hr />
            </div>

            <div>
              <h4>5. GM?</h4>
              <p>
                GM.
              </p>

              <hr />
            </div>
          </div>
      </div>
    </div>
  );
};

export default App;
