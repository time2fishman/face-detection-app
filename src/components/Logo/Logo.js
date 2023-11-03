import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.svg'
import './Logo.css'

const Logo = () => {
  return (
    <div className='ma4 mt0 mb5' >
      <Tilt options={{ max: 55 }} style={{ height: 100, width: 150 }}>
        <div className='Tilt pa3 br2 shadow-2'>
          <img style={{ paddingTop: '5px' }} src={brain} alt='brain logo' />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;