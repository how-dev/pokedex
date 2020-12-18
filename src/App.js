import './App.css';
import pokedex from "./assets/pokedex.png"
import { useEffect, useState } from "react";
import female from "./assets/Female.png"
import male from "./assets/Male.png"
import bloqued from "./assets/bloqued.png"

const App = () => {
  const[pokemons, addPokemon] = useState();
  const[page, nextPage] = useState(1);
  const[pokemon, newPokemon] = useState();
  const[id, setId] = useState('');
  const[type, setType] = useState();
  const[position, setPosition] = useState(true);
  const[genre, changeGenre] = useState();
  const[noneGenre, setNoneGenre] = useState(true);
  const[isShiny, setShiny] = useState(false);
  const[art, setArt] = useState(false);


  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${page}`)
    .then(res => res.json())
    .then(pokemon => {
      addPokemon(pokemon)
      setId(+pokemon.id)
      setType(pokemon.types[0].type.name)
      if (pokemon.sprites.front_female === null) {
        setNoneGenre(false)
      } else {
        setNoneGenre(true)
      }
    })
  }, [page])

  useEffect(() => {
    if (pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.json())
      .then(pokemon => {
        addPokemon(pokemon)
        setId(pokemon.id)
        nextPage(+pokemon.id)
        setType(pokemon.types[0].type.name)
        if (pokemon.sprites.front_female === null) {
          setNoneGenre(false)
        } else {
          setNoneGenre(true)
        }
      })
    }
  }, [pokemon])

  const Next = () => {
    if (page === 893) {
      nextPage(page + 9108)
    } else {
      nextPage(page + 1)
    }
    changeGenre(false)
  }
  const Before = () => {
    if (page === 1001) {
      nextPage(page - 9108)
    }
    if (page > 1) {
      nextPage(page - 1)
    }
    changeGenre(false)
  }
  const srcPokemon = (data) => {
    changeGenre(false)
    setPosition(true)
    newPokemon(data.target.value.toLowerCase())
  }
  const turn = () => {
    if (pokemons.sprites.back_default === null) {
      setPosition(true)
    }else {
      setPosition(!position)
    }
  }

  const turnGenre = () => {
    if (pokemons.sprites.front_female && pokemons.sprites.back_female) {
      changeGenre(!genre)
    }
  }

  const turnShiny = () => {
    if (pokemons.sprites.front_shiny === null) {
      setShiny(false)
    } else {
      setShiny(!isShiny)
    }
  }

  const turnArt = () => {
    if (pokemons.sprites.other["official-artwork"] === null) {
      setArt(false)
    } else {
      setArt(!art)
    }
  }
  if (pokemons) {
    return (
      <div className="App">
        <header className="App-header">
          <div className="pokemonId">{id && <span>{id}</span>}</div>
          <div className="luz"></div>
          {genre && noneGenre ? <img alt="carregando..." src={female} className="sex"/> : console.log()}
          {!genre && noneGenre ? <img alt="carregando..." src={male} className="sex"/> : console.log()}
          {!noneGenre && <img alt="carregando..." src={bloqued} className="sex"/> }
          <div className="PokemonIn">
            {position && !genre && !isShiny && !art ? <img className="pokemonImg"alt="Carregando..."src={pokemons.sprites.front_default}/> : console.log()}
            {!position && !genre && !isShiny && !art ? <img className="pokemonImg"alt="Carregando..."src={pokemons.sprites.back_default}/> : console.log()}

            {genre && position && !isShiny && !art ? <img className="pokemonImg"alt="Carregando..."src={pokemons.sprites.front_female}/> : console.log()}
            {genre && !position && !isShiny && !art ? <img className="pokemonImg"alt="Carregando..."src={pokemons.sprites.back_female}/> : console.log()}
            
            {!genre && position && isShiny && !art ? <img className="pokemonImg"alt="Carregando..."src={pokemons.sprites.front_shiny}/>: console.log()}
            {!genre && !position && isShiny && !art ? <img className="pokemonImg"alt="Carregando..."src={pokemons.sprites.back_shiny}/>: console.log()}

            {genre && position && isShiny && !art ? <img className="pokemonImg"alt="Carregando..."src={pokemons.sprites.front_shiny_female}/> : console.log()}
            {genre && !position && isShiny && !art ? <img className="pokemonImg"alt="Carregando..."src={pokemons.sprites.back_shiny_female}/> : console.log()}

            {art && <img className="pokemonArt" alt="Carregando..."src={pokemons.sprites.other["official-artwork"].front_default}/>}
          </div>
          <input className="InputPokemon" onChange={srcPokemon}></input>
          <img className="Pokedex" alt="pokedex" src={pokedex}/>
          <button className="before" onClick={Before}>Before</button>
          <button className="next" onClick={Next}>Next</button>
          <button className="turn" onClick={turn}>Turn</button>
          <button className="genre" onClick={turnGenre}>Genre</button>
          <button className="shiny" onClick={turnShiny}>Shiny</button>
          <button className="art" onClick={turnArt}>Art</button>
          <span className="pokemonName">{pokemons && <span >{pokemons.name.toUpperCase()}</span>}</span>
          {type === "grass" && <span className="pokemonType" style={{color: "green"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "fire" && <span className="pokemonType" style={{color: "red"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "water" && <span className="pokemonType" style={{color: "darkcyan"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "bug" && <span className="pokemonType" style={{color: "lightgreen"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "ghost" && <span className="pokemonType" style={{color: "darkblue"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "dragon" && <span className="pokemonType" style={{color: "darksalmon"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "ice" && <span className="pokemonType" style={{color: "lightblue"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "electric" && <span className="pokemonType" style={{color: "yellow"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "fairy" && <span className="pokemonType" style={{color: "rgb(255, 0, 255)"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "fighting" && <span className="pokemonType" style={{color: "brown"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "steel" && <span className="pokemonType" style={{color: "gray"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "ground" && <span className="pokemonType" style={{color: "darkgoldenrod"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "flying" && <span className="pokemonType" style={{color: "lightskyblue"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "rock" && <span className="pokemonType" style={{color: "darkgrey"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "psychic" && <span className="pokemonType" style={{color: "purple"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "poison" && <span className="pokemonType" style={{color: "darkorchid"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "normal" && <span className="pokemonType" style={{color: "darksalmon"}}>{pokemons && <span>{type}</span>}</span>}
          {type === "dark" && <span className="pokemonType" style={{color: "black", textShadow: "0 0 10px purple"}}>{pokemons && <span>{type}</span>}</span>}
        </header>
      </div>
    );
  } return (
    <h1>Loading...</h1>
  )
}

export default App;


// deoxys e variações