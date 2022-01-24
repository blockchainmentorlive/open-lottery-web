import { useState } from "react";
import useWeb3 from "@/features/web3/hooks/use-web3";
import { LogInForm } from "@/features/layout/header/account/logged-out";

import Page from "./";

export default function SecurePage({ children }) {
  const { address } = useWeb3();
  return <Page>{address ? children : <LogInForm />}</Page>;
}
