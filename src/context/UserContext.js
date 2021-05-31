import React, { useState, createContext } from "react";

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  // use user data in the app, insted if fetching data from db
  const [state, setState] = useState({
    email: "",
    uid: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    active: "",
    isLoggedIn: null,
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
