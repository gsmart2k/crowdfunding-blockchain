import React from "react";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import { Table, Button } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

export async function getServerSideProps(context) {
	const { query } = context;
	const address = query.address;

	const campaign = Campaign(address);

	const requestCount = await campaign.methods.getRequestsCount().call();
	// const formattedRequestCount = await requestCount.toString();
	const approversCount = await campaign.methods.approversCount().call();
	const formattedApproversCount = approversCount.toString();
	const formattedrequestCount = requestCount.toString();

	const requests = await Promise.all(
		Array.from({ length: Number(requestCount) }, (_, index) => index).map(
			(index) => {
				return campaign.methods.requests(index).call();
			}
		)
	);

	console.log(requests);

	const formattedRequests = requests.map((request) => {
		return {
			description: request.description,
			value: request.value.toString(),
			recipient: request.recipient,
			complete: request.complete,
			approvalCount: request.approvalCount.toString(),
		};
	});

	return {
		props: {
			address,
			formattedrequestCount,
			formattedRequests,
			formattedApproversCount,
		},
	};
}
function Indexpage({
	address,
	formattedRequests,
	formattedrequestCount,
	formattedApproversCount,
}) {
	function renderRow() {
		// console.log(formattedRequests);
		return formattedRequests.map((request, index) => (
			<RequestRow
				key={index}
				id={index}
				request={request}
				address={address}
				approversCount={formattedApproversCount}
			/>
		));
	}

	const { Header, Row, HeaderCell, Body } = Table;
	return (
		<Layout>
			<link
				async
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
			/>
			<h3>Request Index</h3>
			<Link route={`/campaigns/${address}/requests/new`}>
				<a>
					<Button primary>Add Request</Button>
				</a>
			</Link>
			<Table>
				<Header>
					<Row>
						<HeaderCell>ID</HeaderCell>
						<HeaderCell>Description</HeaderCell>
						<HeaderCell>Amount</HeaderCell>
						<HeaderCell>Recipient</HeaderCell>
						<HeaderCell>Approval Count</HeaderCell>
						<HeaderCell>Approve</HeaderCell>
						<HeaderCell>Finalize</HeaderCell>
					</Row>
				</Header>
				<Body>{renderRow()}</Body>
			</Table>
			<div>Found {formattedrequestCount} requests here</div>
		</Layout>
	);
}

export default Indexpage;
