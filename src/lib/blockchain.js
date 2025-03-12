import Web3 from 'web3';
import api from './api';

// Contract ABIs
import DocumentVerificationABI from '../../blockchain/contracts/DocumentVerification.json';

// Contract addresses
const CONTRACT_ADDRESSES = {
  documentVerification: process.env.NEXT_PUBLIC_DOCUMENT_VERIFICATION_CONTRACT || '0x1234567890123456789012345678901234567890',
  identityManager: process.env.NEXT_PUBLIC_IDENTITY_MANAGER_CONTRACT || '0x0987654321098765432109876543210987654321',
};

let web3Instance = null;

export const blockchain = {
  /**
   * Initialize Web3 with provider
   */
  async initWeb3() {
    if (typeof window !== 'undefined' && window.ethereum) {
      web3Instance = new Web3(window.ethereum);
      return web3Instance;
    } else if (typeof window !== 'undefined' && window.web3) {
      web3Instance = new Web3(window.web3.currentProvider);
      return web3Instance;
    } else {
      // Fallback to a public provider if no injected provider is available
      const provider = new Web3.providers.HttpProvider(
        process.env.NEXT_PUBLIC_INFURA_URL || 'https://mainnet.infura.io/v3/your-infura-key'
      );
      web3Instance = new Web3(provider);
      return web3Instance;
    }
  },

  /**
   * Get the Web3 instance
   */
  getWeb3() {
    if (!web3Instance) {
      return this.initWeb3();
    }
    return web3Instance;
  },

  /**
   * Connect wallet
   */
  async connectWallet() {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      const web3 = await this.getWeb3();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }
      
      return {
        account: accounts[0],
        web3
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  },

  /**
   * Get connected account
   */
  async getConnectedAccount() {
    if (typeof window === 'undefined' || !window.ethereum) {
      return null;
    }

    try {
      const web3 = await this.getWeb3();
      const accounts = await web3.eth.getAccounts();
      return accounts[0] || null;
    } catch (error) {
      console.error('Error getting connected account:', error);
      return null;
    }
  },

  /**
   * Get account balance
   */
  async getBalance(address) {
    if (!address) {
      throw new Error('Address is required');
    }

    try {
      const web3 = await this.getWeb3();
      const balanceWei = await web3.eth.getBalance(address);
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
      return balanceEth;
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  },

  /**
   * Deploy a smart contract
   */
  async deployContract(contractName, abi, bytecode, args = [], account) {
    if (!account) {
      throw new Error('Account is required to deploy a contract');
    }

    try {
      const web3 = await this.getWeb3();
      const contract = new web3.eth.Contract(abi);
      
      const deployMethod = contract.deploy({
        data: bytecode,
        arguments: args
      });
      
      const gas = await deployMethod.estimateGas();
      
      const deployedContract = await deployMethod.send({
        from: account,
        gas
      });
      
      // Save the contract address to the backend
      await api.post('/api/blockchain/contracts', {
        name: contractName,
        address: deployedContract.options.address,
        abi: JSON.stringify(abi),
        owner: account
      });
      
      return deployedContract;
    } catch (error) {
      console.error('Error deploying contract:', error);
      throw error;
    }
  },

  /**
   * Get contract instance
   */
  async getContract(contractName) {
    try {
      const web3 = await this.getWeb3();
      
      let contractAddress, contractABI;
      
      // Determine the contract based on the name
      switch (contractName) {
        case 'documentVerification':
          contractAddress = CONTRACT_ADDRESSES.documentVerification;
          contractABI = DocumentVerificationABI;
          break;
        default:
          throw new Error(`Unknown contract: ${contractName}`);
      }
      
      return new web3.eth.Contract(contractABI, contractAddress);
    } catch (error) {
      console.error(`Error getting ${contractName} contract:`, error);
      throw error;
    }
  },

  /**
   * Execute a contract function
   */
  async executeContractFunction(contractName, functionName, args = [], options = {}) {
    try {
      const contract = await this.getContract(contractName);
      const account = await this.getConnectedAccount();
      
      if (!account && options.requiresAccount !== false) {
        throw new Error('No connected account found');
      }
      
      const method = contract.methods[functionName](...args);
      
      // If it's a read operation, just call it
      if (options.call) {
        return await method.call(options.callOptions || {});
      }
      
      // Otherwise, send a transaction
      const gas = await method.estimateGas({ from: account });
      
      const receipt = await method.send({
        from: account,
        gas,
        ...options.sendOptions
      });
      
      return receipt;
    } catch (error) {
      console.error(`Error executing ${functionName} on ${contractName}:`, error);
      throw error;
    }
  },

  /**
   * Get transaction history for an address
   */
  async getTransactionHistory(address) {
    if (!address) {
      throw new Error('Address is required');
    }

    try {
      // This would typically come from an indexed service like Etherscan
      // We're mocking this with our API
      const response = await api.get(`/api/blockchain/transactions?address=${address}`);
      return response.data.transactions;
    } catch (error) {
      console.error('Error getting transaction history:', error);
      throw error;
    }
  }
}; 