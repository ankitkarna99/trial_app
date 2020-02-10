import React from 'react';
import myAxios from '../Apis';

const UserContext = React.createContext({});

export const UserProvider = ({children}) => {
  const [userState, setUserState] = React.useState({
    name: 'Loading...',
    email: 'Loading...',
    picture: 'https://www.w3schools.com/w3images/avatar2.png',
  });

  const getUserState = async () => {
    try {
      const {data} = await myAxios.get('/user/info');
      setUserState(data);
    } catch (err) {
      setTimeout(getUserState, 5000);
    }
  };

  React.useEffect(() => {
    getUserState();
    //eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{userState}}>{children}</UserContext.Provider>
  );
};

export default UserContext;
