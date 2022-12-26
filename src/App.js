import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Add from './components/Add'
import Payment from './components/Payment'
import Ledger from './components/Ledger'

// Config
import config from './config.json';

// ABIs
import Invoice from './abis/Invoice.json'

function App() {
    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null)

    const [invoice, setinvoice] = useState(null)
    const [message, setmessage] = useState([])

    const loadBlockchainData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const network = await provider.getNetwork()
      const invoice = new ethers.Contract(config[network.chainId].Invoice.address, Invoice, provider)
      setinvoice(invoice)

      const accounts = await window.ethereum.request({'method': 'eth_requestAccounts'}) //get the array of accounts
      const account = ethers.utils.getAddress(accounts[0])
      // console.log(account)
      setAccount(account)



      window.ethereum.on('accountsChanged', async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.utils.getAddress(accounts[0])
        setAccount(account);
      })
    }

    useEffect(() => {
      loadBlockchainData();
    }, [])

  return (
    <div>



      <div className='cards__section'>

        <h2 className='cards__title'>Welcome to Dygnify</h2>
        <p>wallet:- {account}</p>
    

      </div>

      <h2>ADD INVOICE DATA</h2>
      <Add invoice={invoice} provider={provider}/>
      <br />
      <br />

      <h2>UPDATE PAYMENT STATUS</h2>
      <Payment invoice={invoice} provider={provider}/>
      <br />
      <br />

      <h2>CHECK LEDGER BY BuyerPAN</h2>
      <Ledger invoice={invoice} provider={provider}/>
      <br />
      <br />

      

    </div>
  );
}

export default App;