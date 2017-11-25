const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://www.blockathon.asia:8545/'));

async function store(msg) {
  const hemera = this;

  // web3.eth.getAccounts(console.log);

  // console.log(web3.eth.accounts.create());

  console.log(msg);
  return msg;
}

module.exports = store;
