import React, { useState } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Button, Card, Grid } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";

export async function getServerSideProps(context) {
	const { query } = context;

	const campaign = Campaign(query.address);
	const summary = await campaign.methods.getSummary().call();

	const balance = summary[0].toString();
	const minimumContribution = summary[1].toString();
	const requests = summary[2].toString();
	const approversCount = summary[3].toString();
	const manager = summary[4].toString();
	const contractAddress = query.address;

	return {
		props: {
			balance,
			minimumContribution,
			requests,
			approversCount,
			manager,
			contractAddress,
		},
	};
}
function CampaignShow({
	balance,
	minimumContribution,
	requests,
	approversCount,
	manager,
	contractAddress,
}) {
	const renderCards = () => {
		const items = [
			{
				header: manager,
				meta: "Address of mamanger",
				description:
					"Only the manager can control this contract's withdrawal and creation",
				style: { overflowWrap: "break-word" },
			},
			{
				header: minimumContribution,
				meta: "Minimum Contribution in WEI",
				description:
					"You must contrubute at least this much WEI to become an approver",
				style: { overflowWrap: "break-word" },
			},
			{
				header: requests,
				meta: "Request Array",
				description: "Requests must be approved by approvers",
				style: { overflowWrap: "break-word" },
			},
			{
				header: approversCount,
				meta: "Number of approvers",
				description:
					"Number of people that have already donated to this campaign",
				style: { overflowWrap: "break-word" },
			},
			{
				header: web3.utils.fromWei(balance, "ether"),
				meta: "Amount of Ether in Contract",
				description: "The amount of money that remains in this contract",
				style: { overflowWrap: "break-word" },
			},
		];
		return <Card.Group items={items} />;
	};

	return (
		<Layout>
			<link
				async
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
			/>
			<h2>Campaign Show</h2>
			<Grid>
				<Grid.Row>
					<Grid.Column width={10}>{renderCards()}</Grid.Column>

					<Grid.Column width={6}>
						<ContributeForm address={contractAddress} />
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column>
						<Link route={`/campaigns/${contractAddress}/requests`}>
							<a>
								<Button primary>View Requests</Button>
							</a>
						</Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Layout>
	);
}

export default CampaignShow;
