import { Abi } from 'abitype'

export const EBTC_ABI: Abi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_bridge',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: 'account',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'burn',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'decimals',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint8',
        internalType: 'uint8',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'mint',
    inputs: [
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'setBridge',
    inputs: [
      {
        name: '_bridge',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'totalSupply',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BridgeSet',
    inputs: [
      {
        name: 'bridge',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TokenBurnt',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TokenMinted',
    inputs: [
      {
        name: 'to',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AdminOnly',
    inputs: [],
  },
  {
    type: 'error',
    name: 'BridgeOnly',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ERC20InsufficientAllowance',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'allowance',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'needed',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InsufficientBalance',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'balance',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'needed',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidApprover',
    inputs: [
      {
        name: 'approver',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidReceiver',
    inputs: [
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidSender',
    inputs: [
      {
        name: 'sender',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'ERC20InvalidSpender',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
]

export const BRIDGE_ABI: Abi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_ebtc',
        type: 'address',
        internalType: 'contract EBTC',
      },
      {
        name: '_blockStorage',
        type: 'address',
        internalType: 'contract IStorage',
      },
      {
        name: '_nOfNPubKey',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'burnEBTC',
    inputs: [
      {
        name: 'withdrawer',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'proof',
        type: 'tuple',
        internalType: 'struct ProofInfo',
        components: [
          {
            name: 'version',
            type: 'bytes4',
            internalType: 'bytes4',
          },
          {
            name: 'locktime',
            type: 'bytes4',
            internalType: 'bytes4',
          },
          {
            name: 'merkleProof',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'txId',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'index',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'header',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'parents',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'children',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'blockHeight',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rawVin',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'rawVout',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'difficultyThreshold',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pegIn',
    inputs: [
      {
        name: 'depositor',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'depositorPubKey',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'proof1',
        type: 'tuple',
        internalType: 'struct ProofInfo',
        components: [
          {
            name: 'version',
            type: 'bytes4',
            internalType: 'bytes4',
          },
          {
            name: 'locktime',
            type: 'bytes4',
            internalType: 'bytes4',
          },
          {
            name: 'merkleProof',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'txId',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'index',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'header',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'parents',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'children',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'blockHeight',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rawVin',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'rawVout',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'proof2',
        type: 'tuple',
        internalType: 'struct ProofInfo',
        components: [
          {
            name: 'version',
            type: 'bytes4',
            internalType: 'bytes4',
          },
          {
            name: 'locktime',
            type: 'bytes4',
            internalType: 'bytes4',
          },
          {
            name: 'merkleProof',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'txId',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'index',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'header',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'parents',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'children',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'blockHeight',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'rawVin',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'rawVout',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'pegInTimelock',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint32',
        internalType: 'uint32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pegOut',
    inputs: [
      {
        name: 'destinationBitcoinAddress',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'sourceOutpoint',
        type: 'tuple',
        internalType: 'struct Outpoint',
        components: [
          {
            name: 'txId',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'vOut',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'operatorPubkey',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'refundEBTC',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'PegInMinted',
    inputs: [
      {
        name: 'depositor',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'depositorPubKey',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PegOutBurnt',
    inputs: [
      {
        name: 'withdrawer',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'sourceOutpoint',
        type: 'tuple',
        indexed: false,
        internalType: 'struct Outpoint',
        components: [
          {
            name: 'txId',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'vOut',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'operatorPubkey',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PegOutClaimed',
    inputs: [
      {
        name: 'withdrawer',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'sourceOutpoint',
        type: 'tuple',
        indexed: false,
        internalType: 'struct Outpoint',
        components: [
          {
            name: 'txId',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'vOut',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'operatorPubkey',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'PegOutInitiated',
    inputs: [
      {
        name: 'withdrawer',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'destinationAddress',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'sourceOutpoint',
        type: 'tuple',
        indexed: false,
        internalType: 'struct Outpoint',
        components: [
          {
            name: 'txId',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'vOut',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'operatorPubkey',
        type: 'bytes',
        indexed: false,
        internalType: 'bytes',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'DifficultyMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Hash256OutOfGas',
    inputs: [],
  },
  {
    type: 'error',
    name: 'IdentityOutOfGas',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientAccumulatedDifficulty',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidAmount',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidPegOutProofAmount',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidPegOutProofOutputsSize',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidPegOutProofScriptPubKey',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidPegOutProofTransactionId',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSPVProof',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidVinLength',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidVoutLength',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidVoutValue',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MerkleRootMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MultisigScriptMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NextHashMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PegInInvalid',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PegOutInProgress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PegOutNotFound',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PreviousHashMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ScriptBytesTooLong',
    inputs: [],
  },
  {
    type: 'error',
    name: 'ScriptKeyMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'SpvCheckFailed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'StringsInsufficientHexLength',
    inputs: [
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'length',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'TransactionIdMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UtxoNotAvailable',
    inputs: [
      {
        name: 'txId',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'vOut',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'withdrawer',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'VinReadOverrun',
    inputs: [],
  },
  {
    type: 'error',
    name: 'VoutReadOverrun',
    inputs: [],
  },
]
