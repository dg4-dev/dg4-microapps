import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";

import { breakPoint } from "@/styles/config";

export type linkItemProps = {
  className?: string;
  title: string;
  description: string;
  date: string;
  href: string;
  imgSrc: string;
};

export const LinkItem = ({ className, title, description, date, href, imgSrc }: linkItemProps) => {
  const cardStyle = css`
    display: flex;
    flex-direction: column;

    gap: 24px;

    padding: 16px;
    background-color: #f4f4f4;

    ${breakPoint.sp} {
      width: 100%;
      padding: 8px;
    }
  `;

  const overViewStyle = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `;

  const btnStyle = css`
    text-decoration: none;
    width: fit-content;
    background-color: #4b91b6;
    color: #fff;
    padding: 8px 16px;
    border-radius: 5px;
  `;

  const dateStyle = css`
    color: #777;
    font-size: 80%;
  `;

  const paraStyle = css`
    line-height: 1.4em;
  `;
  return (
    <div css={cardStyle} className={className}>
      <div className="img">
        <Image src={imgSrc} width={576} height={303} alt="" />
      </div>
      <div css={overViewStyle}>
        <Link href={href}>
          <a css={btnStyle}>{title}</a>
        </Link>
        <p css={[paraStyle, dateStyle]}>{date}</p>
        <p css={paraStyle}>{description}</p>
      </div>
    </div>
  );
};
