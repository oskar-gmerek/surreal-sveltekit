import { writable } from "svelte/store";

export function createStore<T>(storeName: string, data: T[]) {
	const store = writable(data);
  
	const dynamicStore = {
	  subscribe: store.subscribe,
	  set: store.set,
	  update: store.update,
	};
  
	Object.defineProperty(dynamicStore, 'name', { value: storeName });
  
	return dynamicStore;
  }