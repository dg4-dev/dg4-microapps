import { css } from "@emotion/react";
import { useState } from "react";

import Layout from "@/components/Layout";
import { data } from "@/data/gumData";
import { breakPoint } from "@/styles/config";

const Topic = () => {
  const randomData = data[Math.floor(Math.random() * data.length)];
  const randomTopic = randomData[Math.floor(Math.random() * randomData.length)];

  const [content, setContent] = useState(<></>);

  const handleClick = () => {
    const itemStyle = css`
      width: calc(50% - 4px);

      line-height: 24px;

      display: flex;
      gap: 8px;

      padding-bottom: 4px;
      border-bottom: 1px solid #333;

      .number {
        min-width: 24px;
        height: 24px;
        text-align: center;
        background-color: #333;
        border-radius: 12px;

        color: #f3e9be;
      }
    `;

    setContent(
      <>
        {randomData.map((e, i) => {
          const isAccent = e === randomTopic;

          const accentStyle = isAccent
            ? css`
                .number {
                  background-color: #ef4456;
                }
                .theme {
                  font-weight: bold;
                  color: #ef4456;
                }
              `
            : css``;

          return (
            <div key={i} className={`${isAccent ? "accent" : ""}`} css={[itemStyle, accentStyle]}>
              <p className="number">{i + 1}</p>
              <p className="theme">{e}話</p>
            </div>
          );
        })}
      </>
    );
  };

  const appStyle = css`
    width: 100vw;
    height: calc(100vh - 70px);

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 12px;
  `;

  const wrapperStyle = css`
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 250px;
    background-color: #f3e9be;

    display: flex;

    padding: 16px;
    border-radius: 20px;
    box-shadow: 2px 6px 39px 0px #3b31002d;

    ${breakPoint.sp} {
      height: 300px;
    }
  `;

  const recordStyle = css`
    position: absolute;
    bottom: 266px;

    opacity: 0.7;

    line-height: 1.4em;
    padding-right: 14px;

    ${breakPoint.sp} {
      bottom: 316px;
    }
  `;

  const outputStyle = css`
    position: relative;
    width: 100%;
    padding: 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    ::before,
    ::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
      border: 2px solid #333;
    }

    ::before {
      top: -2px;
      left: -2px;
    }

    ::after {
      bottom: -2px;
      right: -2px;
    }
  `;

  const cardStyle = css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px 8px;
  `;

  const buttonStyle = css`
    display: block;
    position: absolute;

    width: fit-content;
    height: fit-content;

    left: 0;
    right: 0;
    bottom: 22px;

    font-size: 20px;
    line-height: 1.4em;

    background-color: #388f87;
    color: #fff;
    padding: 5px 20px;
    border: none;
    border-radius: 5px;
    margin: 0 auto;

    cursor: pointer;

    :hover {
      opacity: 0.9;
    }
  `;

  return (
    <Layout
      title="Topic Randomizer"
      description={`ボタンを押すとランダムで「わざわざ話すことでもない話題」が出てきます。\n初対面で話しづらい・仲が良すぎてもう話すことがない といった場面におすすめです！`}
    >
      <div css={appStyle}>
        <div css={wrapperStyle}>
          <div css={recordStyle}>現在{data.length * 6}個の話題が登録されています</div>
          <div css={outputStyle}>
            <div css={cardStyle}>{content && content}</div>
          </div>
          <button css={buttonStyle} onClick={handleClick}>
            Let’s Talk!
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Topic;
