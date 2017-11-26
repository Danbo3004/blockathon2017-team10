const Web3 = require('web3');
const PROVIDER = new Web3.providers.HttpProvider('http://www.blockathon.asia:8545/');

const web3 = new Web3(PROVIDER);

const CONTRACT_ADDRESS = '0x6efF9987c1449485A4779B972a7FD11758F3EAA4';

const medicalRecordABI = require('../build/contracts/MedicalRecord.json');
const medicalRecord = new web3.eth.Contract(medicalRecordABI['abi'], CONTRACT_ADDRESS);

module.exports = (privateKey, data) => {
  let { link, hash } = data;
  link = link || '';
  hash = hash || '';
  const storeDataABI = medicalRecord.methods.storeRecord(link, hash).encodeABI();

  return web3.eth.accounts.signTransaction(
    {
      data: storeDataABI,
      gas: 2000000,
      to: CONTRACT_ADDRESS
    },
    privateKey,
    function(err, res) {
      if (err) return Promise.reject(err);

      const signedTransaction = res.rawTransaction;
      return web3.eth.sendSignedTransaction(signedTransaction);
    }
  );
};
