import React from 'react';

const FaceRecognition = ({ input }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt4'>
        <img src={input} alt='' width='500px' height='auto' />
      </div>
    </div>
  );
};

export default FaceRecognition;