import { useState } from "react";
import { useMoralis } from "react-moralis";

import { LogInForm } from "@/features/layout/header/account/logged-out";

import Page from "./";

export default function SecurePage({ children }) {
  const { user, account, chainId, logout, authenticate } = useMoralis();
  return <Page>{user ? children : <LogInForm />}</Page>;
}
