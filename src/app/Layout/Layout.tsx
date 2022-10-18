import { Container } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./header";

interface LayoutProps {
  children: ReactNode
}

export function Layout(props: LayoutProps) {
  return (
    <Header>
        {props.children}
    </Header>
  );
}
