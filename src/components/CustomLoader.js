import React from 'react';
import './CustomLoader.css';
import Loader from 'react-loader-spinner';

function CustomLoader({ text }) {
   return (
      <div className="custom-loader-container">
         <Loader type="Puff" color="#f7c35e" height={48} width={48} />
         <p>{text}</p>
      </div>
   );
}

export default CustomLoader;
