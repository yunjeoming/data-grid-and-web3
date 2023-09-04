import Web3 from 'web3';

const BASE_URL = 'http://127.0.0.1:8545';

const web3Instance = new Web3(new Web3.providers.HttpProvider(BASE_URL));

export default web3Instance;
