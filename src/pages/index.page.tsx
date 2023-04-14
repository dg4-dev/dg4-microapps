import { css } from "@emotion/react";

import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { LinkItem, linkItemProps } from "@/components/top/LinkItem";
import { breakPoint, containerWidth } from "@/styles/config";

const Home = () => {
  const linkItems: linkItemProps[] = [
    {
      title: "いい長方形",
      description: "インスタの過去投稿を並べるのに最適な比率の長方形を見つけるやつ",
      date: "2022/12/20",
      href: "/insta-rect/",
      imgSrc: "/images/cover/instaRect.png",
    },
    // {
    //   title: "歴史ジェネレーター",
    //   description:
    //     "フォームを入力すると年表のようなものが作れます。個人的な歴史を書いてもよし、未来の予想を書いてもよし。",
    //   date: "2021/10/22",
    //   href: "/history/",
    //   imgSrc: "/images/cover/history.png",
    // },
    // {
    //   title: "辞書風ジェネレーター",
    //   description: "フォームを入力すると辞書風の文字列になるだけ。",
    //   date: "2021/08/09",
    //   href: "/dictionary/",
    //   imgSrc: "/images/cover/dictionary.png",
    // },
    {
      title: "謎じゃんけん",
      description:
        "ボタンを押すとランダムに指を曲げた手が2つ出てきます。じゃんけんの勝敗は話し合いで決めてもよし、開いた指の本数で決めてもよし、強そうな雰囲気で決めてもよし。その組み合わせは1024通り！！",
      date: "2021/07/12",
      href: "/janken/",
      imgSrc: "/images/cover/janken.png",
    },
    {
      title: "Topic Randomizer",
      description:
        "ボタンを押すとランダムで「わざわざ話すことでもない話題」が出てきます。\n初対面で話しづらい・仲が良すぎてもう話すことがない といった場面におすすめです！",
      date: "2021/07/08",
      href: "/topic/",
      imgSrc: "/images/cover/topic.png",
    },
  ];

  const containerStyle = css`
    max-width: ${containerWidth.large};
    width: calc(100% - 80px);
    min-width: 1024px;

    display: flex;
    flex-wrap: wrap;

    padding-top: 100px;
    padding-bottom: 100px;

    ${breakPoint.tab} {
      min-width: unset;

      padding-top: 60px;
      padding-bottom: 60px;
    }

    ${breakPoint.sp} {
      flex-direction: column;
      padding-top: 30px;
      padding-bottom: 30px;
    }
  `;

  const itemStyle = css`
    width: 25%;
    border: 1px solid #ccc;

    ${breakPoint.tab} {
      width: 50%;
    }

    ${breakPoint.sp} {
      width: 100%;
    }
  `;

  return (
    <Layout title="dg4-apps" description="">
      <Container css={containerStyle}>
        {linkItems.map(({ title, description, date, href, imgSrc }) => (
          <LinkItem
            css={itemStyle}
            key={title}
            title={title}
            description={description}
            date={date}
            href={href}
            imgSrc={imgSrc}
          />
        ))}
      </Container>
    </Layout>
  );
};

export default Home;
