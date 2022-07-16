import React, { createContext, useContext, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import SplashScreen from "../components/SplashScreen";
import axios from "../utils/axios";
import { getData } from "../services/api";
import api from "../services/api";
import { useHistory } from "react-router-dom";

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem("token") || false,
  isInitialised: false,
  user: null,
};

// const isValidToken = (token) => {
//   if (!token) {
//     // for testing
//     return true;
//     //return false;
//   }

//   const decoded = jwtDecode(token);
//   const currentTime = Date.now() / 1000;

//   return decoded.exp > currentTime;
// };

const setSession = (token, reftoken) => {
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common.Authorization;
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const history = useHistory();
  const login = async (email, password) => {
    const response = await axios.post(`/auth/login`, {
      email,
      password,
    });
    let { accessToken } = response.data;
    setSession(accessToken);
    dispatch({
      type: "LOGIN",
      payload: {
        token: accessToken,
      },
    });
    return response;
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    history.replace("/login");
  };

  const register = async (email, name, password) => {
    // const response = await axios.post("/api/account/register", {
    //   email,
    //   name,
    //   password,
    // });
    // const { token, user } = response.data;
    // window.localStorage.setItem("token", token);
    // dispatch({
    //   type: "REGISTER",
    //   payload: {
    //     user,
    //   },
    // });
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const token = window.localStorage.getItem("token");
        if (token) {
          const response = await getData(`users/me`, "");
          console.log(response);
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              user: response.data.payload,
            },
          });
        } else {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useStore = () => useContext(AuthContext);
