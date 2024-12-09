import React from "react";
import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
// import CampaignIndex from "../..";

function RequestRow(props) {
	const { Row, Cell } = Table;

	const readyToFinalize =
		props.request.approvalCount > props.approversCount / 2;

	const handleApprove = async () => {
		const campaign = Campaign(props.address);
		const accounts = await web3.eth.getAccounts();
		await campaign.methods.approveRequest(props.id).send({ from: accounts[0] });
	};
	const handleFinalize = async () => {
		const campaign = Campaign(props.address);
		const accounts = await web3.eth.getAccounts();
		await campaign.methods
			.finalizeRequest(props.id)
			.send({ from: accounts[0] });
	};

	return (
		<Row
			disabled={props.request.complete}
			positive={readyToFinalize && !props.request.complete}>
			<Cell>{props.id}</Cell>
			<Cell>{props.request.description}</Cell>
			<Cell>{web3.utils.fromWei(props.request.value, "ether")}</Cell>
			<Cell>{props.request.recipient}</Cell>
			<Cell>
				{props.request.approvalCount}/{props.approversCount}
			</Cell>
			<Cell>
				{props.request.complete ? null : (
					<Button color="green" basic onClick={handleApprove}>
						Approve
					</Button>
				)}
			</Cell>
			<Cell>
				{props.request.complete ? null : (
					<Button color="blue" basic onClick={handleFinalize}>
						Finalize
					</Button>
				)}
			</Cell>
		</Row>
	);
}

export default RequestRow;
