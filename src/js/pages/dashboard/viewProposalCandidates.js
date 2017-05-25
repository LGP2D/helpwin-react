import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';
import config from 'app/stores/config';


import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class viewProposalCandidates extends React.Component {
    constructor (props) {
        super(props);
        console.log(props);
        this.state = {
            data: [],
            action: this.props.params.id
        };
    }

    componentWillMount () {
        InstitutionStore.on('UPDATE_PROPOSAL_CANDIDATES', this.updateTable);
        InstitutionActions.getCandidates(this.state.action);
    }

    componentWillUnmount () {
        InstitutionStore.removeListener('UPDATE_PROPOSAL_CANDIDATES', this.updateTable);
    }

    render () {
        const { location } = this.props;

        return (

            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Proposal Candidates</h3>
                    <div class='right'>
                        <button type='button' class='btn-toggle-collapse'>
                            <i class='ti ti-angle-up' />
                        </button>
                        <button type='button' class='btn-remove'>
                            <i class='ti ti-close' />
                        </button>
                    </div>
                </div>
                <div class='panel-body'>
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
                    </BootstrapTable>
                </div>
            </div>

        );
    }

    updateTable = () => {
        this.setState({
            data: InstitutionStore.getCandidates()
        });
        console.log('CANDIDATES');
    };

    handleClick () {

    }

    imageFormatter = (cell, row) =>{
        return (
            <img height='50' src={ config.API_STATIC_URL + row.imageUrl } />
        );
    }

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
