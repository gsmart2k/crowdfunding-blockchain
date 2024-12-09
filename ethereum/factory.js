import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	"0xF8914D22A63776E7Ce997E3faD4D09fB28553FFE"
);

export default instance;
