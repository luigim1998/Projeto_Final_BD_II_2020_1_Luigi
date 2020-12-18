import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";

import "../styles/pages/like.css";

import Sidebar from "../components/Sidebar";
import neoApi from "../services/neoApi";
import mongoApi from "../services/mongoApi";


export default function Like() {
  const history = useHistory();

  const username = history.location.state;

  console.log(username);

  const [game, setGame] = useState("");
  const [year, setYear] = useState("");
  const [studio, setStudio] = useState("");
  const [type, setType] = useState("");


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {"game":game};
    const relatData = {"name":username, "game":game};

    const validate = await neoApi.get(`/neo4j/${game}/verifica`);
    const verdade = validate.data.games;

    const mongoData = {
      "game":game,
      "year":year,
      "studio":studio,
      "type":type
    };

    console.log(verdade);

    if (verdade[0] != null){

      const relat = await neoApi.post("/neo4j/",relatData);
      console.log("teste",relat);

    }else{
      const mongoteste = await mongoApi.post("/mongo/create", mongoData);
      const teste = await neoApi.post("/neo4j/create_game/", data);
      const relat = await neoApi.post("/neo4j/",relatData);

      console.log("teste2", teste, relat);
      console.log(mongoteste);
    }

    alert("Cadastro realizado com sucesso!");

    history.push({pathname: "/dashboard", state:username});
  };

  return (
    <div id="page-like-game">
      
      <main>
        <h1>Diga o jogo</h1>
        <form onSubmit={handleSubmit} className="like-game-form">

          <fieldset>
            <div className="input-block">
              <label htmlFor="game">Nome do Game</label>
              <input
                id="game"
                value={game}
                required
                onChange={(e) => setGame(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="studio">Studio do Jogo</label>
              <input
                id="studio"
                value={studio}
                required
                onChange={(e) => setStudio(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="year">Ano do Game</label>
              <input
                id="year"
                value={year}
                required
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="type">Tipo de Game</label>
              <input
                id="type"
                value={type}
                required
                onChange={(e) => setType(e.target.value)}
              />
            </div>

          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>

        </form>
      </main>
    </div>
  );
}
