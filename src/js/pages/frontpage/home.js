import React from 'react';
import {IndexLink, Link} from 'react-router';

export default class Home extends React.Component {
    render() {
        const {location} = this.props;
        const layoutStyles = {
            textAlign: 'center'
        };

        return (
            <div class='body'>
                <section id='about' class='container content-section'>
                    <div class='row'>
                        <div class='col-lg-8 col-lg-offset-2'>
                            <h1>ABOUT US</h1>
                            <h6 class='text-gray'></h6>
                            <div class='body text-gray'>
                                <p>HelpWin main focus is to ease the access and offering of volunteering, by
                                    centralizing and speeding up the cataloging and selection process.
                                    <br/>An aditional important aspect is the rewarding system , where volunteers can
                                    exchange HelWin credits for discount vouchers.</p>
                                <p>Besides energizing volunteering, it will also be possible to optimize vonlunteer
                                    profiling and task matching based on volunteer skills via an innovative web
                                    platform</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='team' class='container content-section blue-gray'>
                    <div class='row'>
                        <div class='col-lg-8 col-lg-offset-2 text-white'>
                            <h1>OUR TEAM</h1>
                            <h6 class='text-lightgray'></h6>
                            <div class='col-md-3'>
                                <div class='unhover_img'>
                                    <img src='assets/img/flavia.png' alt=''/>
                                </div>
                                <span>Collaborator</span>
                                <h4><span>Flávia </span> Daemon</h4>
                            </div>
                            <div class='col-md-3'>
                                <div class='unhover_img'>
                                    <img src='assets/img/bruno.png' alt=''/>
                                </div>
                                <span>Collaborator</span>
                                <h4><span>Bruno </span> Moreira</h4>

                            </div>
                        </div>
                        
                    </div>
                </section>
            </div>
        );
    }
}
