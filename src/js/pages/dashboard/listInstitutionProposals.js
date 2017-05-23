import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';
import UserStore from 'app/stores/userStore';


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
        InstitutionStore.on('update-get-proposals-institution', this.updateTable);
        console.log('USER: ');
        console.log(UserStore.getJwt);
        InstitutionActions.getProposals(UserStore.getJwt);
    }

    componentWillUnmount () {
        InstitutionStore.removeListener('update-get-proposals-institution', this.updateTable);
    }

    render () {
        const { location } = this.props;

        return (

            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Volunteering Proposals</h3>
                    <p class='panel-subtitle'>A list with all registered institutions</p>
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
                        <TableHeaderColumn dataField='institution' dataFormat={ this.imageFormatter }
                                           isKey={ true }>
                            Logo
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='institution' dataFormat={ this.nameFormatter }>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.locationDateFormatter }>
                            Location & Date
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='description'>
                            Description
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.helpFormatter }>
                            Help
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
    };

    handleClick () {

    }

    imageFormatter (cell, row) {
        return (
            <img height='50' src={ cell.user.imageUrl } />
        );
    }

    nameFormatter (cell, row) {
        return (
            cell.name
        );
    }

    locationDateFormatter (cell, row) {
        return (
            <div className='text-center'>
                <p> { row.location } </p>
                <i className='fa fa-calendar'/><span
                className='volunteering-table-text-margin'>Starting: { row.dateStart }</span>
                <br />
                <i className='fa fa-calendar'/><span
                className='volunteering-table-text-margin'>Ending: { row.dateEnd }</span>
            </div>
        );
    }

    helpFormatter (cell, row) {
        return (
            <div className='volunteering-coins'>
                <i className='fa fa-database coin'/><span
                className='volunteering-table-text-margin'>{ row.credits }</span>
                <br />
                <button className='btn btn-default' onClick={ this.handleClick } type='button'
                        name={ row.id }>
                    Help
                </button>
            </div>
        );
    }
}
