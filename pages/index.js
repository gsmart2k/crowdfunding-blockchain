import React from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

export async function getServerSideProps() {
	const campaigns = await factory.methods.getDeployedCampaigns().call();

	return { props: { campaigns } };
}
function CampaignIndex({ campaigns }) {
	function renderCampaigns() {
		const items = campaigns.map((address) => {
			return {
				header: address,
				description: (
					<Link route={`/campaigns/${address}`}>
						<a>View Campaign</a>
					</Link>
				),
				fluid: true,
			};
		});
		return <Card.Group items={items} />;
	}

	return (
		<Layout>
			<div>
				<link
					async
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
				/>
				<h3>Open Campaigns</h3>
				<Link route="/campaigns/new">
					<a>
						<Button
							floated="right"
							content="Create Campaign"
							icon="add circle"
							primary
						/>
					</a>
				</Link>
				{renderCampaigns()}
			</div>
		</Layout>
	);
}

export default CampaignIndex;
