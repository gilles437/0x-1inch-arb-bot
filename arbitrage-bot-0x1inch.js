require('dotenv').config()
require('console.table')
const fs = require('fs');

const express = require('express')
const path = require('path')
const player = require('play-sound')(opts = {})
const http = require('http')
const cors = require('cors')
const Web3 = require('web3')
const axios = require('axios')
const moment = require('moment-timezone')
const numeral = require('numeral')
const _ = require('lodash')


API_KEY_ETHGAS_PULSE = "db84e1509032bc4cc4f96d1c8791d92b667d28adc606bda9480c9a616310"
// SERVER CONFIG
const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({credentials: true, origin: '*'}))

// WEB3 CONFIG
const web3 = new Web3(process.env.RPC_URL)
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY)

// SMART CONTRACTS
const ONE_SPLIT_ABI = [{"inputs":[{"internalType":"contract IOneSplit","name":"impl","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newImpl","type":"address"}],"name":"ImplementationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_AAVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_BANCOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_BDAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CHAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_BINANCE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_SYNTHETIX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_USDT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_Y","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_FULCRUM","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_IEARN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_KYBER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_OASIS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_SMART_TOKEN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_UNISWAP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_WETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_BANCOR_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_OASIS_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_UNISWAP_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_MULTI_PATH_DAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_MULTI_PATH_ETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_MULTI_PATH_USDC","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_UNISWAP_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"contract IERC20","name":"fromToken","type":"address"},{"internalType":"contract IERC20","name":"toToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"parts","type":"uint256"},{"internalType":"uint256","name":"featureFlags","type":"uint256"}],"name":"getExpectedReturn","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"},{"internalType":"uint256[]","name":"distribution","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oneSplitImpl","outputs":[{"internalType":"contract IOneSplit","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IOneSplit","name":"impl","type":"address"}],"name":"setNewImpl","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"fromToken","type":"address"},{"internalType":"contract IERC20","name":"toToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"distribution","type":"uint256[]"},{"internalType":"uint256","name":"featureFlags","type":"uint256"}],"name":"swap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const ONE_SPLIT_ADDRESS = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"
const oneSplitContract = new web3.eth.Contract(ONE_SPLIT_ABI, ONE_SPLIT_ADDRESS);

const ERC_20_ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

