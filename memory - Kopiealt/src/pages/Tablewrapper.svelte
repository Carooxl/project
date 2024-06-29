<script>
    import { sortKey, sortDirection } from "../store";
    import { sortPlanets } from "../utils";
    import { onMount } from "svelte";
    import { allBodies, selectedBodies } from "../store.js";

    let celestialBodies = [];

    const unsubscribe = allBodies.subscribe((value) => {
        celestialBodies = value;
        console.log("Celestial bodies loaded:", celestialBodies);
    });

    function handleSort(key) {
        if (key === $sortKey) {
            sortDirection.update((dir) => (dir === "asc" ? "desc" : "asc"));
        } else {
            sortKey.set(key);
            sortDirection.set("asc");
        }
        celestialBodies = sortPlanets($allBodies, $sortKey, $sortDirection);
    }

    function selectBodies() {
        const selected = [];
        const types = ["Asteroid", "Moon", "Planet"];

        types.forEach((type) => {
            const bodiesOfType = celestialBodies.filter(
                (body) => body.bodyType === type,
            );
            selected.push(...bodiesOfType.slice(0, 4));
        });
        console.log("Clearing previous selection of selected bodies");
        selectedBodies.set([]);
        console.log("Previous selection cleared");
        selectedBodies.set(selected);
        console.log("New selected bodies:", selected);
    }

    onMount(() => {
        return () => {
            unsubscribe();
        };
    });
</script>

<div class="table-container">
    <button on:click={selectBodies}>Auswahl</button>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th on:click={() => handleSort("semimajorAxis")}
                    >Semi-major Axis</th
                >
                <th on:click={() => handleSort("meanRadius")}>Mean Radius</th>
                <th on:click={() => handleSort("gravity")}>Gravity</th>
                <th on:click={() => handleSort("sideralOrbit")}
                    >Sideral Orbit</th
                >
                <th on:click={() => handleSort("density")}>Density</th>
            </tr>
        </thead>
        <tbody>
            {#each celestialBodies as body}
                <tr
                    class:selected={$selectedBodies.find(
                        (b) => b.id === body.id,
                    )}
                >
                    <td>{body.englishName}</td>
                    <td>
                        {body.bodyType}
                        <div class="popup">Body Type</div>
                    </td>
                    <td>
                        {body.semimajorAxis}
                        <div class="popup">Semimajor Axis</div>
                    </td>
                    <td>
                        {body.meanRadius}
                        <div class="popup">Mean Radius</div>
                    </td>
                    <td>
                        {body.gravity}
                        <div class="popup">Gravity</div>
                    </td>
                    <td>
                        {body.sideralOrbit}
                        <div class="popup">Sideral Orbit</div>
                    </td>
                    <td>
                        {body.density}
                        <div class="popup">Density</div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    button {
        width: 197px;
        padding: 10px 20px;
        background-color: #1b263d;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.8em;
        border: 1px solid #ddd;
        text-align: left;
        margin: 0px;
    }

    button:hover {
        background-color: #2d3953;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        margin-top: -8px;
        font-size: 1em;
        min-width: 400px;
    }

    thead tr {
        background-color: #1b263d;
        color: #ffffff;
        text-align: left;
        font-weight: bold;
    }

    th,
    td {
        padding: 12px 15px;
        border: 1px solid #ddd;
    }

    td {
        color: #2a2929;
    }

    th {
        cursor: pointer;
    }

    th:hover {
        background-color: #2d3953;
    }

    .popup {
        display: none;
        position: absolute;
        background-color: #ffffff;
        border: 1px solid #ddd;
        padding: 5px;
        font-size: 0.9em;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 10;
        border-radius: 10px;
        color: black;
    }

    td:hover .popup {
        display: block;
    }

    tr.selected {
        background-color: #e0f7fa;
    }
</style>
