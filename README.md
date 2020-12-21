# 0x-1inch-arb-bot

This bot takes fresh orders from the 0x orders book using a smart contract call of 0x and looks for possible arbitrage using the 1inch smart contract function called getExpectedReturn from the nodejs bot.
Then, if a profitable trade is identified, the swap is executed in a smart contract written in solidity (TradingBot.sol) and responsible for doing the swap betweeen the source token and the target token, and using a flash loan of DyDx to do so.
Gas costs are taken in consideration when executing a trade, and the trade will be executed only if it is profitable. 

This current version allows to look for profitable arbitrage opportunities for pairs starting as WETH token, and with any token supported by 1Inch, as a target.

For example:

WETH->DAi
WETH->LINK
WETH->UNI
...

Tu run the bot:

download the git repository using git clone and run:

Copy the .env.example to .env and replace the following information with your addresses:

RPC_URL="INFURA_URL"
ADDRESS="0x...YOUR_ADDRESS"
PRIVATE_KEY="0x...YOUR_PRIVATE_KEY"
CONTRACT_ADDRESS="0x...YOUR_CONTRACT_ADDRESS"
GAS_LIMIT=2000000
GAS_PRICE=150
ESTIMATED_GAS=470000
POLLING_INTERVAL=500                                                                                                                                                                     
From the command line:

npm install

node node arbitrage-bot-0x1inch.js

If you want to add more arbitrage pairs, add these two lines after line 740 in arbitrage-bot-0x1inch.js, as many times as wanted:

	console.log('WETH, UNI')
    	await checkOrderBook(WETH, UNI)  

With the tokens of your choice. Check that these tokens are defined in the ASSET SYMBOLS list in the same file.

That's it!




