import React, { useState } from "react";
import axios from "axios";
import "./index.css"; 
import backgroundImage from '../src/assets/back.jpeg';
import user from '../src/assets/user-solid.svg';
import medal from '../src/assets/medal-solid.svg';
import win from '../src/assets/win.svg';;
import lose from '../src/assets/lose.svg';


function App() {
  const [summonerName, setSummonerName] = useState("");
  const [data, setData] = useState<any>(null);
  const [wins, setWins] = useState(0)
  const [loss, setLoss] = useState(0)
  const [percent, setPercent] = useState(0)
  
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

      setPercent(resp.data[1].wins / (resp.data[1].wins + resp.data[1].losses) * 100)
      console.log(resp.data[1].wins / (resp.data[1].wins + resp.data[1].losses) * 100)
    })
  };
  
  return (
      <div style={{backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      }}>
        <img src="../src/assets/LOL.webp" id="lolLogo"/>
        <div id="box">
          <div id="checker">
            <div id="item2">
              <img className = "icon" src={user}/>
              <p>{data?.name}</p>
            </div>
            <div id="item3">
              <img className = "icon" src={win}/>
              <p>{wins}</p>
            </div>
            <div id="item4">
            <img className = "icon" src={lose}/>
              <p>{loss}</p>
            </div>
            <div id="item5">
              <img className = "icon" src={medal}/>
              <p>{percent.toFixed(2)}</p>
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
          <div id="item1">
              <input
                type="text"
                id="search"
                value={summonerName}
                onChange={(e) => setSummonerName(e.target.value)}
                />
            </div>
            <div id="check">
              <button onClick={onClick} id="customButton">확인</button>
            </div>
            </div>
          </div>
         </div>
  );
}

export default App;
