import React from 'react';

export default class Footer extends React.Component {
    render () {
        const layoutStyles = {
            marginTop: "50px"
        };

        return (
            <footer style={ layoutStyles }>
                    <div className='row text-center'>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                            <ul className='list-inline'>
                                <li>
                                    <a href='' target='_blank'>
                                        <i className='fa fa-facebook fa-2x'/>
                                    </a>
                                </li>
                                <li>
                                    <a href='' target='_blank'>
                                        <i className='fa fa-twitter fa-2x'/>
                                    </a>
                                </li>
                                <li>
                                    <a href='' target='_blank'>
                                        <i className='fa fa-instagram fa-2x'/>
                                    </a>
                                </li>
                                <li>
                                    <a href='' target='_blank'>
                                        <i className='fa fa-linkedin fa-2x'/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                            <h2>© 2017 HelpWin LOGO</h2>
                        </div>
                    </div>
            </footer>
        );
    }
}
