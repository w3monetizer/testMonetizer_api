const Blockchain = require('./blockchain');
const solution = new Blockchain();

const sol1 = {
  "chain": [
    {
      "index": 1,
      "timestamp": 1612974625925,
      "transactions": [],
      "nonce": 33865295,
      "hash": "https://github.com/w3monetizer/testMonetizer_api",
      "previousBlockHash": "stefian"
    },
    {
      "index": 2,
      "timestamp": 1612982113204,
      "transactions": [],
      "nonce": 24,
      "hash": "0ec5075fa907f78ca786929098fb98af72881dd71d922d7d49063418cea969eb",
      "previousBlockHash": "https://github.com/w3monetizer/testMonetizer_api"
    },
    {
      "index": 3,
      "timestamp": 1612982317281,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "Project/BudgetOwnerAddr",
          "recipient": "479aa4406bbd11eb9f448778e310268d",
          "transactionId": "b663a2306bce11eb9f448778e310268d"
        },
        {
          "amount": 10,
          "sender": "STEVEDRHRDJTFKYF",
          "recipient": "ALEXEWKYFTRSDJFGLLGL",
          "transactionId": "f9330ec06bce11eb9f448778e310268d",
          "commit": "ytarsrayadrayrdc",
          "senderRepo": "github.com/project-repo",
          "recipientRepo": "github.com/service-repo",
          "recipientBranch": "github.com/project-repo/service-branch"
        },
        {
          "amount": 20,
          "sender": "STEVEDRHRDJTFKYF",
          "recipient": "ALEXEWKYFTRSDJFGLLGL",
          "transactionId": "0e7346106bcf11eb9f448778e310268d",
          "commit": "ytarsrayadrayrdc",
          "senderRepo": "github.com/project-repo",
          "recipientRepo": "github.com/service-repo",
          "recipientBranch": "github.com/project-repo/service-branch"
        },
        {
          "amount": 30,
          "sender": "STEVEDRHRDJTFKYF",
          "recipient": "ALEXEWKYFTRSDJFGLLGL",
          "transactionId": "22dd41a06bcf11eb9f448778e310268d",
          "commit": "ytarsrayadrayrdc",
          "senderRepo": "github.com/project-repo",
          "recipientRepo": "github.com/service-repo",
          "recipientBranch": "github.com/project-repo/service-branch"
        }
      ],
      "nonce": 5,
      "hash": "04697a21a3b40c9c588a31b4c2e9ee5f54829bc314b898d6eb5a8959cbb6d373",
      "previousBlockHash": "0ec5075fa907f78ca786929098fb98af72881dd71d922d7d49063418cea969eb"
    },
    {
      "index": 4,
      "timestamp": 1612982500154,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "Project/BudgetOwnerAddr",
          "recipient": "479aa4406bbd11eb9f448778e310268d",
          "transactionId": "30030a406bcf11eb9f448778e310268d"
        },
        {
          "amount": 40,
          "sender": "STEVEDRHRDJTFKYF",
          "recipient": "ALEXEWKYFTRSDJFGLLGL",
          "transactionId": "63d137706bcf11eb9f448778e310268d",
          "commit": "ytarsrayadrayrdc",
          "senderRepo": "github.com/project-repo",
          "recipientRepo": "github.com/service-repo",
          "recipientBranch": "github.com/project-repo/service-branch"
        },
        {
          "amount": 50,
          "sender": "STEVEDRHRDJTFKYF",
          "recipient": "ALEXEWKYFTRSDJFGLLGL",
          "transactionId": "765b4f706bcf11eb9f448778e310268d",
          "commit": "ytarsrayadrayrdc",
          "senderRepo": "github.com/project-repo",
          "recipientRepo": "github.com/service-repo",
          "recipientBranch": "github.com/project-repo/service-branch"
        },
        {
          "amount": 60,
          "sender": "STEVEDRHRDJTFKYF",
          "recipient": "ALEXEWKYFTRSDJFGLLGL",
          "transactionId": "80a129a06bcf11eb9f448778e310268d",
          "commit": "ytarsrayadrayrdc",
          "senderRepo": "github.com/project-repo",
          "recipientRepo": "github.com/service-repo",
          "recipientBranch": "github.com/project-repo/service-branch"
        },
        {
          "amount": 70,
          "sender": "STEVEDRHRDJTFKYF",
          "recipient": "ALEXEWKYFTRSDJFGLLGL",
          "transactionId": "8d85a3806bcf11eb9f448778e310268d",
          "commit": "ytarsrayadrayrdc",
          "senderRepo": "github.com/project-repo",
          "recipientRepo": "github.com/service-repo",
          "recipientBranch": "github.com/project-repo/service-branch"
        }
      ],
      "nonce": 10,
      "hash": "0c56da75f7e80df128d0227f45fda9c01e4e39354d04b4350a6639fb30bf06bb",
      "previousBlockHash": "04697a21a3b40c9c588a31b4c2e9ee5f54829bc314b898d6eb5a8959cbb6d373"
    },
    {
      "index": 5,
      "timestamp": 1612982544047,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "Project/BudgetOwnerAddr",
          "recipient": "479aa4406bbd11eb9f448778e310268d",
          "transactionId": "9d0317c06bcf11eb9f448778e310268d"
        }
      ],
      "nonce": 9,
      "hash": "02747ad1d09d08bd119966b4abaa292892a008098b0f0d4fab2e276cac782f1c",
      "previousBlockHash": "0c56da75f7e80df128d0227f45fda9c01e4e39354d04b4350a6639fb30bf06bb"
    },
    {
      "index": 6,
      "timestamp": 1612982604032,
      "transactions": [
        {
          "amount": 12.5,
          "sender": "Project/BudgetOwnerAddr",
          "recipient": "479aa4406bbd11eb9f448778e310268d",
          "transactionId": "b72ca2106bcf11eb9f448778e310268d"
        }
      ],
      "nonce": 12,
      "hash": "07ef69cbc17e0c9c3c0f171ddab30ac666d1a6cfe0ba192ca3ce43ff21829bfe",
      "previousBlockHash": "02747ad1d09d08bd119966b4abaa292892a008098b0f0d4fab2e276cac782f1c"
    }
  ],
  "pendingTransactions": [
    {
      "amount": 12.5,
      "sender": "Project/BudgetOwnerAddr",
      "recipient": "479aa4406bbd11eb9f448778e310268d",
      "transactionId": "daedc5306bcf11eb9f448778e310268d"
    }
  ],
  "currentNodeUrl": "http://localhost:3001",
  "webNodes": []
};

console.log('VALID: ', solution.chainIsValid(sol1.chain));
