import React from 'react';
import ReactTable from 'react-table';

import 'react-table/react-table.css';
import * as VolunteeringUserActions from 'app/actions/volunteeringUserActions';
import VolunteeringUserStore from 'app/stores/VolunteeringUserStore';


export default class VolunteeringUser extends React.Component {
    constructor() {
        super();

        this.state={
            data:''
        }

        this.columns = [
            {
                header: 'col1',
                render: row => (
                    <div>
                        <img src={ row.row.institution.imageUrl } />
                    </div>
                )
            },
            {
                header: 'col2',
                render: row => (
                    <div>
                        <p> { row.row.institution.name } </p>
                        <p> { row.row.type } </p>
                        <p> { row.row.description } </p>
                    </div>
                )
            },
            {
                header: 'col3',
                render: row => (
                    <div>
                        <p> { row.row.location } </p>
                        <p> { row.row.dateStart } </p>
                        <p> { row.row.dateEnd } </p>
                    </div>
                )
            },
            {
                header: 'col4',
                render: row => (
                    <div>
                        <p> { row.row.credits } </p>
                        <button onClick={ this.handleClick } type='button' name={ row.row.id }>Apply</button>

                    </div>
                )
            }
        ];
    }

    updateTable = () => {
        this.setState({
            data:VolunteeringUserStore.getAll()
        })
    }

    componentWillMount(){
        VolunteeringUserStore.on('update',this.updateTable);
        VolunteeringUserActions.fetchData();
    }

    componentWillUnmount(){
        VolunteeringUserStore.removeListener('update',this.updateTable);
    }

    handleClick = (event) => {
        console.log(event.target.name);
    }
    render() {
        return (
            <div>
                <ReactTable
                    data={ this.state.data }
                    columns={ this.columns }/>
            </div>
        )
    }
}
