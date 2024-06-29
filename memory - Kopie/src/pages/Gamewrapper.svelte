<script>
    import GameCard from "../components/GameCard.svelte";
    import { onMount } from "svelte";
    import { selectedBodies } from "../store";
    let categories = [
        "semimajorAxis",
        "meanRadius",
        "gravity",
        "sideralOrbit",
        "density",
    ];
    let sortKey = "semimajorAxis";
    let selectedCards = [];

    function selectCategory(event) {
        const randomIndex = Math.floor(Math.random() * categories.length);
        sortKey = categories[randomIndex];
        // sortKey = event.target.value;
    }

    selectCategory();

    function onNewTurn() {
        selectCategory();
        selectedCards = [];
    }

    function handleCardSelect(event) {
        const selectedBody = event.detail;
        selectedCards = [...selectedCards, selectedBody];

        if (selectedCards.length === 2) {
            checkPair(selectedCards);
            selectedCards = [];
        }
    }
    function checkPair([card1, card2]) {
        const bodies = $selectedBodies.map((body) => ({
            name: body.name,
            value: body[sortKey],
        }));
        bodies.sort((a, b) => a.value - b.value);

        let closestPair = { body1: bodies[0], body2: bodies[1] };
        let minDifference = Math.abs(bodies[1].value - bodies[0].value);

        for (let i = 1; i < bodies.length - 1; i++) {
            const diff = Math.abs(bodies[i + 1].value - bodies[i].value);
            if (diff < minDifference) {
                minDifference = diff;
                closestPair = { body1: bodies[i], body2: bodies[i + 1] };
            }
        }

        if (
            (closestPair.body1.name === card1.name &&
                closestPair.body2.name === card2.name) ||
            (closestPair.body1.name === card2.name &&
                closestPair.body2.name === card1.name)
        ) {
            alert("Correct Pair!");
        } else {
            alert("Incorrect Pair, Try Again.");
        }
    }
    onMount(() => {
        selectCategory();
    });
</script>

<div>
    <p>Aktuelle Kategorie für den Zug: <strong>{sortKey}</strong></p>
</div>
<div id="card-container">
    {#each $selectedBodies as body}
        <GameCard {body} {sortKey} on:select={handleCardSelect} />
    {/each}
</div>

<style>
    p {
        font-size: 1em;
        color: #1b263d;
        margin: 10px 0;
    }
    #card-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        gap: 1em;
        color: #222;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
        margin-top: 40px;
        margin-bottom: 40px;
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
