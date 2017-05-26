import React from 'react';
import LabelForm from 'app/components/frontpage/forms/FormLabel';
import { UserStore } from 'app/stores';
import { UserActions } from 'app/actions';
import Combobox from 'react-widgets/lib/Combobox';
import 'react-widgets/lib/less/react-widgets.less';

export default class Register extends React.Component {
    constructor () {
        super();

        this.roles = [
            { id: 1, description: 'Administrator' },
            { id: 2, description: 'Institution' },
            { id: 3, description: 'Volunteer' },
            { id: 4, description: 'Company' }
        ];

        this.state = {
            name: '',
            email: '',
            birthdate: '',
            password: '',
            profession: '',
            image: '',
            repassword: '',
            role: this.roles[0]
        };
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    onRegisterSuccess = () => {
        this.setState({
            data_uri: null,
            filename: null,
            filetype: null
        });
        this.context.router.push('/login');
    };

    componentWillMount () {
        UserStore.on('REGISTER_SUCCESS', this.onRegisterSuccess);
        UserStore.on('IMAGE_UPLOAD_SUCCESSFUL', this.onUploadSuccess);
    }

    componentWillUnmount () {
        UserStore.removeListener('REGISTER_SUCCESS', this.onRegisterSuccess);
        UserStore.removeListener('IMAGE_UPLOAD_SUCCESSFUL', this.onUploadSuccess);
    }

    render () {
        return (
            <div>
                <h1 className='col-sm-offset-5'>Register Form</h1>
                <form className='form-horizontal' onSubmit={ this.handleSubmit }>
                    <div className='form-group'>
                        <LabelForm htmlFor='formName' title='Name' className='control-label col-sm-2 col-sm-offset-1'/>
                        <div className='col-sm-6'>
                            <input id='formName' className='form-control' name='name' type='text'
                                   required onChange={ this.handleChange } value={ this.state.name }
                                   placeholder='Type your name...'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <LabelForm htmlFor='formEmail' title='Email'
                                   className='control-label col-sm-2 col-sm-offset-1'/>
                        <div className='col-sm-6'>
                            <input id='formEmail' className='form-control' name='email' type='text'
                                   required onChange={ this.handleChange } value={ this.state.email }
                                   placeholder='Type your email...'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <LabelForm htmlFor='birthdate' title='Birthdate'
                                   className='control-label col-sm-2 col-sm-offset-1'/>
                        <div className='col-sm-6'>
                            <input id='birthdate' className='form-control' name='birthdate' type='date'
                                   required onChange={ this.handleChange } value={ this.state.birthdate }
                                   placeholder='Choose your birthdate...'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <LabelForm htmlFor='password' title='Password'
                                   className='control-label col-sm-2 col-sm-offset-1'/>
                        <div className='col-sm-6'>
                            <input id='password' className='form-control' name='password' type='password'
                                   required onChange={ this.handleChange } value={ this.state.password }
                                   placeholder='Type password...' minLength='6'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <LabelForm htmlFor='retypepassword' title='Retype Password'
                                   className='control-label col-sm-2 col-sm-offset-1'/>
                        <div className='col-sm-6'>
                            <input id='retypepassword' className='form-control' name='repassword' type='password'
                                   required onChange={ this.handleChange } value={ this.state.repassword }
                                   placeholder='Retype password...' minLength='6'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <LabelForm htmlFor='profession' title='Profession'
                                   className='control-label col-sm-2 col-sm-offset-1'/>
                        <div className='col-sm-6'>
                            <input id='profession' className='form-control' name='profession' type='text'
                                   required onChange={ this.handleChange } value={ this.state.profession }
                                   placeholder='Type profession...'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <LabelForm htmlFor='image' title='Image' className='control-label col-sm-2 col-sm-offset-1'/>
                        <div className='col-sm-6'>
                            <input id='image' className='form-control file' name='image' type='file'
                                   onChange={ (e) => this.handleChangeImage(e) } />
                        </div>
                    </div>
                    <div className='form-group'>
                        <LabelForm htmlFor='role' title='Role' className='control-label col-sm-2 col-sm-offset-1'/>
                        <div className='col-sm-6'>
                            <Combobox valueField='id' textField='description' data={ this.roles }
                                      onChange={ this.handleChangeDropdown } defaultValue={ this.state.role }/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-sm-offset-3 col-sm-6'>
                            <button type='submit' value='Submit' className='btn btn-default'>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    validateEmail = (email) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    handleChangeImage = (event) => {
        event.preventDefault();

        let reader = new FileReader();
        let image = event.target.files[0];

        reader.onloadend = (upload) => {
            this.setState({
                data_uri: upload.target.result,
                filename: image.name,
                filetype: image.type
            });
        };

        reader.readAsDataURL(image);
    };

    handleChangeDropdown = (value) => {
        this.setState({
            role: value
        });
    };

    handleChange = (event) => {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.validateEmail(this.state.email)){
            alert('Wrong email format.');
            return;
        }

        if (this.state.data_uri === undefined || this.state.data_uri === null) {
            this.onUploadSuccess();
        } else {
            let file = {
                data_uri: this.state.data_uri,
                filename: this.state.filename,
                filetype: this.state.filetype
            };
            UserActions.saveImage(file);
        }
    };

    onUploadSuccess = () => {
        let imageUrl = UserStore.getUserImage !== null ? UserStore.getUserImage : null;

        let role = this.state.role;
        role.description = role.description.toUpperCase();

        let user = {
            name: this.state.name,
            email: this.state.email,
            birthDate: this.state.birthdate,
            password: this.state.password,
            profession: this.state.profession,
            imageUrl: imageUrl,
            role: role,
            uniqueId: '',
            id: ''
        };

        UserActions.registerUser(user);
    }
}
