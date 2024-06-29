import { writable } from "svelte/store";

export const allBodies = writable([]);
export const sortKey = writable("semimajorAxis");
export const sortDirection = writable("asc");
export const selectedBodies = writable([]);


