import React from "react";
import { adminLogin} from "../ApiServices"


var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();



function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };


function loginUser(dispatch, username, password, history, setIsLoading, setError) {
  adminLogin({ username, password })
    .then((response) => {
      localStorage.setItem('token',response.data.token) 
      dispatch({ type: 'LOGIN_SUCCESS' })
      history.push('/app/dashboard')
    }).catch((error) => {
       if(error.response.status == 400 || error.response.status == 422){
          setIsLoading(false)
          setError(error.response.data.error)
       }
    })
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
