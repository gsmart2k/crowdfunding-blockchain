import React from "react";
import Header from "./Header";

export default (props) => {
	return (
		<div className="p-10">
			<Header />
			{props.children}
		</div>
	);
};
