import { Fragment, useContext } from 'react';
import SvgMaps from './SvgMaps.js'
import { AuthContext } from '../context/AuthContext.js';
import About from '../components/About.js';

const Home = () => {
    const { isAuth } = useContext(AuthContext);
    return (
        <Fragment>
            { !isAuth && ( <About></About> ) }
            <SvgMaps/>
        
        </Fragment>
    );
};

export default Home;
