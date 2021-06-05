import React from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        if(this.state.password !== this.state.confirmPassword) {
            alert('The passwords don\'t match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password);

            await createUserProfileDocument(user, { displayName: this.state.displayName });
        }
        catch(err) {
            console.log(err.message);
        }

        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    }
    
    render() {
        return (
            <div className='sign-up'>
                <h2>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput label='Display Name' name='displayName' type='text' value={this.state.displayName} required  handleChange={this.handleChange} />
                    <FormInput label='Email' name='email' type='email' value={this.state.email} required handleChange={this.handleChange} />
                    <FormInput label='Password' name='password' type='password' value={this.state.password} required  handleChange={this.handleChange} />
                    <FormInput label='Confirm Password' name='confirmPassword' type='password' value={this.state.confirmPassword} required  handleChange={this.handleChange} />

                    <CustomButton type='submit'>Sign up</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;
