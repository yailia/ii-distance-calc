import { ReactNode } from "react";
import { Header } from "./Header";

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
