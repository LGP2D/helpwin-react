import React from 'react';
import { UserStore, config } from  'app/stores';
import LabelForm from 'app/components/frontpage/forms/FormLabel';
import { UserActions } from 'app/actions';

export default class VolunteerProfile extends React.Component {
    constructor () {
        super();

        this.state = {
            volunteerData: UserStore.getUserData ? UserStore.getUserData : {},
            volunteerName: UserStore.getUserName ? UserStore.getUserName : ''
        }
    }

    onLogin = () => {
        this.setState({
            volunteerData: UserStore.getUserData,
            volunteerName: UserStore.getUserName
        })
    };

    handleChange = (event) => {
        let newState = this.state.volunteerData;

        newState[event.target.name] = event.target.value;
        this.setState(newState);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        let role = this.state.role;
        role.description = role.description.toUpperCase();

        let user = {
            name: this.state.name,
            email: this.state.email,
            birthDate: this.state.birthdate,
            password: this.state.password,
            profession: this.state.profession,
            imageUrl: this.state.image,
            role: role,
            uniqueId: this.state.uniqueId,
            id: ''
        };

        UserActions.editUser(user);
    };

    componentWillMount () {
        UserStore.on('AUTO_LOGIN', this.onLogin);
    }

    componentWillUnmount () {
        UserStore.removeListener('AUTO_LOGIN', this.onLogin);
    }

    render () {
        return (
            <div className='panel'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>{ this.state.volunteerName }</h3>
                </div>
                <div className='panel-body'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-8 col-lg-9 col-sm-12'>
                            <form className='form-horizontal' onSubmit={ this.handleSubmit }>
                                <div className='form-group'>
                                    <LabelForm htmlFor='formName' title='Name'
                                               className='control-label col-sm-3 col-sm-offset-1'/>
                                    <div className='col-sm-7'>
                                        <input id='formName' className='form-control' name='name' type='text'
                                               required onChange={ this.handleChange }
                                               value={ this.state.volunteerData.name }
                                               placeholder='Type your name...'/>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <LabelForm htmlFor='formEmail' title='Email'
                                               className='control-label col-sm-3 col-sm-offset-1'/>
                                    <div className='col-sm-7'>
                                        <input id='formEmail' className='form-control' name='email' type='text'
                                               required onChange={ this.handleChange }
                                               value={ this.state.volunteerData.email }
                                               placeholder='Type your email...'/>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <LabelForm htmlFor='birthdate' title='Birthdate'
                                               className='control-label col-sm-3 col-sm-offset-1'/>
                                    <div className='col-sm-7'>
                                        <input id='birthdate' className='form-control' name='birthdate' type='date'
                                               required onChange={ this.handleChange }
                                               value={ this.state.volunteerData.birthDate }
                                               placeholder='Choose your birthdate...'/>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <LabelForm htmlFor='profession' title='Profession'
                                               className='control-label col-sm-3 col-sm-offset-1'/>
                                    <div className='col-sm-7'>
                                        <input id='profession' className='form-control' name='profession' type='text'
                                               required onChange={ this.handleChange }
                                               value={ this.state.volunteerData.profession }
                                               placeholder='Type profession...'/>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <LabelForm htmlFor='image' title='Image'
                                               className='control-label col-sm-3 col-sm-offset-1'/>
                                    <div className='col-sm-7'>
                                        <input id='image' className='form-control file' name='image' type='file'
                                               onChange={ this.handleChange } value={ this.state.image }/>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <LabelForm htmlFor='password' title='New Password'
                                               className='control-label col-sm-3 col-sm-offset-1'/>
                                    <div className='col-sm-7'>
                                        <input id='password' className='form-control' name='password' type='password'
                                               onChange={ this.handleChange } value={ this.state.password }
                                               placeholder='Type password...' minLength='6'/>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <LabelForm htmlFor='retypepassword' title='Retype Password'
                                               className='control-label col-sm-3 col-sm-offset-1'/>
                                    <div className='col-sm-7'>
                                        <input id='retypepassword' className='form-control' name='repassword'
                                               type='password'
                                               onChange={ this.handleChange } value={ this.state.repassword }
                                               placeholder='Retype password...' minLength='6'/>
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div className='col-sm-offset-4 col-sm-7'>
                                        <button type='submit' value='Submit' className='btn btn-sm btn-edit'><i
                                            className='glyphicon glyphicon-edit' /></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='col-sm-12 col-md-4 col-lg-3 hidden-xs'>
                            <div className='profile-image'>
                                <img alt='User Pic' src={ this.state.volunteerData.imageUrl }
                                     className='img-circle img-responsive'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
