require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const privateKey = process.env.PRIVATE_KEY;
const sepoliaKey = process.env.SEPOLIA_KEY;

const provider = new HDWalletProvider(
	privateKey,
	`https://sepolia.infura.io/v3/${sepoliaKey}`
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log("Attempting to deploy from account", accounts[0]);

	try {
		const result = await new web3.eth.Contract(
			JSON.parse(compiledFactory.interface)
		)
			.deploy({ data: compiledFactory.bytecode })
			.send({ gas: "1000000", from: accounts[0] });
		console.log("contract deployed to", result.options.address);
	} catch (error) {
		console.log(error);
	}

	provider.engine.stop();
};

// 0xcb9e18827b627d514a4b38cb142daf23d19b7705; deployed contract

deploy();
