import { useHistory } from "react-router-dom";
import neoApi from "../services/neoApi";
import "../styles/pages/recomendations.css";
import {useEffect, useState} from 'react';


export default function Recomendations(){
  const history = useHistory();

  const [games, setGames] = useState([]);
  const username = history.location.state;

  async function search(){
    const recomendation = await neoApi.get(`/neo4j/${username}`);
    const teste = recomendation.data.games;

    if (teste[0] != null){
      console.log("tem", teste);
      setGames(teste);
    }else{
      console.log("nao tem", teste);
      const planob = await neoApi.get("/neo4j/recomendados");
      setGames(planob.data.games);
    }    
  }

  useEffect(() =>{
    search()
  }, [])

  console.log(username);

  return(
    <div id="recomendation">
        <h1>Recomendações</h1>
      <div className="rec-menu">

        <ul>{games.map((game) => <li>{game}</li>)}</ul>

      </div>

    </div>
  )
}