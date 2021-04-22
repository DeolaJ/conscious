import React from 'react';
import Loading from '../../assets/images/loading.gif';

function Loader() {
  return (
    <div className="pr-4">
      <img src={Loading} alt="loading gif" className="w-10" />
    </div>
  );
}

export default Loader;
