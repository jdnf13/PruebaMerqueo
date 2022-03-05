import React, {Fragment} from 'react';
import '../css/App.css'

const FooterInicio    =   ()  =>  {
    return(
        <Fragment>
            <footer>
                <div className="footer-copyright text-center py-3">
                    <p>Mercado</p>
                    <p className="copy"><a className="credit" href='https://merqueo.com'>www.merqueo.com</a></p>
                </div>
            </footer>
        </Fragment>
    );
}
export default FooterInicio