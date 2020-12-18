import { useHistory } from "react-router-dom";
import {useState, useEffect} from 'react';
import mongoApi from "../services/mongoApi";
import neoApi from "../services/neoApi";


import "../styles/pages/listar.css";

export default function Listar(){

  const history = useHistory();
  const username = history.location.state;

  console.log(username);

  const [games, setGames] = useState([]);
  
  async function populate() {
    const dados = await neoApi.get(`/neo4j/${username}/games`).then(res =>{
      setGames(res.data.games)
    });
  }

  useEffect(() =>{
    populate();
  },[]);

  console.log(games);
  
  async function handleDelete(game:String) {
    console.log(game);
    const delData = {
      data:{
        "name":username,
        "game":game
      }
    };

    const res = await neoApi.delete("/neo4j", delData)
    alert("Descurtido com sucesso!");
    history.push({pathname:"/dashboard", state:username});
  }
  

  return(
    <div id="likelist">
        <h1>Games Curtidos</h1>
      <div className="like-menu">
      
        <table className="lista">
          <tr><th>Games</th><th>Ações</th></tr>
          {games.map((game) => 
                <tr>
                  <td>{game}</td>
                  <td>
                    <button className="delBtn"
                      onClick={(event) => handleDelete(game)}>
                      Descurtir
                    </button>
                    </td>
                  </tr>
                )}
        </table>
      </div>
    </div>
  )
}