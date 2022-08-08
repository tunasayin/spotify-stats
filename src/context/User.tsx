import React, { createContext, useReducer } from "react";
import Cookie from "js-cookie";

interface Image {
  url: string;
  height: number;
  width: number;
}

interface User {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locker: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: string;
  };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  url: string;
}
interface UserCtx extends User {
  GetUser: () => void;
}
interface UserContextInput {
  children: any;
}

export const UserContext = createContext<UserCtx | null>(null);

export const UserReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  switch (action?.type) {
    case "SET_USER":
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export const UserState = ({ children }: UserContextInput) => {
  const [state, dispatch] = useReducer(UserReducer, null);

  const GetUser = async () => {
    if (!Cookie.get("token")) return;

    const user = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookie.get("token")}`,
      },
    }).then((res) => {
      if (res.status === 200) return res.json();
      else return null;
    });

    if (!user) return;

    dispatch({
      type: "SET_USER",
      payload: user,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        GetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
