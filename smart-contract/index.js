// var Web3 = require('web3');
// var provider = new Web3.providers.HttpProvider('http://www.blockathon.asia:8545/');
// var web3 = new Web3(provider);
// var medicalRecordABI = require('./build/contracts/MedicalRecord.json');
// var contractAddress = '0x6efF9987c1449485A4779B972a7FD11758F3EAA4';
// var medicalRecord = new web3.eth.Contract(medicalRecordABI['abi'], contractAddress);
// var storeDataABI = medicalRecord.methods
//   .updateRecord('this is the link', 'this is the hash')
//   .encodeABI();
// var privateKey = '0x00b6063d48f4d57e6710976a124631c94cb14ae35a93525defd24bf9da1d562c';
// var account = web3.eth.accounts.privateKeyToAccount(privateKey);
// // web3.eth.accounts.signTransaction({
// //     "data": storeDataABI,
// //     "gas": 2000000,
// //     "to": contractAddress
// // }, privateKey,
// //     function (err, res) {
// //         var signedTransaction = res.rawTransaction;
// //         web3.eth.sendSignedTransaction(signedTransaction, function (err, res) {
// //             console.log(err)
// //             console.log(res)
// //         })
// //     }
// // )
// // console.log(account.address)
// medicalRecord.methods
//   .getLink()
//   .call({
//     from: account.address,
//     to: contractAddress
//   })
//   .then(res => console.log(res));
// medicalRecord.methods
//   .getHash()
//   .call({
//     from: account.address,
//     to: contractAddress
//   })
//   .then(res => console.log(res));

// const store = require('./utils/store');

// store('0x84366be4d85a9928be4a117a107262ca6c48ab8b30732a11ceb46afe3e6788de', {
//   link: 'google.com'
// }).then(res => {
//   console.log('res', res);
// });

// const retrieve = require('./utils/retrieve');

// retrieve('0x84366be4d85a9928be4a117a107262ca6c48ab8b30732a11ceb46afe3e6788de').then(res => {
//   console.log('res', res);
// });
