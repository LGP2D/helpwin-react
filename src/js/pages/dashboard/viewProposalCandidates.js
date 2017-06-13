import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';
import { UserStore } from 'app/stores';
import config from 'app/stores/config';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class viewProposalCandidates extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillMount () {
        const { router } = this.context;
        InstitutionStore.on('UPDATE_PROPOSAL_CANDIDATES', this.updateTable);
        InstitutionStore.on('ACCEPT_VOLUNTEER_SUCCESSFUL', this.acceptSuccess);
        InstitutionStore.on('REJECT_VOLUNTEER_SUCCESSFUL', this.rejectSuccess);
        InstitutionActions.getCandidates(router.params.id);
    }

    componentWillUnmount () {
        InstitutionStore.removeListener('UPDATE_PROPOSAL_CANDIDATES', this.updateTable);
        InstitutionStore.removeListener('ACCEPT_VOLUNTEER_SUCCESSFUL', this.acceptSuccess);
        InstitutionStore.removeListener('REJECT_VOLUNTEER_SUCCESSFUL', this.rejectSuccess);
    }

    acceptSuccess = () => {
        alert('Accepted');
        window.location.reload();
    };

    rejectSuccess = () => {
        alert('Rejected');
        window.location.reload();
    };

    render () {
        const { router } = this.context;

        return (
            <div className='panel'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Candidates</h3>
                    <div className='right'>
                        <button type='button' className='btn-toggle-collapse'>
                            <i className='ti ti-angle-up' />
                        </button>
                        <button type='button' className='btn-remove'>
                            <i className='ti ti-close' />
                        </button>
                    </div>
                </div>
                <div className='panel-body'>
                    <BootstrapTable data={ this.state.data } striped = { true } bordered = { false } hover={ true } search>
                        <TableHeaderColumn dataField='institution'
                                           dataFormat={ this.imageFormatter } width='20%' isKey={ true } />
                        <TableHeaderColumn dataField='name'>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='profession'>
                            Profession
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.acceptButtonFormatter.bind(this) } />
                        <TableHeaderColumn dataFormat={ this.denyButtonFormatter.bind(this) } />
                </BootstrapTable>
                </div>
            </div>

        );
    }

    acceptButtonFormatter (cell, row) {
        return(
            <button className='btn btn-info btn-sm'
                    onClick={ accept.bind(this) }>Accept</button>
        );

        function accept () {
            InstitutionActions.acceptVolunteer(this.props.id, UserStore.getUserData.uniqueId);
        }
    };

    denyButtonFormatter (cell, row) {
        return(
            <button className='btn btn-danger btn-sm'
                onClick={ deny.bind(this) }>Reject</button>
        );

        function deny () {
            InstitutionActions.rejectVolunteer(this.props.id, UserStore.getUserData.uniqueId);
        }
    };

    updateTable = () => {
        this.setState({
            data: InstitutionStore.getCandidates()
        });
    };


    imageFormatter = (cell, row) =>{
        return (
            <img class='img img-responsive' style={ { maxHeight: '50px' } }
                 src={ config.API_STATIC_URL + row.imageUrl } />
        );
    };
}
