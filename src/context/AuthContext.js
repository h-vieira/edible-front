import { Fragment, createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

    // Wrap this components arround the components that need user authentification 
    // I will wrap it arround the app for the time being

const AuthState = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser ] = useState ({});
    const [error, setError ] = useState ('');
    const [authlvl, setAuthlvl] = useState('basic');

    const logOut = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const verifySession = async () => {
        const options = {
            headers: {
            token
            }
        };
        const res = await fetch('http://localhost:5000/auth/verify-session', options);
        const { success } = await res.json();
        if (success) {
            setIsAuth(true);
        } else {
            localStorage.removeItem('token');
            setIsAuth('false');
        }
        };

        if (token) verifySession();
    }, []);

/*     useEffect(() =>{
        const token = localStorage.getItem('token');
        if (token) setIsAuth(true);
    }, []); */

    useEffect(() =>{
        setTimeout(() => setError(''), 3000);
    }, [error]);    //every time the error changes aplly effect

    return (
        <Fragment>
            <AuthContext.Provider value={{ isAuth, setIsAuth, user, setUser, authlvl, setAuthlvl, error, setError, logOut }}>
                {children}
            </AuthContext.Provider>   
        </Fragment>
    );
};

export default AuthState;
