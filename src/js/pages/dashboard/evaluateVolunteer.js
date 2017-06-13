import React, { PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';
import { UserStore } from 'app/stores';
import config from 'app/stores/config';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

export default class EvaluateVolunteer extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillMount () {
        const { router } = this.context;
        InstitutionStore.on('FETCH_VOLUNTEERS_SUCCESSFUL', this.fetchSuccessful);
        InstitutionStore.on('EVALUATE_VOLUNTEER_SUCCESSFUL', this.evalSuccessful);
        InstitutionActions.volunteersToEvaluate(router.params.id);
    }

    componentWillUnmount () {
        InstitutionStore.removeListener('FETCH_VOLUNTEERS_SUCCESSFUL', this.fetchSuccessful);
        InstitutionStore.on('EVALUATE_VOLUNTEER_SUCCESSFUL', this.evalSuccessful);
    }

    evalSuccessful = () => {
        console.log('evaled!');
    };

    fetchSuccessful = () => {
        this.setState({
           data: InstitutionStore.candidatesToEval
        });
    };

    render () {
        const { router } = this.context;
        console.log(this.state.data);
        return (
            <div className='panel'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Evaluate</h3>
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
                    <BootstrapTable data={ this.state.data } striped = { true } bordered = { false } hover={ true } search>
                        <TableHeaderColumn dataField='name' isKey={ true }>
                            Name
                        </TableHeaderColumn>
                        <TableHeaderColumn dataFormat={ this.SuccessFormatter.bind(this) } />
                        <TableHeaderColumn dataFormat={ this.FailedFormatter.bind(this) } />
                    </BootstrapTable>
                </div>
            </div>

        );
    }

    SuccessFormatter (cell, row) {
        const { router } = this.context;
        return(
            <button className='btn btn-info btn-sm'
                    onClick={ accept.bind(this) }>Success</button>
        );

        function accept () {
            InstitutionActions.evaluateVolunteer(router.params.id, row.uniqueId, 'SUCCESS')
        }
    };

    FailedFormatter (cell, row) {
        const { router } = this.context;
        return(
            <button className='btn btn-danger btn-sm'
                    onClick={ deny.bind(this) }>Failure</button>
        );

        function deny () {
            InstitutionActions.evaluateVolunteer(router.params.id, row.uniqueId, 'FAILED')
        }
    };

    updateTable = () => {
        this.setState({
            data: InstitutionStore.getCandidates()
        });
    };


    imageFormatter = (cell, row) =>{
        return (
            <img class='img img-responsive' style={ { maxHeight: '50px' } }
                 src={ config.API_STATIC_URL + row.imageUrl } />
        );
    };
}
