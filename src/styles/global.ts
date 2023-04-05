import { css } from "@emotion/react";

import { dg4Color, headerHeight } from "@/styles/config";

const global = css`
  // font
  @font-face {
    font-family: "Noto Sans JP";
    font-weight: normal;
    src: url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap");
  }

  @font-face {
    font-family: "Noto Sans JP";
    font-weight: bold;
    src: url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap");
  }

  body {
    font-family: "Noto Sans JP", sans-serif;
    line-height: 1;
    color: ${dg4Color.black};
  }

  object {
    pointer-events: none;
  }

  main {
    min-height: calc(100vh - ${headerHeight});
  }

  * {
    font-weight: normal;

    user-select: none;

    -ms-overflow-style: none;
  }

  // image
  img {
    width: 100%;
    height: auto;

    pointer-events: none;
  }
`;

export default global;
