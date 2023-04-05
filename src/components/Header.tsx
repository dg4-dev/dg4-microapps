import { css } from "@emotion/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

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

    ${breakPoint.sp} {
      padding: 16px 12px;
    }
  }

  /* 子要素にobjectが含まれる場合のa */
  a:has(object) {
    height: auto;
    width: 100px;
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
          <object data="https://www.dgdgdgdg.com/images/logo.svg" type="image/svg+xml"></object>
        </a>
      </nav>
    </header>
  );
};

export default Header;
