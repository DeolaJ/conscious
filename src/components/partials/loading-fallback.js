import React from 'react';
import Loading from '../../assets/images/loading.gif';

function LoadingFallback() {
  return (
    <section className="flex items-center justify-center w-screen h-screen bg-rose-200">
      <img src={Loading} alt="loading gif" className="w-28" />
    </section>
  );
}

export default LoadingFallback;
