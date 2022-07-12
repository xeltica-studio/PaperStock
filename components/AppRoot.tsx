import styled from "styled-components";
import { FC } from "../misc/FC";
import { NavBar, NavBarProp } from "./NavBar";

export const RootStyle = styled.div`
  margin-top: 64px;
`;

export type AppRootProp = NavBarProp & {
  showNavBar?: boolean;
  className?: HTMLElement['className'];
};

export const AppRoot: FC<AppRootProp> = ({showNavBar, children, title, titleHref, leftCommands, rightCommands, className, onBackButton}) => {
  return (
    <RootStyle className={className}>
      {(showNavBar ?? true) && <NavBar {...{title, titleHref, leftCommands, rightCommands, onBackButton}} />}
      {children}
    </RootStyle>
  );
};