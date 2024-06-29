<script>
    import {
        sortKey,
        sortDirection,
        selectedBodies,
        allBodies,
    } from "../store";
    import { sortPlanets } from "../utils";
    import { onMount } from "svelte";
    import { decimalSeparators } from "../utils";

    onMount(() => {
        $: if ($allBodies.length > 0) {
            selectBodies();
        }
    });

    function handleSort(key) {
        if (key === $sortKey) {
            sortDirection.update((dir) => (dir === "asc" ? "desc" : "asc"));
        } else {
            sortKey.set(key);
            sortDirection.set("asc");
        }
        $allBodies = [...sortPlanets($allBodies, $sortKey, $sortDirection)];
    }

    function getRandomBodies(type, count) {
        let filteredBodies = $allBodies.filter(
            (body) => body.bodyType === type,
        );
        let randomNumbers = [];
        let randomBodies = [];

        while (filteredBodies.length > 3 && randomNumbers.length < count) {
            const randomNumber = Math.floor(
                Math.random() * filteredBodies.length,
            );
            if (!randomNumbers.includes(randomNumber)) {
                randomNumbers.push(randomNumber);
                randomBodies.push(filteredBodies[randomNumber]);
            }
        }
        return randomBodies;
    }

    function selectBodies() {
        let moons = getRandomBodies("Moon", 4);
        let asteroids = getRandomBodies("Asteroid", 4);
        let planets = getRandomBodies("Planet", 4);

        $selectedBodies = [...moons, ...asteroids, ...planets];

        // Move selected bodies to the top of the table
        $allBodies = [
            ...$selectedBodies,
            ...$allBodies.filter((body) => !$selectedBodies.includes(body)),
        ];
    }

    function resetSelection() {
        // Move selected bodies to the top of the table
        $allBodies = [
            ...$selectedBodies,
            ...$allBodies.filter((body) => !$selectedBodies.includes(body)),
        ];
    }
</script>

<div class="button-container">
    <button on:click={selectBodies}>Neue Karten erstellen</button>
    <button class="reset-button" on:click={resetSelection}
        >Auswahl aufheben</button
    >
</div>
<div>
    <table>
        <thead>
            <tr>
                <th class="sortable" on:click={() => handleSort("englishName")}
                    >Name</th
                >
                <th class="sortable" on:click={() => handleSort("bodyType")}
                    >Typ</th
                >
                <th
                    class="sortable optional"
                    on:click={() => handleSort("semimajorAxis")}
                    >Große Halbachse</th
                >
                <th
                    class="sortable optional"
                    on:click={() => handleSort("meanRadius")}
                    >Mittlerer Radius</th
                >
                <th
                    class="sortable optional"
                    on:click={() => handleSort("gravity")}>Gravitation</th
                >
                <th
                    class="sortable optional"
                    on:click={() => handleSort("sideralOrbit")}
                    >Siderale Umlaufzeit</th
                >
                <th
                    class="sortable optional"
                    on:click={() => handleSort("density")}>Dichte</th
                >
            </tr>
        </thead>
        <tbody>
            {#each $allBodies as body}
                <tr class:highlight={$selectedBodies.includes(body)}>
                    <td>{body.englishName}</td>
                    <td>{body.bodyType}</td>
                    <td class="optional"
                        >{decimalSeparators(body.semimajorAxis)}</td
                    >
                    <td class="optional"
                        >{decimalSeparators(body.meanRadius)}</td
                    >
                    <td class="optional">{decimalSeparators(body.gravity)}</td>
                    <td class="optional"
                        >{decimalSeparators(body.sideralOrbit)}</td
                    >
                    <td class="optional">{decimalSeparators(body.density)}</td>
                </tr>
            {/each}
        </tbody>
    </table>
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
        width: 200px;
        padding: 10px 20px;
        background-color: #1b263d;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
        border: 1px solid #ddd;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    .reset-button {
        background-color: #1b263d;
    }

    button:hover {
        background-color: #2d3953;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 0.9em;
    }

    th,
    td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th.sortable {
        cursor: pointer;
    }

    th.sortable:hover {
        background-color: #2d3953;
    }

    td.optional {
        display: none;
    }

    tr {
        transition: background-color 0.3s;
    }

    tr:hover {
        background-color: #2d3953;
    }

    .highlight {
        background-color: #2d3953 !important;
        opacity: 80%;
    }
    thead tr:hover {
        background-color: transparent;
    }
    thead {
        position: sticky;
        top: 0;
        background-color: #1b263d;
        opacity: 80%;
        z-index: 1;
    }
    thead th.optional {
        display: none;
    }

    @media screen and (min-width: 768px) {
        td.optional {
            display: table-cell;
        }

        table {
            font-size: 0.8em;
        }
        thead th.optional {
            display: table-cell;
        }
        .button-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: left;
            gap: 1em;
            margin-top: 40px;
        }

        button {
            width: 150px;
            font-size: 0.9em;
        }
    }
</style>
