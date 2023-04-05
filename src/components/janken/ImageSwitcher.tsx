// components/ImageSwitcher.tsx

import { css } from "@emotion/react";
import { useState, useImperativeHandle, forwardRef } from "react";

type ImageSwitcherProps = {
  fingerNumber: number;
};

const ImageSwitcher = forwardRef(({ fingerNumber }: ImageSwitcherProps, ref) => {
  const [fingerDigitus, setFingerDigitus] = useState("close");

  const handleButtonClick = () => {
    const random = Math.floor(Math.random() * 2);
    setFingerDigitus(random === 0 ? "open" : "close");
  };

  useImperativeHandle(ref, () => ({
    handleButtonClick,
  }));

  const imageUrl = `/images/janken/finger${fingerNumber}-${fingerDigitus}.webp`;

  const fingerStyle = css`
    height: fit-content;
    position: absolute;
    top: 0;
    left: 0;
  `;

  return (
    <div css={fingerStyle}>
      <img src={imageUrl} alt={`finger${fingerNumber}`} />
    </div>
  );
});

ImageSwitcher.displayName = "ImageSwitcher";

export default ImageSwitcher;
