import { css } from "@emotion/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import Logo from "./Logo";

import { breakPoint, headerHeight } from "@/styles/config";

const headerStyle = css`
  height: ${headerHeight};
  background-color: #f9d858;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;

  position: relative;
  z-index: 65535;

  ${breakPoint.sp} {
    height: auto;
    flex-direction: column;
    padding: 12px 12px 0 12px;
    gap: 8px;
  }
`;

const headingStyle = css`
  font-size: 24px;
  font-weight: bold;
`;

const navStyle = css`
  display: flex;
  a {
    display: block;
    font-weight: bold;

    padding: 16px;
    margin: auto 0;

    svg {
      width: 100px;
    }

    ${breakPoint.sp} {
      padding: 16px 12px;
    }
  }
`;

type headerProps = {
  title: string;
};

const Header = ({ title }: headerProps) => {
  const location = useRouter();
  const isTop = location.pathname === "/";

  const topLink = isTop ? <></> : <Link href="/">Top</Link>;

  return (
    <header css={headerStyle}>
      <h1 css={headingStyle}>{title}</h1>
      <nav css={navStyle}>
        {topLink}
        <a href="https://www.dgdgdgdg.com/" target="_blank" rel="noreferrer noopener">
          <Logo />
        </a>
      </nav>
    </header>
  );
};

export default Header;
