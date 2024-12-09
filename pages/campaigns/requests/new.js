import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import { Link, Router } from "../../../routes";
import web3 from "../../../ethereum/web3";

export async function getServerSideProps(context) {
	const { query } = context;
	const address = query.address;
	return { props: { address } };
}
function NewRequests({ address }) {
	const [value, setValue] = useState("");
	const [description, setDescription] = useState("");
	const [recipient, setRecipient] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		setLoading(true);
		setErrorMessage("");
		e.preventDefault;
		const campaign = Campaign(address);
		try {
			const accounts = await web3.eth.getAccounts();
			await campaign.methods
				.createRequest(description, web3.utils.toWei(value, "ether"), recipient)
				.send({ from: accounts[0] });
			Router.pushRoute(`/campaigns/${address}/requests`);
		} catch (error) {
			setErrorMessage(error);
			alert(error);
		}
		setLoading(false);
	};

	return (
		<Layout>
			<link
				async
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
			/>
			<Link route={`/campaigns/${address}/requests`}>
				<a>
					<Button primary>Back</Button>
				</a>
			</Link>
			<h3>Create a Request</h3>
			<Form onSubmit={handleSubmit} error={!!errorMessage}>
				<Form.Field>
					<label>Description</label>
					<Input
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Value In Ether</label>
					<Input
						value={value}
						onChange={(e) => {
							setValue(e.target.value);
						}}
					/>
				</Form.Field>
				<Form.Field>
					<label>Recipient</label>
					<Input
						value={recipient}
						onChange={(e) => {
							setRecipient(e.target.value);
						}}
					/>
				</Form.Field>
				<Message error header="OOps" content={errorMessage} />
				<Button loading={loading} primary>
					Create
				</Button>
			</Form>
		</Layout>
	);
}

export default NewRequests;
