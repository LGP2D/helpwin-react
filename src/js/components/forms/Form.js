import React from 'react';
import LabelForm from './FormLabel'
import '../../../styles/css/bootstrap.css';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: ''
        };
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <LabelForm htmlFor='formName' title='Name' className="control-label col-sm-2"/>
                    <div className="col-sm-6">
                        <input id='formName' className='form-control' name='name' type='text'
                            required onChange={this.handleChange} value={this.state.name}
                            placeholder="test..."/>
                    </div>
                </div>
                <div className="form-group">
                    <LabelForm htmlFor='formEmail' title='Email' className="control-label col-sm-2"/>
                    <div className="col-sm-6">
                        <input id='formEmail' className='form-control' name='email' type='text'
                            required onChange={this.handleChange} value={this.state.email}
                            placeholder="test..."/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-6">
                        <button type='submit' value='Submit' className='btn btn-default'>Submit</button>                
                    </div>
                </div>
            </form>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
    };

    handleChange = (event) => {
        let newState = {};

        newState[event.target.name] = event.target.value;

        this.setState(newState);
    };
}

export default Form;

