import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import InstitutionActions from 'app/actions/institutionActions';
import InstitutionStore from 'app/stores/institutionStore';
import UserStore from 'app/stores/userStore';
import ViewProposalCandidates from './viewProposalCandidates';
import Modal from 'react-modal';

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

export default class ListInstitutionProposals extends React.Component {
    constructor () {
        super();

        this.state = {
            data: [],
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }



    openModal(event, row) {
        console.log('MODAL OPEN');
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentWillMount () {
        InstitutionStore.on('UPDATE_INSTITUTION_PROPOSALS', this.updateTable);
        InstitutionStore.on('GET_PROPOSAL_CANDIDATES', this.updateTable);
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
                        <TableHeaderColumn dataFormat={ this.buttonFormatter }>
                            Choose candidates
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

    helpButton  = (event, id) => {
        console.log('GET_CANDIDATES');
        return (
            <Modal
                isOpen={ this.state.modalIsOpen }
                onAfterOpen={ this.afterOpenModal }
                onRequestClose={ this.closeModal }
                style={ customStyles }
                contentLabel='Example Modal'>

                <button onClick={ this.closeModal }>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        );
    }

    vacanciesFormatter (cell, row) {
        return (
            <div className='volunteering-coins'>
                <span className='volunteering-table-text-margin'>{ row.availablePosition }</span>
            </div>
        );
    }

    onclickBtn (cell, row){
        console.log('FUCK');
    }

    buttonFormatter(cell, row){
        return (
            <button className='btn btn-default' onClick={
                this.helpButton.bind(null, event, row)
            } type='button'
                    name={ row }>
                Help
            </button>
        );
    }


}
