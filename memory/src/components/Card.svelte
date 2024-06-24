<script>
    export let rocket;
    export let sortKey;
</script>

<div class="card">
    <div class="card-inner">
        <div class="card-front">
            <h2>{rocket.englishName}</h2>
            <h3>{rocket.bodyType}</h3>
            <p>{sortKey}: {rocket[sortKey]}</p>
        </div>
    </div>
</div>

<style>
    .card {
        perspective: 1000px;
        width: 200px;
        height: 200px;
    }

    .card:hover {
        transform: scale(1.05);
    }

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.1); /* Adding shadow */
        border-radius: 15px; /* Ensure rounded corners */
    }

    .card-front {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        border-radius: 15px;
        background-color: rgb(255, 255, 240);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    @media screen and (max-width: 768px) {
        .card {
            width: 150px;
            height: 150px;
        }
    }
</style>
