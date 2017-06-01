import React from 'react';
import AuthorizedComponent from 'app/components/dashboard/authorization';

import LabelForm from 'app/components/frontpage/forms/FormLabel';

import ActionActions from 'app/actions/actionActions';
import ActionStore from 'app/stores/actionStore';

export default class InsertAction extends AuthorizedComponent {
    constructor () {
        super();

        this.authorize = [2];
        this.state = {
            action: {
                type: '',
                description: '',
                startDate: '',
                endDate: '',
                availablePosition: 0,
                credits: 0,
                location: ''
            }
        }
    }

    componentWillMount () {
        super.componentWillMount();
        ActionStore.on('INSERT_ACTION_SUCCESSFUL', this.handleSuccess);
    }

    componentWillUnmount () {
        ActionStore.removeListener('INSERT_ACTION_SUCCESSFUL', this.handleSuccess);
    }

    handleSuccess = () => {
        $('#confirm-submit').modal('show');
        $('#insert-action').button('reset');
    };

    handleChange = (event) => {
        let newState = this.state.action;
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        $('#insert-action').button('loading');

        if (this.biggerThan(this.state.action.startDate, this.state.action.endDate)) { console.log('dates bigger'); }
        else {
            if (!this.beforeNow(this.state.action.startDate) && !this.beforeNow(this.state.action.endDate)){
                console.log('dates now');
            } else {
                ActionActions.insertAction(this.state.action);
            }
        }
    };

    biggerThan = (dateFrom, dateTo) => {
        return new Date(dateFrom).getTime() >= new Date(dateTo).getTime();
    };

    beforeNow = (date) => {
        return new Date(date).getTime() >= new Date().getTime();
    };

    render () {
        return (
            <div>
                <div className='panel panel-headline'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>Insert A New Action</h3>
                        <p className='panel-subtitle'>Submit your action proposal for review</p>
                        <div className='right'>
                            <button type='button' className='btn-toggle-collapse'>
                                <i className='ti ti-angle-up'/>
                            </button>
                            <button type='button' className='btn-remove'>
                                <i className='ti ti-close'/>
                            </button>
                        </div>
                    </div>
                    <div className='panel-body'>
                        <form className='form-horizontal' onSubmit={ this.handleSubmit }>
                            <div className='form-group'>
                                <LabelForm htmlFor='formType' title='Type'
                                           className='control-label col-sm-2 col-sm-offset-1'/>
                                <div className='col-sm-6'>
                                    <input id='formType' className='form-control' name='type' type='text'
                                           required onChange={ this.handleChange } value={ this.state.action.type }
                                           placeholder='Enter volunteering type...'/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <LabelForm htmlFor='formDescription' title='Description'
                                           className='control-label col-sm-2 col-sm-offset-1'/>
                                <div className='col-sm-6'>
                                    <input id='formDescription' className='form-control' name='description' type='text'
                                           required onChange={ this.handleChange }
                                           value={ this.state.action.description }
                                           placeholder='Type your description...'/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <LabelForm htmlFor='startDate' title='Start Date'
                                           className='control-label col-sm-2 col-sm-offset-1'/>
                                <div className='col-sm-6'>
                                    <input id='startDate' className='form-control' name='startDate' type='date'
                                           required onChange={ this.handleChange } value={ this.state.action.startDate }
                                           placeholder='Choose your start date...'/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <LabelForm htmlFor='endDate' title='End Date'
                                           className='control-label col-sm-2 col-sm-offset-1'/>
                                <div className='col-sm-6'>
                                    <input id='endDate' className='form-control' name='endDate' type='date'
                                           required onChange={ this.handleChange } value={ this.state.action.endDate }
                                           placeholder='Choose your end date...'/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <LabelForm htmlFor='availablePosition' title='Available Positions'
                                           className='control-label col-sm-2 col-sm-offset-1'/>
                                <div className='col-sm-6'>
                                    <input id='availablePosition' className='form-control' name='availablePosition'
                                           type='number'
                                           required onChange={ this.handleChange }
                                           value={ this.state.action.availablePosition }
                                           placeholder='Type available positions...'/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <LabelForm htmlFor='credits' title='Credits'
                                           className='control-label col-sm-2 col-sm-offset-1'/>
                                <div className='col-sm-6'>
                                    <input id='credits' className='form-control' name='credits' type='number'
                                           required onChange={ this.handleChange } value={ this.state.action.credits }
                                           placeholder='Type credits...'/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <LabelForm htmlFor='location' title='City Location'
                                           className='control-label col-sm-2 col-sm-offset-1'/>
                                <div className='col-sm-6'>
                                    <input id='location' className='form-control' name='location' type='text'
                                           required onChange={ this.handleChange } value={ this.state.action.location }
                                           placeholder='Type location...'/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='col-sm-offset-3 col-sm-6'>
                                    <button type='submit' value='Submit' className='btn btn-info' id='insert-action'
                                            data-loading-text="<i class='fa fa-spinner fa-spin '></i> Processing ">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class='modal fade' id='confirm-submit' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'
                     aria-hidden='true'>
                    <div class='modal-dialog'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <p>Proposal Submitted</p>
                            </div>
                            <div class='modal-body'>
                                <p>Your action proposal was submitted for review</p>
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-default' data-dismiss='modal'>Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
