<script>
    import Card from "../components/Card.svelte";
    import { selectedBodies } from "../store";

    let sortKey = null;

    const categoryLabels = {
        semimajorAxis: "Große Halbachse",
        meanRadius: "Mittlerer Radius",
        gravity: "Gravitation",
        sideralOrbit: "Siderale Umlaufzeit",
        density: "Dichte",
    };

    function sortPlanets(key) {
        $selectedBodies.sort((a, b) => a[key] - b[key]);
        $selectedBodies = [...$selectedBodies];
    }

    function handleSort(key) {
        sortKey = key;
        sortPlanets(sortKey);
    }
    function resetSort() {
        sortKey = null;
    }
</script>

<div class="button-container">
    <button on:click={() => handleSort("semimajorAxis")}>Große Halbachse</button
    >
    <button on:click={() => handleSort("meanRadius")}>Mittlerer Radius</button>
    <button on:click={() => handleSort("gravity")}>Gravitation</button>
    <button on:click={() => handleSort("sideralOrbit")}
        >Siderale Umlaufzeit</button
    >
    <button on:click={() => handleSort("density")}>Dichte</button>
    <button class="reset-button" on:click={resetSort}>Auswahl aufheben</button>
</div>

<div id="card-container">
    {#each $selectedBodies as body}
        <Card {body} {sortKey} />
    {/each}
</div>

<style>
    .button-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1em;
        margin-top: 40px;
    }

    button {
        width: 150px;
        padding: 10px 20px;
        background-color: rgba(13, 24, 45);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9em;
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: rgba(45, 57, 83);
    }

    .reset-button {
        background-color: rgba(13, 24, 45);
    }

    .reset-button:hover {
        background-color: rgba(45, 57, 83);
    }

    #card-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        gap: 1em;
        color: #222;
        transition: transform 0.3s ease-in-out;
        margin-top: 60px;
        margin-bottom: 40px;
    }

    @media screen and (max-width: 768px) {
        .button-container {
            flex-direction: column;
            align-items: center;
            gap: 0.5em;
            margin-top: 0px;
        }

        button {
            width: 100%;
            max-width: 300px;
            padding: 8px 16px;
            font-size: 0.8em;
        }

        #card-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5em;
            margin-top: 40px;
        }
    }
</style>
