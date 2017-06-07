import React from 'react';

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
                            <div class='body text-gray'>
                                <p>Helpwin main focus is to ease the access and offering of volunteering, by
                                    centralizing and speeding up the cataloging and selection process.
                                    <br/>An additional important aspect is the rewarding system, where volunteers can
                                    exchange Helpwin credits for discount vouchers.</p>
                                <p>Besides energizing volunteering, it will also be possible to optimize volunteer
                                    profiling and task matching based on volunteer skills via an innovative web
                                    platform.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id='team' class='container content-section blue-gray'>
                    <div class='row'>
                        <div class='col-lg-8 col-lg-offset-2 text-white'>
                            <h1>OUR TEAM</h1>
                            <div class='row'>

                                <div class='col col-md-6'>
                                    <div class='unhover_img'>
                                        <img className='img-circle'  src='assets/img/flavia.png' alt=''/>
                                    </div>
                                    <span>Collaborator</span>
                                    <h4><span>Flávia </span> Daemon</h4>
                                </div>
                                <div class='col col-md-6'>
                                    <div class='unhover_img'>
                                        <img className='img-circle' src='assets/img/bruno.png' alt=''/>
                                    </div>
                                    <span>Collaborator</span>
                                    <h4><span>Bruno </span> Moreira</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
