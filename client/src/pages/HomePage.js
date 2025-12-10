import React from 'react';

const HomePage = () => {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome to the Gas Agency</h1>
      <p className="lead">
        This is a simple and easy way to book your gas cylinders online.
      </p>
      <hr className="my-4" />
      <p>
        You can register as a new user or login if you already have an account.
      </p>
      <p className="lead">
        <a className="btn btn-primary btn-lg" href="/register" role="button">
          Register
        </a>
        <a className="btn btn-secondary btn-lg ml-2" href="/login" role="button">
          Login
        </a>
      </p>
    </div>
  );
};

export default HomePage;
