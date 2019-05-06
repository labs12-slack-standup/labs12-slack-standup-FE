import React from 'react';
import MemberResponseForm from './MemberReports/MemberResponseForm';
import ReportResults from './MemberReports/ReportResults';

const SingleReportMember = props => {
	return (
		<div>
			<MemberResponseForm {...props} />
			<ReportResults {...props} />
		</div>
	);
};

export default SingleReportMember;
