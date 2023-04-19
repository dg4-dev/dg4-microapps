import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { breakPoint } from "@/styles/config";

const Bingo = () => {
  const [images, setImages] = useState<string[]>([]);
  const [openedItems, setOpenedItems] = useState<boolean[][]>(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => false))
  );

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch("/api/images?p=bingo");
      const imageList = (await response.json()) as string[];

      const shuffledImages = imageList.sort(() => Math.random() - 0.5);

      setImages(shuffledImages);
    }

    fetchImages();
  }, []);

  const checkBingo = (openedItemsToCheck: boolean[][]) => {
    const N = 5;
    let isBingo = false;

    // Check rows
    for (let row = 0; row < N; row++) {
      if (openedItemsToCheck[row].every((item) => item)) {
        isBingo = true;
        break;
      }
    }

    // Check columns
    if (!isBingo) {
      for (let col = 0; col < N; col++) {
        if (openedItemsToCheck.every((row) => row[col])) {
          isBingo = true;
          break;
        }
      }
    }

    // Check diagonal
    if (!isBingo) {
      isBingo =
        openedItemsToCheck.every((row, index) => row[index]) ||
        openedItemsToCheck.every((row, index) => row[N - 1 - index]);
    }

    if (isBingo) {
      alert("Bingo!");
      location.replace("/bingo");
    }
  };

  const containerStyle = css`
    min-height: calc(100vh - 70px);
    padding-top: 100px;
    padding-bottom: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const bingoCardStyle = css`
    width: 800px;
    height: 800px;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 10px;

    ${breakPoint.sp} {
      height: 500px;
    }
  `;

  const bingoItemStyle = css`
    position: relative;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  `;

  const bingoItemTextWrapperStyle = css`
    width: 100%;

    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;

    border-radius: 0 0 5px 5px;

    line-height: 24px;
    text-align: center;
    font-size: 16px;

    ${breakPoint.sp} {
      line-height: 20px;
      font-size: 10px;
      font-weight: bold;
    }
  `;

  const BingoItem = ({ row, col, fileName }: { row: number; col: number; fileName: string }) => {
    const imageUrl = `/images/bingo/${fileName}`;
    const updatedOpenedItems = [...openedItems];
    updatedOpenedItems[2][2] = true;

    const openStyle = (open: boolean) => {
      if (open) {
        return css`
          opacity: 0.2;
        `;
      }
    };

    return (
      <div
        css={[
          bingoItemStyle,
          css`
            background-image: url(${imageUrl});
          `,
          openStyle(updatedOpenedItems[row][col]),
        ]}
        onClick={() => {
          updatedOpenedItems[row][col] = true;
          setOpenedItems(updatedOpenedItems);
          checkBingo(updatedOpenedItems);
        }}
      >
        <div css={bingoItemTextWrapperStyle}>{fileName.split("_")[0]}</div>
      </div>
    );
  };

  return (
    <Layout title="まちあるきビンゴ" description="街に出て、ビンゴをしよう">
      <Container css={containerStyle}>
        <div css={bingoCardStyle}>
          {images.slice(0, 25).map((photo, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            if (index === 12) {
              return <BingoItem key={index} row={row} col={col} fileName="free_blank.png" />;
            }
            return <BingoItem key={index} row={row} col={col} fileName={photo} />;
          })}
        </div>
      </Container>
    </Layout>
  );
};

export default Bingo;
