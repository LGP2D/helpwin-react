import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';
import config from 'app/stores/config';


import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class viewProposalCandidates extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            action: this.props.params.id
        };
    }

    componentWillMount () {
        InstitutionStore.on('UPDATE_PROPOSAL_CANDIDATES', this.updateTable);
        InstitutionStore.on('ACCEPT_VOLUNTEER_SUCCESSFUL', this.acceptSuccess);
        InstitutionStore.on('REJECT_VOLUNTEER_SUCCESSFUL', this.rejectSuccess);
        InstitutionActions.getCandidates(this.state.action);
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
        const { location } = this.props;

        return (

            <div className='panel panel-headline'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Proposal Candidates</h3>
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
                    <BootstrapTable data={ this.state.data } striped={ true } hover={ true }>
                        <TableHeaderColumn dataField='institution' dataFormat={ this.imageFormatter } isKey={ true } />
                        <TableHeaderColumn dataFormat={ this.nameFormatter }>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.emailFormatter }>
                            Email
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.birthdateFormatter }>
                            Birthdate
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.professionFormatter }>
                            Profession
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ (cell, row, id) => this.acceptButtonFormatter(cell, row, this.state.action) } />
                        <TableHeaderColumn dataFormat={ (cell, row, id) => this.denyButtonFormatter(cell, row, this.state.action) } />
                </BootstrapTable>
                </div>
            </div>

        );
    }

    acceptButtonFormatter = (cell, row, id) => {
        return(
            <button onClick={ accept.bind(null, cell, row.uniqueId, id) } name={ row.uniqueId }>Accept</button>
        );

        function accept (cell, row, id) {
            InstitutionActions.acceptVolunteer(id, row);
        }
    };

    denyButtonFormatter = (cell, row, id) => {
        return(
            <button onClick={ deny.bind(null, cell, row.uniqueId, id) } name={ row.uniqueId }>Reject</button>
        );

        function deny (cell, row, id) {
            InstitutionActions.rejectVolunteer(id, row);
        }
    };

    updateTable = () => {
        this.setState({
            data: InstitutionStore.getCandidates()
        });
        console.log('CANDIDATES');
    };


    imageFormatter = (cell, row) =>{
        return (
            <img height='50' src={ config.API_STATIC_URL + row.imageUrl } />
        );
    };

    nameFormatter = (cell, row) =>{
        console.log('NAME');
        console.log(row);
        return (
            <div className='text-center'>
                <span className='volunteering-table-text-margin'>{ row.name }</span>
            </div>
        );
    }

    emailFormatter = (cell, row) =>{
        return (
            <div className='text-center'>
                <span className='volunteering-table-text-margin'>{ row.email }</span>
            </div>
        );
    }

    birthdateFormatter = (cell, row) =>{
        return (
            <div className='text-center'>
                <span className='volunteering-table-text-margin'>{ row.birthDate }</span>
            </div>
        );
    }

    professionFormatter = (cell, row) =>{
        return (
            <div className='text-center'>
                <span className='volunteering-table-text-margin'>{ row.profession }</span>
            </div>
        );
    }
}
