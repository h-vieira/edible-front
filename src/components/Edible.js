import { Fragment, useState, useEffect} from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import URL from '../utils/constants.js';

const Edible = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(async () => {
        const result = await axios(`${URL}/edibles/${id}`);
        setData(result.data);
      }, [id]);
      
   console.log(data)

    return (
        <Fragment>
            edible {id}
        </Fragment>
    );
};

export default Edible;
