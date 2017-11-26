const Web3 = require('web3');
const PROVIDER = new Web3.providers.HttpProvider('http://www.blockathon.asia:8545/');

const web3 = new Web3(PROVIDER);

const CONTRACT_ADDRESS = '0x6efF9987c1449485A4779B972a7FD11758F3EAA4';

const medicalRecordABI = require('../build/contracts/MedicalRecord.json');
const medicalRecord = new web3.eth.Contract(medicalRecordABI['abi'], CONTRACT_ADDRESS);

module.exports = privateKey => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  return medicalRecord.methods.getLink().call({
    from: account.address,
    to: CONTRACT_ADDRESS
  });
  // medicalRecord.methods
  //   .getHash()
  //   .call({
  //     from: account.address,
  //     to: contractAddress
  //   })
  //   .then(res => console.log(res));
};
