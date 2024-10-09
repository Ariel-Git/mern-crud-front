declare module 'react-router-bootstrap' {
  import { ComponentType, ReactNode } from 'react';
  import { LinkProps, NavLinkProps } from 'react-router-dom';
  import { ButtonProps } from 'react-bootstrap';

  interface LinkContainerProps extends LinkProps {
    children: ReactNode;
  }

  interface NavLinkContainerProps extends NavLinkProps {
    children: ReactNode;
  }

  interface ButtonLinkContainerProps extends ButtonProps {
    to: string;
  }

  export const LinkContainer: ComponentType<LinkContainerProps>;
  export const NavLinkContainer: ComponentType<NavLinkContainerProps>;
  export const ButtonLinkContainer: ComponentType<ButtonLinkContainerProps>;
}
