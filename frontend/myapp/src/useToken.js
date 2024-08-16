import { useState } from 'react';

// ------------- CITATION -------------
// This page was created following a DigitalOcean tutorial on "How to add login authentication to react applications"
// url: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications


export default function useToken() {

  const getToken = () => {
    try {
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    } catch (error) {
      return null;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    try {
      localStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
    } catch (error) {
      setToken(null)
    }
  }

  return {
    setToken: saveToken,
    token
  }

}