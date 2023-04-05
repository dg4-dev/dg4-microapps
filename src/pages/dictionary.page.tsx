import { css } from "@emotion/react";
import { useState } from "react";

import Container from "@/components/Container";
import Layout from "@/components/Layout";

const Dictionary = () => {
  const [read, setRead] = useState("");
  const changeRead = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRead(e.target.value);
  };

  const [write, setWrite] = useState("");
  const changeWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWrite(`【${e.target.value}】`);
  };

  const [mean, setMean] = useState("");
  const changeMean = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMean(e.target.value);
  };

  const containerStyle = css`
    min-height: calc(100vh - 70px);
    padding-top: 100px;
    padding-bottom: 120px;

    font-size: 20px;

    textarea {
      height: 10em;
      resize: none;
      margin-top: 8px;
    }

    input:not(:first-of-type) {
      margin-top: 8px;
    }

    input,
    textarea {
      font-size: 20px;
      display: block;
      width: 100%;

      padding: 8px;

      border: none;
      border-left: 4px solid #333;
      border-bottom: 1px solid #333;
    }
  `;

  const outputStyle = css`
    line-height: 1.5em;
    margin-top: 16px;
  `;

  const boldStyle = css`
    font-weight: bold;
  `;

  return (
    <Layout title="辞書風ジェネレーター" description="フォームを入力すると辞書風の文字列になるだけ。">
      <Container css={containerStyle}>
        <input type="text" placeholder="読み" onChange={changeRead} />
        <input type="text" placeholder="書き" onChange={changeWrite} />
        <textarea placeholder="意味" id="mean" onChange={changeMean}></textarea>
        <p css={outputStyle}>
          <span css={boldStyle}>{read}</span>
          {write}
          {mean}
        </p>
      </Container>
    </Layout>
  );
};

export default Dictionary;
