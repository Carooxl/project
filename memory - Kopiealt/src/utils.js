/*export function sortPlanets(array, key, direction) {
return array.sort((a, b) => {
    if (direction === 'asc') {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
    } else if (direction === 'desc') {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
    }
    return 0;
});
}*/


export function sortPlanets(bodies, key, direction) {
    return bodies.slice().sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
    });
}
