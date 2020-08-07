require('dotenv').config();

const UniqueUserTokenABI = require('../build/UniqueUserTokens.json');
const MockTokenABI = require('../build/MockToken.json');

const etherlime = require('etherlime-lib');

const defaultConfigs = {
	gasLimit: 4700000,
	gasPrice: 25000000000
};

const deploy = async (network, secret) => {
	let RPC = null;
	let deployer = null;

	if(network == 'local') {
		// Overriding default config for local test net
		defaultConfigs.chainId = 1337;
		// Setting private key for this network
		secret = process.env.DEPLOYER_PRIVATE_KEY_LOCAL;
		// Setting the RPC
		RPC = 'http://localhost:8545/';

		deployer = new etherlime.JSONRPCPrivateKeyDeployer(
			secret, 
			RPC, 
			defaultConfigs
		);

		console.log("\nDeploying locally...");
	} else if(network == 'rinkeby') {
		// Overriding default config for rinkeby test net
		defaultConfigs.chainId = 4;
		// Setting private key for this network
		secret = process.env.DEPLOYER_PRIVATE_KEY_RINKEBY;
		// Setting the RPC
		RPC = `https:/rinkeby.infura.io/v3/${process.env.INFURA_API_KEY_RINKEBY}`;

		deployer = new etherlime.InfuraPrivateKeyDeployer(
			secret, 
			network, 
			process.env.INFURA_API_KEY_RINKEBY, 
			defaultConfigs
		);

		console.log("\nDeploying to rinkeby...");
	} else {
		console.error("Network not supported");
	}

	const deploy = (...args) => deployer.deploy(...args);

	const UniqueUserToken = await deploy(UniqueUserTokenABI);

	var token = { Contract: "Unique User Token", Address: UniqueUserToken.contract.address };

	const MockToken = await deploy(MockTokenABI);

	var mockToken = { Contract: "Mock Token", Address: MockToken.contract.address };

	console.table([token, mockToken]);
};

module.exports = {
	deploy
};