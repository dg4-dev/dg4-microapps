import { css } from "@emotion/react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useReducer } from "react";

import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { data } from "@/data/stations"; // データをインポート

type Station = {
  name: string;
  city: string;
  routeInfo: string[];
};

type State = {
  station: Station | null;
  duration: number | null;
  amount: number | null;
  excludedCities: string[];
  limitedCities: string[];
  excludedStations: string[];
};

const initialState: State = {
  station: null,
  duration: null,
  amount: null,
  excludedCities: [],
  limitedCities: [],
  excludedStations: [],
};

// ランダムな要素を取得するヘルパーファンクション
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function reducer(state: State, action: { type: string; payload?: any }): State {
  switch (action.type) {
    case "setStation":
      return { ...state, station: action.payload };
    case "setDuration":
      return { ...state, duration: action.payload };
    case "setAmount":
      return { ...state, amount: action.payload };
    case "setExcludedCities":
      return { ...state, excludedCities: action.payload, limitedCities: [] };
    case "setLimitedCities":
      return { ...state, limitedCities: action.payload, excludedCities: [] };
    case "setExcludedStations":
      return { ...state, excludedStations: action.payload };
    default:
      return state;
  }
}

export default function RandomTripPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Create lists of cities and stations for the autocomplete inputs
  const cities = Array.from(new Set(data.map((item) => item.city)));
  const stations = Array.from(new Set(data.map((item) => item.name)));

  // Automatically exclude stations in excluded cities
  useEffect(() => {
    if (state.excludedCities.length > 0) {
      const excludedStationsInCities = data
        .filter((stationData) => state.excludedCities.includes(stationData.city))
        .map((stationData) => stationData.name);
      dispatch({ type: "setExcludedStations", payload: excludedStationsInCities });
    }
  }, [state.excludedCities]);

  // Limit the available stations to the ones in the selected cities
  useEffect(() => {
    if (state.limitedCities.length > 0) {
      const limitedStationsInCities = data
        .filter((stationData) => state.limitedCities.includes(stationData.city))
        .map((stationData) => stationData.name);
      const excludedStations = stations.filter((stationName) => !limitedStationsInCities.includes(stationName));
      dispatch({ type: "setExcludedStations", payload: excludedStations });
    }
  }, [state.limitedCities, stations]);

  const handleClick = () => {
    const availableData = data.filter((d) => !state.excludedStations.includes(d.name));
    const randomStation = getRandomElement<Station>(availableData);
    const randomDuration = Math.floor(Math.random() * 8) / 2 + 1;
    const randomAmount = (Math.floor(Math.random() * 4) + 1) * 1000;
    dispatch({ type: "setStation", payload: randomStation });
    dispatch({ type: "setDuration", payload: randomDuration });
    dispatch({ type: "setAmount", payload: randomAmount });
  };

  let cashEmoji = "";

  if (state.amount) {
    for (let i = 0; i < state.amount / 1000; i++) {
      cashEmoji += " 💴";
    }
  }

  const sectionStyle = css`
    margin: 32px 0;
  `;

  const inputSectionStyle = css``;

  const resultSectionStyle = css`
    background-color: #f3e9be;
    padding: 16px;
    border-radius: 20px;
    box-shadow: 2px 6px 39px 0px #3b31002d;

    h2 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    p {
      line-height: 1.6em;
      margin-bottom: 8px;
    }
  `;

  const citiesGroupStyle = css`
    width: 100%;
    display: flex;
    gap: 20px;
  `;

  const citiesStyle = css`
    width: 100%;
  `;

  const stationsStyle = css`
    max-height: 200px;
    overflow-y: scroll;
  `;

  const stationWrapperStyle = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;

    margin-bottom: 8px;

    p {
      margin-bottom: 0;
    }
  `;

  const buttonStyle = css`
    line-height: 1em;
    display: block;

    background-color: #388f87;
    color: #fff;
    padding: 8px 16px;
    border-radius: 5px;
    margin-top: 16px;

    cursor: pointer;
  `;

  const directionButtonStyle = css`
    display: inline-block;

    background-color: #fff;
    color: #388f87;
    padding: 6px 14px;
    border: 2px solid #388f87;
    margin-top: 0;
  `;

  return (
    <Layout
      title="行先未定(宮城県)"
      description="ボタン一つでランダムに駅、滞在時間、使用可能金額が提案されます。日常の中に新鮮な驚きを。未知の世界を探しましょう。"
    >
      <Container>
        <section css={[sectionStyle, inputSectionStyle]}>
          <div css={citiesGroupStyle}>
            <Autocomplete
              multiple
              options={cities}
              value={state.excludedCities}
              onChange={(_, value) => dispatch({ type: "setExcludedCities", payload: value })}
              renderInput={(params) => <TextField {...params} label="含めない市と町" />}
              css={citiesStyle}
            />

            <Autocomplete
              multiple
              options={cities}
              value={state.limitedCities}
              onChange={(_, value) => dispatch({ type: "setLimitedCities", payload: value })}
              renderInput={(params) => <TextField {...params} label="限定する市と町" />}
              css={citiesStyle}
            />
          </div>

          <Autocomplete
            multiple
            options={stations}
            value={state.excludedStations}
            onChange={(_, value) => dispatch({ type: "setExcludedStations", payload: value })}
            renderInput={(params) => <TextField {...params} label="含めない駅" />}
            css={stationsStyle}
          />
          <button onClick={handleClick} css={buttonStyle}>
            行き先を決める
          </button>
        </section>

        <section css={[sectionStyle, resultSectionStyle]}>
          <h2>降車駅</h2>
          {state.station && (
            <>
              <div css={stationWrapperStyle}>
                <p>
                  {state.station.name} ({state.station.city})
                </p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&origin=My%20Location&destination=${state.station.name}%20(${state.station.city})&travelmode=transit`}
                  css={[buttonStyle, directionButtonStyle]}
                >
                  🚃 経路を見る
                </a>
              </div>
              <p>路線: {state.station.routeInfo.join(", ")}</p>
            </>
          )}
        </section>
        <section css={[sectionStyle, resultSectionStyle]}>
          <h2>滞在時間</h2>
          {state.duration && <p>{state.duration} 時間以上</p>}
        </section>
        <section css={[sectionStyle, resultSectionStyle]}>
          <h2>使用可能金額</h2>
          {state.amount && (
            <p>
              {state.amount}円 {cashEmoji}
            </p>
          )}
        </section>
      </Container>
    </Layout>
  );
}
