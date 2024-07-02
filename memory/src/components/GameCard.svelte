<script>
    export let body;
    export let sortKey;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { onMount } from "svelte";
    let isFlipped = !false;

    function handleClick() {
        isFlipped = !isFlipped;
        dispatch("select", body);
    }
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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="card"
    on:click={handleClick}
    class:is-flipped={isFlipped}
    style="background-image: url('/{backgroundImage}') ;"
>
    <div class="card-inner">
        <div class="card-front">
            <div class="content-wrapper">
                <h2>{body.englishName}</h2>
                <h3>{body.bodyType}</h3>
                <p>{sortKey}: {decimalSeparators(body[sortKey])}</p>
            </div>
        </div>
        <div class="card-back">
            <img src="../back_image.jpg" alt="back_image" />
        </div>
    </div>
</div>

<style>
    .card {
        width: 200px;
        height: 200px;
        background-size: cover;
        background-position: center;
        border-radius: 15px;
    }
    .content-wrapper {
        width: 190px;
        height: 194px;
        border: 3px solid rgba(3, 39, 122, 0.5);
        padding: 5px;
        border-radius: 10px;
        box-sizing: border-box;
    }

    .card:hover {
        transform: scale(1.05);
    }

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 5px;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
    }

    .is-flipped .card-inner {
        transform: rotateY(180deg);
    }

    .card-front,
    .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 15px;
    }

    .card-front {
        background-color: rgb(255, 255, 240);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        flex-direction: column;
    }

    .card-back {
        background-color: #000000;
        transform: rotateY(180deg);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        transition: transform 0.6s;
        transform-style: preserve-3d;
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
