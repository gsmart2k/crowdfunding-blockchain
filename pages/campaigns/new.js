import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Link, Router } from "../../routes";

function CampaignNew() {
	const [minimumContribution, setMinimumContrubution] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		setLoading(true);
		setErrorMessage("");
		e.preventDefault();
		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods.createCampaign(minimumContribution).send({
				from: accounts[0],
			});
			Router.pushRoute("/");
		} catch (error) {
			setErrorMessage(error);
		}
		setLoading(false);
	};

	return (
		<Layout>
			<h3> Create a New Campaign</h3>
			<link
				async
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
			/>
			<Form onSubmit={handleSubmit} error={!!errorMessage}>
				<Form.Field>
					<label>Minimum Contribution</label>
					<Input
						label="wei"
						labelPosition="right"
						placeholder="Enter amount in WEI"
						value={minimumContribution}
						onChange={(e) => setMinimumContrubution(e.target.value)}
					/>
				</Form.Field>
				<Message error header="Oops!" content={errorMessage} />
				<Button loading={loading} primary>
					Create
				</Button>
			</Form>
		</Layout>
	);
}

export default CampaignNew;
