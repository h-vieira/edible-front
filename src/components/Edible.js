import { Fragment, useState, useEffect} from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import URL from '../utils/constants.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const Edible = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(async () => {
        setLoading(true)
        const result = await axios(`${URL}/edibles/${id}`);
        setData(result.data[0]);
        setLoading(false);
      }, [id]);
      
   console.log(data)

    return (
        
        <div className="edible-container">
            {!loading ? (
                <Fragment>
                <div className="edible-title">{ data.name }</div>
                <div className="edible-image" style={{ backgroundImage: `url(${data.image})` }}> </div>
                <div className="edible-item">
                    <div className="edible-item-name">Scientific name:</div>
                    <div className="edible-item-text">{data.scientificName}</div>
                </div>     
                <div className="edible-item">
                    <div className="edible-item-name">Description:</div>
                    <div className="edible-item-text">{data.desc}</div>
                </div>     
               
                 
                </Fragment> 
            ): (<div className="spiner"><CircularProgress /></div> )}
        </div>
    );
};

export default Edible;
