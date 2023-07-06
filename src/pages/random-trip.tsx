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
    const randomDuration = Math.floor(Math.random() * 4) + 1;
    const randomAmount = (Math.floor(Math.random() * 4) + 1) * 1000;
    dispatch({ type: "setStation", payload: randomStation });
    dispatch({ type: "setDuration", payload: randomDuration });
    dispatch({ type: "setAmount", payload: randomAmount });
  };

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

  return (
    <Layout
      title="行先未定"
      description="ボタン一つでランダムに駅、滞在時間、使用可能金額が提案されます。日常の中に新鮮な驚きを。一緒に未知の世界を探しましょう。"
    >
      <Container>
        <Autocomplete
          multiple
          options={cities}
          value={state.excludedCities}
          onChange={(_, value) => dispatch({ type: "setExcludedCities", payload: value })}
          renderInput={(params) => <TextField {...params} label="含めない市と町" />}
        />

        <Autocomplete
          multiple
          options={cities}
          value={state.limitedCities}
          onChange={(_, value) => dispatch({ type: "setLimitedCities", payload: value })}
          renderInput={(params) => <TextField {...params} label="限定する市と町" />}
        />

        <Autocomplete
          multiple
          options={stations}
          value={state.excludedStations}
          onChange={(_, value) => dispatch({ type: "setExcludedStations", payload: value })}
          renderInput={(params) => <TextField {...params} label="含めない駅" />}
        />
        <button onClick={handleClick} css={buttonStyle}>
          旅行を生成
        </button>

        <section>
          <h2>降車駅</h2>
          {state.station && (
            <>
              <p>
                {state.station.name} ({state.station.city})
              </p>
              <p>路線: {state.station.routeInfo.join(", ")}</p>
            </>
          )}
        </section>
        <section>
          <h2>滞在時間</h2>
          <p>{state.duration} 時間</p>
        </section>
        <section>
          <h2>使用可能金額</h2>
          <p>{state.amount} 円</p>
        </section>
      </Container>
    </Layout>
  );
}
