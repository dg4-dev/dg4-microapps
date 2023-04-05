import { css } from "@emotion/react";
import { useState } from "react";

import Container from "@/components/Container";
import Layout from "@/components/Layout";

const Dictionary = () => {
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(<></>);

  const doCalculation = (n: number) => {
    const findMultiPairs = (target: number) => {
      const pairs: number[][] = [];

      for (let i = 1; i <= target; i++) {
        for (let j = 1; j <= target; j++) {
          if (i * j === target && i <= j) {
            pairs.push([i, j]);
          }
        }
      }

      return pairs;
    };

    const arrayToPercentage = (array: number[][]) => {
      const base = 80;
      const percentageResult = array.map((innerArr) => innerArr.map((num) => (num / innerArr[1]) * base));

      return percentageResult.map((pair) => {
        const color = `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(Math.random() * 255)});`;

        return css`
          height: ${pair[0]}vh;
          width: ${pair[1]}vh;
          border: 2px solid;
          color: ${color};
        `;
      });
    };

    const findMultiPairsPercentage = (num: number) => {
      return arrayToPercentage(findMultiPairs(num));
    };

    return (
      <>
        {findMultiPairsPercentage(n).map((style, i) => {
          return (
            <div css={style} key={i}>
              {findMultiPairs(n)[i].join(":")}
            </div>
          );
        })}
      </>
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
    setResult(doCalculation(newValue));
  };

  const containerStyle = css`
    width: 100%;
    height: calc(100vh - 70px);

    display: flex;
    justify-content: center;

    margin-top: 40px;

    * {
      font-size: 16px;
    }
  `;

  const inputStyle = css`
    background-color: #eee;
    padding: calc(8px - 4px) 16px;
    box-shadow: inset 2px 2px 8px -4px rgba(0, 0, 0, 0.3);
    border: 0px;
    border-radius: 4px;
  `;

  const outputStyle = css`
    display: flex;
    position: absolute;

    justify-content: center;
    align-items: center;

    z-index: -10;

    height: 100vh;
    width: 100%;
    top: 0;
    div {
      position: absolute;
    }
  `;

  return (
    <Layout title="いい長方形" description="インスタの過去投稿を並べるのに最適な比率の長方形を見つけるやつ">
      <Container css={containerStyle}>
        <div className="formChunk">
          <input css={inputStyle} type="number" min="1" onChange={handleChange} />
        </div>

        <div css={outputStyle}>{result}</div>
      </Container>
    </Layout>
  );
};

export default Dictionary;
