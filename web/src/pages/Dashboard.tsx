import { render } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import "../styles/pages/dashboard.css";

import neoApi from "../services/neoApi";



export default function Dashboard(){
  const history = useHistory();

  const teste = history.location;
  const username = teste.state;
  console.log(username);

  function goToLike(){
    history.push({pathname:"/like", state:username})
  }

  function goToRecomendation(){
    history.push({pathname:"/recomendations", state:username})
  }

  function goToList(){
    history.push({pathname:"/gamelist", state:username})
  }

  return(
    <div id="dashboard">
      <div className="dashboard-menu">

        <main>

          <div>
            <button 
              className="registerBtn" 
              onClick={goToLike}>
              <span className="like">Curtir Jogo</span>
            </button>
          </div>

          <div>
            <button 
              className="recomendationBtn" 
              onClick={goToRecomendation}>
              <span className="recommend">Recomende Jogos</span>
            </button>
          </div>

          <div>
            <button 
              className="gamesBtn" 
              onClick={goToList}>
              <span className="games">Jogos Curtidos</span>
            </button>
          </div>
          
        </main>

      </div>
    </div>
  )
}