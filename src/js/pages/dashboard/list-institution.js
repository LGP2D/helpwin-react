import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import * as VolunteeringActions from 'app/actions/volunteeringListActions';
import VolunteeringStore from 'app/stores/volunteeringListStore';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class ListInstitution extends React.Component {

    constructor () {
        super();

        this.columns = [
            {
                maxWidth: 110,
                render: row => (
                    <div className='image-col text-center'>
                        <img src={ row.row.institution.imageUrl }/>
                    </div>
                )
            },
            {
                header: 'Description',
                render: row => (
                    <div>
                        <i className='fa fa-building' aria-hidden='true' /><span className='volunteering-table-text-margin'>{ row.row.institution.name }</span>
                        <br />
                        <i className='fa fa-book' aria-hidden='true' /><span className='volunteering-table-text-margin'>{ row.row.type }</span>
                        <br />
                        <i className='fa fa-comment' aria-hidden='true' /><span className='volunteering-table-text-margin'>{ row.row.description }</span>
                    </div>
                )
            },
            {
                header: 'Location & Date',
                maxWidth: 200,
                render: row => (
                    <div className='text-center'>
                        <p> { row.row.location } </p>
                        <i className='fa fa-calendar' /><span className='volunteering-table-text-margin'>Starting: { row.row.dateStart }</span>
                        <br />
                        <i className='fa fa-calendar' /><span className='volunteering-table-text-margin'>Ending: { row.row.dateEnd }</span>
                    </div>
                )
            },
            {
                header: 'Coins',
                width: 100,
                render: row => (
                    <div className='volunteering-coins'>
                        <i className='fa fa-database coin' /><span className='volunteering-table-text-margin'>{ row.row.credits }</span>
                        <br />
                        <button className='btn btn-default' onClick={ this.handleClick } type='button' name={ row.row.id }>Help</button>
                    </div>
                )
            }
        ];
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
        VolunteeringStore.on('update', this.updateTable);
        VolunteeringActions.fetchData()
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('update', this.updateTable)
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
