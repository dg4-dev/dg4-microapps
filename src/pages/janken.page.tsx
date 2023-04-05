import { css } from "@emotion/react";
import { useRef } from "react";
import React from "react";

import Container from "@/components/Container";
import Layout from "@/components/Layout";
import ImageSwitcher from "@/components/janken/ImageSwitcher";
import { breakPoint } from "@/styles/config";

const Home = () => {
  const containerStyle = css`
    height: calc(100vh - 70px);
    min-height: 700px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0 12px;

    ${breakPoint.sp} {
      min-height: 500px;
    }
  `;

  const buttonStyle = css`
    font-size: 16px;
    line-height: 1.4em;
    display: block;
    width: fit-content;
    height: fit-content;

    background-color: #388f87;
    color: #fff;
    padding: 5px 20px;
    border-radius: 5px;

    cursor: pointer;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
  `;

  const outputStyle = css`
    width: 100%;
    height: fit-content;
    display: flex;
    gap: 24px;
  `;

  const handStyle = css`
    position: relative;
    width: calc(50% - 12px);
    height: 500px;

    ${breakPoint.sp} {
      height: 200px;
    }
  `;

  const reflectHand = css`
    transform: scaleX(-1);
  `;

  const fingerStyle = css`
    height: fit-content;
    position: absolute;
    top: 0;
    left: 0;
  `;

  const leftImageRefs = useRef<(React.RefObject<{ handleButtonClick: () => void }> | null)[]>([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const rightImageRefs = useRef<(React.RefObject<{ handleButtonClick: () => void }> | null)[]>([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const onButtonClick = () => {
    leftImageRefs.current.forEach((imgRef) => {
      if (imgRef && imgRef.current) {
        imgRef.current.handleButtonClick();
      }
    });
    rightImageRefs.current.forEach((imgRef) => {
      if (imgRef && imgRef.current) {
        imgRef.current.handleButtonClick();
      }
    });
  };

  return (
    <Layout title="謎じゃんけん" description="">
      <Container css={containerStyle}>
        <button id="jankenButton" css={buttonStyle} onClick={onButtonClick}>
          じゃんけん！
        </button>
        <div css={outputStyle}>
          <div css={handStyle}>
            <div css={fingerStyle}>
              <img src="/images/janken/hand-base.webp" alt="" />
            </div>
            {leftImageRefs.current.map((imgRef, index) => (
              <ImageSwitcher key={index + 1} fingerNumber={index} ref={imgRef} />
            ))}
          </div>
          <div css={[handStyle, reflectHand]}>
            <div css={fingerStyle}>
              <img src="/images/janken/hand-base.webp" alt="" />
            </div>
            {rightImageRefs.current.map((imgRef, index) => (
              <ImageSwitcher key={index + 1} fingerNumber={index} ref={imgRef} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
