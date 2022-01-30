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
          <li>
            <a href="/#link2" onClick={toggleMenu}>
              B
            </a>
          </li>
          
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
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <a className="hide-800" href="/#link1">
            Linky 1
          </a>
          <a className="hide-800" href="/#link2">
            Link 223423 
          </a>
          
          <a className="hide-800" href="/#link4">
            Link 423423
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
              <h1 className="pb-3">The Boiler Plate</h1>
              <p className="text-secondary-color">
                Welcome to the Boiler Plate
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

          <div id="link2" className="container">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac velit
            aliquet, semper sapien sed, ornare augue. Phasellus sed velit interdum,
            sagittis metus quis, facilisis lectus. Cras sollicitudin purus at magna
            eleifend maximus. Nulla nec nulla in nunc maximus viverra in at mauris.
            Fusce sodales dolor nisi, et vehicula orci porta id. In placerat nunc
            sed erat lacinia tincidunt. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Vestibulum commodo eget metus vitae tempus. Aliquam
            pharetra mi at efficitur accumsan. Curabitur venenatis libero a ex
            porttitor, at auctor turpis hendrerit. Nam commodo, risus non consequat
            pretium, erat ante auctor purus, a cursus dolor erat at velit. Maecenas
            dignissim, dolor sed laoreet aliquam, tortor lacus faucibus urna, eget
            mattis massa sem ac dui. Nam semper hendrerit interdum. Etiam at dictum
            nisi.
          </div>

          

          <div id="link4" className="container faq">
            <h1 style={{ padding: "0 0 24px 0" }}>FAQQQQ</h1>
            <div>
              <h4>Question 1</h4>
              <p>
                Blah 1
              </p>

              <hr />
            </div>

            <div>
              <h4>Lorem ipsum?</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                id metus id mauris tincidunt posuere. Vivamus neque odio, imperdiet
                vitae.
              </p>

              <hr />
            </div>

            <div>
              <h4>Lorem ipsum?</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                id metus id mauris tincidunt posuere. Vivamus neque odio, imperdiet
                vitae.
              </p>

              <hr />
            </div>
          </div>
      </div>
    </div>
  );
};

export default App;
