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
  onBackButton?: VoidFunction;
};

export type Command = {
  type: 'button';
  label?: string;
  iconClass?: string;
  buttonClass?: string;
  isDisabled?: boolean;
  onClick?: VoidFunction;
} | {
  type: 'link'
  label?: string;
  iconClass?: string;
  buttonClass?: string;
  href: string;
  isExternal?: boolean;
};

export const NavBar: FC<NavBarProp> = ({title, titleHref, leftCommands, rightCommands, onBackButton}) => {
  const renderCommand = (c: Command) => {
    const className = `btn text-white ${c.buttonClass ?? 'flat'}`;
    const content = <>{c.iconClass && <i className={`${c.iconClass} fa-fw ${c.label ? 'mr-1' : ''}`}/>}{c.label}</>;
    if (c.type === 'button') {
      return <button className={className} disabled={c.isDisabled} onClick={c.onClick}>{content}</button>;
    } else if (c.isExternal) {
      return <a className={className} href={c.href} target="_blank" rel="noreferrer noopener">{content}</a>;
    } else {
      return <Link href={c.href}><a className={className}>{content}</a></Link>;
    }
  };

  const titleH1 = title && <h1 className="navbar-title mr-auto">{title}</h1>;

  return (
    <StyledHeader className="navbar bg-primary shadow-4">
      {onBackButton && (
        <button className="btn flat mr-1 text-white" onClick={onBackButton}>
          <i className="fas fa-arrow-left" />
        </button>
      )}
      {titleHref ? <Link href={titleHref}><a>{titleH1}</a></Link> : titleH1}
      {leftCommands && (
        <div className="hstack slim">
          {leftCommands.map(renderCommand)}
        </div>
      )}
      {rightCommands && (
        <div className="hstack slim ml-auto">
          {rightCommands.map(renderCommand)}
        </div>
      )}
    </StyledHeader>
  );
};