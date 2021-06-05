import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null
		}
	}

	unsubscribeFromAuth = null;
	unsubscribeFromSnapshot = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			const userRef = await createUserProfileDocument(userAuth);
			if(!userRef) {
				this.setState( {
					currentUser: null
				});
				return;
			}

			this.unsubscribeFromSnapshot = userRef.onSnapshot(snapshot => {
				this.setState({ currentUser: {
					id: snapshot.id,
					...snapshot.data()
				}});
			})
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
		if(this.unsubscribeFromSnapshot) {
			this.unsubscribeFromSnapshot();
		}
	}

	render() {
		return (
			<div className="App">
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/shop' component={ShopPage} />
					<Route exact path='/signin' component={SignInAndSignUpPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
