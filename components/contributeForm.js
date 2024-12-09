import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

function contributeForm({ address }) {
	const [formValue, setFormValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		setLoading(true);
		setErrorMessage("");
		e.preventDefault();
		const campaign = Campaign(address);

		try {
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.contribute().send({
				from: accounts[0],
				value: web3.utils.toWei(formValue, "ether"),
			});
			Router.replaceRoute(`/campaigns/${address}`);
		} catch (error) {
			setErrorMessage(error);
		}
		setLoading(false);
	};
	return (
		<Form onSubmit={handleSubmit} error={!!errorMessage}>
			<Form.Field>
				<label>Amount to contribute</label>
				<Input
					label="ether"
					labelPosition="right"
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
				/>
			</Form.Field>
			<Message error header="Oops!" content={errorMessage} />
			<Button loading={loading} primary>
				Contribute
			</Button>
		</Form>
	);
}

export default contributeForm;
