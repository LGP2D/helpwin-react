import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';
import UserStore from 'app/stores/userStore';
import ViewProposalCandidates from './viewProposalCandidates';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class ListInstitutionProposals extends React.Component {
    constructor () {
        super();

        this.state = {
            data: [],
            institution: UserStore.getUser
        };
    }

    componentWillMount () {
        InstitutionStore.on('UPDATE_INSTITUTION_PROPOSALS', this.updateTable);
        InstitutionActions.getProposals();
    }

    componentWillUnmount () {
        InstitutionStore.removeListener('UPDATE_INSTITUTION_PROPOSALS', this.updateTable);
    }

    render () {
        const { location } = this.props;

        // TODO: Routing to view Proposal's Candidates
        let options = {
            onRowClick: function(row){
                return (
                    <ViewProposalCandidates/>
                );
            }
        }

        return (

            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Volunteering Proposals</h3>
                    <p class='panel-subtitle'>A list with all your registered volunteering proposals</p>
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
                    <BootstrapTable data={ this.state.data } striped={ true } hover={ true } options={ options }>
                        <TableHeaderColumn dataField='institution' dataFormat={ this.nameFormatter } isKey={ true }>
                            Type
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.locationDateFormatter }>
                            Location & Date
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.creditsFormatter }>
                            Description
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.vacanciesFormatter }>
                            Vacancies
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>

        );
    }

    updateTable = () => {
        this.setState({
            data: InstitutionStore.getAll()
        });
        console.log(this.state.data);
    };

    nameFormatter (cell, row) {
        return (
            row.type
        );
    }

    locationDateFormatter (cell, row) {
        return (
            <div className='text-center'>
                <p> { row.location } </p>
                <i className='fa fa-calendar'/><span
                className='volunteering-table-text-margin'>Starting: { row.startDate }</span>
                <br />
                <i className='fa fa-calendar'/><span
                className='volunteering-table-text-margin'>Ending: { row.endDate }</span>
            </div>
        );
    }

    creditsFormatter (cell, row) {

        return (
            <div className='volunteering-coins'>s
                <span
                    className='volunteering-table-text-margin'>{ row.description }</span>
                <br /><i className='fa fa-database coin'/><span
                className='volunteering-table-text-margin'>{ row.credits }</span>
            </div>
        );
    }

    vacanciesFormatter (cell, row) {
        return (
            <div className='volunteering-coins'>
                <span className='volunteering-table-text-margin'>{ row.availablePosition }</span>
            </div>
        );
    }
}
