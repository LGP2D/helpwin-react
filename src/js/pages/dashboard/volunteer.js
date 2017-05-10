import React from 'react';

export default class Volunteer extends React.Component {
    render () {
        const { location } = this.props;

        return (
            <div class='panel panel-headline'>
                <div class='panel-heading'>
                    <h3 class='panel-title'>Volunteer's Dashboard</h3>
                    <p class='panel-subtitle'>Period: Oct 14, 2016 - Oct 21, 2016</p>
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
                    <p>Yes, our dashboard is a cat, for now.</p>
                    <img height='300px' src='https://static.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg' />
                </div>
            </div>
        );
    }
}
