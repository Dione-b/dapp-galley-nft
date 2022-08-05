import './App.css';
import { ethers } from 'ethers';
import { useState } from 'react';

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
      await setData(result.assets);
      console.log(result);

    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div className="App">
      
      <h3 className='mt-4 text-light'>Gallery NFT</h3>
      
      {account === '' ? 
      (
        <button className='btn btn-primary button' onClick={connect}>Connect Button</button>
      ) : 
        <button className='btn btn-success button'>{shortenAddress(account)}</button>
      }

      

      <div className='Container row' id='main-card'>
        {
          data.map((nft, index) => {
            return (
              <div className='col-md-3 mt-2' key={index}>
                <div className="card p-2" style={{width: "15rem"}}>
                  <img src={nft.image_original_url}  width={100} height={230} className="card-img-top" alt="Card NFT"/>
                  <div className="card-body">
                    <h5 className="card-title text-light">{nft.name}</h5>
                    <hr className='text-light' />
                    <p className="card-text text-light">{nft.description}</p>
                  </div>
                </div>
              </div>
            
            )
          })
        }
      </div>
    </div>
  );
}

export default App;