const ZRX_EXCHANGE_ADDRESS = '0x61935CbDd02287B511119DDb11Aeb42F1593b7Ef'
const ZRX_EXCHANGE_ABI = [{"inputs":[{"internalType":"uint256","name":"chainId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes4","name":"id","type":"bytes4"},{"indexed":false,"internalType":"address","name":"assetProxy","type":"address"}],"name":"AssetProxyRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"makerAddress","type":"address"},{"indexed":true,"internalType":"address","name":"feeRecipientAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"indexed":false,"internalType":"address","name":"senderAddress","type":"address"},{"indexed":true,"internalType":"bytes32","name":"orderHash","type":"bytes32"}],"name":"Cancel","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"makerAddress","type":"address"},{"indexed":true,"internalType":"address","name":"orderSenderAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"orderEpoch","type":"uint256"}],"name":"CancelUpTo","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"makerAddress","type":"address"},{"indexed":true,"internalType":"address","name":"feeRecipientAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"},{"indexed":true,"internalType":"bytes32","name":"orderHash","type":"bytes32"},{"indexed":false,"internalType":"address","name":"takerAddress","type":"address"},{"indexed":false,"internalType":"address","name":"senderAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"name":"Fill","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"oldProtocolFeeCollector","type":"address"},{"indexed":false,"internalType":"address","name":"updatedProtocolFeeCollector","type":"address"}],"name":"ProtocolFeeCollectorAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldProtocolFeeMultiplier","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"updatedProtocolFeeMultiplier","type":"uint256"}],"name":"ProtocolFeeMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"signerAddress","type":"address"},{"indexed":true,"internalType":"address","name":"validatorAddress","type":"address"},{"indexed":false,"internalType":"bool","name":"isApproved","type":"bool"}],"name":"SignatureValidatorApproval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"transactionHash","type":"bytes32"}],"name":"TransactionExecution","type":"event"},{"constant":true,"inputs":[],"name":"EIP1271_MAGIC_VALUE","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"EIP712_EXCHANGE_DOMAIN_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowedValidators","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"orders","type":"tuple[]"}],"name":"batchCancelOrders","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"gasPrice","type":"uint256"},{"internalType":"address","name":"signerAddress","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct LibZeroExTransaction.ZeroExTransaction[]","name":"transactions","type":"tuple[]"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"name":"batchExecuteTransactions","outputs":[{"internalType":"bytes[]","name":"","type":"bytes[]"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"orders","type":"tuple[]"},{"internalType":"uint256[]","name":"takerAssetFillAmounts","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"name":"batchFillOrKillOrders","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults[]","name":"fillResults","type":"tuple[]"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"orders","type":"tuple[]"},{"internalType":"uint256[]","name":"takerAssetFillAmounts","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"name":"batchFillOrders","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults[]","name":"fillResults","type":"tuple[]"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"orders","type":"tuple[]"},{"internalType":"uint256[]","name":"takerAssetFillAmounts","type":"uint256[]"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"name":"batchFillOrdersNoThrow","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults[]","name":"fillResults","type":"tuple[]"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"leftOrders","type":"tuple[]"},{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"rightOrders","type":"tuple[]"},{"internalType":"bytes[]","name":"leftSignatures","type":"bytes[]"},{"internalType":"bytes[]","name":"rightSignatures","type":"bytes[]"}],"name":"batchMatchOrders","outputs":[{"components":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults[]","name":"left","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults[]","name":"right","type":"tuple[]"},{"internalType":"uint256","name":"profitInLeftMakerAsset","type":"uint256"},{"internalType":"uint256","name":"profitInRightMakerAsset","type":"uint256"}],"internalType":"struct LibFillResults.BatchMatchedFillResults","name":"batchMatchedFillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"leftOrders","type":"tuple[]"},{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"rightOrders","type":"tuple[]"},{"internalType":"bytes[]","name":"leftSignatures","type":"bytes[]"},{"internalType":"bytes[]","name":"rightSignatures","type":"bytes[]"}],"name":"batchMatchOrdersWithMaximalFill","outputs":[{"components":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults[]","name":"left","type":"tuple[]"},{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults[]","name":"right","type":"tuple[]"},{"internalType":"uint256","name":"profitInLeftMakerAsset","type":"uint256"},{"internalType":"uint256","name":"profitInRightMakerAsset","type":"uint256"}],"internalType":"struct LibFillResults.BatchMatchedFillResults","name":"batchMatchedFillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"order","type":"tuple"}],"name":"cancelOrder","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"targetOrderEpoch","type":"uint256"}],"name":"cancelOrdersUpTo","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"cancelled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentContextAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"detachProtocolFeeCollector","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"gasPrice","type":"uint256"},{"internalType":"address","name":"signerAddress","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct LibZeroExTransaction.ZeroExTransaction","name":"transaction","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"executeTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"order","type":"tuple"},{"internalType":"uint256","name":"takerAssetFillAmount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"fillOrKillOrder","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"fillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"order","type":"tuple"},{"internalType":"uint256","name":"takerAssetFillAmount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"fillOrder","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"fillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"filled","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"assetProxyId","type":"bytes4"}],"name":"getAssetProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"order","type":"tuple"}],"name":"getOrderInfo","outputs":[{"components":[{"internalType":"uint8","name":"orderStatus","type":"uint8"},{"internalType":"bytes32","name":"orderHash","type":"bytes32"},{"internalType":"uint256","name":"orderTakerAssetFilledAmount","type":"uint256"}],"internalType":"struct LibOrder.OrderInfo","name":"orderInfo","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"},{"internalType":"address","name":"signerAddress","type":"address"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"isValidHashSignature","outputs":[{"internalType":"bool","name":"isValid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"order","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"isValidOrderSignature","outputs":[{"internalType":"bool","name":"isValid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"components":[{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"gasPrice","type":"uint256"},{"internalType":"address","name":"signerAddress","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct LibZeroExTransaction.ZeroExTransaction","name":"transaction","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"isValidTransactionSignature","outputs":[{"internalType":"bool","name":"isValid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"orders","type":"tuple[]"},{"internalType":"uint256","name":"makerAssetFillAmount","type":"uint256"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"name":"marketBuyOrdersFillOrKill","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"fillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"orders","type":"tuple[]"},{"internalType":"uint256","name":"makerAssetFillAmount","type":"uint256"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"name":"marketBuyOrdersNoThrow","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"fillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"orders","type":"tuple[]"},{"internalType":"uint256","name":"takerAssetFillAmount","type":"uint256"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"name":"marketSellOrdersFillOrKill","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"fillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order[]","name":"orders","type":"tuple[]"},{"internalType":"uint256","name":"takerAssetFillAmount","type":"uint256"},{"internalType":"bytes[]","name":"signatures","type":"bytes[]"}],"name":"marketSellOrdersNoThrow","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"fillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"leftOrder","type":"tuple"},{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"rightOrder","type":"tuple"},{"internalType":"bytes","name":"leftSignature","type":"bytes"},{"internalType":"bytes","name":"rightSignature","type":"bytes"}],"name":"matchOrders","outputs":[{"components":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"left","type":"tuple"},{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"right","type":"tuple"},{"internalType":"uint256","name":"profitInLeftMakerAsset","type":"uint256"},{"internalType":"uint256","name":"profitInRightMakerAsset","type":"uint256"}],"internalType":"struct LibFillResults.MatchedFillResults","name":"matchedFillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"leftOrder","type":"tuple"},{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"rightOrder","type":"tuple"},{"internalType":"bytes","name":"leftSignature","type":"bytes"},{"internalType":"bytes","name":"rightSignature","type":"bytes"}],"name":"matchOrdersWithMaximalFill","outputs":[{"components":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"left","type":"tuple"},{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"right","type":"tuple"},{"internalType":"uint256","name":"profitInLeftMakerAsset","type":"uint256"},{"internalType":"uint256","name":"profitInRightMakerAsset","type":"uint256"}],"internalType":"struct LibFillResults.MatchedFillResults","name":"matchedFillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"orderEpoch","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"name":"preSign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"address","name":"","type":"address"}],"name":"preSigned","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"protocolFeeCollector","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"protocolFeeMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"assetProxy","type":"address"}],"name":"registerAssetProxy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"updatedProtocolFeeCollector","type":"address"}],"name":"setProtocolFeeCollectorAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"updatedProtocolFeeMultiplier","type":"uint256"}],"name":"setProtocolFeeMultiplier","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"validatorAddress","type":"address"},{"internalType":"bool","name":"approval","type":"bool"}],"name":"setSignatureValidatorApproval","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes[]","name":"assetData","type":"bytes[]"},{"internalType":"address[]","name":"fromAddresses","type":"address[]"},{"internalType":"address[]","name":"toAddresses","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"simulateDispatchTransferFromCalls","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"transactionsExecuted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const zrxExchangeContract = new web3.eth.Contract(ZRX_EXCHANGE_ABI, ZRX_EXCHANGE_ADDRESS)

const TRADER_ABI = [{"constant":false,"inputs":[],"name":"getWeth","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_minReturn","type":"uint256"},{"name":"_distribution","type":"uint256[]"}],"name":"oneSplitSwap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"SAI","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"currencies","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_fromAmount","type":"uint256"},{"name":"_0xData","type":"bytes"},{"name":"_1SplitMinReturn","type":"uint256"},{"name":"_1SplitDistribution","type":"uint256[]"}],"name":"trade","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenAddress","type":"address"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"USDC","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"","type":"address"},{"components":[{"name":"owner","type":"address"},{"name":"number","type":"uint256"}],"name":"","type":"tuple"},{"name":"data","type":"bytes"}],"name":"callFunction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"WETH","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"}],"name":"tokenToMarketId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_calldataHexString","type":"bytes"}],"name":"zrxSwap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"loan","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"flashToken","type":"address"},{"name":"flashAmount","type":"uint256"},{"name":"arbToken","type":"address"},{"name":"zrxData","type":"bytes"},{"name":"oneSplitMinReturn","type":"uint256"},{"name":"oneSplitDistribution","type":"uint256[]"}],"name":"getFlashloan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"approveWeth","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromToken","type":"address"},{"name":"_toToken","type":"address"},{"name":"_fromAmount","type":"uint256"},{"name":"_0xData","type":"bytes"},{"name":"_1SplitMinReturn","type":"uint256"},{"name":"_1SplitDistribution","type":"uint256[]"}],"name":"arb","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"DAI","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}]
const TRADER_ADDRESS = process.env.CONTRACT_ADDRESS

