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
    let previousCards = [];

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

        if (selectedCards.length === 2) {
            return; // Verhindert Auswahl, wenn bereits zwei Karten ausgewählt sind
        }

        selectedCards = [...selectedCards, selectedBody];

        if (selectedCards.length === 2) {
            setTimeout(() => {
                checkPair(selectedCards);
                selectedCards = [];
            }, 500);
        }
    }

    function checkPair(cards) {
        if (cards[0][sortKey] === cards[1][sortKey]) {
            pairCount++;

            cards[0].visible = false;
            cards[1].visible = false;

            shuffledBodies = shuffledBodies.map((body) => {
                if (body.id === cards[0].id || body.id === cards[1].id) {
                    return { ...body, visible: false };
                }
                return body;
            });

            // Turn count erhöhen, wenn ein neues Paar gefunden wurde
            turnCount++;
            selectCategory();
            previousCards = [];
        } else {
            // Überprüfen, ob die aktuellen Karten die gleichen wie die vorherigen sind
            if (
                previousCards.length === 2 &&
                ((previousCards[0].id === cards[0].id &&
                    previousCards[1].id === cards[1].id) ||
                    (previousCards[0].id === cards[1].id &&
                        previousCards[1].id === cards[0].id))
            ) {
                // Turn count nicht erhöhen, wenn die gleichen Karten erneut umgedreht wurden
            } else {
                // Turn count erhöhen, wenn andere Karten umgedreht wurden
                turnCount++;
            }

            setTimeout(() => {
                shuffledBodies = shuffledBodies.map((body) => {
                    if (body.id === cards[0].id || body.id === cards[1].id) {
                        return { ...body, visible: true };
                    }
                    return body;
                });
                setTimeout(selectCategory, 5000);
            }, 500);

            // Die aktuellen Karten als vorherige Karten speichern
            previousCards = [...cards];
        }
    }

    onMount(() => {
        onNewTurn();
    });
</script>

<div class="info-container">
    <div class="info-box">
        <p>Aktuelle Kategorie für den Zug: <strong>{sortKey}</strong></p>
    </div>
    <div class="info-box">
        <p>Anzahl der Züge: <strong>{turnCount}</strong></p>
    </div>
    <div class="info-box">
        <p>Gefundene Pärchen: <strong>{pairCount}</strong></p>
    </div>
</div>

<div id="card-container">
    {#each shuffledBodies as body, index}
        {#if body.visible}
            <GameCard {body} {sortKey} on:select={handleCardSelect} />
        {/if}
    {/each}
</div>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

    .info-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 30px;
        margin-bottom: 10px;
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .info-box {
        background-color: #ffffff;
        padding: 10px 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .info-box p {
        margin: 0;
        font-size: 1em;
        color: #333;
        font-family: "Roboto", sans-serif;
        text-align: center;
    }

    .info-box strong {
        font-weight: 700;
        color: #1b263d;
    }

    #card-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        gap: 0.5em;
        color: #222;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
        margin-top: 10px;
        margin-bottom: 40px;
    }

    @media screen and (max-width: 768px) {
        .info-container {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 10px;
        }

        #card-container {
            display: grid;
            place-items: center;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5em;
            margin-top: 20px;
        }

        .info-box p {
            font-size: 0.9em;
        }
    }
</style>
