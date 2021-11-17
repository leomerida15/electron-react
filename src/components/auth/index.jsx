import React from 'react';
import PropTypes from 'prop-types';
import Login from './login.jsx';
import Register from './register.jsx';

const Auth = ({ type }) => {
	if (type === 'login') return <Login />;
	else return <Register />;
};

Auth.propTypes = {
	type: PropTypes.string.isRequired,
};

export default Auth;
