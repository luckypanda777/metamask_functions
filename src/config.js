import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";

export const providerOptions = {
//  coinbasewallet: {
//    package: CoinbaseWalletSDK, 
//    options: {
//      appName: "Web 3 Modal Demo",
//      infuraId: '1e716887163b43889857f2a767573122'
//    }
//  },
//  walletconnect: {
//    package: WalletConnect, 
//    options: {
//      infuraId: '1e716887163b43889857f2a767573122'
//    }
//  }
};

export const configs = {
  1: {
    rpcUrl: ['https://mainnet.infura.io/v3/1e716887163b43889857f2a767573122'],
    chainId: '0x1',
  },
  56: {
    name: 'Binance Smart Chain Mainnet',
    rpcUrl: ['https://bsc-dataseed3.defibit.io/'],
    chainId: '0x38',
    currency: {
      symbol: 'BNB',
      decimals: 18,
    },
    explorer: 'https://bscscan.com/'
  },
  22052002: {
    name: 'Excelon Mainnet',
    rpcUrl: ['https://edgewallet1.xlon.org/'],
    chainId: '0x1507CA2',
    currency: {
      symbol: 'XLON',
      decimals: 18
    },
    explorer: 'https://explorer.excelon.io/',
  }
}

export const confTokens = {
  1: {
    type: 'ERC20',
    name: 'PARKGENE',
    symbol: 'GENE',
    contract: '0x6DD4e4Aad29A40eDd6A409b9c1625186C9855b4D',
    decimals: 8,
    icon: 'https://etherscan.io/token/images/Parkgene_28.png'
    // https://etherscan.io/token/0x6dd4e4aad29a40edd6a409b9c1625186c9855b4d
  },
  56: {
    type: 'ERC20',
    name: 'X-DEMOTOKEN',
    symbol: 'XDEM',
    contract: '0x8623836a92116F06c4cC1856ea4E3C3929541bFD',
    decimals: 18,
    icon: 'https://cdn.excelon.io/xlon/logo.png'
    // https://bscscan.com/address/0x8623836a92116f06c4cc1856ea4e3c3929541bfd
  }
}