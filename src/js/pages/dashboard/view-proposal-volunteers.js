import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';
import { UserStore } from 'app/stores';
import config from 'app/stores/config';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class viewProposalVolunteers extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount () {
        InstitutionStore.on('UPDATE_PROPOSAL_VOLUNTEERS', this.updateTable);
        InstitutionStore.on('EVALUATE_VOLUNTEER_SUCCESSFUL', this.acceptSuccess);
        InstitutionActions.getVolunteers(this.props.id);
    }

    componentWillUnmount () {
        InstitutionStore.removeListener('UPDATE_PROPOSAL_VOLUNTEERS', this.updateTable);
        InstitutionStore.removeListener('EVALUATE_VOLUNTEER_SUCCESSFUL', this.acceptSuccess);
    }

    acceptSuccess = () => {
        alert('Volunteer successfully evaluated');
        window.location.reload();
    };

    render () {
        return (
            <div>
                <div className='panel'>
                    <div className='panel-heading'>
                        <h3 className='panel-title'>Volunteers</h3>
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
                        <BootstrapTable data={ this.state.data } striped={ true } bordered={ false } hover={ true }
                                        search>
                            <TableHeaderColumn dataField='institution' dataFormat={ this.imageFormatter }
                                               width='20%' isKey={ true }/>
                            <TableHeaderColumn dataField='name'>
                                Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='profession'>
                                Profession
                            </TableHeaderColumn>
                            <TableHeaderColumn dataFormat={ this.evaluateButtonFormatter.bind(this) }/>
                        </BootstrapTable>
                    </div>
                </div>

                <div class='modal fade' id='confirm-evaluate' tabIndex='-1' role='dialog' aria-labelledby='myModalLabel'
                     aria-hidden='true'>
                    <div class='modal-dialog'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <p>Evaluating a Volunteer</p>
                            </div>
                            <div class='modal-body'>
                                <p>How did the volunteer complete this action?</p>
                                <input type='hidden' id='evaluate-user-id' value='' />
                            </div>
                            <div class='modal-footer'>
                                <button type='button' class='btn btn-danger'
                                        data-dismiss='modal' onClick={ this.onEvaluate.bind(this, 'failed') }>
                                    Failed
                                </button>
                                <button class='btn btn-success btn-ok'
                                   data-dismiss='modal' onClick={ this.onEvaluate.bind(this, 'success') }>
                                    Succeed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    evaluateButtonFormatter (cell, row) {
        return (
            <button className='btn btn-info btn-sm'
                    data-toggle='modal' data-target='#confirm-evaluate' onClick={ bindUserId }>
                Evaluate
            </button>
        );

        function bindUserId () {
            document.getElementById('evaluate-user-id').value = row.uniqueId;
        }
    };

    onEvaluate (status) {
        let userid = document.getElementById('evaluate-user-id');
        InstitutionActions.evaluateVolunteer(this.props.id, userid, status);
    }

    updateTable = () => {
        this.setState({
            data: InstitutionStore.getAll()
        });
    };


    imageFormatter = (cell, row) => {
        return (
            <img class='img img-responsive' style={ { maxHeight: '50px' } }
                 src={ config.API_STATIC_URL + row.imageUrl }/>
        );
    };
}
