import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as VolunteeringActions from 'app/actions/volunteeringListActions';
import VolunteeringStore from 'app/stores/volunteeringListStore';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class ListInstitution extends React.Component {

    constructor () {
        super();
    }

    updateTable = () => {
        this.setState({
            data: VolunteeringStore.getAll()
        })
    };

    handleClick = (event) => {
        console.log(event.target.name)
    };

    componentWillMount () {
        VolunteeringStore.on('UPDATE_VOLUNTEERING', this.updateTable);
        VolunteeringActions.fetchData()
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('UPDATE_VOLUNTEERING', this.updateTable)
    }

    render () {

        return (
            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Institution List</h3>
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
                        <TableHeaderColumn dataField='institution' dataFormat={ this.locationFormatter }>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField='description'>
                            Description
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }

    locationFormatter (cell, row) {
        return (
            cell.name
        );
    }

    imageFormatter (cell, row) {
        return (
            <img height='50' src={ cell.imageUrl } />
        );
    }
}
