<script>
    import GameCard from "../components/GameCard.svelte";
    import { onMount } from "svelte";
    import { selectedBodies } from "../store";
    import { get } from "svelte/store";

    let categories = [
        "semimajorAxis",
        "meanRadius",
        "gravity",
        "sideralOrbit",
        "density",
    ];
    let sortKey = "semimajorAxis";
    let selectedCards = [];
    let turnCount = 0;
    let pairCount = 0;
    let shuffledBodies = [];

    function selectCategory() {
        const randomIndex = Math.floor(Math.random() * categories.length);
        sortKey = categories[randomIndex];
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function onNewTurn() {
        selectCategory();
        selectedCards = [];
        turnCount = 0;
        pairCount = 0;
        shuffledBodies = shuffle([...get(selectedBodies)]);
    }

    function handleCardSelect(event) {
        const selectedBody = event.detail;
        selectedCards = [...selectedCards, selectedBody];

        if (selectedCards.length === 2) {
            turnCount++;
            setTimeout(() => {
                checkPair(selectedCards);
                selectedCards = [];
                selectCategory();
            }, 500); // Delay the check by 500 milliseconds
        }
    }

    function checkPair(cards) {
        if (cards[0][sortKey] === cards[1][sortKey]) {
            pairCount++;
        }
    }

    onMount(() => {
        selectCategory();
        shuffledBodies = shuffle([...get(selectedBodies)]);
    });
</script>

<div class="info-container">
    <p>Aktuelle Kategorie für den Zug: <strong>{sortKey}</strong></p>
    <p>Anzahl der Züge: <strong>{turnCount}</strong></p>
    <p>Gefundene Pärchen: <strong>{pairCount}</strong></p>
</div>
<div id="card-container">
    {#each shuffledBodies as body, index}
        <GameCard {body} {sortKey} on:select={handleCardSelect} />
    {/each}
</div>

<!-- Spiellogik funktioniert für die identischen Werte -> Spiel funktioniert bei Kategorie density-->

<style>
    .info-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    .info-container p {
        margin: 0;
        padding: 0 10px;
        font-size: 1em;
        color: #1b263d;
    }

    #card-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        gap: 1em;
        color: #222;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
        margin-top: 50px;
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

        .info-container p {
            margin: 0;
            padding: 0 10px;
            font-size: 0.8em;
            color: #1b263d;
        }
    }
</style>


<script>
    import GameCard from "../components/GameCard.svelte";
    import { onMount } from "svelte";
    import { selectedBodies } from "../store";
    import { get } from "svelte/store";

    let categories = [
        "semimajorAxis",
        "meanRadius",
        "gravity",
        "sideralOrbit",
        "density",
    ];
    let sortKey = "semimajorAxis";
    let selectedCards = [];
    let turnCount = 0;
    let pairCount = 0;
    let shuffledBodies = [];

    function selectCategory() {
        const randomIndex = Math.floor(Math.random() * categories.length);
        sortKey = categories[randomIndex];
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function onNewTurn() {
        selectCategory();
        selectedCards = [];
        turnCount = 0;
        pairCount = 0;
        shuffledBodies = shuffle(
            [...get(selectedBodies)].map((body) => ({
                ...body,
                visible: true,
            })),
        );
    }

    function handleCardSelect(event) {
        const selectedBody = event.detail;
        selectedCards = [...selectedCards, selectedBody];

        if (selectedCards.length === 2) {
            turnCount++;
            setTimeout(() => {
                checkPair(selectedCards);
                selectedCards = [];
                selectCategory(); // Select a new category after each turn
            }, 500); // Delay the check by 500 milliseconds
        }
    }

    function checkPair(cards) {
        if (cards[0][sortKey] === cards[1][sortKey]) {
            pairCount++;
            // Set visible to false for both matched cards
            cards[0].visible = false;
            cards[1].visible = false;
            // Update shuffledBodies to reflect changes
            shuffledBodies = shuffledBodies.map((body) => {
                if (body.id === cards[0].id || body.id === cards[1].id) {
                    return { ...body, visible: false };
                }
                return body;
            });
        }
    }

    onMount(() => {
        onNewTurn();
    });
</script>

<div class="info-container">
    <p>Aktuelle Kategorie für den Zug: <strong>{sortKey}</strong></p>
    <p>Anzahl der Züge: <strong>{turnCount}</strong></p>
    <p>Gefundene Pärchen: <strong>{pairCount}</strong></p>
</div>
<div id="card-container">
    {#each shuffledBodies as body, index}
        {#if body.visible}
            <GameCard {body} {sortKey} on:select={handleCardSelect} />
        {/if}
    {/each}
</div>

<style>
    .info-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        margin-top: 30px;
        margin-bottom: 20px;
    }

    .info-container p {
        margin: 0;
        padding: 0 10px;
        font-size: 1em;
        color: #1b263d;
    }

    #card-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        gap: 1em;
        color: #222;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
        margin-top: 50px;
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

        .info-container p {
            margin: 0;
            padding: 0 10px;
            font-size: 0.8em;
            color: #1b263d;
        }
    }
</style>
<!-- selbe Logik wie oben und funktioniert + die beiden Karten wenn ein Pärchen gefunden wurde verschwinden -->
