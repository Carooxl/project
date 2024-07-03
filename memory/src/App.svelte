<script>
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Tablewrapper from "./pages/Tablewrapper.svelte";
  import Cardwrapper from "./pages/Cardwrapper.svelte";
  import Gamewrapper from "./pages/Gamewrapper.svelte";
  import { sortKey, sortDirection } from "./store.js";
  import { sortPlanets } from "./utils";
  import { allBodies } from "./store.js";
  import { location } from "svelte-spa-router";

  let celestialBodies = [];
  const routes = {
    "/": Tablewrapper,
    "/cards": Cardwrapper,
    "/game": Gamewrapper,
  };
  $: currentRoute = $location;
  async function fetchCelestialData() {
    try {
      const [planetResponse, asteroidResponse, moonResponse] =
        await Promise.all([
          fetch(
            "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,planet&data=id,englishName,semimajorAxis,meanRadius,gravity,sideralOrbit,bodyType,density",
          ),
          fetch(
            "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,asteroid&data=id,englishName,semimajorAxis,meanRadius,gravity,sideralOrbit,bodyType,density",
          ),
          fetch(
            "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,moon&data=id,englishName,semimajorAxis,meanRadius,gravity,sideralOrbit,bodyType,density",
          ),
        ]);

      const [planetData, asteroidData, moonData] = await Promise.all([
        planetResponse.json(),
        asteroidResponse.json(),
        moonResponse.json(),
      ]);

      celestialBodies = [
        ...planetData.bodies,
        ...asteroidData.bodies,
        ...moonData.bodies,
      ];

      celestialBodies = sortPlanets(celestialBodies, $sortKey, $sortDirection);
      allBodies.set(celestialBodies);
    } catch (error) {
      console.error("Error fetching celestial data:", error);
    }
  }

  fetchCelestialData();
</script>

<div id="wrapper">
  <Header />
  <nav>
    <ul>
      <li>
        <a href="#/" class:active={currentRoute === "/"}>Tabellenübersicht</a>
      </li>
      <li>
        <a href="#/cards" class:active={currentRoute === "/cards"}
          >Kartenübersicht</a
        >
      </li>
      <li>
        <a href="#/game" class:active={currentRoute === "/game"}>Spiel</a>
      </li>
    </ul>
  </nav>
  <main>
    <Router {routes} />
  </main>
  <footer>
    <ul>
      <li><a href="/">About</a></li>
    </ul>
  </footer>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap");

  :global(body) {
    margin: 0;
    font-family: "Roboto", sans-serif;
    background-color: #ececec;
    color: #333;
  }

  #wrapper {
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #c6c6c7;
    padding: 2em;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  nav {
    width: 100%;
    margin-bottom: 20px;
  }

  nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-bottom: 2px solid #ddd;
  }

  nav ul li {
    margin: 0 1em;
  }

  nav ul li a {
    color: #333;
    text-decoration: none;
    padding: 0.5em 1em;
    transition:
      color 0.3s,
      border-bottom 0.3s;
  }

  nav ul li a:hover,
  nav ul li a.active {
    color: #333;
    border-bottom: 2px solid #333;
  }
  nav ul li a.active {
    font-weight: bold;
  }

  main {
    flex: 1;
  }

  footer {
    width: 100%;
    padding: 1em 0;
    background-color: #b6b6b9;
    border-top: 1px solid #ddd;
    margin-top: 2em;
  }

  footer ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  footer ul li {
    margin: 0 1em;
  }

  footer ul li a {
    color: #333;
    text-decoration: none;
  }

  footer ul li a:hover {
    color: #007bff;
  }

  @media screen and (max-width: 768px) {
    #wrapper {
      padding: 1em;
    }
    nav {
      margin-bottom: 0px;
    }
    nav ul {
      flex-direction: column;
      align-items: flex-start;
      border-bottom: none;
    }

    nav ul li {
      margin: 0.5em 0;
    }

    nav ul li a {
      padding: 0.5em;
      border-bottom: none;
    }

    nav ul li a.active {
      border-bottom: none;
      background-color: #e0e0e0;
      border-radius: 5px;
    }

    footer ul {
      flex-direction: column;
      align-items: flex-start;
    }

    footer ul li {
      margin: 0.5em 0;
    }

    footer ul li a {
      padding: 0.5em;
    }
  }
</style>
