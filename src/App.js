import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';
import twitterLogo from "./assets/twitter-logo.svg"

const TWITTER_HANDLE = "Diiibastos"
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`


function App() {

  const [account, setAccount] = useState("");
  const [data, setData] = useState([]);

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let res = await provider.send("eth_requestAccounts", []);
    setAccount(res[0])
    await getData(res[0])
  }

  // Uma função para diminuir o endereço da carteira de alguém, não é necessário mostrar a coisa toda.
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  const getData = async (_account) => {
    try {

      const options = { method: "GET", headers: { Accept: "application/json"} };
      let result = await fetch(
        `https://testnets-api.opensea.io/api/v1/assets?owner=${_account}&order_direction=desc&limit=8&include_orders=false`, 
        options
      );
      
      result = await result.json();

      setData(result.assets);
      console.log(result);

    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="App">
      
      <h2 className='mt-2 text-light fw-bolder'>Gallery NFT</h2>
      
      {account === '' ? 
      (
        <button className='cta-button connect-wallet-button mt-4' onClick={connect}>Connect Button</button>
      ) : 
        <button className='cta-button connect-wallet-button m-4'>{shortenAddress(account)}</button>
      }

      <div className='Container row justify-content-center' id='main-card'>
        {
          data.map((nft, index) => {
            return (
              <div className='col-md-3 mt-2' key={index}>
                <div className="card p-2" style={{width: "15rem"}}>
                  <img src={nft.image_original_url}  width={95} height={170} className="card-img-top" alt="Card NFT"/>
                  <div className="card-body">
                    <h5 className="card-title text-light">{nft.name}</h5>
                    <hr className='text-light' />
                    <div className='col-lg-12' style={{height: "3.8rem"}}>
                    <p className="card-text text-light">{nft.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            
            )
          })
        }
      </div>
    <footer>
    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
      <a
        className="footer-text"
        href={TWITTER_LINK}
        target="_blank"
        rel="noreferrer"
      >{`feito com ❤️ por @${TWITTER_HANDLE}`}</a>
    </footer>
  </div>
  );
}

export default App;