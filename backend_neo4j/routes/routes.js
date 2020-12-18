const express = require('express');
const router = express.Router();

//Configuração neo4j -- https://adamcowley.co.uk/javascript/using-the-neo4j-driver-with-nodejs/
const neo4j = require('neo4j-driver');
const driver = new neo4j.driver("neo4j://localhost:7687", neo4j.auth.basic("neo4j", "luigi1998")); //("usuario", "senha")


//games + assistidos, usuario novo sem curtidas
router.get('/neo4j/recomendados', async function(req, res, next){

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    })


    const node_res = await session.run(
        `MATCH (:Person)-[l:LIKED]->(m:Game)
        WITH m, count(l) as quant_likes
        RETURN m.title, quant_likes
        ORDER BY quant_likes DESC
        LIMIT 3`
    , {});
    session.close();
    
    console.log({games: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

    res.send({games: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

}); 

 //games + assistidos, usuario ja existente e ja curtiu um game
router.get('/neo4j/:name', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    })

    console.log(req.params.name);

    const node_res = await session.run(
        `MATCH
        (p:Person)-[:LIKED]->(m:Game)<-[:LIKED]-(p2:Person)-[:LIKED]->(m2:Game)
        WHERE p.name = "${req.params.name}"
        WITH m2
        WHERE NOT (p)-[:LIKED]->(m2)
        RETURN m2.title, COUNT(m2) as m2_t
        ORDER BY m2_t DESC LIMIT 3`
    , {});
    session.close();
    
    console.log({games: node_res["records"].map((name)=>{
        
        return name["_fields"][0]
    })});

    res.send({games: node_res["records"].map((name)=>{

        return name["_fields"][0]
    })});

});

//CRIAR NODO PESSOA
router.post('/neo4j/create/', async function(req, res, next){

    let {name} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `CREATE (n:Person {name:"${name}"}) return n`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({games: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

//CRIAR NODO GAME
router.post('/neo4j/create_game/', async function(req, res, next){

    let {game} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `CREATE (m:Game {title:"${game}"}) return m`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({games: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

// CRIAR RELACAO PESSOA -- GOSTA -- GAME
router.post('/neo4j/', async function(req, res, next){

    let {name, game} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });

    const node_res = await session.run(
        `MATCH (a: Person), (b:Game)
        WHERE a.name = '${name}' AND b.title = '${game}'
        CREATE (a)-[r:LIKED]->(b)
        RETURN a.name, b.title`, {});
    session.close();

    console.log("RESULT", node_res);

    res.send({games: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
   
});

//DELETA RELACAO PESSOA -- GOSTA -- game
router.delete('/neo4j', async function(req, res, next){

    let {name, game} = req.body;

    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database `myclient`
    });
    const node_res = await session.run(
        `MATCH (a: Person)-[r:LIKED]->(b:Game)
        WHERE a.name = '${name}' AND b.title = '${game}'
        DELETE r
        RETURN a.name, b.title`, {});
    session.close();
    
    res.send({games: node_res["records"].map((name)=>{
        return name["_fields"]
    })});
});

//checa se o nodo com o game ja existe
router.get('/neo4j/:name/verifica', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database myclient
    })

    const node_res = await session.run(
        `MATCH (m:Game {title: "${req.params.name}"}) RETURN m.title`
    , {});
    session.close();

    // console.log("RESULT", node_res);
    res.send({game: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

});

//devolve os games que a pessoa curtiu
router.get('/neo4j/:name/games', async function(req, res, next){
    const session = driver.session({
        database: 'neo4j', // <-- Connect to the database myclient
    })

    const node_res = await session.run(
        `MATCH (p:Person {name: "${req.params.name}"})-[:ACTED_IN]->(m:Game) RETURN m.title` 
    , {});
    session.close();

    // console.log("RESULT", node_res);
    res.send({games: node_res["records"].map((name)=>{
        return name["_fields"][0]
    })});

});
module.exports = router;