<script>
  import Router from "svelte-spa-router";
  import Header from "./components/Header.svelte";
  import Tablewrapper from "./pages/Tablewrapper.svelte";
  import Cardwrapper from "./pages/Cardwrapper.svelte";
  import Gamewrapper from "./pages/Gamewrapper.svelte";
  import { sortKey, sortDirection } from "./store.js";
  import { sortPlanets } from "./utils";
  import { allBodies } from "./store.js";

  let celestialBodies = [];
  const routes = {
    "/": Tablewrapper,
    "/cards": Cardwrapper,
    "/game": Gamewrapper,
  };

  async function fetchCelestialData() {
    try {
      const [planetResponse, asteroidResponse, moonResponse] =
        await Promise.all([
          fetch(
            "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,planet&data=id,englishName,semimajorAxis,meanRadius,gravity,sideralOrbit,bodyType,density,mass",
          ),
          fetch(
            "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,asteroid&data=id,englishName,semimajorAxis,meanRadius,gravity,sideralOrbit,bodyType,density,mass",
          ),
          fetch(
            "https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,moon&data=id,englishName,semimajorAxis,meanRadius,gravity,sideralOrbit,bodyType,density,mass",
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
      <li><a class="only-desktop" href="#/">Tabellenübersicht</a></li>
      <li><a href="#/cards">Kartenübersicht</a></li>
      <li><a href="#/game">Spiel</a></li>
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
  #wrapper {
    max-width: 1428px;
    margin: auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #aed7f252;
    padding: 1em;
  }

  nav {
    width: 100%;
  }

  nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }

  nav ul li {
    margin: 0 1em;
  }

  nav ul li a {
    color: white;
    text-decoration: none;
  }

  footer {
    width: 100%;
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
    color: white;
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    .only-desktop {
      display: none;
    }
  }
</style>
