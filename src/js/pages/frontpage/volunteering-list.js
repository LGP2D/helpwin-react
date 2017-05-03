import React from 'react';
import { DataTable } from 'react-data-components';

import * as VolunteeringActions from 'app/actions/volunteeringListActions';
import VolunteeringStore from 'app/stores/volunteeringListStore';

export default class VolunteeringList extends React.Component {
    constructor (){
        super();

        this.state =  {
            data: ''
        }

        this.columns = [
            { title: 'Description', prop: 'description' },
            { title: 'Coins', prop: 'coins' },
            { title: 'Type', prop: 'type' },
            { title: 'Insitution', prop: 'institution' }
        ]

        this.updateTable = this.updateTable.bind(this);
    }

    updateTable () {
        this.setState({
            data: VolunteeringStore.getAll()
        })
    }

    componentWillMount () {
        VolunteeringStore.on('update', this.updateTable);
        VolunteeringActions.fetchData();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('update', this.updateTable);
    }

    render() {
        console.log('data -> ', this.state.data);
        return (
            <div className='table'>
                <DataTable
                    keys='id'
                    columns={ this.columns }
                    initialData={ this.state.data }
                    initialPageLength= { 5 }
                    initialSortBy={ { prop: 'id', order: 'ascending' } }
                />
            </div>
        );
    }
}
