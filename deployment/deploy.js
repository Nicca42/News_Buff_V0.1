require('dotenv').config();

const UniqueUserTokenABI = require('../build/UniqueUserTokens.json');

const etherlime = require('etherlime-lib');

const defaultConfigs = {
	gasLimit: 4700000,
	gasPrice: 25000000000
};

const deploy = async (network, secret) => {
	var RPC = null;

	if(network == 'local') {
		// Overriding default config for local test net
		defaultConfigs.chainId = 1337;
		// Setting private key for this network
		secret = process.env.DEPLOYER_PRIVATE_KEY_LOCAL;
		// Setting the RPC
		RPC = 'http://localhost:8545/';

		console.log("\nDeploying locally...");
	} else {
		console.error("Network not supported");
	}

	const deployer = new etherlime.JSONRPCPrivateKeyDeployer(
		secret, 
		RPC, 
		defaultConfigs
	);

	const deploy = (...args) => deployer.deploy(...args);

	const UniqueUserToken = await deploy(UniqueUserTokenABI);

	var token = { Contract: "Token", Address: UniqueUserToken.contract.address };

	console.table([token]);
};

module.exports = {
	deploy
};