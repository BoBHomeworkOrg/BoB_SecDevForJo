const { default: Web3 } = require("web3");

App = {
  web3Provider: null,
  contracts: {},
  instance: null,
  account: null,
  data: {
    "contractName": "AriaToken",
    "abi": [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          }
        ],
        "name": "mintedToken",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
          }
        ],
        "name": "decreaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "mintToken",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
          }
        ],
        "name": "transferToken",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    "metadata": "{\"compiler\":{\"version\":\"0.8.12+commit.f00d7308\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"balance\",\"type\":\"uint256\"}],\"name\":\"mintedToken\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"internalType\":\"uint8\",\"name\":\"\",\"type\":\"uint8\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"subtractedValue\",\"type\":\"uint256\"}],\"name\":\"decreaseAllowance\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"spender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"addedValue\",\"type\":\"uint256\"}],\"name\":\"increaseAllowance\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"mintToken\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"transferToken\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{\"allowance(address,address)\":{\"details\":\"See {IERC20-allowance}.\"},\"approve(address,uint256)\":{\"details\":\"See {IERC20-approve}. NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address.\"},\"balanceOf(address)\":{\"details\":\"See {IERC20-balanceOf}.\"},\"decimals()\":{\"details\":\"Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the value {ERC20} uses, unless this function is overridden; NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}.\"},\"decreaseAllowance(address,uint256)\":{\"details\":\"Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`.\"},\"increaseAllowance(address,uint256)\":{\"details\":\"Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address.\"},\"name()\":{\"details\":\"Returns the name of the token.\"},\"symbol()\":{\"details\":\"Returns the symbol of the token, usually a shorter version of the name.\"},\"totalSupply()\":{\"details\":\"See {IERC20-totalSupply}.\"},\"transfer(address,uint256)\":{\"details\":\"See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `amount`.\"},\"transferFrom(address,address,uint256)\":{\"details\":\"See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `amount`. - the caller must have allowance for ``from``'s tokens of at least `amount`.\"}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"project:/contracts/AriaToken.sol\":\"AriaToken\"},\"evmVersion\":\"london\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":false,\"runs\":200},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/token/ERC20/ERC20.sol\":{\"keccak256\":\"0xdadd41acb749920eccf40aeaa8d291adf9751399a7343561bad13e7a8d99be0b\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://12af4ac016f9fdf3be5d15824f4292272aa11f6b2e0192a0f7320f5ad49bbbf0\",\"dweb:/ipfs/QmRXMpdqCgA3TYuYxBodqs5p9jGbnMW6xa2gvjppvq4TWk\"]},\"@openzeppelin/contracts/token/ERC20/IERC20.sol\":{\"keccak256\":\"0xbbc8ac883ac3c0078ce5ad3e288fbb3ffcc8a30c3a98c0fda0114d64fc44fca2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://87a7a5d2f6f63f84598af02b8c50ca2df2631cb8ba2453e8d95fcb17e4be9824\",\"dweb:/ipfs/QmR76hqtAcRqoFj33tmNjcWTLrgNsAaakYwnKZ8zoJtKei\"]},\"@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol\":{\"keccak256\":\"0x8de418a5503946cabe331f35fe242d3201a73f67f77aaeb7110acb1f30423aca\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://5a376d3dda2cb70536c0a45c208b29b34ac560c4cb4f513a42079f96ba47d2dd\",\"dweb:/ipfs/QmZQg6gn1sUpM8wHzwNvSnihumUCAhxD119MpXeKp8B9s8\"]},\"@openzeppelin/contracts/utils/Context.sol\":{\"keccak256\":\"0xe2e337e6dde9ef6b680e07338c493ebea1b5fd09b43424112868e9cc1706bca7\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6df0ddf21ce9f58271bdfaa85cde98b200ef242a05a3f85c2bc10a8294800a92\",\"dweb:/ipfs/QmRK2Y5Yc6BK7tGKkgsgn3aJEQGi5aakeSPZvS65PV8Xp3\"]},\"project:/contracts/AriaToken.sol\":{\"keccak256\":\"0x467dbe38fe32733877f4bd397a36af567291edd4346f3f316e1bd0ff7ec7e34a\",\"urls\":[\"bzz-raw://cc5f2169eb18e3f444f88c8348d946521ae4b6c4cf5bb9f7dc5faa52c96e3b48\",\"dweb:/ipfs/QmUZDECFLEKz2bef8MJ3QhbzT9CV4LUJ33Rr2kYMz6p6k5\"]}},\"version\":1}",
    "bytecode": "0x60806040523480156200001157600080fd5b506040518060400160405280600981526020017f41726961546f6b656e00000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4152410000000000000000000000000000000000000000000000000000000000815250816003908051906020019062000096929190620000f9565b508060049080519060200190620000af929190620000f9565b50505033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506200020e565b8280546200010790620001d8565b90600052602060002090601f0160209004810192826200012b576000855562000177565b82601f106200014657805160ff191683800117855562000177565b8280016001018555821562000177579182015b828111156200017657825182559160200191906001019062000159565b5b5090506200018691906200018a565b5090565b5b80821115620001a55760008160009055506001016200018b565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620001f157607f821691505b60208210811415620002085762000207620001a9565b5b50919050565b611649806200021e6000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063395093511161008c57806395d89b411161006657806395d89b4114610275578063a457c2d714610293578063a9059cbb146102c3578063dd62ed3e146102f3576100ea565b806339509351146101f757806370a08231146102275780638da5cb5b14610257576100ea565b806318160ddd116100c857806318160ddd1461016d5780632004ffd91461018b57806323b872dd146101a9578063313ce567146101d9576100ea565b806306fdde03146100ef578063095ea7b31461010d5780631072cbea1461013d575b600080fd5b6100f7610323565b6040516101049190610e6d565b60405180910390f35b61012760048036038101906101229190610f28565b6103b5565b6040516101349190610f83565b60405180910390f35b61015760048036038101906101529190610f28565b6103d8565b6040516101649190610f83565b60405180910390f35b6101756103ef565b6040516101829190610fad565b60405180910390f35b6101936103f9565b6040516101a09190610f83565b60405180910390f35b6101c360048036038101906101be9190610fc8565b610414565b6040516101d09190610f83565b60405180910390f35b6101e1610443565b6040516101ee9190611037565b60405180910390f35b610211600480360381019061020c9190610f28565b61044c565b60405161021e9190610f83565b60405180910390f35b610241600480360381019061023c9190611052565b6104f6565b60405161024e9190610fad565b60405180910390f35b61025f61053e565b60405161026c919061108e565b60405180910390f35b61027d610564565b60405161028a9190610e6d565b60405180910390f35b6102ad60048036038101906102a89190610f28565b6105f6565b6040516102ba9190610f83565b60405180910390f35b6102dd60048036038101906102d89190610f28565b6106e0565b6040516102ea9190610f83565b60405180910390f35b61030d600480360381019061030891906110a9565b610703565b60405161031a9190610fad565b60405180910390f35b60606003805461033290611118565b80601f016020809104026020016040519081016040528092919081815260200182805461035e90611118565b80156103ab5780601f10610380576101008083540402835291602001916103ab565b820191906000526020600020905b81548152906001019060200180831161038e57829003601f168201915b5050505050905090565b6000806103c061078a565b90506103cd818585610792565b600191505092915050565b60006103e533848461095d565b6001905092915050565b6000600254905090565b600061040d33670de0b6b3a7640000610bde565b6001905090565b60008061041f61078a565b905061042c858285610d3e565b61043785858561095d565b60019150509392505050565b60006012905090565b60008061045761078a565b90506104eb818585600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104e69190611179565b610792565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606004805461057390611118565b80601f016020809104026020016040519081016040528092919081815260200182805461059f90611118565b80156105ec5780601f106105c1576101008083540402835291602001916105ec565b820191906000526020600020905b8154815290600101906020018083116105cf57829003601f168201915b5050505050905090565b60008061060161078a565b90506000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050838110156106c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106be90611241565b60405180910390fd5b6106d48286868403610792565b60019250505092915050565b6000806106eb61078a565b90506106f881858561095d565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610802576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107f9906112d3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610872576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086990611365565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109509190610fad565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156109cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c4906113f7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3490611489565b60405180910390fd5b610a48838383610dca565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610ace576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac59061151b565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b619190611179565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bc59190610fad565b60405180910390a3610bd8848484610dcf565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4590611587565b60405180910390fd5b610c5a60008383610dca565b8060026000828254610c6c9190611179565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610cc19190611179565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d269190610fad565b60405180910390a3610d3a60008383610dcf565b5050565b6000610d4a8484610703565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610dc45781811015610db6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dad906115f3565b60405180910390fd5b610dc38484848403610792565b5b50505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610e0e578082015181840152602081019050610df3565b83811115610e1d576000848401525b50505050565b6000601f19601f8301169050919050565b6000610e3f82610dd4565b610e498185610ddf565b9350610e59818560208601610df0565b610e6281610e23565b840191505092915050565b60006020820190508181036000830152610e878184610e34565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ebf82610e94565b9050919050565b610ecf81610eb4565b8114610eda57600080fd5b50565b600081359050610eec81610ec6565b92915050565b6000819050919050565b610f0581610ef2565b8114610f1057600080fd5b50565b600081359050610f2281610efc565b92915050565b60008060408385031215610f3f57610f3e610e8f565b5b6000610f4d85828601610edd565b9250506020610f5e85828601610f13565b9150509250929050565b60008115159050919050565b610f7d81610f68565b82525050565b6000602082019050610f986000830184610f74565b92915050565b610fa781610ef2565b82525050565b6000602082019050610fc26000830184610f9e565b92915050565b600080600060608486031215610fe157610fe0610e8f565b5b6000610fef86828701610edd565b935050602061100086828701610edd565b925050604061101186828701610f13565b9150509250925092565b600060ff82169050919050565b6110318161101b565b82525050565b600060208201905061104c6000830184611028565b92915050565b60006020828403121561106857611067610e8f565b5b600061107684828501610edd565b91505092915050565b61108881610eb4565b82525050565b60006020820190506110a3600083018461107f565b92915050565b600080604083850312156110c0576110bf610e8f565b5b60006110ce85828601610edd565b92505060206110df85828601610edd565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061113057607f821691505b60208210811415611144576111436110e9565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061118482610ef2565b915061118f83610ef2565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156111c4576111c361114a565b5b828201905092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b600061122b602583610ddf565b9150611236826111cf565b604082019050919050565b6000602082019050818103600083015261125a8161121e565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006112bd602483610ddf565b91506112c882611261565b604082019050919050565b600060208201905081810360008301526112ec816112b0565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b600061134f602283610ddf565b915061135a826112f3565b604082019050919050565b6000602082019050818103600083015261137e81611342565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006113e1602583610ddf565b91506113ec82611385565b604082019050919050565b60006020820190508181036000830152611410816113d4565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611473602383610ddf565b915061147e82611417565b604082019050919050565b600060208201905081810360008301526114a281611466565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611505602683610ddf565b9150611510826114a9565b604082019050919050565b60006020820190508181036000830152611534816114f8565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000611571601f83610ddf565b915061157c8261153b565b602082019050919050565b600060208201905081810360008301526115a081611564565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b60006115dd601d83610ddf565b91506115e8826115a7565b602082019050919050565b6000602082019050818103600083015261160c816115d0565b905091905056fea2646970667358221220ab2f7c0eb4844eabe905b432df063d6f17a0d92eb77d2ea956707c0aa8a1b28f64736f6c634300080c0033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063395093511161008c57806395d89b411161006657806395d89b4114610275578063a457c2d714610293578063a9059cbb146102c3578063dd62ed3e146102f3576100ea565b806339509351146101f757806370a08231146102275780638da5cb5b14610257576100ea565b806318160ddd116100c857806318160ddd1461016d5780632004ffd91461018b57806323b872dd146101a9578063313ce567146101d9576100ea565b806306fdde03146100ef578063095ea7b31461010d5780631072cbea1461013d575b600080fd5b6100f7610323565b6040516101049190610e6d565b60405180910390f35b61012760048036038101906101229190610f28565b6103b5565b6040516101349190610f83565b60405180910390f35b61015760048036038101906101529190610f28565b6103d8565b6040516101649190610f83565b60405180910390f35b6101756103ef565b6040516101829190610fad565b60405180910390f35b6101936103f9565b6040516101a09190610f83565b60405180910390f35b6101c360048036038101906101be9190610fc8565b610414565b6040516101d09190610f83565b60405180910390f35b6101e1610443565b6040516101ee9190611037565b60405180910390f35b610211600480360381019061020c9190610f28565b61044c565b60405161021e9190610f83565b60405180910390f35b610241600480360381019061023c9190611052565b6104f6565b60405161024e9190610fad565b60405180910390f35b61025f61053e565b60405161026c919061108e565b60405180910390f35b61027d610564565b60405161028a9190610e6d565b60405180910390f35b6102ad60048036038101906102a89190610f28565b6105f6565b6040516102ba9190610f83565b60405180910390f35b6102dd60048036038101906102d89190610f28565b6106e0565b6040516102ea9190610f83565b60405180910390f35b61030d600480360381019061030891906110a9565b610703565b60405161031a9190610fad565b60405180910390f35b60606003805461033290611118565b80601f016020809104026020016040519081016040528092919081815260200182805461035e90611118565b80156103ab5780601f10610380576101008083540402835291602001916103ab565b820191906000526020600020905b81548152906001019060200180831161038e57829003601f168201915b5050505050905090565b6000806103c061078a565b90506103cd818585610792565b600191505092915050565b60006103e533848461095d565b6001905092915050565b6000600254905090565b600061040d33670de0b6b3a7640000610bde565b6001905090565b60008061041f61078a565b905061042c858285610d3e565b61043785858561095d565b60019150509392505050565b60006012905090565b60008061045761078a565b90506104eb818585600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546104e69190611179565b610792565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60606004805461057390611118565b80601f016020809104026020016040519081016040528092919081815260200182805461059f90611118565b80156105ec5780601f106105c1576101008083540402835291602001916105ec565b820191906000526020600020905b8154815290600101906020018083116105cf57829003601f168201915b5050505050905090565b60008061060161078a565b90506000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050838110156106c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106be90611241565b60405180910390fd5b6106d48286868403610792565b60019250505092915050565b6000806106eb61078a565b90506106f881858561095d565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610802576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107f9906112d3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610872576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161086990611365565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109509190610fad565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156109cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c4906113f7565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3490611489565b60405180910390fd5b610a48838383610dca565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610ace576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ac59061151b565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b619190611179565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bc59190610fad565b60405180910390a3610bd8848484610dcf565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4590611587565b60405180910390fd5b610c5a60008383610dca565b8060026000828254610c6c9190611179565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610cc19190611179565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d269190610fad565b60405180910390a3610d3a60008383610dcf565b5050565b6000610d4a8484610703565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610dc45781811015610db6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dad906115f3565b60405180910390fd5b610dc38484848403610792565b5b50505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610e0e578082015181840152602081019050610df3565b83811115610e1d576000848401525b50505050565b6000601f19601f8301169050919050565b6000610e3f82610dd4565b610e498185610ddf565b9350610e59818560208601610df0565b610e6281610e23565b840191505092915050565b60006020820190508181036000830152610e878184610e34565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ebf82610e94565b9050919050565b610ecf81610eb4565b8114610eda57600080fd5b50565b600081359050610eec81610ec6565b92915050565b6000819050919050565b610f0581610ef2565b8114610f1057600080fd5b50565b600081359050610f2281610efc565b92915050565b60008060408385031215610f3f57610f3e610e8f565b5b6000610f4d85828601610edd565b9250506020610f5e85828601610f13565b9150509250929050565b60008115159050919050565b610f7d81610f68565b82525050565b6000602082019050610f986000830184610f74565b92915050565b610fa781610ef2565b82525050565b6000602082019050610fc26000830184610f9e565b92915050565b600080600060608486031215610fe157610fe0610e8f565b5b6000610fef86828701610edd565b935050602061100086828701610edd565b925050604061101186828701610f13565b9150509250925092565b600060ff82169050919050565b6110318161101b565b82525050565b600060208201905061104c6000830184611028565b92915050565b60006020828403121561106857611067610e8f565b5b600061107684828501610edd565b91505092915050565b61108881610eb4565b82525050565b60006020820190506110a3600083018461107f565b92915050565b600080604083850312156110c0576110bf610e8f565b5b60006110ce85828601610edd565b92505060206110df85828601610edd565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061113057607f821691505b60208210811415611144576111436110e9565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061118482610ef2565b915061118f83610ef2565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156111c4576111c361114a565b5b828201905092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b600061122b602583610ddf565b9150611236826111cf565b604082019050919050565b6000602082019050818103600083015261125a8161121e565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006112bd602483610ddf565b91506112c882611261565b604082019050919050565b600060208201905081810360008301526112ec816112b0565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b600061134f602283610ddf565b915061135a826112f3565b604082019050919050565b6000602082019050818103600083015261137e81611342565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b60006113e1602583610ddf565b91506113ec82611385565b604082019050919050565b60006020820190508181036000830152611410816113d4565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611473602383610ddf565b915061147e82611417565b604082019050919050565b600060208201905081810360008301526114a281611466565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611505602683610ddf565b9150611510826114a9565b604082019050919050565b60006020820190508181036000830152611534816114f8565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000611571601f83610ddf565b915061157c8261153b565b602082019050919050565b600060208201905081810360008301526115a081611564565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b60006115dd601d83610ddf565b91506115e8826115a7565b602082019050919050565b6000602082019050818103600083015261160c816115d0565b905091905056fea2646970667358221220ab2f7c0eb4844eabe905b432df063d6f17a0d92eb77d2ea956707c0aa8a1b28f64736f6c634300080c0033",
    "immutableReferences": {},
    "generatedSources": [
      {
        "ast": {
          "nodeType": "YulBlock",
          "src": "0:516:7",
          "statements": [
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "35:152:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "52:1:7",
                          "type": "",
                          "value": "0"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "55:77:7",
                          "type": "",
                          "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "45:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "45:88:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "45:88:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "149:1:7",
                          "type": "",
                          "value": "4"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "152:4:7",
                          "type": "",
                          "value": "0x22"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "142:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "142:15:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "142:15:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "173:1:7",
                          "type": "",
                          "value": "0"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "176:4:7",
                          "type": "",
                          "value": "0x24"
                        }
                      ],
                      "functionName": {
                        "name": "revert",
                        "nodeType": "YulIdentifier",
                        "src": "166:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "166:15:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "166:15:7"
                  }
                ]
              },
              "name": "panic_error_0x22",
              "nodeType": "YulFunctionDefinition",
              "src": "7:180:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "244:269:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "254:22:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "data",
                          "nodeType": "YulIdentifier",
                          "src": "268:4:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "274:1:7",
                          "type": "",
                          "value": "2"
                        }
                      ],
                      "functionName": {
                        "name": "div",
                        "nodeType": "YulIdentifier",
                        "src": "264:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "264:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "254:6:7"
                      }
                    ]
                  },
                  {
                    "nodeType": "YulVariableDeclaration",
                    "src": "285:38:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "data",
                          "nodeType": "YulIdentifier",
                          "src": "315:4:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "321:1:7",
                          "type": "",
                          "value": "1"
                        }
                      ],
                      "functionName": {
                        "name": "and",
                        "nodeType": "YulIdentifier",
                        "src": "311:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "311:12:7"
                    },
                    "variables": [
                      {
                        "name": "outOfPlaceEncoding",
                        "nodeType": "YulTypedName",
                        "src": "289:18:7",
                        "type": ""
                      }
                    ]
                  },
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "362:51:7",
                      "statements": [
                        {
                          "nodeType": "YulAssignment",
                          "src": "376:27:7",
                          "value": {
                            "arguments": [
                              {
                                "name": "length",
                                "nodeType": "YulIdentifier",
                                "src": "390:6:7"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "398:4:7",
                                "type": "",
                                "value": "0x7f"
                              }
                            ],
                            "functionName": {
                              "name": "and",
                              "nodeType": "YulIdentifier",
                              "src": "386:3:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "386:17:7"
                          },
                          "variableNames": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "376:6:7"
                            }
                          ]
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "name": "outOfPlaceEncoding",
                          "nodeType": "YulIdentifier",
                          "src": "342:18:7"
                        }
                      ],
                      "functionName": {
                        "name": "iszero",
                        "nodeType": "YulIdentifier",
                        "src": "335:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "335:26:7"
                    },
                    "nodeType": "YulIf",
                    "src": "332:81:7"
                  },
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "465:42:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [],
                            "functionName": {
                              "name": "panic_error_0x22",
                              "nodeType": "YulIdentifier",
                              "src": "479:16:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "479:18:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "479:18:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "name": "outOfPlaceEncoding",
                          "nodeType": "YulIdentifier",
                          "src": "429:18:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "452:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "460:2:7",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "lt",
                            "nodeType": "YulIdentifier",
                            "src": "449:2:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "449:14:7"
                        }
                      ],
                      "functionName": {
                        "name": "eq",
                        "nodeType": "YulIdentifier",
                        "src": "426:2:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "426:38:7"
                    },
                    "nodeType": "YulIf",
                    "src": "423:84:7"
                  }
                ]
              },
              "name": "extract_byte_array_length",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "data",
                  "nodeType": "YulTypedName",
                  "src": "228:4:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "length",
                  "nodeType": "YulTypedName",
                  "src": "237:6:7",
                  "type": ""
                }
              ],
              "src": "193:320:7"
            }
          ]
        },
        "contents": "{\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n}\n",
        "id": 7,
        "language": "Yul",
        "name": "#utility.yul"
      }
    ],
    "deployedGeneratedSources": [
      {
        "ast": {
          "nodeType": "YulBlock",
          "src": "0:15197:7",
          "statements": [
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "66:40:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "77:22:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "value",
                          "nodeType": "YulIdentifier",
                          "src": "93:5:7"
                        }
                      ],
                      "functionName": {
                        "name": "mload",
                        "nodeType": "YulIdentifier",
                        "src": "87:5:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "87:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "77:6:7"
                      }
                    ]
                  }
                ]
              },
              "name": "array_length_t_string_memory_ptr",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "49:5:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "length",
                  "nodeType": "YulTypedName",
                  "src": "59:6:7",
                  "type": ""
                }
              ],
              "src": "7:99:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "208:73:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "225:3:7"
                        },
                        {
                          "name": "length",
                          "nodeType": "YulIdentifier",
                          "src": "230:6:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "218:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "218:19:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "218:19:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "246:29:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "265:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "270:4:7",
                          "type": "",
                          "value": "0x20"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "261:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "261:14:7"
                    },
                    "variableNames": [
                      {
                        "name": "updated_pos",
                        "nodeType": "YulIdentifier",
                        "src": "246:11:7"
                      }
                    ]
                  }
                ]
              },
              "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "180:3:7",
                  "type": ""
                },
                {
                  "name": "length",
                  "nodeType": "YulTypedName",
                  "src": "185:6:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "updated_pos",
                  "nodeType": "YulTypedName",
                  "src": "196:11:7",
                  "type": ""
                }
              ],
              "src": "112:169:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "336:258:7",
                "statements": [
                  {
                    "nodeType": "YulVariableDeclaration",
                    "src": "346:10:7",
                    "value": {
                      "kind": "number",
                      "nodeType": "YulLiteral",
                      "src": "355:1:7",
                      "type": "",
                      "value": "0"
                    },
                    "variables": [
                      {
                        "name": "i",
                        "nodeType": "YulTypedName",
                        "src": "350:1:7",
                        "type": ""
                      }
                    ]
                  },
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "415:63:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [
                              {
                                "arguments": [
                                  {
                                    "name": "dst",
                                    "nodeType": "YulIdentifier",
                                    "src": "440:3:7"
                                  },
                                  {
                                    "name": "i",
                                    "nodeType": "YulIdentifier",
                                    "src": "445:1:7"
                                  }
                                ],
                                "functionName": {
                                  "name": "add",
                                  "nodeType": "YulIdentifier",
                                  "src": "436:3:7"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "436:11:7"
                              },
                              {
                                "arguments": [
                                  {
                                    "arguments": [
                                      {
                                        "name": "src",
                                        "nodeType": "YulIdentifier",
                                        "src": "459:3:7"
                                      },
                                      {
                                        "name": "i",
                                        "nodeType": "YulIdentifier",
                                        "src": "464:1:7"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "add",
                                      "nodeType": "YulIdentifier",
                                      "src": "455:3:7"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "455:11:7"
                                  }
                                ],
                                "functionName": {
                                  "name": "mload",
                                  "nodeType": "YulIdentifier",
                                  "src": "449:5:7"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "449:18:7"
                              }
                            ],
                            "functionName": {
                              "name": "mstore",
                              "nodeType": "YulIdentifier",
                              "src": "429:6:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "429:39:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "429:39:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "name": "i",
                          "nodeType": "YulIdentifier",
                          "src": "376:1:7"
                        },
                        {
                          "name": "length",
                          "nodeType": "YulIdentifier",
                          "src": "379:6:7"
                        }
                      ],
                      "functionName": {
                        "name": "lt",
                        "nodeType": "YulIdentifier",
                        "src": "373:2:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "373:13:7"
                    },
                    "nodeType": "YulForLoop",
                    "post": {
                      "nodeType": "YulBlock",
                      "src": "387:19:7",
                      "statements": [
                        {
                          "nodeType": "YulAssignment",
                          "src": "389:15:7",
                          "value": {
                            "arguments": [
                              {
                                "name": "i",
                                "nodeType": "YulIdentifier",
                                "src": "398:1:7"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "401:2:7",
                                "type": "",
                                "value": "32"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "394:3:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "394:10:7"
                          },
                          "variableNames": [
                            {
                              "name": "i",
                              "nodeType": "YulIdentifier",
                              "src": "389:1:7"
                            }
                          ]
                        }
                      ]
                    },
                    "pre": {
                      "nodeType": "YulBlock",
                      "src": "369:3:7",
                      "statements": []
                    },
                    "src": "365:113:7"
                  },
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "512:76:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [
                              {
                                "arguments": [
                                  {
                                    "name": "dst",
                                    "nodeType": "YulIdentifier",
                                    "src": "562:3:7"
                                  },
                                  {
                                    "name": "length",
                                    "nodeType": "YulIdentifier",
                                    "src": "567:6:7"
                                  }
                                ],
                                "functionName": {
                                  "name": "add",
                                  "nodeType": "YulIdentifier",
                                  "src": "558:3:7"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "558:16:7"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "576:1:7",
                                "type": "",
                                "value": "0"
                              }
                            ],
                            "functionName": {
                              "name": "mstore",
                              "nodeType": "YulIdentifier",
                              "src": "551:6:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "551:27:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "551:27:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "name": "i",
                          "nodeType": "YulIdentifier",
                          "src": "493:1:7"
                        },
                        {
                          "name": "length",
                          "nodeType": "YulIdentifier",
                          "src": "496:6:7"
                        }
                      ],
                      "functionName": {
                        "name": "gt",
                        "nodeType": "YulIdentifier",
                        "src": "490:2:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "490:13:7"
                    },
                    "nodeType": "YulIf",
                    "src": "487:101:7"
                  }
                ]
              },
              "name": "copy_memory_to_memory",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "src",
                  "nodeType": "YulTypedName",
                  "src": "318:3:7",
                  "type": ""
                },
                {
                  "name": "dst",
                  "nodeType": "YulTypedName",
                  "src": "323:3:7",
                  "type": ""
                },
                {
                  "name": "length",
                  "nodeType": "YulTypedName",
                  "src": "328:6:7",
                  "type": ""
                }
              ],
              "src": "287:307:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "648:54:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "658:38:7",
                    "value": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "676:5:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "683:2:7",
                              "type": "",
                              "value": "31"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "672:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "672:14:7"
                        },
                        {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "692:2:7",
                              "type": "",
                              "value": "31"
                            }
                          ],
                          "functionName": {
                            "name": "not",
                            "nodeType": "YulIdentifier",
                            "src": "688:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "688:7:7"
                        }
                      ],
                      "functionName": {
                        "name": "and",
                        "nodeType": "YulIdentifier",
                        "src": "668:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "668:28:7"
                    },
                    "variableNames": [
                      {
                        "name": "result",
                        "nodeType": "YulIdentifier",
                        "src": "658:6:7"
                      }
                    ]
                  }
                ]
              },
              "name": "round_up_to_mul_of_32",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "631:5:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "result",
                  "nodeType": "YulTypedName",
                  "src": "641:6:7",
                  "type": ""
                }
              ],
              "src": "600:102:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "800:272:7",
                "statements": [
                  {
                    "nodeType": "YulVariableDeclaration",
                    "src": "810:53:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "value",
                          "nodeType": "YulIdentifier",
                          "src": "857:5:7"
                        }
                      ],
                      "functionName": {
                        "name": "array_length_t_string_memory_ptr",
                        "nodeType": "YulIdentifier",
                        "src": "824:32:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "824:39:7"
                    },
                    "variables": [
                      {
                        "name": "length",
                        "nodeType": "YulTypedName",
                        "src": "814:6:7",
                        "type": ""
                      }
                    ]
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "872:78:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "938:3:7"
                        },
                        {
                          "name": "length",
                          "nodeType": "YulIdentifier",
                          "src": "943:6:7"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "879:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "879:71:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "872:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "985:5:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "992:4:7",
                              "type": "",
                              "value": "0x20"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "981:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "981:16:7"
                        },
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "999:3:7"
                        },
                        {
                          "name": "length",
                          "nodeType": "YulIdentifier",
                          "src": "1004:6:7"
                        }
                      ],
                      "functionName": {
                        "name": "copy_memory_to_memory",
                        "nodeType": "YulIdentifier",
                        "src": "959:21:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "959:52:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "959:52:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "1020:46:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "1031:3:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "1058:6:7"
                            }
                          ],
                          "functionName": {
                            "name": "round_up_to_mul_of_32",
                            "nodeType": "YulIdentifier",
                            "src": "1036:21:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1036:29:7"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "1027:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1027:39:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "1020:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "781:5:7",
                  "type": ""
                },
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "788:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "796:3:7",
                  "type": ""
                }
              ],
              "src": "708:364:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "1196:195:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "1206:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "1218:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "1229:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "1214:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1214:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "1206:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "1253:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "1264:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "1249:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1249:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "1272:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "1278:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "1268:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "1268:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "1242:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1242:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "1242:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "1298:86:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "1370:6:7"
                        },
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "1379:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "1306:63:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1306:78:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "1298:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "1168:9:7",
                  "type": ""
                },
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "1180:6:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "1191:4:7",
                  "type": ""
                }
              ],
              "src": "1078:313:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "1437:35:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "1447:19:7",
                    "value": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "1463:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "mload",
                        "nodeType": "YulIdentifier",
                        "src": "1457:5:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1457:9:7"
                    },
                    "variableNames": [
                      {
                        "name": "memPtr",
                        "nodeType": "YulIdentifier",
                        "src": "1447:6:7"
                      }
                    ]
                  }
                ]
              },
              "name": "allocate_unbounded",
              "nodeType": "YulFunctionDefinition",
              "returnVariables": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "1430:6:7",
                  "type": ""
                }
              ],
              "src": "1397:75:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "1567:28:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "1584:1:7",
                          "type": "",
                          "value": "0"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "1587:1:7",
                          "type": "",
                          "value": "0"
                        }
                      ],
                      "functionName": {
                        "name": "revert",
                        "nodeType": "YulIdentifier",
                        "src": "1577:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1577:12:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "1577:12:7"
                  }
                ]
              },
              "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
              "nodeType": "YulFunctionDefinition",
              "src": "1478:117:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "1690:28:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "1707:1:7",
                          "type": "",
                          "value": "0"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "1710:1:7",
                          "type": "",
                          "value": "0"
                        }
                      ],
                      "functionName": {
                        "name": "revert",
                        "nodeType": "YulIdentifier",
                        "src": "1700:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1700:12:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "1700:12:7"
                  }
                ]
              },
              "name": "revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db",
              "nodeType": "YulFunctionDefinition",
              "src": "1601:117:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "1769:81:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "1779:65:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "value",
                          "nodeType": "YulIdentifier",
                          "src": "1794:5:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "1801:42:7",
                          "type": "",
                          "value": "0xffffffffffffffffffffffffffffffffffffffff"
                        }
                      ],
                      "functionName": {
                        "name": "and",
                        "nodeType": "YulIdentifier",
                        "src": "1790:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1790:54:7"
                    },
                    "variableNames": [
                      {
                        "name": "cleaned",
                        "nodeType": "YulIdentifier",
                        "src": "1779:7:7"
                      }
                    ]
                  }
                ]
              },
              "name": "cleanup_t_uint160",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "1751:5:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "cleaned",
                  "nodeType": "YulTypedName",
                  "src": "1761:7:7",
                  "type": ""
                }
              ],
              "src": "1724:126:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "1901:51:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "1911:35:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "value",
                          "nodeType": "YulIdentifier",
                          "src": "1940:5:7"
                        }
                      ],
                      "functionName": {
                        "name": "cleanup_t_uint160",
                        "nodeType": "YulIdentifier",
                        "src": "1922:17:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "1922:24:7"
                    },
                    "variableNames": [
                      {
                        "name": "cleaned",
                        "nodeType": "YulIdentifier",
                        "src": "1911:7:7"
                      }
                    ]
                  }
                ]
              },
              "name": "cleanup_t_address",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "1883:5:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "cleaned",
                  "nodeType": "YulTypedName",
                  "src": "1893:7:7",
                  "type": ""
                }
              ],
              "src": "1856:96:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "2001:79:7",
                "statements": [
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "2058:16:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "2067:1:7",
                                "type": "",
                                "value": "0"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "2070:1:7",
                                "type": "",
                                "value": "0"
                              }
                            ],
                            "functionName": {
                              "name": "revert",
                              "nodeType": "YulIdentifier",
                              "src": "2060:6:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "2060:12:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "2060:12:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "2024:5:7"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "2049:5:7"
                                }
                              ],
                              "functionName": {
                                "name": "cleanup_t_address",
                                "nodeType": "YulIdentifier",
                                "src": "2031:17:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2031:24:7"
                            }
                          ],
                          "functionName": {
                            "name": "eq",
                            "nodeType": "YulIdentifier",
                            "src": "2021:2:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2021:35:7"
                        }
                      ],
                      "functionName": {
                        "name": "iszero",
                        "nodeType": "YulIdentifier",
                        "src": "2014:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "2014:43:7"
                    },
                    "nodeType": "YulIf",
                    "src": "2011:63:7"
                  }
                ]
              },
              "name": "validator_revert_t_address",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "1994:5:7",
                  "type": ""
                }
              ],
              "src": "1958:122:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "2138:87:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "2148:29:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "offset",
                          "nodeType": "YulIdentifier",
                          "src": "2170:6:7"
                        }
                      ],
                      "functionName": {
                        "name": "calldataload",
                        "nodeType": "YulIdentifier",
                        "src": "2157:12:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "2157:20:7"
                    },
                    "variableNames": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "2148:5:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "value",
                          "nodeType": "YulIdentifier",
                          "src": "2213:5:7"
                        }
                      ],
                      "functionName": {
                        "name": "validator_revert_t_address",
                        "nodeType": "YulIdentifier",
                        "src": "2186:26:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "2186:33:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "2186:33:7"
                  }
                ]
              },
              "name": "abi_decode_t_address",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "offset",
                  "nodeType": "YulTypedName",
                  "src": "2116:6:7",
                  "type": ""
                },
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "2124:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "2132:5:7",
                  "type": ""
                }
              ],
              "src": "2086:139:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "2276:32:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "2286:16:7",
                    "value": {
                      "name": "value",
                      "nodeType": "YulIdentifier",
                      "src": "2297:5:7"
                    },
                    "variableNames": [
                      {
                        "name": "cleaned",
                        "nodeType": "YulIdentifier",
                        "src": "2286:7:7"
                      }
                    ]
                  }
                ]
              },
              "name": "cleanup_t_uint256",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "2258:5:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "cleaned",
                  "nodeType": "YulTypedName",
                  "src": "2268:7:7",
                  "type": ""
                }
              ],
              "src": "2231:77:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "2357:79:7",
                "statements": [
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "2414:16:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "2423:1:7",
                                "type": "",
                                "value": "0"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "2426:1:7",
                                "type": "",
                                "value": "0"
                              }
                            ],
                            "functionName": {
                              "name": "revert",
                              "nodeType": "YulIdentifier",
                              "src": "2416:6:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "2416:12:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "2416:12:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "2380:5:7"
                            },
                            {
                              "arguments": [
                                {
                                  "name": "value",
                                  "nodeType": "YulIdentifier",
                                  "src": "2405:5:7"
                                }
                              ],
                              "functionName": {
                                "name": "cleanup_t_uint256",
                                "nodeType": "YulIdentifier",
                                "src": "2387:17:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2387:24:7"
                            }
                          ],
                          "functionName": {
                            "name": "eq",
                            "nodeType": "YulIdentifier",
                            "src": "2377:2:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2377:35:7"
                        }
                      ],
                      "functionName": {
                        "name": "iszero",
                        "nodeType": "YulIdentifier",
                        "src": "2370:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "2370:43:7"
                    },
                    "nodeType": "YulIf",
                    "src": "2367:63:7"
                  }
                ]
              },
              "name": "validator_revert_t_uint256",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "2350:5:7",
                  "type": ""
                }
              ],
              "src": "2314:122:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "2494:87:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "2504:29:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "offset",
                          "nodeType": "YulIdentifier",
                          "src": "2526:6:7"
                        }
                      ],
                      "functionName": {
                        "name": "calldataload",
                        "nodeType": "YulIdentifier",
                        "src": "2513:12:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "2513:20:7"
                    },
                    "variableNames": [
                      {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "2504:5:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "value",
                          "nodeType": "YulIdentifier",
                          "src": "2569:5:7"
                        }
                      ],
                      "functionName": {
                        "name": "validator_revert_t_uint256",
                        "nodeType": "YulIdentifier",
                        "src": "2542:26:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "2542:33:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "2542:33:7"
                  }
                ]
              },
              "name": "abi_decode_t_uint256",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "offset",
                  "nodeType": "YulTypedName",
                  "src": "2472:6:7",
                  "type": ""
                },
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "2480:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "2488:5:7",
                  "type": ""
                }
              ],
              "src": "2442:139:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "2670:391:7",
                "statements": [
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "2716:83:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [],
                            "functionName": {
                              "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                              "nodeType": "YulIdentifier",
                              "src": "2718:77:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "2718:79:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "2718:79:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "2691:7:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "2700:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "2687:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2687:23:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "2712:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "slt",
                        "nodeType": "YulIdentifier",
                        "src": "2683:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "2683:32:7"
                    },
                    "nodeType": "YulIf",
                    "src": "2680:119:7"
                  },
                  {
                    "nodeType": "YulBlock",
                    "src": "2809:117:7",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "2824:15:7",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "2838:1:7",
                          "type": "",
                          "value": "0"
                        },
                        "variables": [
                          {
                            "name": "offset",
                            "nodeType": "YulTypedName",
                            "src": "2828:6:7",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "2853:63:7",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "2888:9:7"
                                },
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "2899:6:7"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "2884:3:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2884:22:7"
                            },
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "2908:7:7"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_t_address",
                            "nodeType": "YulIdentifier",
                            "src": "2863:20:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2863:53:7"
                        },
                        "variableNames": [
                          {
                            "name": "value0",
                            "nodeType": "YulIdentifier",
                            "src": "2853:6:7"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "nodeType": "YulBlock",
                    "src": "2936:118:7",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "2951:16:7",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "2965:2:7",
                          "type": "",
                          "value": "32"
                        },
                        "variables": [
                          {
                            "name": "offset",
                            "nodeType": "YulTypedName",
                            "src": "2955:6:7",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "2981:63:7",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "3016:9:7"
                                },
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "3027:6:7"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "3012:3:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3012:22:7"
                            },
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "3036:7:7"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_t_uint256",
                            "nodeType": "YulIdentifier",
                            "src": "2991:20:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "2991:53:7"
                        },
                        "variableNames": [
                          {
                            "name": "value1",
                            "nodeType": "YulIdentifier",
                            "src": "2981:6:7"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "name": "abi_decode_tuple_t_addresst_uint256",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "2632:9:7",
                  "type": ""
                },
                {
                  "name": "dataEnd",
                  "nodeType": "YulTypedName",
                  "src": "2643:7:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "2655:6:7",
                  "type": ""
                },
                {
                  "name": "value1",
                  "nodeType": "YulTypedName",
                  "src": "2663:6:7",
                  "type": ""
                }
              ],
              "src": "2587:474:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "3109:48:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "3119:32:7",
                    "value": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "3144:5:7"
                            }
                          ],
                          "functionName": {
                            "name": "iszero",
                            "nodeType": "YulIdentifier",
                            "src": "3137:6:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3137:13:7"
                        }
                      ],
                      "functionName": {
                        "name": "iszero",
                        "nodeType": "YulIdentifier",
                        "src": "3130:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "3130:21:7"
                    },
                    "variableNames": [
                      {
                        "name": "cleaned",
                        "nodeType": "YulIdentifier",
                        "src": "3119:7:7"
                      }
                    ]
                  }
                ]
              },
              "name": "cleanup_t_bool",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "3091:5:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "cleaned",
                  "nodeType": "YulTypedName",
                  "src": "3101:7:7",
                  "type": ""
                }
              ],
              "src": "3067:90:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "3222:50:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "3239:3:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "3259:5:7"
                            }
                          ],
                          "functionName": {
                            "name": "cleanup_t_bool",
                            "nodeType": "YulIdentifier",
                            "src": "3244:14:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3244:21:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "3232:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "3232:34:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "3232:34:7"
                  }
                ]
              },
              "name": "abi_encode_t_bool_to_t_bool_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "3210:5:7",
                  "type": ""
                },
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "3217:3:7",
                  "type": ""
                }
              ],
              "src": "3163:109:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "3370:118:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "3380:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "3392:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "3403:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "3388:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "3388:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "3380:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "3454:6:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "3467:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3478:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "3463:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3463:17:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_bool_to_t_bool_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "3416:37:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "3416:65:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "3416:65:7"
                  }
                ]
              },
              "name": "abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "3342:9:7",
                  "type": ""
                },
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "3354:6:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "3365:4:7",
                  "type": ""
                }
              ],
              "src": "3278:210:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "3559:53:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "3576:3:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "3599:5:7"
                            }
                          ],
                          "functionName": {
                            "name": "cleanup_t_uint256",
                            "nodeType": "YulIdentifier",
                            "src": "3581:17:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3581:24:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "3569:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "3569:37:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "3569:37:7"
                  }
                ]
              },
              "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "3547:5:7",
                  "type": ""
                },
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "3554:3:7",
                  "type": ""
                }
              ],
              "src": "3494:118:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "3716:124:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "3726:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "3738:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "3749:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "3734:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "3734:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "3726:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "3806:6:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "3819:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3830:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "3815:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3815:17:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "3762:43:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "3762:71:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "3762:71:7"
                  }
                ]
              },
              "name": "abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "3688:9:7",
                  "type": ""
                },
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "3700:6:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "3711:4:7",
                  "type": ""
                }
              ],
              "src": "3618:222:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "3946:519:7",
                "statements": [
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "3992:83:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [],
                            "functionName": {
                              "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                              "nodeType": "YulIdentifier",
                              "src": "3994:77:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "3994:79:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "3994:79:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "3967:7:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "3976:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "3963:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "3963:23:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "3988:2:7",
                          "type": "",
                          "value": "96"
                        }
                      ],
                      "functionName": {
                        "name": "slt",
                        "nodeType": "YulIdentifier",
                        "src": "3959:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "3959:32:7"
                    },
                    "nodeType": "YulIf",
                    "src": "3956:119:7"
                  },
                  {
                    "nodeType": "YulBlock",
                    "src": "4085:117:7",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "4100:15:7",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "4114:1:7",
                          "type": "",
                          "value": "0"
                        },
                        "variables": [
                          {
                            "name": "offset",
                            "nodeType": "YulTypedName",
                            "src": "4104:6:7",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "4129:63:7",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "4164:9:7"
                                },
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "4175:6:7"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "4160:3:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4160:22:7"
                            },
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "4184:7:7"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_t_address",
                            "nodeType": "YulIdentifier",
                            "src": "4139:20:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4139:53:7"
                        },
                        "variableNames": [
                          {
                            "name": "value0",
                            "nodeType": "YulIdentifier",
                            "src": "4129:6:7"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "nodeType": "YulBlock",
                    "src": "4212:118:7",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "4227:16:7",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "4241:2:7",
                          "type": "",
                          "value": "32"
                        },
                        "variables": [
                          {
                            "name": "offset",
                            "nodeType": "YulTypedName",
                            "src": "4231:6:7",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "4257:63:7",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "4292:9:7"
                                },
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "4303:6:7"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "4288:3:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4288:22:7"
                            },
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "4312:7:7"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_t_address",
                            "nodeType": "YulIdentifier",
                            "src": "4267:20:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4267:53:7"
                        },
                        "variableNames": [
                          {
                            "name": "value1",
                            "nodeType": "YulIdentifier",
                            "src": "4257:6:7"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "nodeType": "YulBlock",
                    "src": "4340:118:7",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "4355:16:7",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "4369:2:7",
                          "type": "",
                          "value": "64"
                        },
                        "variables": [
                          {
                            "name": "offset",
                            "nodeType": "YulTypedName",
                            "src": "4359:6:7",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "4385:63:7",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "4420:9:7"
                                },
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "4431:6:7"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "4416:3:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4416:22:7"
                            },
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "4440:7:7"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_t_uint256",
                            "nodeType": "YulIdentifier",
                            "src": "4395:20:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4395:53:7"
                        },
                        "variableNames": [
                          {
                            "name": "value2",
                            "nodeType": "YulIdentifier",
                            "src": "4385:6:7"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "name": "abi_decode_tuple_t_addresst_addresst_uint256",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "3900:9:7",
                  "type": ""
                },
                {
                  "name": "dataEnd",
                  "nodeType": "YulTypedName",
                  "src": "3911:7:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "3923:6:7",
                  "type": ""
                },
                {
                  "name": "value1",
                  "nodeType": "YulTypedName",
                  "src": "3931:6:7",
                  "type": ""
                },
                {
                  "name": "value2",
                  "nodeType": "YulTypedName",
                  "src": "3939:6:7",
                  "type": ""
                }
              ],
              "src": "3846:619:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "4514:43:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "4524:27:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "value",
                          "nodeType": "YulIdentifier",
                          "src": "4539:5:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "4546:4:7",
                          "type": "",
                          "value": "0xff"
                        }
                      ],
                      "functionName": {
                        "name": "and",
                        "nodeType": "YulIdentifier",
                        "src": "4535:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "4535:16:7"
                    },
                    "variableNames": [
                      {
                        "name": "cleaned",
                        "nodeType": "YulIdentifier",
                        "src": "4524:7:7"
                      }
                    ]
                  }
                ]
              },
              "name": "cleanup_t_uint8",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "4496:5:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "cleaned",
                  "nodeType": "YulTypedName",
                  "src": "4506:7:7",
                  "type": ""
                }
              ],
              "src": "4471:86:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "4624:51:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "4641:3:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "4662:5:7"
                            }
                          ],
                          "functionName": {
                            "name": "cleanup_t_uint8",
                            "nodeType": "YulIdentifier",
                            "src": "4646:15:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4646:22:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "4634:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "4634:35:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "4634:35:7"
                  }
                ]
              },
              "name": "abi_encode_t_uint8_to_t_uint8_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "4612:5:7",
                  "type": ""
                },
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "4619:3:7",
                  "type": ""
                }
              ],
              "src": "4563:112:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "4775:120:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "4785:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "4797:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "4808:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "4793:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "4793:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "4785:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "4861:6:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "4874:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "4885:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "4870:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4870:17:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_uint8_to_t_uint8_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "4821:39:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "4821:67:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "4821:67:7"
                  }
                ]
              },
              "name": "abi_encode_tuple_t_uint8__to_t_uint8__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "4747:9:7",
                  "type": ""
                },
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "4759:6:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "4770:4:7",
                  "type": ""
                }
              ],
              "src": "4681:214:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "4967:263:7",
                "statements": [
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "5013:83:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [],
                            "functionName": {
                              "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                              "nodeType": "YulIdentifier",
                              "src": "5015:77:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "5015:79:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "5015:79:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "4988:7:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "4997:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "4984:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "4984:23:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "5009:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "slt",
                        "nodeType": "YulIdentifier",
                        "src": "4980:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "4980:32:7"
                    },
                    "nodeType": "YulIf",
                    "src": "4977:119:7"
                  },
                  {
                    "nodeType": "YulBlock",
                    "src": "5106:117:7",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "5121:15:7",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "5135:1:7",
                          "type": "",
                          "value": "0"
                        },
                        "variables": [
                          {
                            "name": "offset",
                            "nodeType": "YulTypedName",
                            "src": "5125:6:7",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5150:63:7",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "5185:9:7"
                                },
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "5196:6:7"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "5181:3:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5181:22:7"
                            },
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "5205:7:7"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_t_address",
                            "nodeType": "YulIdentifier",
                            "src": "5160:20:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5160:53:7"
                        },
                        "variableNames": [
                          {
                            "name": "value0",
                            "nodeType": "YulIdentifier",
                            "src": "5150:6:7"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "name": "abi_decode_tuple_t_address",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "4937:9:7",
                  "type": ""
                },
                {
                  "name": "dataEnd",
                  "nodeType": "YulTypedName",
                  "src": "4948:7:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "4960:6:7",
                  "type": ""
                }
              ],
              "src": "4901:329:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "5301:53:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "5318:3:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "value",
                              "nodeType": "YulIdentifier",
                              "src": "5341:5:7"
                            }
                          ],
                          "functionName": {
                            "name": "cleanup_t_address",
                            "nodeType": "YulIdentifier",
                            "src": "5323:17:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5323:24:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "5311:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "5311:37:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "5311:37:7"
                  }
                ]
              },
              "name": "abi_encode_t_address_to_t_address_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "value",
                  "nodeType": "YulTypedName",
                  "src": "5289:5:7",
                  "type": ""
                },
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "5296:3:7",
                  "type": ""
                }
              ],
              "src": "5236:118:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "5458:124:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "5468:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "5480:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "5491:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "5476:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "5476:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "5468:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "value0",
                          "nodeType": "YulIdentifier",
                          "src": "5548:6:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "5561:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "5572:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "5557:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5557:17:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_address_to_t_address_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "5504:43:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "5504:71:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "5504:71:7"
                  }
                ]
              },
              "name": "abi_encode_tuple_t_address__to_t_address__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "5430:9:7",
                  "type": ""
                },
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "5442:6:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "5453:4:7",
                  "type": ""
                }
              ],
              "src": "5360:222:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "5671:391:7",
                "statements": [
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "5717:83:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [],
                            "functionName": {
                              "name": "revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b",
                              "nodeType": "YulIdentifier",
                              "src": "5719:77:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "5719:79:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "5719:79:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "5692:7:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "5701:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "5688:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5688:23:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "5713:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "slt",
                        "nodeType": "YulIdentifier",
                        "src": "5684:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "5684:32:7"
                    },
                    "nodeType": "YulIf",
                    "src": "5681:119:7"
                  },
                  {
                    "nodeType": "YulBlock",
                    "src": "5810:117:7",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "5825:15:7",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "5839:1:7",
                          "type": "",
                          "value": "0"
                        },
                        "variables": [
                          {
                            "name": "offset",
                            "nodeType": "YulTypedName",
                            "src": "5829:6:7",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5854:63:7",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "5889:9:7"
                                },
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "5900:6:7"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "5885:3:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5885:22:7"
                            },
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "5909:7:7"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_t_address",
                            "nodeType": "YulIdentifier",
                            "src": "5864:20:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5864:53:7"
                        },
                        "variableNames": [
                          {
                            "name": "value0",
                            "nodeType": "YulIdentifier",
                            "src": "5854:6:7"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "nodeType": "YulBlock",
                    "src": "5937:118:7",
                    "statements": [
                      {
                        "nodeType": "YulVariableDeclaration",
                        "src": "5952:16:7",
                        "value": {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "5966:2:7",
                          "type": "",
                          "value": "32"
                        },
                        "variables": [
                          {
                            "name": "offset",
                            "nodeType": "YulTypedName",
                            "src": "5956:6:7",
                            "type": ""
                          }
                        ]
                      },
                      {
                        "nodeType": "YulAssignment",
                        "src": "5982:63:7",
                        "value": {
                          "arguments": [
                            {
                              "arguments": [
                                {
                                  "name": "headStart",
                                  "nodeType": "YulIdentifier",
                                  "src": "6017:9:7"
                                },
                                {
                                  "name": "offset",
                                  "nodeType": "YulIdentifier",
                                  "src": "6028:6:7"
                                }
                              ],
                              "functionName": {
                                "name": "add",
                                "nodeType": "YulIdentifier",
                                "src": "6013:3:7"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "6013:22:7"
                            },
                            {
                              "name": "dataEnd",
                              "nodeType": "YulIdentifier",
                              "src": "6037:7:7"
                            }
                          ],
                          "functionName": {
                            "name": "abi_decode_t_address",
                            "nodeType": "YulIdentifier",
                            "src": "5992:20:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "5992:53:7"
                        },
                        "variableNames": [
                          {
                            "name": "value1",
                            "nodeType": "YulIdentifier",
                            "src": "5982:6:7"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "name": "abi_decode_tuple_t_addresst_address",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "5633:9:7",
                  "type": ""
                },
                {
                  "name": "dataEnd",
                  "nodeType": "YulTypedName",
                  "src": "5644:7:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "value0",
                  "nodeType": "YulTypedName",
                  "src": "5656:6:7",
                  "type": ""
                },
                {
                  "name": "value1",
                  "nodeType": "YulTypedName",
                  "src": "5664:6:7",
                  "type": ""
                }
              ],
              "src": "5588:474:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "6096:152:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6113:1:7",
                          "type": "",
                          "value": "0"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6116:77:7",
                          "type": "",
                          "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "6106:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6106:88:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "6106:88:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6210:1:7",
                          "type": "",
                          "value": "4"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6213:4:7",
                          "type": "",
                          "value": "0x22"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "6203:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6203:15:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "6203:15:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6234:1:7",
                          "type": "",
                          "value": "0"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6237:4:7",
                          "type": "",
                          "value": "0x24"
                        }
                      ],
                      "functionName": {
                        "name": "revert",
                        "nodeType": "YulIdentifier",
                        "src": "6227:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6227:15:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "6227:15:7"
                  }
                ]
              },
              "name": "panic_error_0x22",
              "nodeType": "YulFunctionDefinition",
              "src": "6068:180:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "6305:269:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "6315:22:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "data",
                          "nodeType": "YulIdentifier",
                          "src": "6329:4:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6335:1:7",
                          "type": "",
                          "value": "2"
                        }
                      ],
                      "functionName": {
                        "name": "div",
                        "nodeType": "YulIdentifier",
                        "src": "6325:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6325:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "length",
                        "nodeType": "YulIdentifier",
                        "src": "6315:6:7"
                      }
                    ]
                  },
                  {
                    "nodeType": "YulVariableDeclaration",
                    "src": "6346:38:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "data",
                          "nodeType": "YulIdentifier",
                          "src": "6376:4:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6382:1:7",
                          "type": "",
                          "value": "1"
                        }
                      ],
                      "functionName": {
                        "name": "and",
                        "nodeType": "YulIdentifier",
                        "src": "6372:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6372:12:7"
                    },
                    "variables": [
                      {
                        "name": "outOfPlaceEncoding",
                        "nodeType": "YulTypedName",
                        "src": "6350:18:7",
                        "type": ""
                      }
                    ]
                  },
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "6423:51:7",
                      "statements": [
                        {
                          "nodeType": "YulAssignment",
                          "src": "6437:27:7",
                          "value": {
                            "arguments": [
                              {
                                "name": "length",
                                "nodeType": "YulIdentifier",
                                "src": "6451:6:7"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "6459:4:7",
                                "type": "",
                                "value": "0x7f"
                              }
                            ],
                            "functionName": {
                              "name": "and",
                              "nodeType": "YulIdentifier",
                              "src": "6447:3:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "6447:17:7"
                          },
                          "variableNames": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "6437:6:7"
                            }
                          ]
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "name": "outOfPlaceEncoding",
                          "nodeType": "YulIdentifier",
                          "src": "6403:18:7"
                        }
                      ],
                      "functionName": {
                        "name": "iszero",
                        "nodeType": "YulIdentifier",
                        "src": "6396:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6396:26:7"
                    },
                    "nodeType": "YulIf",
                    "src": "6393:81:7"
                  },
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "6526:42:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [],
                            "functionName": {
                              "name": "panic_error_0x22",
                              "nodeType": "YulIdentifier",
                              "src": "6540:16:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "6540:18:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "6540:18:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "name": "outOfPlaceEncoding",
                          "nodeType": "YulIdentifier",
                          "src": "6490:18:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "length",
                              "nodeType": "YulIdentifier",
                              "src": "6513:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6521:2:7",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "lt",
                            "nodeType": "YulIdentifier",
                            "src": "6510:2:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6510:14:7"
                        }
                      ],
                      "functionName": {
                        "name": "eq",
                        "nodeType": "YulIdentifier",
                        "src": "6487:2:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6487:38:7"
                    },
                    "nodeType": "YulIf",
                    "src": "6484:84:7"
                  }
                ]
              },
              "name": "extract_byte_array_length",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "data",
                  "nodeType": "YulTypedName",
                  "src": "6289:4:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "length",
                  "nodeType": "YulTypedName",
                  "src": "6298:6:7",
                  "type": ""
                }
              ],
              "src": "6254:320:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "6608:152:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6625:1:7",
                          "type": "",
                          "value": "0"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6628:77:7",
                          "type": "",
                          "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "6618:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6618:88:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "6618:88:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6722:1:7",
                          "type": "",
                          "value": "4"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6725:4:7",
                          "type": "",
                          "value": "0x11"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "6715:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6715:15:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "6715:15:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6746:1:7",
                          "type": "",
                          "value": "0"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "6749:4:7",
                          "type": "",
                          "value": "0x24"
                        }
                      ],
                      "functionName": {
                        "name": "revert",
                        "nodeType": "YulIdentifier",
                        "src": "6739:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6739:15:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "6739:15:7"
                  }
                ]
              },
              "name": "panic_error_0x11",
              "nodeType": "YulFunctionDefinition",
              "src": "6580:180:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "6810:261:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "6820:25:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "x",
                          "nodeType": "YulIdentifier",
                          "src": "6843:1:7"
                        }
                      ],
                      "functionName": {
                        "name": "cleanup_t_uint256",
                        "nodeType": "YulIdentifier",
                        "src": "6825:17:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6825:20:7"
                    },
                    "variableNames": [
                      {
                        "name": "x",
                        "nodeType": "YulIdentifier",
                        "src": "6820:1:7"
                      }
                    ]
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "6854:25:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "y",
                          "nodeType": "YulIdentifier",
                          "src": "6877:1:7"
                        }
                      ],
                      "functionName": {
                        "name": "cleanup_t_uint256",
                        "nodeType": "YulIdentifier",
                        "src": "6859:17:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6859:20:7"
                    },
                    "variableNames": [
                      {
                        "name": "y",
                        "nodeType": "YulIdentifier",
                        "src": "6854:1:7"
                      }
                    ]
                  },
                  {
                    "body": {
                      "nodeType": "YulBlock",
                      "src": "7017:22:7",
                      "statements": [
                        {
                          "expression": {
                            "arguments": [],
                            "functionName": {
                              "name": "panic_error_0x11",
                              "nodeType": "YulIdentifier",
                              "src": "7019:16:7"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "7019:18:7"
                          },
                          "nodeType": "YulExpressionStatement",
                          "src": "7019:18:7"
                        }
                      ]
                    },
                    "condition": {
                      "arguments": [
                        {
                          "name": "x",
                          "nodeType": "YulIdentifier",
                          "src": "6938:1:7"
                        },
                        {
                          "arguments": [
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "6945:66:7",
                              "type": "",
                              "value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                            },
                            {
                              "name": "y",
                              "nodeType": "YulIdentifier",
                              "src": "7013:1:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "6941:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "6941:74:7"
                        }
                      ],
                      "functionName": {
                        "name": "gt",
                        "nodeType": "YulIdentifier",
                        "src": "6935:2:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "6935:81:7"
                    },
                    "nodeType": "YulIf",
                    "src": "6932:107:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "7049:16:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "x",
                          "nodeType": "YulIdentifier",
                          "src": "7060:1:7"
                        },
                        {
                          "name": "y",
                          "nodeType": "YulIdentifier",
                          "src": "7063:1:7"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "7056:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7056:9:7"
                    },
                    "variableNames": [
                      {
                        "name": "sum",
                        "nodeType": "YulIdentifier",
                        "src": "7049:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "checked_add_t_uint256",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "x",
                  "nodeType": "YulTypedName",
                  "src": "6797:1:7",
                  "type": ""
                },
                {
                  "name": "y",
                  "nodeType": "YulTypedName",
                  "src": "6800:1:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "sum",
                  "nodeType": "YulTypedName",
                  "src": "6806:3:7",
                  "type": ""
                }
              ],
              "src": "6766:305:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "7183:118:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "7205:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7213:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "7201:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7201:14:7"
                        },
                        {
                          "hexValue": "45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "7217:34:7",
                          "type": "",
                          "value": "ERC20: decreased allowance below"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "7194:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7194:58:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "7194:58:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "7273:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7281:2:7",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "7269:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7269:15:7"
                        },
                        {
                          "hexValue": "207a65726f",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "7286:7:7",
                          "type": "",
                          "value": " zero"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "7262:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7262:32:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "7262:32:7"
                  }
                ]
              },
              "name": "store_literal_in_memory_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "7175:6:7",
                  "type": ""
                }
              ],
              "src": "7077:224:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "7453:220:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "7463:74:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "7529:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "7534:2:7",
                          "type": "",
                          "value": "37"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "7470:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7470:67:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "7463:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "7635:3:7"
                        }
                      ],
                      "functionName": {
                        "name": "store_literal_in_memory_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8",
                        "nodeType": "YulIdentifier",
                        "src": "7546:88:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7546:93:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "7546:93:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "7648:19:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "7659:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "7664:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "7655:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7655:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "7648:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "7441:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "7449:3:7",
                  "type": ""
                }
              ],
              "src": "7307:366:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "7850:248:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "7860:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "7872:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "7883:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "7868:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7868:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "7860:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "7907:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "7918:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "7903:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7903:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "7926:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "7932:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "7922:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "7922:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "7896:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7896:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "7896:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "7952:139:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "8086:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "7960:124:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "7960:131:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "7952:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "7830:9:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "7845:4:7",
                  "type": ""
                }
              ],
              "src": "7679:419:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "8210:117:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "8232:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "8240:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "8228:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "8228:14:7"
                        },
                        {
                          "hexValue": "45524332303a20617070726f76652066726f6d20746865207a65726f20616464",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "8244:34:7",
                          "type": "",
                          "value": "ERC20: approve from the zero add"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "8221:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "8221:58:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "8221:58:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "8300:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "8308:2:7",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "8296:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "8296:15:7"
                        },
                        {
                          "hexValue": "72657373",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "8313:6:7",
                          "type": "",
                          "value": "ress"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "8289:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "8289:31:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "8289:31:7"
                  }
                ]
              },
              "name": "store_literal_in_memory_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "8202:6:7",
                  "type": ""
                }
              ],
              "src": "8104:223:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "8479:220:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "8489:74:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "8555:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "8560:2:7",
                          "type": "",
                          "value": "36"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "8496:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "8496:67:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "8489:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "8661:3:7"
                        }
                      ],
                      "functionName": {
                        "name": "store_literal_in_memory_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208",
                        "nodeType": "YulIdentifier",
                        "src": "8572:88:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "8572:93:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "8572:93:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "8674:19:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "8685:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "8690:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "8681:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "8681:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "8674:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_stringliteral_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "8467:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "8475:3:7",
                  "type": ""
                }
              ],
              "src": "8333:366:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "8876:248:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "8886:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "8898:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "8909:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "8894:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "8894:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "8886:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "8933:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "8944:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "8929:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "8929:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "8952:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "8958:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "8948:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "8948:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "8922:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "8922:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "8922:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "8978:139:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "9112:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_stringliteral_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "8986:124:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "8986:131:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "8978:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_stringliteral_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "8856:9:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "8871:4:7",
                  "type": ""
                }
              ],
              "src": "8705:419:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "9236:115:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "9258:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "9266:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "9254:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "9254:14:7"
                        },
                        {
                          "hexValue": "45524332303a20617070726f766520746f20746865207a65726f206164647265",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "9270:34:7",
                          "type": "",
                          "value": "ERC20: approve to the zero addre"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "9247:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "9247:58:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "9247:58:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "9326:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "9334:2:7",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "9322:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "9322:15:7"
                        },
                        {
                          "hexValue": "7373",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "9339:4:7",
                          "type": "",
                          "value": "ss"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "9315:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "9315:29:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "9315:29:7"
                  }
                ]
              },
              "name": "store_literal_in_memory_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "9228:6:7",
                  "type": ""
                }
              ],
              "src": "9130:221:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "9503:220:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "9513:74:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "9579:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "9584:2:7",
                          "type": "",
                          "value": "34"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "9520:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "9520:67:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "9513:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "9685:3:7"
                        }
                      ],
                      "functionName": {
                        "name": "store_literal_in_memory_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029",
                        "nodeType": "YulIdentifier",
                        "src": "9596:88:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "9596:93:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "9596:93:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "9698:19:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "9709:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "9714:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "9705:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "9705:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "9698:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_stringliteral_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "9491:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "9499:3:7",
                  "type": ""
                }
              ],
              "src": "9357:366:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "9900:248:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "9910:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "9922:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "9933:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "9918:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "9918:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "9910:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "9957:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "9968:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "9953:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "9953:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "9976:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "9982:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "9972:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "9972:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "9946:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "9946:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "9946:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "10002:139:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "10136:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_stringliteral_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "10010:124:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "10010:131:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "10002:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_stringliteral_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "9880:9:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "9895:4:7",
                  "type": ""
                }
              ],
              "src": "9729:419:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "10260:118:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "10282:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "10290:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "10278:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "10278:14:7"
                        },
                        {
                          "hexValue": "45524332303a207472616e736665722066726f6d20746865207a65726f206164",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "10294:34:7",
                          "type": "",
                          "value": "ERC20: transfer from the zero ad"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "10271:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "10271:58:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "10271:58:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "10350:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "10358:2:7",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "10346:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "10346:15:7"
                        },
                        {
                          "hexValue": "6472657373",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "10363:7:7",
                          "type": "",
                          "value": "dress"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "10339:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "10339:32:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "10339:32:7"
                  }
                ]
              },
              "name": "store_literal_in_memory_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "10252:6:7",
                  "type": ""
                }
              ],
              "src": "10154:224:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "10530:220:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "10540:74:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "10606:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "10611:2:7",
                          "type": "",
                          "value": "37"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "10547:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "10547:67:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "10540:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "10712:3:7"
                        }
                      ],
                      "functionName": {
                        "name": "store_literal_in_memory_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea",
                        "nodeType": "YulIdentifier",
                        "src": "10623:88:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "10623:93:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "10623:93:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "10725:19:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "10736:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "10741:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "10732:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "10732:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "10725:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_stringliteral_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "10518:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "10526:3:7",
                  "type": ""
                }
              ],
              "src": "10384:366:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "10927:248:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "10937:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "10949:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "10960:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "10945:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "10945:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "10937:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "10984:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "10995:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "10980:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "10980:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "11003:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "11009:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "10999:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "10999:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "10973:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "10973:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "10973:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "11029:139:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "11163:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_stringliteral_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "11037:124:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "11037:131:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "11029:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_stringliteral_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "10907:9:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "10922:4:7",
                  "type": ""
                }
              ],
              "src": "10756:419:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "11287:116:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "11309:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "11317:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "11305:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "11305:14:7"
                        },
                        {
                          "hexValue": "45524332303a207472616e7366657220746f20746865207a65726f2061646472",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "11321:34:7",
                          "type": "",
                          "value": "ERC20: transfer to the zero addr"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "11298:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "11298:58:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "11298:58:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "11377:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "11385:2:7",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "11373:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "11373:15:7"
                        },
                        {
                          "hexValue": "657373",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "11390:5:7",
                          "type": "",
                          "value": "ess"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "11366:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "11366:30:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "11366:30:7"
                  }
                ]
              },
              "name": "store_literal_in_memory_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "11279:6:7",
                  "type": ""
                }
              ],
              "src": "11181:222:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "11555:220:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "11565:74:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "11631:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "11636:2:7",
                          "type": "",
                          "value": "35"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "11572:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "11572:67:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "11565:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "11737:3:7"
                        }
                      ],
                      "functionName": {
                        "name": "store_literal_in_memory_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f",
                        "nodeType": "YulIdentifier",
                        "src": "11648:88:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "11648:93:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "11648:93:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "11750:19:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "11761:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "11766:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "11757:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "11757:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "11750:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_stringliteral_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "11543:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "11551:3:7",
                  "type": ""
                }
              ],
              "src": "11409:366:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "11952:248:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "11962:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "11974:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "11985:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "11970:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "11970:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "11962:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "12009:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "12020:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "12005:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "12005:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "12028:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "12034:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "12024:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "12024:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "11998:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "11998:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "11998:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "12054:139:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "12188:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_stringliteral_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "12062:124:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "12062:131:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "12054:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_stringliteral_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "11932:9:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "11947:4:7",
                  "type": ""
                }
              ],
              "src": "11781:419:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "12312:119:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "12334:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "12342:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "12330:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "12330:14:7"
                        },
                        {
                          "hexValue": "45524332303a207472616e7366657220616d6f756e7420657863656564732062",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "12346:34:7",
                          "type": "",
                          "value": "ERC20: transfer amount exceeds b"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "12323:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "12323:58:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "12323:58:7"
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "12402:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "12410:2:7",
                              "type": "",
                              "value": "32"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "12398:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "12398:15:7"
                        },
                        {
                          "hexValue": "616c616e6365",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "12415:8:7",
                          "type": "",
                          "value": "alance"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "12391:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "12391:33:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "12391:33:7"
                  }
                ]
              },
              "name": "store_literal_in_memory_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "12304:6:7",
                  "type": ""
                }
              ],
              "src": "12206:225:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "12583:220:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "12593:74:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "12659:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "12664:2:7",
                          "type": "",
                          "value": "38"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "12600:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "12600:67:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "12593:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "12765:3:7"
                        }
                      ],
                      "functionName": {
                        "name": "store_literal_in_memory_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6",
                        "nodeType": "YulIdentifier",
                        "src": "12676:88:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "12676:93:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "12676:93:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "12778:19:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "12789:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "12794:2:7",
                          "type": "",
                          "value": "64"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "12785:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "12785:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "12778:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_stringliteral_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "12571:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "12579:3:7",
                  "type": ""
                }
              ],
              "src": "12437:366:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "12980:248:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "12990:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "13002:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "13013:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "12998:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "12998:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "12990:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "13037:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "13048:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "13033:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "13033:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "13056:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "13062:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "13052:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "13052:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "13026:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "13026:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "13026:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "13082:139:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "13216:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_stringliteral_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "13090:124:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "13090:131:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "13082:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_stringliteral_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "12960:9:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "12975:4:7",
                  "type": ""
                }
              ],
              "src": "12809:419:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "13340:75:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "13362:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "13370:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "13358:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "13358:14:7"
                        },
                        {
                          "hexValue": "45524332303a206d696e7420746f20746865207a65726f2061646472657373",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "13374:33:7",
                          "type": "",
                          "value": "ERC20: mint to the zero address"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "13351:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "13351:57:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "13351:57:7"
                  }
                ]
              },
              "name": "store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "13332:6:7",
                  "type": ""
                }
              ],
              "src": "13234:181:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "13567:220:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "13577:74:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "13643:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "13648:2:7",
                          "type": "",
                          "value": "31"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "13584:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "13584:67:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "13577:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "13749:3:7"
                        }
                      ],
                      "functionName": {
                        "name": "store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e",
                        "nodeType": "YulIdentifier",
                        "src": "13660:88:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "13660:93:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "13660:93:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "13762:19:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "13773:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "13778:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "13769:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "13769:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "13762:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "13555:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "13563:3:7",
                  "type": ""
                }
              ],
              "src": "13421:366:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "13964:248:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "13974:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "13986:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "13997:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "13982:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "13982:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "13974:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "14021:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "14032:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "14017:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "14017:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "14040:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "14046:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "14036:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "14036:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "14010:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "14010:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "14010:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "14066:139:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "14200:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "14074:124:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "14074:131:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "14066:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "13944:9:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "13959:4:7",
                  "type": ""
                }
              ],
              "src": "13793:419:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "14324:73:7",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "memPtr",
                              "nodeType": "YulIdentifier",
                              "src": "14346:6:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "14354:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "14342:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "14342:14:7"
                        },
                        {
                          "hexValue": "45524332303a20696e73756666696369656e7420616c6c6f77616e6365",
                          "kind": "string",
                          "nodeType": "YulLiteral",
                          "src": "14358:31:7",
                          "type": "",
                          "value": "ERC20: insufficient allowance"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "14335:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "14335:55:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "14335:55:7"
                  }
                ]
              },
              "name": "store_literal_in_memory_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "memPtr",
                  "nodeType": "YulTypedName",
                  "src": "14316:6:7",
                  "type": ""
                }
              ],
              "src": "14218:179:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "14549:220:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "14559:74:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "14625:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "14630:2:7",
                          "type": "",
                          "value": "29"
                        }
                      ],
                      "functionName": {
                        "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "14566:58:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "14566:67:7"
                    },
                    "variableNames": [
                      {
                        "name": "pos",
                        "nodeType": "YulIdentifier",
                        "src": "14559:3:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "14731:3:7"
                        }
                      ],
                      "functionName": {
                        "name": "store_literal_in_memory_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe",
                        "nodeType": "YulIdentifier",
                        "src": "14642:88:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "14642:93:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "14642:93:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "14744:19:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "14755:3:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "14760:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "14751:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "14751:12:7"
                    },
                    "variableNames": [
                      {
                        "name": "end",
                        "nodeType": "YulIdentifier",
                        "src": "14744:3:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_t_stringliteral_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe_to_t_string_memory_ptr_fromStack",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "pos",
                  "nodeType": "YulTypedName",
                  "src": "14537:3:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "end",
                  "nodeType": "YulTypedName",
                  "src": "14545:3:7",
                  "type": ""
                }
              ],
              "src": "14403:366:7"
            },
            {
              "body": {
                "nodeType": "YulBlock",
                "src": "14946:248:7",
                "statements": [
                  {
                    "nodeType": "YulAssignment",
                    "src": "14956:26:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "headStart",
                          "nodeType": "YulIdentifier",
                          "src": "14968:9:7"
                        },
                        {
                          "kind": "number",
                          "nodeType": "YulLiteral",
                          "src": "14979:2:7",
                          "type": "",
                          "value": "32"
                        }
                      ],
                      "functionName": {
                        "name": "add",
                        "nodeType": "YulIdentifier",
                        "src": "14964:3:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "14964:18:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "14956:4:7"
                      }
                    ]
                  },
                  {
                    "expression": {
                      "arguments": [
                        {
                          "arguments": [
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "15003:9:7"
                            },
                            {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "15014:1:7",
                              "type": "",
                              "value": "0"
                            }
                          ],
                          "functionName": {
                            "name": "add",
                            "nodeType": "YulIdentifier",
                            "src": "14999:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "14999:17:7"
                        },
                        {
                          "arguments": [
                            {
                              "name": "tail",
                              "nodeType": "YulIdentifier",
                              "src": "15022:4:7"
                            },
                            {
                              "name": "headStart",
                              "nodeType": "YulIdentifier",
                              "src": "15028:9:7"
                            }
                          ],
                          "functionName": {
                            "name": "sub",
                            "nodeType": "YulIdentifier",
                            "src": "15018:3:7"
                          },
                          "nodeType": "YulFunctionCall",
                          "src": "15018:20:7"
                        }
                      ],
                      "functionName": {
                        "name": "mstore",
                        "nodeType": "YulIdentifier",
                        "src": "14992:6:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "14992:47:7"
                    },
                    "nodeType": "YulExpressionStatement",
                    "src": "14992:47:7"
                  },
                  {
                    "nodeType": "YulAssignment",
                    "src": "15048:139:7",
                    "value": {
                      "arguments": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "15182:4:7"
                        }
                      ],
                      "functionName": {
                        "name": "abi_encode_t_stringliteral_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe_to_t_string_memory_ptr_fromStack",
                        "nodeType": "YulIdentifier",
                        "src": "15056:124:7"
                      },
                      "nodeType": "YulFunctionCall",
                      "src": "15056:131:7"
                    },
                    "variableNames": [
                      {
                        "name": "tail",
                        "nodeType": "YulIdentifier",
                        "src": "15048:4:7"
                      }
                    ]
                  }
                ]
              },
              "name": "abi_encode_tuple_t_stringliteral_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe__to_t_string_memory_ptr__fromStack_reversed",
              "nodeType": "YulFunctionDefinition",
              "parameters": [
                {
                  "name": "headStart",
                  "nodeType": "YulTypedName",
                  "src": "14926:9:7",
                  "type": ""
                }
              ],
              "returnVariables": [
                {
                  "name": "tail",
                  "nodeType": "YulTypedName",
                  "src": "14941:4:7",
                  "type": ""
                }
              ],
              "src": "14775:419:7"
            }
          ]
        },
        "contents": "{\n\n    function array_length_t_string_memory_ptr(value) -> length {\n\n        length := mload(value)\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function copy_memory_to_memory(src, dst, length) {\n        let i := 0\n        for { } lt(i, length) { i := add(i, 32) }\n        {\n            mstore(add(dst, i), mload(add(src, i)))\n        }\n        if gt(i, length)\n        {\n            // clear end\n            mstore(add(dst, length), 0)\n        }\n    }\n\n    function round_up_to_mul_of_32(value) -> result {\n        result := and(add(value, 31), not(31))\n    }\n\n    function abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value, pos) -> end {\n        let length := array_length_t_string_memory_ptr(value)\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length)\n        copy_memory_to_memory(add(value, 0x20), pos, length)\n        end := add(pos, round_up_to_mul_of_32(length))\n    }\n\n    function abi_encode_tuple_t_string_memory_ptr__to_t_string_memory_ptr__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_string_memory_ptr_to_t_string_memory_ptr_fromStack(value0,  tail)\n\n    }\n\n    function allocate_unbounded() -> memPtr {\n        memPtr := mload(64)\n    }\n\n    function revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() {\n        revert(0, 0)\n    }\n\n    function revert_error_c1322bf8034eace5e0b5c7295db60986aa89aae5e0ea0873e4689e076861a5db() {\n        revert(0, 0)\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function validator_revert_t_address(value) {\n        if iszero(eq(value, cleanup_t_address(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_address(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_address(value)\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function validator_revert_t_uint256(value) {\n        if iszero(eq(value, cleanup_t_uint256(value))) { revert(0, 0) }\n    }\n\n    function abi_decode_t_uint256(offset, end) -> value {\n        value := calldataload(offset)\n        validator_revert_t_uint256(value)\n    }\n\n    function abi_decode_tuple_t_addresst_uint256(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function cleanup_t_bool(value) -> cleaned {\n        cleaned := iszero(iszero(value))\n    }\n\n    function abi_encode_t_bool_to_t_bool_fromStack(value, pos) {\n        mstore(pos, cleanup_t_bool(value))\n    }\n\n    function abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_bool_to_t_bool_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_decode_tuple_t_addresst_addresst_uint256(headStart, dataEnd) -> value0, value1, value2 {\n        if slt(sub(dataEnd, headStart), 96) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 64\n\n            value2 := abi_decode_t_uint256(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function cleanup_t_uint8(value) -> cleaned {\n        cleaned := and(value, 0xff)\n    }\n\n    function abi_encode_t_uint8_to_t_uint8_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint8(value))\n    }\n\n    function abi_encode_tuple_t_uint8__to_t_uint8__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint8_to_t_uint8_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_decode_tuple_t_address(headStart, dataEnd) -> value0 {\n        if slt(sub(dataEnd, headStart), 32) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function abi_encode_t_address_to_t_address_fromStack(value, pos) {\n        mstore(pos, cleanup_t_address(value))\n    }\n\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_address_to_t_address_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function abi_decode_tuple_t_addresst_address(headStart, dataEnd) -> value0, value1 {\n        if slt(sub(dataEnd, headStart), 64) { revert_error_dbdddcbe895c83990c08b3492a0e83918d802a52331272ac6fdb6a7c4aea3b1b() }\n\n        {\n\n            let offset := 0\n\n            value0 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n        {\n\n            let offset := 32\n\n            value1 := abi_decode_t_address(add(headStart, offset), dataEnd)\n        }\n\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        // overflow, if x > (maxValue - y)\n        if gt(x, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, y)) { panic_error_0x11() }\n\n        sum := add(x, y)\n    }\n\n    function store_literal_in_memory_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: decreased allowance below\")\n\n        mstore(add(memPtr, 32), \" zero\")\n\n    }\n\n    function abi_encode_t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 37)\n        store_literal_in_memory_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_f8b476f7d28209d77d4a4ac1fe36b9f8259aa1bb6bddfa6e89de7e51615cf8a8_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: approve from the zero add\")\n\n        mstore(add(memPtr, 32), \"ress\")\n\n    }\n\n    function abi_encode_t_stringliteral_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 36)\n        store_literal_in_memory_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_c953f4879035ed60e766b34720f656aab5c697b141d924c283124ecedb91c208_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: approve to the zero addre\")\n\n        mstore(add(memPtr, 32), \"ss\")\n\n    }\n\n    function abi_encode_t_stringliteral_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 34)\n        store_literal_in_memory_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_24883cc5fe64ace9d0df1893501ecb93c77180f0ff69cca79affb3c316dc8029_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: transfer from the zero ad\")\n\n        mstore(add(memPtr, 32), \"dress\")\n\n    }\n\n    function abi_encode_t_stringliteral_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 37)\n        store_literal_in_memory_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_baecc556b46f4ed0f2b4cb599d60785ac8563dd2dc0a5bf12edea1c39e5e1fea_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: transfer to the zero addr\")\n\n        mstore(add(memPtr, 32), \"ess\")\n\n    }\n\n    function abi_encode_t_stringliteral_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 35)\n        store_literal_in_memory_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_0557e210f7a69a685100a7e4e3d0a7024c546085cee28910fd17d0b081d9516f_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: transfer amount exceeds b\")\n\n        mstore(add(memPtr, 32), \"alance\")\n\n    }\n\n    function abi_encode_t_stringliteral_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 38)\n        store_literal_in_memory_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6(pos)\n        end := add(pos, 64)\n    }\n\n    function abi_encode_tuple_t_stringliteral_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_4107e8a8b9e94bf8ff83080ddec1c0bffe897ebc2241b89d44f66b3d274088b6_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: mint to the zero address\")\n\n    }\n\n    function abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 31)\n        store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function store_literal_in_memory_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: insufficient allowance\")\n\n    }\n\n    function abi_encode_t_stringliteral_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 29)\n        store_literal_in_memory_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_tuple_t_stringliteral_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_3b6607e091cba9325f958656d2b5e0622ab7dc0eac71a26ac788cb25bc19f4fe_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n}\n",
        "id": 7,
        "language": "Yul",
        "name": "#utility.yul"
      }
    ],
    "sourceMap": "86:467:5:-:0;;;193:77;;;;;;;;;;1978:113:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2052:5;2044;:13;;;;;;;;;;;;:::i;:::-;;2077:7;2067;:17;;;;;;;;;;;;:::i;:::-;;1978:113;;252:10:5::1;244:5;;:18;;;;;;;;;;;;;;;;;;86:467:::0;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:180:7:-;55:77;52:1;45:88;152:4;149:1;142:15;176:4;173:1;166:15;193:320;237:6;274:1;268:4;264:12;254:22;;321:1;315:4;311:12;342:18;332:81;;398:4;390:6;386:17;376:27;;332:81;460:2;452:6;449:14;429:18;426:38;423:84;;;479:18;;:::i;:::-;423:84;244:269;193:320;;;:::o;86:467:5:-;;;;;;;",
    "deployedSourceMap": "86:467:5:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2156:98:0;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;4433:197;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;397:153:5;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3244:106:0;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;278:111:5;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5192:286:0;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3093:91;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;5873:236;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3408:125;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;121:20:5;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;2367:102:0;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;6596:429;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3729:189;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;3976:149;;;;;;;;;;;;;:::i;:::-;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;2156:98;2210:13;2242:5;2235:12;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2156:98;:::o;4433:197::-;4516:4;4532:13;4548:12;:10;:12::i;:::-;4532:28;;4570:32;4579:5;4586:7;4595:6;4570:8;:32::i;:::-;4619:4;4612:11;;;4433:197;;;;:::o;397:153:5:-;466:4;483:35;493:10;505:3;510:7;483:9;:35::i;:::-;538:4;531:11;;397:153;;;;:::o;3244:106:0:-;3305:7;3331:12;;3324:19;;3244:106;:::o;278:111:5:-;315:4;332:25;338:10;350:6;332:5;:25::i;:::-;377:4;370:11;;278:111;:::o;5192:286:0:-;5319:4;5335:15;5353:12;:10;:12::i;:::-;5335:30;;5375:38;5391:4;5397:7;5406:6;5375:15;:38::i;:::-;5423:27;5433:4;5439:2;5443:6;5423:9;:27::i;:::-;5467:4;5460:11;;;5192:286;;;;;:::o;3093:91::-;3151:5;3175:2;3168:9;;3093:91;:::o;5873:236::-;5961:4;5977:13;5993:12;:10;:12::i;:::-;5977:28;;6015:66;6024:5;6031:7;6070:10;6040:11;:18;6052:5;6040:18;;;;;;;;;;;;;;;:27;6059:7;6040:27;;;;;;;;;;;;;;;;:40;;;;:::i;:::-;6015:8;:66::i;:::-;6098:4;6091:11;;;5873:236;;;;:::o;3408:125::-;3482:7;3508:9;:18;3518:7;3508:18;;;;;;;;;;;;;;;;3501:25;;3408:125;;;:::o;121:20:5:-;;;;;;;;;;;;;:::o;2367:102:0:-;2423:13;2455:7;2448:14;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2367:102;:::o;6596:429::-;6689:4;6705:13;6721:12;:10;:12::i;:::-;6705:28;;6743:24;6770:11;:18;6782:5;6770:18;;;;;;;;;;;;;;;:27;6789:7;6770:27;;;;;;;;;;;;;;;;6743:54;;6835:15;6815:16;:35;;6807:85;;;;;;;;;;;;:::i;:::-;;;;;;;;;6926:60;6935:5;6942:7;6970:15;6951:16;:34;6926:8;:60::i;:::-;7014:4;7007:11;;;;6596:429;;;;:::o;3729:189::-;3808:4;3824:13;3840:12;:10;:12::i;:::-;3824:28;;3862;3872:5;3879:2;3883:6;3862:9;:28::i;:::-;3907:4;3900:11;;;3729:189;;;;:::o;3976:149::-;4065:7;4091:11;:18;4103:5;4091:18;;;;;;;;;;;;;;;:27;4110:7;4091:27;;;;;;;;;;;;;;;;4084:34;;3976:149;;;;:::o;640:96:3:-;693:7;719:10;712:17;;640:96;:::o;10123:370:0:-;10271:1;10254:19;;:5;:19;;;;10246:68;;;;;;;;;;;;:::i;:::-;;;;;;;;;10351:1;10332:21;;:7;:21;;;;10324:68;;;;;;;;;;;;:::i;:::-;;;;;;;;;10433:6;10403:11;:18;10415:5;10403:18;;;;;;;;;;;;;;;:27;10422:7;10403:27;;;;;;;;;;;;;;;:36;;;;10470:7;10454:32;;10463:5;10454:32;;;10479:6;10454:32;;;;;;:::i;:::-;;;;;;;;10123:370;;;:::o;7488:651::-;7630:1;7614:18;;:4;:18;;;;7606:68;;;;;;;;;;;;:::i;:::-;;;;;;;;;7706:1;7692:16;;:2;:16;;;;7684:64;;;;;;;;;;;;:::i;:::-;;;;;;;;;7759:38;7780:4;7786:2;7790:6;7759:20;:38::i;:::-;7808:19;7830:9;:15;7840:4;7830:15;;;;;;;;;;;;;;;;7808:37;;7878:6;7863:11;:21;;7855:72;;;;;;;;;;;;:::i;:::-;;;;;;;;;7993:6;7979:11;:20;7961:9;:15;7971:4;7961:15;;;;;;;;;;;;;;;:38;;;;8036:6;8019:9;:13;8029:2;8019:13;;;;;;;;;;;;;;;;:23;;;;;;;:::i;:::-;;;;;;;;8073:2;8058:26;;8067:4;8058:26;;;8077:6;8058:26;;;;;;:::i;:::-;;;;;;;;8095:37;8115:4;8121:2;8125:6;8095:19;:37::i;:::-;7596:543;7488:651;;;:::o;8415:389::-;8517:1;8498:21;;:7;:21;;;;8490:65;;;;;;;;;;;;:::i;:::-;;;;;;;;;8566:49;8595:1;8599:7;8608:6;8566:20;:49::i;:::-;8642:6;8626:12;;:22;;;;;;;:::i;:::-;;;;;;;;8680:6;8658:9;:18;8668:7;8658:18;;;;;;;;;;;;;;;;:28;;;;;;;:::i;:::-;;;;;;;;8722:7;8701:37;;8718:1;8701:37;;;8731:6;8701:37;;;;;;:::i;:::-;;;;;;;;8749:48;8777:1;8781:7;8790:6;8749:19;:48::i;:::-;8415:389;;:::o;10770:441::-;10900:24;10927:25;10937:5;10944:7;10927:9;:25::i;:::-;10900:52;;10986:17;10966:16;:37;10962:243;;11047:6;11027:16;:26;;11019:68;;;;;;;;;;;;:::i;:::-;;;;;;;;;11129:51;11138:5;11145:7;11173:6;11154:16;:25;11129:8;:51::i;:::-;10962:243;10890:321;10770:441;;;:::o;11795:121::-;;;;:::o;12504:120::-;;;;:::o;7:99:7:-;59:6;93:5;87:12;77:22;;7:99;;;:::o;112:169::-;196:11;230:6;225:3;218:19;270:4;265:3;261:14;246:29;;112:169;;;;:::o;287:307::-;355:1;365:113;379:6;376:1;373:13;365:113;;;464:1;459:3;455:11;449:18;445:1;440:3;436:11;429:39;401:2;398:1;394:10;389:15;;365:113;;;496:6;493:1;490:13;487:101;;;576:1;567:6;562:3;558:16;551:27;487:101;336:258;287:307;;;:::o;600:102::-;641:6;692:2;688:7;683:2;676:5;672:14;668:28;658:38;;600:102;;;:::o;708:364::-;796:3;824:39;857:5;824:39;:::i;:::-;879:71;943:6;938:3;879:71;:::i;:::-;872:78;;959:52;1004:6;999:3;992:4;985:5;981:16;959:52;:::i;:::-;1036:29;1058:6;1036:29;:::i;:::-;1031:3;1027:39;1020:46;;800:272;708:364;;;;:::o;1078:313::-;1191:4;1229:2;1218:9;1214:18;1206:26;;1278:9;1272:4;1268:20;1264:1;1253:9;1249:17;1242:47;1306:78;1379:4;1370:6;1306:78;:::i;:::-;1298:86;;1078:313;;;;:::o;1478:117::-;1587:1;1584;1577:12;1724:126;1761:7;1801:42;1794:5;1790:54;1779:65;;1724:126;;;:::o;1856:96::-;1893:7;1922:24;1940:5;1922:24;:::i;:::-;1911:35;;1856:96;;;:::o;1958:122::-;2031:24;2049:5;2031:24;:::i;:::-;2024:5;2021:35;2011:63;;2070:1;2067;2060:12;2011:63;1958:122;:::o;2086:139::-;2132:5;2170:6;2157:20;2148:29;;2186:33;2213:5;2186:33;:::i;:::-;2086:139;;;;:::o;2231:77::-;2268:7;2297:5;2286:16;;2231:77;;;:::o;2314:122::-;2387:24;2405:5;2387:24;:::i;:::-;2380:5;2377:35;2367:63;;2426:1;2423;2416:12;2367:63;2314:122;:::o;2442:139::-;2488:5;2526:6;2513:20;2504:29;;2542:33;2569:5;2542:33;:::i;:::-;2442:139;;;;:::o;2587:474::-;2655:6;2663;2712:2;2700:9;2691:7;2687:23;2683:32;2680:119;;;2718:79;;:::i;:::-;2680:119;2838:1;2863:53;2908:7;2899:6;2888:9;2884:22;2863:53;:::i;:::-;2853:63;;2809:117;2965:2;2991:53;3036:7;3027:6;3016:9;3012:22;2991:53;:::i;:::-;2981:63;;2936:118;2587:474;;;;;:::o;3067:90::-;3101:7;3144:5;3137:13;3130:21;3119:32;;3067:90;;;:::o;3163:109::-;3244:21;3259:5;3244:21;:::i;:::-;3239:3;3232:34;3163:109;;:::o;3278:210::-;3365:4;3403:2;3392:9;3388:18;3380:26;;3416:65;3478:1;3467:9;3463:17;3454:6;3416:65;:::i;:::-;3278:210;;;;:::o;3494:118::-;3581:24;3599:5;3581:24;:::i;:::-;3576:3;3569:37;3494:118;;:::o;3618:222::-;3711:4;3749:2;3738:9;3734:18;3726:26;;3762:71;3830:1;3819:9;3815:17;3806:6;3762:71;:::i;:::-;3618:222;;;;:::o;3846:619::-;3923:6;3931;3939;3988:2;3976:9;3967:7;3963:23;3959:32;3956:119;;;3994:79;;:::i;:::-;3956:119;4114:1;4139:53;4184:7;4175:6;4164:9;4160:22;4139:53;:::i;:::-;4129:63;;4085:117;4241:2;4267:53;4312:7;4303:6;4292:9;4288:22;4267:53;:::i;:::-;4257:63;;4212:118;4369:2;4395:53;4440:7;4431:6;4420:9;4416:22;4395:53;:::i;:::-;4385:63;;4340:118;3846:619;;;;;:::o;4471:86::-;4506:7;4546:4;4539:5;4535:16;4524:27;;4471:86;;;:::o;4563:112::-;4646:22;4662:5;4646:22;:::i;:::-;4641:3;4634:35;4563:112;;:::o;4681:214::-;4770:4;4808:2;4797:9;4793:18;4785:26;;4821:67;4885:1;4874:9;4870:17;4861:6;4821:67;:::i;:::-;4681:214;;;;:::o;4901:329::-;4960:6;5009:2;4997:9;4988:7;4984:23;4980:32;4977:119;;;5015:79;;:::i;:::-;4977:119;5135:1;5160:53;5205:7;5196:6;5185:9;5181:22;5160:53;:::i;:::-;5150:63;;5106:117;4901:329;;;;:::o;5236:118::-;5323:24;5341:5;5323:24;:::i;:::-;5318:3;5311:37;5236:118;;:::o;5360:222::-;5453:4;5491:2;5480:9;5476:18;5468:26;;5504:71;5572:1;5561:9;5557:17;5548:6;5504:71;:::i;:::-;5360:222;;;;:::o;5588:474::-;5656:6;5664;5713:2;5701:9;5692:7;5688:23;5684:32;5681:119;;;5719:79;;:::i;:::-;5681:119;5839:1;5864:53;5909:7;5900:6;5889:9;5885:22;5864:53;:::i;:::-;5854:63;;5810:117;5966:2;5992:53;6037:7;6028:6;6017:9;6013:22;5992:53;:::i;:::-;5982:63;;5937:118;5588:474;;;;;:::o;6068:180::-;6116:77;6113:1;6106:88;6213:4;6210:1;6203:15;6237:4;6234:1;6227:15;6254:320;6298:6;6335:1;6329:4;6325:12;6315:22;;6382:1;6376:4;6372:12;6403:18;6393:81;;6459:4;6451:6;6447:17;6437:27;;6393:81;6521:2;6513:6;6510:14;6490:18;6487:38;6484:84;;;6540:18;;:::i;:::-;6484:84;6305:269;6254:320;;;:::o;6580:180::-;6628:77;6625:1;6618:88;6725:4;6722:1;6715:15;6749:4;6746:1;6739:15;6766:305;6806:3;6825:20;6843:1;6825:20;:::i;:::-;6820:25;;6859:20;6877:1;6859:20;:::i;:::-;6854:25;;7013:1;6945:66;6941:74;6938:1;6935:81;6932:107;;;7019:18;;:::i;:::-;6932:107;7063:1;7060;7056:9;7049:16;;6766:305;;;;:::o;7077:224::-;7217:34;7213:1;7205:6;7201:14;7194:58;7286:7;7281:2;7273:6;7269:15;7262:32;7077:224;:::o;7307:366::-;7449:3;7470:67;7534:2;7529:3;7470:67;:::i;:::-;7463:74;;7546:93;7635:3;7546:93;:::i;:::-;7664:2;7659:3;7655:12;7648:19;;7307:366;;;:::o;7679:419::-;7845:4;7883:2;7872:9;7868:18;7860:26;;7932:9;7926:4;7922:20;7918:1;7907:9;7903:17;7896:47;7960:131;8086:4;7960:131;:::i;:::-;7952:139;;7679:419;;;:::o;8104:223::-;8244:34;8240:1;8232:6;8228:14;8221:58;8313:6;8308:2;8300:6;8296:15;8289:31;8104:223;:::o;8333:366::-;8475:3;8496:67;8560:2;8555:3;8496:67;:::i;:::-;8489:74;;8572:93;8661:3;8572:93;:::i;:::-;8690:2;8685:3;8681:12;8674:19;;8333:366;;;:::o;8705:419::-;8871:4;8909:2;8898:9;8894:18;8886:26;;8958:9;8952:4;8948:20;8944:1;8933:9;8929:17;8922:47;8986:131;9112:4;8986:131;:::i;:::-;8978:139;;8705:419;;;:::o;9130:221::-;9270:34;9266:1;9258:6;9254:14;9247:58;9339:4;9334:2;9326:6;9322:15;9315:29;9130:221;:::o;9357:366::-;9499:3;9520:67;9584:2;9579:3;9520:67;:::i;:::-;9513:74;;9596:93;9685:3;9596:93;:::i;:::-;9714:2;9709:3;9705:12;9698:19;;9357:366;;;:::o;9729:419::-;9895:4;9933:2;9922:9;9918:18;9910:26;;9982:9;9976:4;9972:20;9968:1;9957:9;9953:17;9946:47;10010:131;10136:4;10010:131;:::i;:::-;10002:139;;9729:419;;;:::o;10154:224::-;10294:34;10290:1;10282:6;10278:14;10271:58;10363:7;10358:2;10350:6;10346:15;10339:32;10154:224;:::o;10384:366::-;10526:3;10547:67;10611:2;10606:3;10547:67;:::i;:::-;10540:74;;10623:93;10712:3;10623:93;:::i;:::-;10741:2;10736:3;10732:12;10725:19;;10384:366;;;:::o;10756:419::-;10922:4;10960:2;10949:9;10945:18;10937:26;;11009:9;11003:4;10999:20;10995:1;10984:9;10980:17;10973:47;11037:131;11163:4;11037:131;:::i;:::-;11029:139;;10756:419;;;:::o;11181:222::-;11321:34;11317:1;11309:6;11305:14;11298:58;11390:5;11385:2;11377:6;11373:15;11366:30;11181:222;:::o;11409:366::-;11551:3;11572:67;11636:2;11631:3;11572:67;:::i;:::-;11565:74;;11648:93;11737:3;11648:93;:::i;:::-;11766:2;11761:3;11757:12;11750:19;;11409:366;;;:::o;11781:419::-;11947:4;11985:2;11974:9;11970:18;11962:26;;12034:9;12028:4;12024:20;12020:1;12009:9;12005:17;11998:47;12062:131;12188:4;12062:131;:::i;:::-;12054:139;;11781:419;;;:::o;12206:225::-;12346:34;12342:1;12334:6;12330:14;12323:58;12415:8;12410:2;12402:6;12398:15;12391:33;12206:225;:::o;12437:366::-;12579:3;12600:67;12664:2;12659:3;12600:67;:::i;:::-;12593:74;;12676:93;12765:3;12676:93;:::i;:::-;12794:2;12789:3;12785:12;12778:19;;12437:366;;;:::o;12809:419::-;12975:4;13013:2;13002:9;12998:18;12990:26;;13062:9;13056:4;13052:20;13048:1;13037:9;13033:17;13026:47;13090:131;13216:4;13090:131;:::i;:::-;13082:139;;12809:419;;;:::o;13234:181::-;13374:33;13370:1;13362:6;13358:14;13351:57;13234:181;:::o;13421:366::-;13563:3;13584:67;13648:2;13643:3;13584:67;:::i;:::-;13577:74;;13660:93;13749:3;13660:93;:::i;:::-;13778:2;13773:3;13769:12;13762:19;;13421:366;;;:::o;13793:419::-;13959:4;13997:2;13986:9;13982:18;13974:26;;14046:9;14040:4;14036:20;14032:1;14021:9;14017:17;14010:47;14074:131;14200:4;14074:131;:::i;:::-;14066:139;;13793:419;;;:::o;14218:179::-;14358:31;14354:1;14346:6;14342:14;14335:55;14218:179;:::o;14403:366::-;14545:3;14566:67;14630:2;14625:3;14566:67;:::i;:::-;14559:74;;14642:93;14731:3;14642:93;:::i;:::-;14760:2;14755:3;14751:12;14744:19;;14403:366;;;:::o;14775:419::-;14941:4;14979:2;14968:9;14964:18;14956:26;;15028:9;15022:4;15018:20;15014:1;15003:9;14999:17;14992:47;15056:131;15182:4;15056:131;:::i;:::-;15048:139;;14775:419;;;:::o",
    "source": "pragma solidity ^0.8.0;\r\n\r\nimport \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";\r\n\r\ncontract AriaToken is ERC20 {\r\n    address public owner;\r\n\r\n    event mintedToken(uint256 balance);\r\n\r\n    constructor() ERC20(\"AriaToken\", \"ARA\") {\r\n        owner = msg.sender;\r\n    }\r\n\r\n    function mintToken() public returns (bool) {\r\n        _mint(msg.sender, 10**18);\r\n\r\n        return true;\r\n    }\r\n\r\n    function transferToken(address _to, uint256 _amount) public returns (bool) {\r\n        _transfer(msg.sender, _to, _amount);\r\n\r\n        return true;\r\n    }\r\n}",
    "sourcePath": "/Users/jeong-gyeongjae/Desktop/AriaToken_Empty/contracts/AriaToken.sol",
    "ast": {
      "absolutePath": "project:/contracts/AriaToken.sol",
      "exportedSymbols": {
        "AriaToken": [
          816
        ],
        "Context": [
          712
        ],
        "ERC20": [
          587
        ],
        "IERC20": [
          665
        ],
        "IERC20Metadata": [
          690
        ]
      },
      "id": 817,
      "nodeType": "SourceUnit",
      "nodes": [
        {
          "id": 758,
          "literals": [
            "solidity",
            "^",
            "0.8",
            ".0"
          ],
          "nodeType": "PragmaDirective",
          "src": "0:23:5"
        },
        {
          "absolutePath": "@openzeppelin/contracts/token/ERC20/ERC20.sol",
          "file": "@openzeppelin/contracts/token/ERC20/ERC20.sol",
          "id": 759,
          "nameLocation": "-1:-1:-1",
          "nodeType": "ImportDirective",
          "scope": 817,
          "sourceUnit": 588,
          "src": "27:55:5",
          "symbolAliases": [],
          "unitAlias": ""
        },
        {
          "abstract": false,
          "baseContracts": [
            {
              "baseName": {
                "id": 760,
                "name": "ERC20",
                "nodeType": "IdentifierPath",
                "referencedDeclaration": 587,
                "src": "108:5:5"
              },
              "id": 761,
              "nodeType": "InheritanceSpecifier",
              "src": "108:5:5"
            }
          ],
          "canonicalName": "AriaToken",
          "contractDependencies": [],
          "contractKind": "contract",
          "fullyImplemented": true,
          "id": 816,
          "linearizedBaseContracts": [
            816,
            587,
            690,
            665,
            712
          ],
          "name": "AriaToken",
          "nameLocation": "95:9:5",
          "nodeType": "ContractDefinition",
          "nodes": [
            {
              "constant": false,
              "functionSelector": "8da5cb5b",
              "id": 763,
              "mutability": "mutable",
              "name": "owner",
              "nameLocation": "136:5:5",
              "nodeType": "VariableDeclaration",
              "scope": 816,
              "src": "121:20:5",
              "stateVariable": true,
              "storageLocation": "default",
              "typeDescriptions": {
                "typeIdentifier": "t_address",
                "typeString": "address"
              },
              "typeName": {
                "id": 762,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "121:7:5",
                "stateMutability": "nonpayable",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "visibility": "public"
            },
            {
              "anonymous": false,
              "id": 767,
              "name": "mintedToken",
              "nameLocation": "156:11:5",
              "nodeType": "EventDefinition",
              "parameters": {
                "id": 766,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 765,
                    "indexed": false,
                    "mutability": "mutable",
                    "name": "balance",
                    "nameLocation": "176:7:5",
                    "nodeType": "VariableDeclaration",
                    "scope": 767,
                    "src": "168:15:5",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 764,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "168:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "visibility": "internal"
                  }
                ],
                "src": "167:17:5"
              },
              "src": "150:35:5"
            },
            {
              "body": {
                "id": 779,
                "nodeType": "Block",
                "src": "233:37:5",
                "statements": [
                  {
                    "expression": {
                      "id": 777,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "lValueRequested": false,
                      "leftHandSide": {
                        "id": 774,
                        "name": "owner",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 763,
                        "src": "244:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "nodeType": "Assignment",
                      "operator": "=",
                      "rightHandSide": {
                        "expression": {
                          "id": 775,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 4294967281,
                          "src": "252:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 776,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "src": "252:10:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address",
                          "typeString": "address"
                        }
                      },
                      "src": "244:18:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "id": 778,
                    "nodeType": "ExpressionStatement",
                    "src": "244:18:5"
                  }
                ]
              },
              "id": 780,
              "implemented": true,
              "kind": "constructor",
              "modifiers": [
                {
                  "arguments": [
                    {
                      "hexValue": "41726961546f6b656e",
                      "id": 770,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "213:11:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_020acbd57344e135344a07140568243426d00381b15b938a9e817e8260a389a0",
                        "typeString": "literal_string \"AriaToken\""
                      },
                      "value": "AriaToken"
                    },
                    {
                      "hexValue": "415241",
                      "id": 771,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "string",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "226:5:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_stringliteral_f7d1bec9d15d3a46b94945959edf7e342087ba88f1ee67d68e32022c75ae2f07",
                        "typeString": "literal_string \"ARA\""
                      },
                      "value": "ARA"
                    }
                  ],
                  "id": 772,
                  "kind": "baseConstructorSpecifier",
                  "modifierName": {
                    "id": 769,
                    "name": "ERC20",
                    "nodeType": "IdentifierPath",
                    "referencedDeclaration": 587,
                    "src": "207:5:5"
                  },
                  "nodeType": "ModifierInvocation",
                  "src": "207:25:5"
                }
              ],
              "name": "",
              "nameLocation": "-1:-1:-1",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 768,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "204:2:5"
              },
              "returnParameters": {
                "id": 773,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "233:0:5"
              },
              "scope": 816,
              "src": "193:77:5",
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            {
              "body": {
                "id": 795,
                "nodeType": "Block",
                "src": "321:68:5",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "expression": {
                            "id": 786,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4294967281,
                            "src": "338:3:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 787,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "src": "338:10:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "commonType": {
                            "typeIdentifier": "t_rational_1000000000000000000_by_1",
                            "typeString": "int_const 1000000000000000000"
                          },
                          "id": 790,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "leftExpression": {
                            "hexValue": "3130",
                            "id": 788,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "350:2:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_10_by_1",
                              "typeString": "int_const 10"
                            },
                            "value": "10"
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "**",
                          "rightExpression": {
                            "hexValue": "3138",
                            "id": 789,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "354:2:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_18_by_1",
                              "typeString": "int_const 18"
                            },
                            "value": "18"
                          },
                          "src": "350:6:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_1000000000000000000_by_1",
                            "typeString": "int_const 1000000000000000000"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          {
                            "typeIdentifier": "t_rational_1000000000000000000_by_1",
                            "typeString": "int_const 1000000000000000000"
                          }
                        ],
                        "id": 785,
                        "name": "_mint",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 404,
                        "src": "332:5:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_uint256_$returns$__$",
                          "typeString": "function (address,uint256)"
                        }
                      },
                      "id": 791,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "332:25:5",
                      "tryCall": false,
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 792,
                    "nodeType": "ExpressionStatement",
                    "src": "332:25:5"
                  },
                  {
                    "expression": {
                      "hexValue": "74727565",
                      "id": 793,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "377:4:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "functionReturnParameters": 784,
                    "id": 794,
                    "nodeType": "Return",
                    "src": "370:11:5"
                  }
                ]
              },
              "functionSelector": "2004ffd9",
              "id": 796,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "mintToken",
              "nameLocation": "287:9:5",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 781,
                "nodeType": "ParameterList",
                "parameters": [],
                "src": "296:2:5"
              },
              "returnParameters": {
                "id": 784,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 783,
                    "mutability": "mutable",
                    "name": "",
                    "nameLocation": "-1:-1:-1",
                    "nodeType": "VariableDeclaration",
                    "scope": 796,
                    "src": "315:4:5",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "typeName": {
                      "id": 782,
                      "name": "bool",
                      "nodeType": "ElementaryTypeName",
                      "src": "315:4:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "visibility": "internal"
                  }
                ],
                "src": "314:6:5"
              },
              "scope": 816,
              "src": "278:111:5",
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            },
            {
              "body": {
                "id": 814,
                "nodeType": "Block",
                "src": "472:78:5",
                "statements": [
                  {
                    "expression": {
                      "arguments": [
                        {
                          "expression": {
                            "id": 806,
                            "name": "msg",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 4294967281,
                            "src": "493:3:5",
                            "typeDescriptions": {
                              "typeIdentifier": "t_magic_message",
                              "typeString": "msg"
                            }
                          },
                          "id": 807,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "memberName": "sender",
                          "nodeType": "MemberAccess",
                          "src": "493:10:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "id": 808,
                          "name": "_to",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 798,
                          "src": "505:3:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          }
                        },
                        {
                          "id": 809,
                          "name": "_amount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 800,
                          "src": "510:7:5",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          {
                            "typeIdentifier": "t_address",
                            "typeString": "address"
                          },
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        ],
                        "id": 805,
                        "name": "_transfer",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 348,
                        "src": "483:9:5",
                        "typeDescriptions": {
                          "typeIdentifier": "t_function_internal_nonpayable$_t_address_$_t_address_$_t_uint256_$returns$__$",
                          "typeString": "function (address,address,uint256)"
                        }
                      },
                      "id": 810,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "functionCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "483:35:5",
                      "tryCall": false,
                      "typeDescriptions": {
                        "typeIdentifier": "t_tuple$__$",
                        "typeString": "tuple()"
                      }
                    },
                    "id": 811,
                    "nodeType": "ExpressionStatement",
                    "src": "483:35:5"
                  },
                  {
                    "expression": {
                      "hexValue": "74727565",
                      "id": 812,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "538:4:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "functionReturnParameters": 804,
                    "id": 813,
                    "nodeType": "Return",
                    "src": "531:11:5"
                  }
                ]
              },
              "functionSelector": "1072cbea",
              "id": 815,
              "implemented": true,
              "kind": "function",
              "modifiers": [],
              "name": "transferToken",
              "nameLocation": "406:13:5",
              "nodeType": "FunctionDefinition",
              "parameters": {
                "id": 801,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 798,
                    "mutability": "mutable",
                    "name": "_to",
                    "nameLocation": "428:3:5",
                    "nodeType": "VariableDeclaration",
                    "scope": 815,
                    "src": "420:11:5",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_address",
                      "typeString": "address"
                    },
                    "typeName": {
                      "id": 797,
                      "name": "address",
                      "nodeType": "ElementaryTypeName",
                      "src": "420:7:5",
                      "stateMutability": "nonpayable",
                      "typeDescriptions": {
                        "typeIdentifier": "t_address",
                        "typeString": "address"
                      }
                    },
                    "visibility": "internal"
                  },
                  {
                    "constant": false,
                    "id": 800,
                    "mutability": "mutable",
                    "name": "_amount",
                    "nameLocation": "441:7:5",
                    "nodeType": "VariableDeclaration",
                    "scope": 815,
                    "src": "433:15:5",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    },
                    "typeName": {
                      "id": 799,
                      "name": "uint256",
                      "nodeType": "ElementaryTypeName",
                      "src": "433:7:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "visibility": "internal"
                  }
                ],
                "src": "419:30:5"
              },
              "returnParameters": {
                "id": 804,
                "nodeType": "ParameterList",
                "parameters": [
                  {
                    "constant": false,
                    "id": 803,
                    "mutability": "mutable",
                    "name": "",
                    "nameLocation": "-1:-1:-1",
                    "nodeType": "VariableDeclaration",
                    "scope": 815,
                    "src": "466:4:5",
                    "stateVariable": false,
                    "storageLocation": "default",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    },
                    "typeName": {
                      "id": 802,
                      "name": "bool",
                      "nodeType": "ElementaryTypeName",
                      "src": "466:4:5",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "visibility": "internal"
                  }
                ],
                "src": "465:6:5"
              },
              "scope": 816,
              "src": "397:153:5",
              "stateMutability": "nonpayable",
              "virtual": false,
              "visibility": "public"
            }
          ],
          "scope": 817,
          "src": "86:467:5",
          "usedErrors": []
        }
      ],
      "src": "0:553:5"
    },
    "compiler": {
      "name": "solc",
      "version": "0.8.12+commit.f00d7308.Emscripten.clang"
    },
    "networks": {
      "3": {
        "events": {},
        "links": {},
        "address": "0xED322129F97127E996447c46fFb66184B753d45d",
        "transactionHash": "0xbae1207956cf4e708e95c24e0bc6c73a20654ec1499d91bea069a64d45ae6be1"
      },
      "5777": {
        "events": {},
        "links": {},
        "address": "0xacCd0e13982c63d5A6Cf20759Be43141Ff4B2EC4",
        "transactionHash": "0xba5dbb05d9eea4eb03e389ffef6482454d15c498017a40654279ad993f1a913b"
      }
    },
    "schemaVersion": "3.4.9",
    "updatedAt": "2022-08-20T04:06:47.443Z",
    "networkType": "ethereum",
    "devdoc": {
      "kind": "dev",
      "methods": {
        "allowance(address,address)": {
          "details": "See {IERC20-allowance}."
        },
        "approve(address,uint256)": {
          "details": "See {IERC20-approve}. NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on `transferFrom`. This is semantically equivalent to an infinite approval. Requirements: - `spender` cannot be the zero address."
        },
        "balanceOf(address)": {
          "details": "See {IERC20-balanceOf}."
        },
        "decimals()": {
          "details": "Returns the number of decimals used to get its user representation. For example, if `decimals` equals `2`, a balance of `505` tokens should be displayed to a user as `5.05` (`505 / 10 ** 2`). Tokens usually opt for a value of 18, imitating the relationship between Ether and Wei. This is the value {ERC20} uses, unless this function is overridden; NOTE: This information is only used for _display_ purposes: it in no way affects any of the arithmetic of the contract, including {IERC20-balanceOf} and {IERC20-transfer}."
        },
        "decreaseAllowance(address,uint256)": {
          "details": "Atomically decreases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address. - `spender` must have allowance for the caller of at least `subtractedValue`."
        },
        "increaseAllowance(address,uint256)": {
          "details": "Atomically increases the allowance granted to `spender` by the caller. This is an alternative to {approve} that can be used as a mitigation for problems described in {IERC20-approve}. Emits an {Approval} event indicating the updated allowance. Requirements: - `spender` cannot be the zero address."
        },
        "name()": {
          "details": "Returns the name of the token."
        },
        "symbol()": {
          "details": "Returns the symbol of the token, usually a shorter version of the name."
        },
        "totalSupply()": {
          "details": "See {IERC20-totalSupply}."
        },
        "transfer(address,uint256)": {
          "details": "See {IERC20-transfer}. Requirements: - `to` cannot be the zero address. - the caller must have a balance of at least `amount`."
        },
        "transferFrom(address,address,uint256)": {
          "details": "See {IERC20-transferFrom}. Emits an {Approval} event indicating the updated allowance. This is not required by the EIP. See the note at the beginning of {ERC20}. NOTE: Does not update the allowance if the current allowance is the maximum `uint256`. Requirements: - `from` and `to` cannot be the zero address. - `from` must have a balance of at least `amount`. - the caller must have allowance for ``from``'s tokens of at least `amount`."
        }
      },
      "version": 1
    },
    "userdoc": {
      "kind": "user",
      "methods": {},
      "version": 1
    }
  },
  
  init: async function() {
    return await App.initWeb3();
  },
  initWeb3: async function() {
    if (window.ethereum) {
      console.log("connected via window.ethereum");
      App.web3Provider = window.ethereum;
      console.log(App.web3Provider);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        console.error("User denied account access")
      }
    }
    else if (window.web3) {
      console.log("connected via currentProvider");
      App.web3Provider = window.web3.currentProvider;
    }
    else {
      console.log("connected via http://localhost:7545");
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    console.log(web3);

    return App.initContract();
  },
  initAccount: function() {
    account = web3.eth.coinbase;
    console.log(account);
    document.getElementById('account').innerHTML = account;
  },
  initContract: async function() {
    var AriaTokenArtifact = App.data;
    App.contracts.AriaToken = window.TruffleContract(AriaTokenArtifact);
    App.contracts.AriaToken.setProvider(App.web3Provider);

    App.initAccount();
    App.loadInstance();

    return App.bindEvents();
  },
  bindEvents: function() {
    $(document).on('click', '.btn-loadInstance', App.loadInstance);
    $(document).on('click', '.btn-refrash', App.refrash);
    $(document).on('click', '.btn-mintToken', App.handleMintToken);
    $(document).on('click', '.btn-balanceOf', App.handleBalanceOf);
  },
  refrash: function() {
    App.handleBalanceOf();
  },
  loadInstance: function() {
    App.contracts.AriaToken.deployed().then(function(_instance) {
      instance = _instance;
      console.log(instance);

      App.refrash();
    });
  },
  handleBalanceOf: function() {
    instance.balanceOf(account, {from: account, gas: 300000})
    .then((result) => {
      console.log((result.toNumber() / 10**18));
      document.getElementById('balanceOf').innerHTML = (result.toNumber() / 10**18) + " ARA";
    });
  },
  handleMintToken: function() {
    instance.mintToken({from: account, gas: 300000})
    .then((result) => {
      console.log("minted AriaTokens");
      App.refrash();
    });
  }
};

$(function() {
  $(document).ready(function() {
    App.init();
  });
});