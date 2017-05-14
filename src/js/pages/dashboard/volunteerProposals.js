import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as VolunteeringActions from 'app/actions/volunteeringListActions';
import VolunteeringStore from 'app/stores/volunteeringListStore';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class VolunteerProposals extends React.Component {
    constructor () {
        super();

        this.state = {
            data: []
        };
    }

    componentWillMount () {
        VolunteeringStore.on('update', this.updateTable);
        VolunteeringActions.fetchData();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('update', this.updateTable);
    }

    render () {
        const { location } = this.props;

        console.log(this.state.data);

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
                    </BootstrapTable>
                </div>
            </div>

        );
    }

    updateTable = () => {
        this.setState({
            data: VolunteeringStore.getAll()
        });
    };

    imageFormatter (cell, row) {
        return (
            <img height='50' src={ cell.imageUrl } />
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
}
