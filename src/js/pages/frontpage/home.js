import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class Home extends React.Component {
    render () {
        const { location } = this.props;
        const layoutStyles = {
            textAlign: 'center'
        };

        return (
            <div class='body'>
                <section id='about' class='container content-section'>
                    <div class='row'>
                        <div class='col-lg-8 col-lg-offset-2'>
                            <h1>ABOUT US</h1>
                            <h6 class='text-gray'>We do stuff</h6>
                            <div class='body text-gray'>
                                <p>We intend to include a small paragraph about us here</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='team' class='container content-section blue-gray'>
                    <div class='row'>
                        <div class='col-lg-8 col-lg-offset-2 text-white'>
                            <h1>OUR TEAM</h1>
                            <h6 class='text-lightgray'>Pretending we have a team</h6>
                            <div class='body'>
                                <p>We intend to include a small paragraph about us here</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='other' class='container content-section'>
                    <div class='row'>
                        <div class='col-lg-8 col-lg-offset-2'>
                            <h1>ABOUT US</h1>
                            <h6 class='text-gray'>We do stuff</h6>
                            <div class='body text-gray'>
                                <p>We intend to include a small paragraph about us here</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
