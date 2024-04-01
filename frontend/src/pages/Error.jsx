import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='main'>
      <h1>Oops! Something went wrong.</h1>
      <p>We're sorry, but there was an error.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Error;
