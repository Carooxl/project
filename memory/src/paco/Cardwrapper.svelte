<script>
    import { onMount } from "svelte";
    import { selectedBodies, sortKey, sortDirection } from "../store.js";
    import Card from "../components/Card.svelte";

    let displayedBodies = [];
    let currentSortKey = "semimajorAxis";
    let currentSortDirection = "asc";
    const unsubscribe = selectedBodies.subscribe((value) => {
        displayedBodies = value.slice();
        handleSort(currentSortKey);
    });

    function sortPlanets(bodies, key) {
        return bodies.sort((a, b) => {
            if (currentSortDirection === "asc") {
                return a[key] - b[key];
            } else {
                return b[key] - a[key];
            }
        });
    }

    function handleSort(key) {
        currentSortKey = key;
        currentSortDirection = "asc";
        displayedBodies = sortPlanets(displayedBodies, key);
    }

    onMount(() => {
        handleSort(currentSortKey);
        return () => {
            unsubscribe();
        };
    });
</script>

<div>
    <button on:click={() => handleSort("semimajorAxis")}>Semimajor Axis</button>
    <button on:click={() => handleSort("meanRadius")}>Mean Radius</button>
    <button on:click={() => handleSort("gravity")}>Gravity</button>
    <button on:click={() => handleSort("sideralOrbit")}>Sideral Orbit</button>
    <button on:click={() => handleSort("density")}>Density</button>
</div>

<div id="card-container">
    {#each displayedBodies as body}
        <Card {body} {currentSortKey} />
    {/each}
</div>

<style>
    button {
        width: 150px;
        padding: 5px 10px;
        background-color: #1b263d;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
        border: 1px solid #ddd;
        text-align: center;
        margin: 20px;
    }
    #card-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1em;
        color: #222;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
        margin-top: 20px;
    }

    @media screen and (max-width: 768px) {
        #card-container {
            display: grid;
            place-items: center;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5em;
            margin-top: 20px;
        }
    }
</style>
