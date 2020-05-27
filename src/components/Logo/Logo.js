import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import brain from './brain.png';

const Logo = () => {
    return (
        <div className='center pt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 70, width: 70 }} >
            <div className="Tilt-inner"> <img style={{paddingTop: '5px'}}alt="brain logo" src={brain}/> </div>
            </Tilt>
        </div>
    );
}

export default Logo;