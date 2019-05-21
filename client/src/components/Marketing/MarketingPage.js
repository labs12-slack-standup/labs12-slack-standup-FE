import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// styling imports
import Button from '@material-ui/core/Button';
import { ArrowUpward } from '@material-ui/icons';
import { scroller, animateScroll } from 'react-scroll';
import Typography from '@material-ui/core/Typography';


// images
import undrawCollab from '../../images/undraw_collab_8oes.svg';
import undrawStatus from '../../images/undraw_status_update_jjgk.svg';
import undrawDeveloper from '../../images/undraw_developer_activity_bv83.svg';

class MarketingPage extends Component {
	scrollTo() {
		scroller.scrollTo('MarketingSection', {
			duration: 800,
			delay: 0,
			smooth: 'easeInOutQuart'
		});
	}
	scrollToTop() {
		animateScroll.scrollToTop();
	}
	render() {
		return (
			<MarketingContainer>
				<Header>
					<Typography variant="h1">Stand-Em-Ups</Typography>
					<BodyText>
						Stand-Em-Ups is an asynchronous stand-up platform for fast-paced
						teams
					</BodyText>
					<HeaderButtons>
						<Link to='/login'>
						<Button variant="outlined" style={{backgroundColor: '#ffffff'}}>Get Started</Button>
						</Link>
						{/* <Button variant="outlined" style={{backgroundColor: '#ffffff', marginLeft:'10px'} onClick={() => this.scrollTo()}>Learn More</Button> */}
					</HeaderButtons>
				</Header>

				<MarketingSection name='MarketingSection'>
					<SectionDivider>
						<SectionTitle>Manage Your Team With Efficency</SectionTitle>
						<BodyText>Say goodbye to long stand-ups!</BodyText>
					</SectionDivider>
					<MarketingImg src={undrawCollab} />
				</MarketingSection>
				<MarketingSection1>
					<SectionDivider>
						<SectionTitle>Your Team, Your Pace</SectionTitle>
						<BodyText>
							Stand-Em-Ups allows you review team member's responses as an admin
							or a peer, whenever is most convienient for you.
						</BodyText>
					</SectionDivider>
					<MarketingImg src={undrawStatus} />
				</MarketingSection1>
				<MarketingSection>
					<SectionDivider>
						<SectionTitle>Record Your Progress</SectionTitle>
						<BodyText>
							Stand-Em-Ups allows you access your team's previous answers so
							that you can keep each other accountable.
						</BodyText>
					</SectionDivider>
					<MarketingImg src={undrawDeveloper} />
				</MarketingSection>
				<GetStartedSection>
					<Typography variant='h3'>Get Started!</Typography>
					<BodyText>Let Stand-Em-Ups optimize your team's valuable time</BodyText>
					<Link to='/login'>
						<Button variant="outlined" style={{backgroundColor: '#ffffff', marginRight:'20px'}}>Get Started</Button>
						</Link>				
				</GetStartedSection>
				<MarketingFooter>
					<Link to='/' style={{color: '#FFFFFF', fontSize: '1.4rem'}}>Home</Link>
					<Link to="/team" style={{color: '#FFFFFF', fontSize: '1.4rem'}}>Team</Link>
					<ArrowUpward onClick={() => this.scrollToTop()} style={{width: '50px', height: '50px'}}/>
				</MarketingFooter>
			</MarketingContainer>
		);
	}
}

export default MarketingPage;

// Styles

const MarketingContainer = styled.div`
	background-color: white;
	margin: 50px 20px;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 300px;
	align-items: center;
	margin: 10px 0 100px;
	background-color: #F4F4F4;
	@media(max-width: 500px) {
		text-align: center;
	}
`;

const HeaderButtons = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 50px;
`;

const BodyText = styled.p`
	font-size: 1.2rem;
	@media(max-width: 500px) {
		text-align: center;
	}
`

const MarketingSection = styled.div`
	display: flex;
	align-items: center;
	margin: 50px 0;
	padding: 20px 0;
	justify-content: space-around;
	@media(max-width: 500px) {
		flex-direction: column;
	}
`;

const MarketingSection1 = styled.div`
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	margin: 50px 0;
	padding: 50px 0;
	justify-content: space-around;
	border-top: 1px solid gray;
	border-bottom: 1px solid gray;
	@media(max-width: 500px) {
		flex-direction: column;
	}
`;
const SectionTitle = styled.h3`
	width: 100%;
	font-size: 2.4rem;
	@media(max-width: 500px) {
		text-align: center;
	}
`;
const SectionDivider = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	@media(max-width: 500px) {
		width: 100%
	}
`;

const MarketingImg = styled.img`
	width: 40%;
	@media(max-width: 500px) {
		width: 100%;
		margin-top: 20px;
	}
`;

const GetStartedSection = styled.div`
	height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content:space-around;
	background-color: #F4F4F4;
	margin: 50px auto 150px;
	@media(max-width: 500px) {
		text-align: center;
	}
`;

const MarketingFooter = styled.footer`
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #616df6;
	display: flex;
	justify-content: space-around;
	height: 100px;
	color: white;
	align-items: center;
	
`;
