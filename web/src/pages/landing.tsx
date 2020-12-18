import {Link} from 'react-router-dom';
import React, { FormEvent, useState} from "react";
import { useHistory } from "react-router-dom";


import '../styles/pages/landing.css';
import api from "../services/api";
import neoApi from "../services/neoApi";



function Landing(){
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");

  const history = useHistory()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log(name);
    
    const teste = await api.get(`/user/${name}`)

    const empty = teste.data;

    if (empty.length > 0){
      console.log(empty[0].id);
      history.push({pathname:"/dashboard", state: empty[0].name });
    }else{
      console.log("Nada");
      alert("Usuário não cadastrado!");
      history.push("/");
    }

  };

  const handleRegister = async(event: FormEvent) =>{
    event.preventDefault();

    const data = {
      "name":name,
      "senha":senha
    }

    const neoData = {"name":name}

    
    console.log(data);

    if (data.name == ""){
      alert("Nome de Usuário Inválido");
    }else if (data.senha == ""){
      alert("Senha Inválida");
    }else{

      const teste = await api.get(`/user/${name}`)

      if (teste.data.length > 0){
        console.log("Already Registered");
        alert("Usuário já cadastrado!");
        history.push("/");

      }else{
        const neoteste = await neoApi.post("/neo4j/create/", neoData);
        const test = await api.post("/user", data);
        alert("Cadastro realizado com Sucesso!");
        console.log(neoteste)
        console.log(test);
      }      
    }
  }

  return(
    <div id="page-landing">
      <div className="content-wrapper">

        <main>

          <h1>AcaGames</h1>
          <h2>Um site para apreciadores de joguinhos yeah</h2>

          <form onSubmit={handleSubmit} className="loginForm">

            <div className="input-block">
                  <label htmlFor="name">Nome de Usuário</label>
                  <input
                    id="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
            </div>

            <div className="input-block">
                  <label htmlFor="senha">Senha</label>
                  <input
                    id="senha"
                    value={senha}
                    required
                    onChange={(e) => setSenha(e.target.value)}
                  />
            </div>

            <div className="btnContainer">
              <button className="confirm-button" type="submit">
                  Entrar
              </button>
              <button className="register-button" onClick={handleRegister}>
                  Registrar
              </button>
            </div>

          </form>
        </main>

      </div>  
    </div>
  );
}

export default Landing;