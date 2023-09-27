import React, { useState } from "react";
import axios from "axios";
import "./index.css"; 
// import backgroundImage from "assets/back.jpg";

function App() {
  const [summonerName, setSummonerName] = useState("");
  const [data, setData] = useState<any>(null);
  const [wins, setWins] = useState(0)
  const [loss, setLoss] = useState(0)
  // const [matchHistory, setMatchHistory] = useState<any[]>([]);

  const onClick = async () => {
    const response = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}?api_key=RGAPI-c8038f3c-dc29-40e2-b435-5ff36c50e178`
    );
    setData(response.data);
    
    await axios.get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.data.id}?api_key=RGAPI-c8038f3c-dc29-40e2-b435-5ff36c50e178`
    ).then((resp) => {
      setWins(resp.data[1].wins),setLoss(resp.data[1].losses)
    })
  };
  
  return (
      <div style={{backgroundImage: `url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.leagueoflegends.com%2Fko-kr%2Fnews%2Friot-games%2Fanniversary-mural-gifts%2F&psig=AOvVaw1hRMC9Ux8JGW_mE0VfHp3K&ust=1695876584903000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKDwnd3-yYEDFQAAAAAdAAAAABAE)`}}>
        <div id="box">
          <div id="checker">
            <div id="item1">
              <input
                type="text"
                id="search"
                value={summonerName}
                onChange={(e) => setSummonerName(e.target.value)}
                />
            </div>
            <div id="item2">
              <p>닉네임: {data?.name}</p>
            </div>
            <div id="item3">
              <p>승리수 : {wins}</p>
            </div>
            <div id="item4">
              <p>패배수 : {loss}</p>
            </div>
          </div>
          <div id="record">
            {/* {matchHistory.length > 0 ? (
              matchHistory.map((match: any) => (
                <p key={match.gameId}>게임 ID: {match.gameId}</p>
              ))
            ) : null}
            {!data?.status && matchHistory.length === 0 && ( */}
              <p>전적이 없습니다.</p>
            {/* )} */}
          </div>
          <div id ="buttonframe">
            <div id="check">
              <button onClick={onClick} id="customButton">확인</button>
            </div>
            </div>
          </div>
    </div>
  );
}

export default App;
