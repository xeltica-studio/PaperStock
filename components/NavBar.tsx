import Link from "next/link";
import styled from "styled-components";
import { FC } from "../misc/FC";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export type NavBarProp = {
  title?: string;
  titleHref?: string;
  leftCommands?: Command[];
  rightCommands?: Command[];
};

export type Command = {
  type: 'button';
  label: string;
  buttonClass?: string;
  isDisabled?: boolean;
  onClick?: VoidFunction;
} | {
  type: 'link'
  label: string;
  buttonClass?: string;
  href: string;
  isExternal?: boolean;
};

export const NavBar: FC<NavBarProp> = ({title, titleHref, leftCommands, rightCommands}) => {
  const renderCommand = (c: Command) => {
    const className = `btn ${c.buttonClass ?? 'flat'}`;
    if (c.type === 'button') {
      return <button className={className} disabled={c.isDisabled} onClick={c.onClick}>{c.label}</button>;
    } else if (c.isExternal) {
      return <a className={className} href={c.href} target="_blank" rel="noreferrer noopener">{c.label}</a>;
    } else {
      return <Link href={c.href}><a className={className}>{c.label}</a></Link>;
    }
  };

  const titleH1 = title && <h1 className="navbar-title mr-auto">{title}</h1>;

  return (
    <StyledHeader className="navbar bg-panel shadow-4">
      {titleHref ? <Link href={titleHref}><a>{titleH1}</a></Link> : titleH1}
      {leftCommands && (
        <div className="hstack">
          {leftCommands.map(renderCommand)}
        </div>
      )}
      {rightCommands && (
        <div className="hstack ml-auto">
          {rightCommands.map(renderCommand)}
        </div>
      )}
    </StyledHeader>
  );
};