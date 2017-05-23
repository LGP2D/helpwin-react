import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import 'assets/scss/volunteeringtable.scss';
import config from 'app/stores/config';

import { VolunteeringActions } from 'app/actions';
import VolunteeringStore from 'app/stores/volunteeringListStore';

export default class VolunteeringList extends React.Component {
    constructor () {
        super();

        this.state = {
            data: []
        };

        this.columns = [
            {
                maxWidth: 110,
                render: row => (
                    <div className='image-col text-center'>
                        <img src={ config.API_STATIC_URL + row.row.user.imageUrl }/>
                    </div>
                )
            },
            {
                header: 'Description',
                render: row => (
                    <div>
                        <i className='fa fa-building' aria-hidden='true'/><span
                        className='volunteering-table-text-margin'>{ row.row.user.name }</span>
                        <br />
                        <i className='fa fa-book' aria-hidden='true'/><span
                        className='volunteering-table-text-margin'>{ row.row.type }</span>
                        <br />
                        <i className='fa fa-comment' aria-hidden='true'/><span
                        className='volunteering-table-text-margin'>{ row.row.description }</span>
                    </div>
                )
            },
            {
                header: 'Location & Date',
                maxWidth: 200,
                render: row => (
                    <div className='text-center'>
                        <p> { row.row.location } </p>
                        <i className='fa fa-calendar'/><span
                        className='volunteering-table-text-margin'>Starting: { row.row.startDate }</span>
                        <br />
                        <i className='fa fa-calendar'/><span
                        className='volunteering-table-text-margin'>Ending: { row.row.endDate }</span>
                    </div>
                )
            },
            {
                header: 'Coins',
                width: 100,
                render: row => (
                    <div className='volunteering-coins'>
                        <i className='fa fa-database coin'/><span
                        className='volunteering-table-text-margin'>{ row.row.credits }</span>
                        <br />
                        <button className='btn btn-default' onClick={ this.handleClick } type='button'
                                name={ row.row.id }>Help
                        </button>
                    </div>
                )
            }
        ];
    }

    updateTable = () => {
        this.setState({
            data: VolunteeringStore.getAll()
        });
    };

    handleClick = (event) => {
        console.log(event.target.name)
    };

    componentWillMount () {
        VolunteeringStore.on('UPDATE_VOLUNTEERING', this.updateTable);
        VolunteeringActions.fetchData();
    }

    componentWillUnmount () {
        VolunteeringStore.removeListener('UPDATE_VOLUNTEERING', this.updateTable);
    }

    render () {
        return (
            <ReactTable
                className='-highlight -striped volunteering-table'
                data={ this.state.data }
                columns={ this.columns }
                defaultPageSize={ 5 }
                resizable={ false }
            />
        );
    }
};
