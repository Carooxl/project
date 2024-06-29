<script>
    export let body;
    export let sortKey;
</script>

<div class="card">
    <h2>{body.englishName}</h2>
    <h3>{body.bodyType}</h3>
    <p>{sortKey}: {body[sortKey]}</p>
</div>

<style>
    .card {
        perspective: 1000px;
        width: 200px;
        height: 200px;
        background-color: rgb(255, 255, 240);
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .card:hover {
        transform: scale(1.05);
    }

    @media screen and (max-width: 768px) {
        .card {
            width: 150px;
            height: 150px;
        }
    }
</style>
