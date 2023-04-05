import { css } from "@emotion/react";
import dayjs from "dayjs";

const footerStyle = css`
  padding: 16px 0;
  text-align: center;
  font-size: 12px;
`;

const Footer = () => {
  return <footer css={footerStyle}>&copy; 2021 - {dayjs().format("YYYY")} dgdgdgdg</footer>;
};

export default Footer;
