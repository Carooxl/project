<script>
    export let body;
    export let sortKey;
    import { onMount, onDestroy } from "svelte";

    const categories = {
        semimajorAxis: "Große Halbachse",
        meanRadius: "Mittlerer Radius",
        gravity: "Gravitation",
        sideralOrbit: "Siderale Umlaufzeit",
        density: "Dichte",
    };
    import { decimalSeparators } from "../utils";
    let backgroundImage = "";

    function getMoonBackgroundImage() {
        let moonIndexes = JSON.parse(localStorage.getItem("moonIndexes")) || [];
        if (moonIndexes.length === 4) {
            moonIndexes = [];
        }

        let moonIndex;
        do {
            moonIndex = Math.floor(Math.random() * 4) + 1;
        } while (moonIndexes.includes(moonIndex));

        moonIndexes.push(moonIndex);
        localStorage.setItem("moonIndexes", JSON.stringify(moonIndexes));
        return `moons/moon${moonIndex}.jpg`;
    }

    function getAsteroidBackgroundImage() {
        let asteroidIndexes =
            JSON.parse(localStorage.getItem("asteroidIndexes")) || [];
        if (asteroidIndexes.length === 4) {
            asteroidIndexes = [];
        }

        let asteroidIndex;
        do {
            asteroidIndex = Math.floor(Math.random() * 4) + 1;
        } while (asteroidIndexes.includes(asteroidIndex));

        asteroidIndexes.push(asteroidIndex);
        localStorage.setItem(
            "asteroidIndexes",
            JSON.stringify(asteroidIndexes),
        );
        return `asteroids/asteroid${asteroidIndex}.jpg`;
    }

    function getPlanetBackgroundImage() {
        if (body.bodyType === "Planet") {
            return `planets/${body.englishName.toLowerCase()}.jpg`;
        }
        return "";
    }

    function updateBackgroundImage() {
        if (body.bodyType === "Moon") {
            backgroundImage = getMoonBackgroundImage();
        } else if (body.bodyType === "Asteroid") {
            backgroundImage = getAsteroidBackgroundImage();
        } else if (body.bodyType === "Planet") {
            backgroundImage = getPlanetBackgroundImage();
        }
    }

    onMount(() => {
        updateBackgroundImage();
    });

    onDestroy(() => {
        // Cleanup logic if needed
    });

    $: {
        if (sortKey) {
            updateBackgroundImage();
        }
    }
</script>

<div
    class="card"
    class:planet={body.bodyType === "Planet"}
    style="background-image: url('/{backgroundImage}') ;"
>
    <div class="content-wrapper">
        <h2>{body.englishName}</h2>
        <h3>{body.bodyType}</h3>
        {#if sortKey}
            <p>{categories[sortKey]}: {decimalSeparators(body[sortKey])}</p>
        {/if}
    </div>
</div>

<style>
    .content-wrapper {
        width: 190px;
        height: 194px;
        border: 3px solid rgba(3, 39, 122, 0.5);
        padding: 5px;
        border-radius: 10px;
        box-sizing: border-box;
    }

    .card {
        width: 200px;
        height: 200px;
        background-size: cover;
        background-position: center;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }

    .card:hover {
        transform: scale(1.05);
    }

    h2 {
        font-size: 1.2em;
    }

    h3 {
        font-size: 1em;
    }

    p {
        font-size: 0.9em;
        font-weight: 600;
    }

    @media screen and (max-width: 768px) {
        .content-wrapper {
            width: 140px;
            height: 144px;
            padding: 5px;
            border-radius: 10px;
        }

        .card {
            width: 150px;
            height: 150px;
        }

        h2 {
            font-size: 1em;
            margin: 0.5em 0;
        }

        h3 {
            font-size: 0.8em;
            margin: 0.3em 0;
        }

        p {
            font-size: 0.7em;
            font-weight: 500;
            margin: 0.3em 0;
        }
    }
</style>
