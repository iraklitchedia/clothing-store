import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {
	unsubscribeFromAuth = null;
	unsubscribeFromSnapshot = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			const userRef = await createUserProfileDocument(userAuth);
			if(!userRef) {
				this.props.setCurrentUser(null);
				return;
			}

			this.unsubscribeFromSnapshot = userRef.onSnapshot(snapshot => {
				this.props.setCurrentUser({ currentUser: {
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
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/shop' component={ShopPage} />
					<Route exact path='/checkout' component={CheckoutPage} />
					<Route exact path='/signin' render={ () => 
						this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) 
					} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state)
})

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
