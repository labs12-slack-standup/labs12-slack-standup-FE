import React from "react";

const MemberResponseForm = () => {
	return (
		<div>
			<h3>This component will be a form</h3>
			<ul>
				<li>Questions and Report Title given by manager</li>
				<li>Form entries</li>
				<li>Will query the questions table by reportId</li>
				<li>On sumbit will mutate the questions table (only the answers)</li>
			</ul>
		</div>
	);
};

export default MemberResponseForm;
