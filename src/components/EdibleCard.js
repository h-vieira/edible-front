import React from 'react'
import Button from '@material-ui/core/Button';
import { Link as RLink, Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';


const EdibleCard = ({edibles:{ desc, name, img, id }}) => {

    const MyLink = props => <Link to={{  pathname: `/edible/${id}` }} {...props} />
    console.log(img)
    return (
        <div className="card">
             <div className="card-image" style={{ backgroundImage: `url(${img})` }}> </div>
             <div  className="card-body"> 
                <div className="card-title">{name}</div>
                <div className="card-text">{desc}</div>
               <div className="button">
               
                    <Button   component={MyLink} variant="contained" color="primary" disableElevation>
                        more . . .
                    </Button>
               
                    
               </div>
             </div>
        </div>
    )
}

export default EdibleCard
