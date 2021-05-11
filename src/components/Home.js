import { Fragment, useContext, useState, useEffect } from 'react';
import SvgMaps from './SvgMaps.js'
import { AuthContext } from '../context/AuthContext.js';
import EdibleCard from '../components/EdibleCard.js';
import About from '../components/About.js';
import { makeStyles } from '@material-ui/core/styles';
import URL from '../utils/constants.js';
import '../index.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: { 
		flexGrow: 1,
		minHeight: '70vh'
	},
	menuButton: { marginRight: theme.spacing(2), },
	title: { flexGrow: 1, },
}));

const Home = () => {
    const classes = useStyles();
    const { isAuth } = useContext(AuthContext);
    const [edibles, setedibles] = useState([]);

    const getData = async () =>{
        try{
          let response = await fetch(`${URL}/edibles/all/1`);
          return await response.json();
        }catch(err){
          console.error(err);
        }
      } 
      useEffect(() => {
        getData()
        .then(data => {
            
            const items =  data.request.map(item => {
                return {
                    id : item.id,
                    name : item.name,
                    desc : item.desc,
                    img : item.image,
                }
            });
            setedibles(items);
        });
    }, []);

    

    return (
        
            <div className={classes.root}>
                
               
                <div className="content">
                    <div className="content-map">{/* { isAuth &&(<SvgMaps></SvgMaps> ) } */}</div>  
                    <div className="content-cards">
                    { !isAuth && ( <About></About> ) }
                   
                    { edibles && edibles.map(edible => ( <EdibleCard key={edible.id} edibles={edible} />)) }
                    { !edibles &&  <spam><Link to="/create-edible">Be the first one to contribute!</Link></spam> }
                         
                    
                    
                    </div>
                    <div className="content-right"></div>
                </div>
               
            </div>
      
    );
};

export default Home;
