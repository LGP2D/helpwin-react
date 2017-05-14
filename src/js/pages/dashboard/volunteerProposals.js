import React from 'react';
import UserStore from  'app/stores/userStore';
import LabelForm from 'app/components/frontpage/forms/FormLabel';

export default class VolunteerProposals extends React.Component {
    constructor (){
        super();
    }

    render () {
        const { location } = this.props;

        return (

            <div className='panel profile-panel-border'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>
                        Proposals
                    </h3>
                </div>
                <div className='panel-body'>
                    Hey
                </div>
            </div>

        );
    }
}
