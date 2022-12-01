import logo from './logo.svg';
import './App.css';
import WalletInterface from './walletInterface';
import { browserName, CustomView } from 'react-device-detect';

function App() {

  return (
    <div className="App">
      <WalletInterface />
    </div>
  );
}

export default App;
