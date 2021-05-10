import { Fragment } from 'react';
import { Link } from 'react-router-dom'
const About = () => {
    return (
        <div className="about">
            <h2>Welcome to  <span style={{ color:"orange" }}>IsThisEdible!</span></h2>
            <div className="text" >
            <spam><span style={{ color:"orange", fontWeight: 'bold' }}>IsThisEdible </span> is an opensorce project were users share their Foraging knowledge</spam><br/>
            <spam>Foragin is the act of searching for wild food resources</spam><br/>
            <spam><Link to="/sign-up">Join our comunity</Link>, help us grow and learn more about sustainability!</spam><br/>
            
            </div>
        </div>
    );
};

export default About;
