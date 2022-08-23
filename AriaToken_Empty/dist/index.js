/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (() => {

eval("App = {\n  web3Prvider: null,\n  contracts: {},\n  instance: null,\n  account: null,\n  test: null,\n\n  init: async function() {\n    return await App.initWeb3();\n  },\n  initWeb3: async function() {\n    if (window.ethereum) {\n      console.log(\"connected via window.ethereum\");\n      App.web3Provider = window.ethereum;\n      console.log(App.web3Provider);\n      try {\n        await window.ethereum.request({ method: \"eth_requestAccounts\" });;\n      } catch (error) {\n        console.error(\"User denied account access\")\n      }\n    }\n    else if (window.web3) {\n      console.log(\"connected via currentProvider\");\n      App.web3Provider = window.web3.currentProvider;\n    }\n    else {\n      console.log(\"connected via http://localhost:7545\");\n      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');\n    }\n    web3 = new Web3(App.web3Provider);\n    console.log(web3);\n\n    return App.initContract();\n  },\n  initAccount: function() {\n    account = web3.eth.coinbase;\n    console.log(account);\n    document.getElementById('account').innerHTML = account;\n  },\n  initContract: async function() {\n    $.getJSON('AriaToken.json', function(data) {\n      var AriaTokenArtifact = data;\n      App.contracts.AriaToken = window.TruffleContract(AriaTokenArtifact);\n      App.contracts.AriaToken.setProvider(App.web3Provider);\n\n      App.initAccount();\n      App.loadInstance();\n    });\n\n    return App.bindEvents();\n  },\n  bindEvents: function() {\n    $(document).on('click', '.btn-initAccount', App.initAccount);\n    $(document).on('click', '.btn-loadInstance', App.loadInstance);\n    $(document).on('click', '.btn-refrash', App.refrash);\n    $(document).on('click', '.btn-mintToken', App.handleMintToken);\n    $(document).on('click', '.btn-mintNFT', App.handleMintNFT);\n    $(document).on('click', '.btn-balanceOf', App.handleBalanceOf);\n  },\n  refrash: function() {\n    instance.lengthContents()\n    .then((result) => {\n      var count = result.toNumber();\n\n      var contentsRow = $('#contentsRow');\n      var contentTemplate = $('#contentTemplate');\n\n      contentsRow.empty();\n\n      for(var i = 0; i < count; i++) {\n        instance.contents(i).then((result) => {\n          contentTemplate.find('.content-id').text(result[0]);\n          contentTemplate.find('.content-title').text(result[1]);\n          contentTemplate.find('.content-artist').text(result[2]);\n\n          contentsRow.append(contentTemplate.html());\n        });\n      }\n\n      App.handleBalanceOf();\n    });\n  },\n  loadInstance: function() {\n    App.contracts.AriaToken.deployed().then(function(_instance) {\n      instance = _instance;\n      console.log(instance);\n\n      //App.refrash();\n    });\n  },\n  handleBalanceOf: function() {\n    // instance.findNFTId(\"Permission to Dance\", {from: account, gas: 300000})\n    // .then((result) => {\n    //   console.log(result.toNumber());\n    // });\n\n    // instance.numberOfNFTOwners(0, {from: account, gas: 300000})\n    // .then((result) => {\n    //   console.log(result.toNumber());\n    // });\n\n    instance.balanceOf(account, {from: account, gas: 300000})\n    .then((result) => {\n      document.getElementById('balanceOf').innerHTML = (result.toNumber() / 10**18) + \" ARA\";\n    });\n  },\n  handleMintToken: function() {\n    instance.mintToken({from: account, gas: 300000})\n    .then((result) => {\n      console.log(\"minted AriaTokens\");\n      App.refrash();\n    });\n  },\n  handleMintNFT: function() {\n    var title = document.getElementById('inputTitle').value;\n    var artist = document.getElementById('inputArtist').value;\n\n    instance.mintNFT(title, artist, \"\", {from: account, gas: 300000})\n    .then((result) => {\n      console.log(result);\n      App.refrash();\n    });\n  }\n};\n\n$(function() {\n  $(document).ready(function() {\n    App.init();\n  });\n});\n\n\n//# sourceURL=webpack://pet-shop/./src/js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/app.js"]();
/******/
/******/ })()
;