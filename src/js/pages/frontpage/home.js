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
                            <div class='row'>

                                <div class='col col-md-6'>
                                    <div class='unhover_img'>
                                        <img className='img-circle' src='assets/img/staff2.png' alt=''/>
                                    </div>
                                    <span>CEO </span>
                                    <h4><span>Mike </span> Green</h4>
                                </div>
                                <div class='col col-md-6'>
                                    <div class='unhover_img'>
                                        <img className='img-circle' src='assets/img/staff1.png' alt=''/>
                                    </div>
                                    <span>Collaborator </span>
                                    <h4><span>Julia </span> Booman</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id='testemonial' class='container content-section '>
                    <div class='row'>
                        <div class='col-lg-8 col-lg-offset-2 '>
                            <h1>TESTIMONIALS</h1>
                            <h6 class='text-gray'></h6>
                            <div class='body text-gray'>
                                <p>HelpWin main focus is to ease the access and offering of volunteering, by
                                    centralizing and speeding up the cataloging and selection process.
                                </p>
                            </div>
                            <div class='row text-center'>
                                <div class='col-md-4 mb-r'>
                                    <div class='testimonial'>
                                        <div class='avatar'>
                                            <img className='img-circle' src='assets/img/staff1.png' alt=''/>
                                        </div>
                                        <h4>Anna Deynah</h4>
                                        <h5>Teacher</h5>
                                        <p><i class='fa fa-quote-left'></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab.</p>

                                    </div>
                                </div>
                                <div class='col-md-4 mb-r'>
                                    <div class='testimonial'>
                                        <div class='avatar'>
                                            <img className='img-circle' src='assets/img/staff2.png' alt=''/>
                                        </div>
                                        <h4>John Doe</h4>
                                        <h5>Web Developer</h5>
                                        <p><i class='fa fa-quote-left'></i> Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.</p>
                                    </div>
                                </div>
                                <div class='col-md-4 mb-r'>
                                    <div class='testimonial'>

                                        <div class='avatar'>
                                            <img className='img-circle' src='assets/img/staff3.png' alt=''/>
                                        </div>
                                        <h4>David Kate</h4>
                                        <h5>Photographer</h5>
                                        <p><i class='fa fa-quote-left'></i> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
