import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class Home extends React.Component {
    render () {
        const { location } = this.props;
        const layoutStyles = {
            textAlign: 'center'
        };

        return (
            <section id='about' class='container content-section text-center'>
                <div class='row'>
                    <div class='col-lg-8 col-lg-offset-2'>
                        <h2>About Grayscale</h2>
                        <p>Grayscale is a free Bootstrap 3 theme created by Start Bootstrap. It can be yours right now, simply download the template on <a href='http://startbootstrap.com/template-overviews/grayscale/'>the preview page</a>. The theme is open source, and you can use it for any purpose, personal or commercial.</p>
                        <p>This theme features stock photos by <a href='http://gratisography.com/'>Gratisography</a> along with a custom Google Maps skin courtesy of <a href='http://snazzymaps.com/'>Snazzy Maps</a>.</p>
                        <p>Grayscale includes full HTML, CSS, and custom JavaScript files along with LESS files for easy customization.</p>
                    </div>
                </div>
            </section>
        );
    }
}
