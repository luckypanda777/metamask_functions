import React, { useState, useEffect } from 'react'

import Web3Modal from "web3modal";
import { ethers } from 'ethers';

import { providerOptions, configs, confTokens } from './config'
import { Radio } from 'react-loader-spinner';
import { BsCheck2All } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { getNativeBalance, getTokenBalance } from './utils'
import { browserName } from 'react-device-detect';

const Phrase = ({ current, real, content, err, className }) => {
  return (
    <div className={className}>
      <Radio
        visible={current === real && !err}
        height="50"
        width="50"
        ariaLabel="radio-loading"
        wrapperStyle={{}}
        wrapperClass="radio-wrapper"
      />
      {
        current > real &&
          <BsCheck2All style={{ color: 'green', width: '30px', height: '30px', marginRight: '5px' }} />
      }
      {
        current === real && err &&
          <ImCross style={{ color: 'red', width: '30px', height: '30px', marginRight: '5px' }} />
      }
      {
        current >= real && 
          <>{content}</>
      }
    </div>
  )
}

const WalletInterface = () => {

  const web3Modal = new Web3Modal({
      providerOptions
  });
  
  // const networks = [1, 56, 22052002]
  const browsers = ['Chrome', 'Firefox', 'Brave', 'Edge', 'Opera']
  
  // const [provider, setProvider] = useState();
  // const [library, setLibrary] = useState();
  const [account, setAccount] = useState('0xa69d84d6F26e4f5BA175B000Fd806Efa23B60F9E');
  const [curNet, setCurNet] = useState()
  const [bals, setBals] = useState([])

  const [step, setStep] = useState(1)
  const [err, setErr] = useState(false)

  window.ethereum && window.ethereum.on('chainChanged', (chainId) => {
    console.log(curNet)
    // setCurNet(parseInt(chainId, 16))
  });

  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  const changeNetwork = async (chainId) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: configs[chainId].chainId }],
        });
        return true
      } catch (err) {
        if (err.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: configs[chainId].name,
                  chainId: configs[chainId].chainId,
                  nativeCurrency: configs[chainId].currency,
                  rpcUrls: configs[chainId].rpcUrl
                }
              ]
            });
            return true;
          } catch (err) {
            return false;
          }
        }
        return false;
      }
    } 
  }

  const addAsset = async (chainId) => {
    try {
      await window.ethereum
        .request({
          method: 'wallet_watchAsset',
          params: {
            type: confTokens[chainId].type,
            options: {
              address: confTokens[chainId].contract,
              symbol: confTokens[chainId].symbol,
              decimals: confTokens[chainId].decimals,
              image: confTokens[chainId].icon,
            },
          },
        })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      console.log(library)
      // setProvider(provider);
      // setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setCurNet(network.chainId)
      setStep(3);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function s3() {
      // eslint-disable-next-line
      const tmp = await checking3()
      console.log(tmp)
      setErr(!tmp)
    }
    if(step === 1) {
      // eslint-disable-next-line
      checking1()
    }
    else if(step === 2) {
      setErr(window.ethereum ? false : true)
    }
    else if(step === 3) {
      s3()
    }
    else if(step === 4) {
      // eslint-disable-next-line
      checking4()
    }
  // eslint-disable-next-line
  }, [step])

  // eslint-disable-next-line
  const checking1 = () => {
    if(browsers.includes(browserName) === true) {
      setStep(2)
    } else {
      setErr(true)
    }
  }

  // eslint-disable-next-line
  const checking2 = () => {

    if(window.ethereum === undefined) {
      return <h5 style={{ color: 'darkred' }}> Please Install Metamask </h5> 
    } else {
      return <button onClick={connectWallet}>Connect</button>
    }
  }

  // eslint-disable-next-line
  const checking3 = async () => {
    {
      setStep(3.1)
      const res = await changeNetwork(1)
      setErr(!res)
      if(res === false) {
        return false 
      }
      if(res === true) {
        await delay(5000);
        setStep(3.3)
        const tmp = await addAsset(1)
        setErr(!tmp)
        if(tmp === false) return false
      }
    }
    {
      await delay(5000);
      setStep(3.5)
      const res = await changeNetwork(56)
      setErr(!res)
      if(res === false) { return false }
      else {
        await delay(5000);
        setStep(3.7)
        const tmp = await addAsset(56)
        setErr(!tmp)
        if(tmp === false) return false
      }
    }
    {
      await delay(5000);
      setStep(3.9)
      const res = await changeNetwork(22052002)
      setErr(!res)
      if(res === false) return false  
    }
    setStep(4)
    return true
  }

  // eslint-disable-next-line
  const checking4 = async () => {
    const eth = await getNativeBalance( configs[1].rpcUrl, account )
    const eth_token = await getTokenBalance( configs[1].rpcUrl, account, confTokens[1].contract, confTokens[1].decimals )
    const bsc = await getNativeBalance( configs[56].rpcUrl, account )
    const bsc_token = await getTokenBalance( configs[56].rpcUrl, account, confTokens[56].contract, confTokens[56].decimals )
    const xlon = await getNativeBalance( configs[22052002].rpcUrl, account )
    
    console.log(eth, bsc, xlon)
    console.log(eth_token, bsc_token)
    setBals([eth, bsc, xlon, eth_token, bsc_token])
    setStep(5)
  }

  const show4 = () => {
    return (
      <div className='ml-20'>
        <p> XLON = { bals[2] } { configs[22052002].currency.symbol }</p>
        <p> XLONERC20 = { bals[3] } { confTokens[1].symbol } </p> 
        <p> XLON BEP20 = { bals[4] } { confTokens[56].symbol } </p> 
        <p> ETH = { bals[0] } ETH </p> 
        <p> BNB = { bals[1] } BNB </p> 
      </div>
    )
  }

  return (
    <div style={{
      margin: '10px 30px'
    }}>
      <Phrase className={'Phrase'} current={step} real={1} content={<h4> 1. Checking Browser </h4>} err={err} />
      <Phrase className={'Phrase'} current={step} real={2} content={<h4> 2. Checking Metamask Installed </h4>} err={err} />
      {
        step === 2 && checking2()
      }
      <Phrase className={'Phrase'} current={step} real={3} content={<h4> 3. Preparing Metamask </h4>} err={err} />
      {/* {
        step >= 3 &&
          <div>
            <div style={{
              color: 'red',
              fontSize: '17.5px',
              fontWeight: 'bold',
              padding: '5px',
            }}>
              NOTE: If you feel that installing token doesn't work, please click your metamask extension icon. Like below...
            </div>
            <div className='guide'>
              <img src='/guide.gif' alt='guide_img' width="300px" />
            </div>
          </div>
      } */}
      <Phrase className={'Phrase ml-20'} current={step} real={3.1} content={<h5> a. Switching to Ethereum </h5>} err={err} />
      <Phrase className={'Phrase ml-20'} current={step} real={3.3} content={<h5> b. Installing ERC-20 Token </h5>} err={err} />
      <Phrase className={'Phrase ml-20'} current={step} real={3.5} content={<h5> c. Switching to BSC </h5>} err={err} />
      <Phrase className={'Phrase ml-20'} current={step} real={3.7} content={<h5> d. Installing BEP-20 Token </h5>} err={err} />
      <Phrase className={'Phrase ml-20'} current={step} real={3.9} content={<h5> e. Switching to XLON </h5>} err={err} />

      <Phrase className={'Phrase'} current={step} real={4} content={<h4> 4. Fetching Balances </h4>} err={err} />
      {
        step === 5 && show4()
      }

    </div>
  )

}

export default WalletInterface