const traderContract = new web3.eth.Contract(TRADER_ABI, TRADER_ADDRESS);
const FILL_ORDER_ABI = {"constant":false,"inputs":[{"components":[{"internalType":"address","name":"makerAddress","type":"address"},{"internalType":"address","name":"takerAddress","type":"address"},{"internalType":"address","name":"feeRecipientAddress","type":"address"},{"internalType":"address","name":"senderAddress","type":"address"},{"internalType":"uint256","name":"makerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetAmount","type":"uint256"},{"internalType":"uint256","name":"makerFee","type":"uint256"},{"internalType":"uint256","name":"takerFee","type":"uint256"},{"internalType":"uint256","name":"expirationTimeSeconds","type":"uint256"},{"internalType":"uint256","name":"salt","type":"uint256"},{"internalType":"bytes","name":"makerAssetData","type":"bytes"},{"internalType":"bytes","name":"takerAssetData","type":"bytes"},{"internalType":"bytes","name":"makerFeeAssetData","type":"bytes"},{"internalType":"bytes","name":"takerFeeAssetData","type":"bytes"}],"internalType":"struct LibOrder.Order","name":"order","type":"tuple"},{"internalType":"uint256","name":"takerAssetFillAmount","type":"uint256"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"fillOrder","outputs":[{"components":[{"internalType":"uint256","name":"makerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"takerAssetFilledAmount","type":"uint256"},{"internalType":"uint256","name":"makerFeePaid","type":"uint256"},{"internalType":"uint256","name":"takerFeePaid","type":"uint256"},{"internalType":"uint256","name":"protocolFeePaid","type":"uint256"}],"internalType":"struct LibFillResults.FillResults","name":"fillResults","type":"tuple"}],"payable":true,"stateMutability":"payable","type":"function"}


var myGasPrice = 0;
var myGasPrice2 = 0;
var myNumberOfCallsBot = 0
var fetchingLoop = 0;


var totalOrders = 0
var totalQualifiedOrders = 0

var ordersMapStats = new Map();

var totalZrxQueries = 0

var total0xCalls = 0;
var total0xCallsFailed = 0;
const startTimeBot = Math.floor(Date.now()/1000)

const triangularArbThreeSteps = false

// ESCHANGE NAMES
const ZERO_X = '0x'
const ONE_SPLIT = '1Split'


// ASSET SYMBOLS
const DAI = 'DAI'
const WETH = 'WETH'
const USDC = 'USDC' //6 decimals
const LINK = 'LINK'
const COMP = 'COMP'
const UMA = 'UMA'
//const WBTC = 'WBTC'
const YFI = 'YFI'
const UNI = 'UNI'
const LEND = 'LEND'
const BAND = 'BAND'
const BAL = 'BAL'
const MKR = 'MKR'
const BUSD = 'BUSD'
const OMG = 'OMG'
const TUSD = 'TUSD'
const ZRX = 'ZRX'
const BAT = 'BAT'
const NMR = 'NMR'
const PAX = 'PAX'
const KNC = 'KNC'
const REN = 'REN'
const SNT = 'SNT'
const ENJ = 'ENJ'
const ANT = 'ANT'
const AMPL = 'AMPL'
const REPV2 = 'REPV2'
const KEEP = 'KEEP'
const CRV = 'CRV'
const BNT = 'BNT'
const LPT = 'LPT'
const FOAM = 'FOAM'
const BZRX = 'BZRX'
const DONUT = 'DONUT'
const SNX = 'SNX'

const GNO = 'GNO'
const SUSD = 'SUSD'
const SAI = 'SAI'
const CVL = 'CVL'
const DTH = 'DTH'
const GEN = 'GEN'
const MANA = 'MANA'
const LOOM = 'LOOM'
const SPANK = 'SPANK'
const REQ = 'REQ'
const MATIC = 'MATIC'
const LRC = 'LRC'
const RDN = 'RDN'
const SUSHI = 'SUSHI'

// ASSET ADDRESSES
const ASSET_ADDRESSES = {
  DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
  WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
 // USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' ,//6 decimals
//  	USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  	LINK: '0x514910771af9ca656af840dff83e8264ecf986ca', //6
	COMP: '0xc00e94cb662c3520282e6f5717214004a7f26888', //41
	YFI:  '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',//16
	UNI:  '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',//5
	LEND: '0x80fb784b7ed66730e8b1dbd9820afd29931aab03',//40
	BAND:  '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',//46
	SUSHI:'0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',//18
	MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',//NO
	BUSD: '0x4fabb145d64652a948d72533023f6e7a623c7c53',//7
	PAX: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',//48
	REN: '0x408e41876cccdc0f92210600ef50372656052a38',//45
	CRV: '0xd533a949740bb3306d119cc777fa900ba034cd52',//29
	UMA:  '0x04fa0d235c4abf4bcf4787af4cf447de572ef828', //NO
	BAL: '0xba100000625a3754423978a60c9317c58a424e3d',//NO
	OMG: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',//26
	TUSD: '0x0000000000085d4780b73119b644ae5ecd22b376',//NO
	ZRX: '0xe41d2489571d322189246dafa5ebde1f4699f498',//NO
	BAT: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',//NO
	NMR: '0x1776e1f26f98b1a5df9cd347953a26dd3cb46671',//NO
	KNC:  '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',//NO
	SNT: '0x744d70fdbe2ba4cf95131626614a1763df805b9e',//NO
	ENJ: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',//NO
	ANT: '0x960b236a07cf122663c4303350609a66a7b288c0',//NO
	AMPL: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',//NO
	REPV2: '0x221657776846890989a759ba2973e427dff5c9bb',//NO
	KEEP: '0x85eee30c52b0b379b046fb0f85f4f3dc3009afec',//NO
	BNT: '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c',//NO
	LPT: '0x58b6a8a3302369daec383334672404ee733ab239',//NO
	FOAM: '0x4946fcea7c692606e8908002e55a582af44ac121',//NO
	BZRX: '0x56d811088235f11c8920698a204a5010a788f4b3',//NO
	DONUT: '0xc0f9bd5fa5698b6505f643900ffa515ea5df54a9',//NO
	SNX:  '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',//NO
	GNO:'0x6810e776880c02933d47db1b9fc05908e5386b96',//NO
	SUSD:'0x57ab1ec28d129707052df4df418d58a2d46d5f51',//NO
	SAI:'0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',//NO
	CVL: '0x01fa555c97d7958fa6f771f3bbd5ccd508f81e22',//NO
	DTH:'0x5adc961d6ac3f7062d2ea45fefb8d8167d44b190',//NO
	GEN:'0x543ff227f64aa17ea132bf9886cab5db55dcaddf',//NO
	MANA:'0x0f5d2fb29fb7d3cfee444a200298f468908cc942',//NO
	LOOM:'0xa4e8c3ec456107ea67d3075bf9e3df3a75823db0',//NO
	SPANK:'0x42d6622dece394b54999fbd73d108123806f6a18',//NO
	REQ:'0x8f8221afbb33998d8584a2b05749ba73c37a938a',//NO
	MATIC:'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',//NO
	LRC:'0xbbbbca6a901c926f240b89eacb641d8aec7aeafd',//NO
	RDN:'0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6',//NO

}

// DISPLAY LOGIC
tokensWithDecimalPlaces = (amount, symbol) => {
  amount = amount.toString()
  switch (symbol) {
    case DAI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')

    case LINK: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case COMP: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case UMA: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case YFI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case UNI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case LEND: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BAND: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BAL: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case MKR: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BUSD: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case OMG: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case TUSD: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case ZRX: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BAT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case NMR: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case KNC: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case REN: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SNT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case ENJ: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case ANT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case AMPL: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case REPV2: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case KEEP: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case CRV: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BNT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case LPT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case FOAM: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BZRX: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case DONUT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SNX: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case GNO: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SUSD: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SAI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case CVL: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case DTH: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case GEN: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case MANA: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case LOOM: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SPANK: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case PAX: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case REQ: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case MATIC: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case LRC: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case RDN: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SUSHI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')

    default:
      return web3.utils.fromWei(amount, 'Ether')
  }
}

const TOKEN_DISPLAY_DECIMALS = 2 // Show 2 decimal places
const displayTokens = (amount, symbol) => {
  let tokens
  tokens = tokensWithDecimalPlaces(amount, symbol)
  return(tokens)
}


// UTILITIES
const now = () => (moment().tz(moment.tz.guess()).format())

const SOUND_FILE = 'ding.mp3'
const playSound = () => {
  player.play(SOUND_FILE, function(err){
    if(err) {
      console.log("Error playing sound!")
    }
  })
}



// FORMATTERS
const toTokens = (tokenAmount, symbol) => {
  switch (symbol) {
    case DAI: // 18 decimals
      return web3.utils.toWei(tokenAmount, 'Ether')
    case WETH: // 18 decimals
      return web3.utils.toWei(tokenAmount, 'Ether')

    case LINK: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case COMP: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case UMA: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case YFI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case UNI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case LEND: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BAND: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BAL: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case MKR: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BUSD: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case OMG: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case TUSD: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case ZRX: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BAT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case NMR: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case PAX: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case KNC: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case REN: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SNT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case ENJ: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case ANT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case AMPL: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case REPV2: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case KEEP: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case CRV: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BNT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case LPT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case FOAM: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case BZRX: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case DONUT: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SNX: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case GNO: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SUSD: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SAI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case CVL: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case DTH: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case GEN: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case MANA: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case LOOM: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SPANK: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case REQ: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case MATIC: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case LRC: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case RDN: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
    case SUSHI: // 18 decimals
      return web3.utils.fromWei(amount, 'Ether')
  
    case USDC: // 6 decimals
      return web3.utils.fromWei(web3.utils.toWei(tokenAmount), 'Szabo')
  }
}


// TRADING FUNCTIONS
const ONE_SPLIT_PARTS = 10
const ONE_SPLIT_FLAGS = 0
async function fetchOneSplitData(args) {
  var data
  const { fromToken, toToken, amount } = args
  try {
     data = await oneSplitContract.methods.getExpectedReturn(fromToken, toToken, amount, ONE_SPLIT_PARTS, ONE_SPLIT_FLAGS).call()
  } catch (error) {
 	console.log('fetchOneSplitData problem!')
    console.error(error)
  }
  return(data)
}

// CHECK TO SEE IF ORDER CAN BE ARBITRAGED
var checkedOrders = []
let profitableArbFound = false
async function checkArb(args) {
  const { assetOrder, maxUsdAmount, maxAssetAmount, zrxOrder } = args

  // Track order
  const tempOrderID = JSON.stringify(zrxOrder)
  // Skip if order checked
  
  //clean the check orders table every 1000 orders - be careful it depends on the number of checked tokens


  if (checkedOrders.length % 1000 == 0) {
  	console.log('cleaning zrx orders table ')
	  checkedOrders = [];
  }
  if(checkedOrders.includes(tempOrderID)) {
   // console.log('Order already checked, total orders:', checkedOrders.length)
    return // Don't log
  } else {
	totalOrders++
  	let myCount = ordersMapStats.get(assetOrder[1])
	if ( ordersMapStats.get(assetOrder[1]) ) {
		ordersMapStats.set(assetOrder[1],myCount+1)
	
	} else {
		ordersMapStats.set(assetOrder[1],1)		
	}
  }
  // Add to checked orders
  checkedOrders.push(tempOrderID)
  
 
  // Skip if Maker Fee
  if(zrxOrder.makerFee.toString() !== '0') {
   // console.log('Order has maker fee')
    return
  }

  // Skip if Taker Fee
  if(zrxOrder.takerFee.toString() !== '0') {
   // console.log('Order has taker fee')
    return
  }

  // This becomes the input amount
  var inputAssetAmount = zrxOrder.takerAssetAmount

  // Build order tuple
  const orderTuple = [
    zrxOrder.makerAddress,
    zrxOrder.takerAddress,
    zrxOrder.feeRecipientAddress,
    zrxOrder.senderAddress,
    zrxOrder.makerAssetAmount,
    zrxOrder.takerAssetAmount,
    zrxOrder.makerFee,
    zrxOrder.takerFee,
    zrxOrder.expirationTimeSeconds,
    zrxOrder.salt,
    zrxOrder.makerAssetData,
    zrxOrder.takerAssetData,
    zrxOrder.makerFeeAssetData,
    zrxOrder.takerFeeAssetData
  ]

     // Fetch order status
	const orderInfo = await zrxExchangeContract.methods.getOrderInfo(orderTuple).call()	
   
  // Skip order if it's been partially filled
  if(orderInfo.orderTakerAssetFilledAmount.toString() !== '0') {
  	percentFilledAmount = orderInfo.orderTakerAssetFilledAmount / zrxOrder.takerAssetAmount
  	//deduce the already filled amount from the inputAssetAmout
 	inputAssetAmount = inputAssetAmount - orderInfo.orderTakerAssetFilledAmount;
   // console.log('Order partially filled:', percentFilledAmount, ' total orders:', checkedOrders.length)
  
  	return
  } else {

  }
 
  var oneSplitData;
  var outputAssetAmount;
  var outputAssetAmountTriangularInterm;

  try {

   if (!triangularArbThreeSteps) {
	// Fetch 1Split Data
	//var t1 = Math.floor(Date.now() )

    oneSplitData = await fetchOneSplitData({
    fromToken: ASSET_ADDRESSES[assetOrder[1]],
    toToken: ASSET_ADDRESSES[assetOrder[2]],
    amount: zrxOrder.makerAssetAmount,
	})
	
     // This becomes the outputAssetAmount
    outputAssetAmount = oneSplitData.returnAmount
   }

 }  
 catch (error) {
 	console.log('calling fetchOneSplitData is the problem!')
    console.error(error)

 }

myNumberOfCallsBot += 1;
//refresh the gas price every 50 times
if ((myGasPrice2 == 0) || (myNumberOfCallsBot % 50 == 1)) {
	
	  const ethGasStationResponse = await axios.get(`https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=db84e1509032bc4cc4f96d1c8791d92b667d28adc606bda9480c9a616310`)
  	  const ethGasStationData = ethGasStationResponse.data
	  myGasPrice2 = (ethGasStationData.fastest / 10) * 1.0 //adding 10%
	  myGasPrice2 = Math.floor(myGasPrice2)
}

 //if gasPrice not updated yet use the env variable as default
if (myGasPrice2 == 0) {

	myGasPrice2 = process.env.GAS_PRICE
}

	// Calculate estimated gas cost
	let estimatedGasFee = process.env.ESTIMATED_GAS.toString() * web3.utils.toWei(myGasPrice2.toString(), 'Gwei')

	// Calculate net profit
	let netProfit = outputAssetAmount - inputAssetAmount - estimatedGasFee
	netProfit = Math.floor(netProfit) // Round down
	let netProfitWithoutGas = outputAssetAmount - inputAssetAmount
	netProfitWithoutGas = Math.floor(netProfitWithoutGas) // Round down

	// Determine if profitable
	const profitable = netProfit.toString() > '0'

if (outputAssetAmount - inputAssetAmount > 1000000000000000) { //0.001 ETH
  // Log the arb
    console.table([{
      'Profitable?': profitable,
      'Asset Order': assetOrder.join(', '),
      'Exchange Order': 'ZRX, 1Split',
      'Profit w/ Gas': web3.utils.fromWei(netProfitWithoutGas.toString(), 'Ether'),
      'Input':  displayTokens(inputAssetAmount, assetOrder[0]).padEnd(22, ' '),
      'Output': displayTokens(outputAssetAmount, assetOrder[0]).padEnd(22, ' '),
      'Profit': displayTokens(netProfit.toString(), assetOrder[0]).padEnd(22, ' '),
      'Maker Price:': web3.utils.fromWei(zrxOrder.makerAssetAmount.toString(),'Ether') / web3.utils.fromWei(zrxOrder.takerAssetAmount.toString(),'Ether'),
      'Gas': myGasPrice2,
      'Timestamp': now(),
    }])
    console.log('orderInfo', orderInfo)

}
  // If profitable, then stop looking and trade!
  if(profitable) {
 
 	 console.log('profitable:', profitable, ' netProfit: ', netProfit, 'in string;', netProfit.toString(), 'inputAssetAmount:', inputAssetAmount, 'outputAssetAmount:', outputAssetAmount)
    // Skip if another profitable arb has already been found
    if(profitableArbFound) {
      return
    }

    // Tell the app that a profitable arb has been found
   profitableArbFound = true

    // Log the arb
    console.table([{
      'Profitable?': profitable,
      'Asset Order': assetOrder.join(', '),
      'Exchange Order': 'ZRX, 1Split',
      'Input':  displayTokens(inputAssetAmount, assetOrder[0]).padEnd(22, ' '),
      'Output': displayTokens(outputAssetAmount, assetOrder[0]).padEnd(22, ' '),
      'Profit': displayTokens(netProfit.toString(), assetOrder[0]).padEnd(22, ' '),
      'Timestamp': now(),
    }])


	// append data to the result file
	fs.appendFile('arbbot_trades.txt', `${assetOrder.join(', ')},  ${displayTokens(netProfit.toString(), assetOrder[0]).padEnd(22, ' ')} , ${displayTokens(estimatedGasFee.toString(), assetOrder[0]).padEnd(22, ' ')} , ${displayTokens(inputAssetAmount, assetOrder[0]).padEnd(22, ' ')} , ${displayTokens(outputAssetAmount, assetOrder[0]).padEnd(22, ' ')},  ${now()}\n`, (err) => {
	    if (err) {
	        throw err;
	    }
	    console.log("File is updated.");
	});

    // Play alert tone
    playSound()

    // Call arb contract
    await trade(assetOrder[0], ASSET_ADDRESSES[assetOrder[0]], ASSET_ADDRESSES[assetOrder[1]], zrxOrder, inputAssetAmount, oneSplitData)
  }
}

// TRADE EXECUTION
async function trade(flashTokenSymbol, flashTokenAddress, arbTokenAddress, orderJson, fillAmount, oneSplitData) {
  const FLASH_AMOUNT = toTokens('100', flashTokenSymbol) // 100 WETH
  const FROM_TOKEN = flashTokenAddress // WETH
  const FROM_AMOUNT = fillAmount // '1000000'
  const TO_TOKEN = arbTokenAddress


  const orderTuple = [
    orderJson.makerAddress,
    orderJson.takerAddress,
    orderJson.feeRecipientAddress ,
    orderJson.senderAddress ,
    orderJson.makerAssetAmount ,
    orderJson.takerAssetAmount ,
    orderJson.makerFee ,
    orderJson.takerFee ,
    orderJson.expirationTimeSeconds ,
    orderJson.salt ,
    orderJson.makerAssetData ,
    orderJson.takerAssetData ,
    orderJson.makerFeeAssetData ,
    orderJson.takerFeeAssetData
  ]

  // Format ZRX function call data
  const takerAssetFillAmount = FROM_AMOUNT
  const signature = orderJson.signature
  const data = web3.eth.abi.encodeFunctionCall(FILL_ORDER_ABI, [orderTuple, takerAssetFillAmount, signature])

  const minReturn = oneSplitData.returnAmount
  const distribution = oneSplitData.distribution

  // Calculate slippage 0.99
  const minReturnWtihSplippage = minReturnWithSlippage = (new web3.utils.BN(minReturn)).mul(new web3.utils.BN('995')).div(new web3.utils.BN('1000')).toString()

  //if gasPrice not updated yet
  if (myGasPrice2 == 0) {
	myGasPrice2 = process.env.GAS_PRICE
  }
  // Perform Trade
  receipt = await traderContract.methods.getFlashloan(
    flashTokenAddress, // address flashToken,
    FLASH_AMOUNT, // uint256 flashAmount,
    arbTokenAddress, // address arbToken,
    data, // bytes calldata zrxData,
    minReturnWtihSplippage.toString(), // uint256 oneSplitMinReturn,
    distribution, // uint256[] calldata oneSplitDistribution
  ).send({
    from: process.env.ADDRESS,
    gas: process.env.GAS_LIMIT,
    gasPrice: web3.utils.toWei(myGasPrice2.toString(), 'Gwei')
  })
  console.log(receipt)
}

// FETCH ORDERBOOK
// https://0x.org/docs/api#get-srav3orderbook
// Bids will be sorted in descending order by price
async function checkOrderBook(baseAssetSymbol, quoteAssetSymbol) {
  const baseAssetAddress = ASSET_ADDRESSES[baseAssetSymbol].substring(2,42)
  const quoteAssetAddress = ASSET_ADDRESSES[quoteAssetSymbol].substring(2,42)
  var zrxResponse;
  //console.log('querying 0x for', baseAssetSymbol, quoteAssetSymbol, totalZrxQueries++ )
  
  try {  
  		total0xCalls++
    	zrxResponse = await axios.get(`https://api.0x.org/sra/v3/orderbook?baseAssetData=0xf47261b0000000000000000000000000${baseAssetAddress}&quoteAssetData=0xf47261b0000000000000000000000000${quoteAssetAddress}&perPage=1000`)
   	} catch (error) {
 		total0xCallsFailed++
 		const elapsedTime = Math.floor(Date.now()/1000) - startTimeBot;
 	 	console.log('exception axios -', 'failure ratio:', total0xCallsFailed/total0xCalls,
 	 				 'total0xCallsFailed', total0xCallsFailed, 'total0xCalls', 
 	 				 total0xCalls, 'elapsed time' , elapsedTime, 'success calls/sec', (total0xCalls - total0xCallsFailed )/elapsedTime)
     //	console.error(error)
     	return
   	}
	const zrxData = zrxResponse.data

	const bids = zrxData.bids.records
	bids.map((o) => {
   	
  	var currentOrdersForToken = ordersMapStats.get(quoteAssetSymbol )
	checkArb({ zrxOrder: o.order, assetOrder: [baseAssetSymbol, quoteAssetSymbol, baseAssetSymbol] }) // E.G. WETH, DAI, WETH
  		
  	})
	
}

function showOrdersStats() {

//	console.log(ordersMapStats)
	console.log('orders stats - total', totalOrders)
	ordersMapStats.forEach((value, key) => {
    	console.log(key, value)
	})

}

// CHECK MARKETS
let checkingMarkets = false
async function checkMarkets() {
  if(checkingMarkets) {
    return
  }

  // Stop checking markets if already found
  if(profitableArbFound) {
  //  clearInterval(marketChecker)
  }

  console.log('#', fetchingLoop++, ' Gas Price:', myGasPrice2, ` Fetching market data @ ${now()} ...\n`)
  showOrdersStats()
  
  checkingMarkets = true
  try {

 
   console.log('checkOrderBook WETH, DAI')
    await checkOrderBook(WETH, DAI)
    console.log('checkOrderBook WETH, LINK')
    await checkOrderBook(WETH, LINK)
    console.log('checkOrderBook WETH, YFI')
    await checkOrderBook(WETH, YFI)


    // To add more tokens, just add two lines for every pair WETH / TOKEN, 
    // that is in the list of supported tokens above:
	//	console.log('WETH, UNI')
    //  await checkOrderBook(WETH, UNI)  

  } catch (error) {
    console.error(error)
   // checkingMarkets = false
    return
  }

  checkingMarkets = false
}

// RUN APP
playSound()

// Check markets every n seconds
const POLLING_INTERVAL = process.env.POLLING_INTERVAL || 3000 // 3000 = 3 seconds
const marketChecker = setInterval(async () => { await checkMarkets() }, POLLING_INTERVAL)
