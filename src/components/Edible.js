import { Fragment, useState, useEffect} from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import URL from '../utils/constants.js';

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
        
        <div className="edible-section">
            {!loading ? (
                <Fragment>
                    <div className="edible-geral">
                        <div className="edible-name">{ data.name }</div>
                        <div className="edible-sname">{data.scientificName}</div>
                        <spam> Description </spam>
                        <div className="edible- description"> {data.desc}</div>
                    </div>
                    <div className="edible-image" style={{ backgroundImage: `url(${data.image})` }}> </div>
                </Fragment> 
            ): (<div> Loading ...</div> )}
        </div>
    );
};

export default Edible;
