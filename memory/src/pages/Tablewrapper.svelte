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

        $allBodies = [
            ...$selectedBodies,
            ...$allBodies.filter((body) => !$selectedBodies.includes(body)),
        ];
    }

    function resetSelection() {
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
        color: #e1dfdf;
    }

    .highlight {
        background-color: #303953c4 !important;
        opacity: 80%;
        color: #e1dfdf;
    }
    thead tr:hover {
        background-color: transparent;
    }
    thead {
        position: sticky;
        top: 0;
        background-color: rgba(13, 24, 45);
        z-index: 1;
        color: #e1dfdf;
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
