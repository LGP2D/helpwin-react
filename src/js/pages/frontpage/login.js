import React from 'react';
import { UserActions } from 'app/actions';
import { UserStore } from 'app/stores';
import LabelForm from 'app/components/frontpage/forms/FormLabel';

export default class Login extends React.Component {
    constructor () {
        super();

        this.state = {
            email: '',
            password: '',
            error: ''
        };
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    componentWillMount () {
        UserStore.on('LOGIN_SUCCESS', this.onLoginSuccessful);
        UserStore.on('LOGIN_ERROR', this.onLoginError);
    }

    componentWillUnmount () {
        UserStore.removeListener('LOGIN_SUCCESS', this.onLoginSuccessful);
        UserStore.removeListener('LOGIN_ERROR', this.onLoginError);
    }

    onLoginSuccessful = () => {
        this.context.router.push('/');
        console.log('Login Success');
    };

    onLoginError = () => {
        this.setState({
            error: 'Email and/or email wrong. Please check your info and login again.'
        });
        console.log('Login Error');
    };

    render () {
        return (
            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Login form</h3>
                    <p class='panel-subtitle'>Please use the register form if you are not yet a member of Helpwin</p>
                </div>
                <div class='panel-body'>
                    <form className='form-horizontal' onSubmit={ this.handleSubmit }>
                        <div className='form-group'>
                            <LabelForm htmlFor='formName' title='Email'
                                       className='control-label col-sm-2 col-sm-offset-1'/>
                            <div className='col-sm-6'>
                                <input id='formEmail' className='form-control' name='email' type='text'
                                       required onChange={ this.handleChange } value={ this.state.email }
                                       placeholder='Type your email...'/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <LabelForm htmlFor='formPassword' title='Password'
                                       className='control-label col-sm-2 col-sm-offset-1'/>
                            <div className='col-sm-6'>
                                <input id='formPassword' className='form-control' name='password' type='password'
                                       required onChange={ this.handleChange } value={ this.state.password }
                                       placeholder='Type your password...'/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <div className='col-sm-offset-3 col-sm-6'>
                                <button type='submit' value='Submit' className='btn btn-info'>Login</button>
                            </div>
                        </div>
                    </form>
                    <h5 className='text-center' disabled={ !!this.state.error }>{ this.state.error }</h5>
                </div>
            </div>
        );
    }

    validateEmail = (email) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.validateEmail(this.state.email)) {
            alert('Email wrong format.');
            return;
        }

        UserActions.loginUser(this.state.email, this.state.password);
    };

    handleChange = (event) => {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    };
}
