import { InMemoryWebStorage } from "oidc-client-fetch";

export default class LocalWebStorageStore implements InMemoryWebStorage
{
    private _storage: any;

    constructor() {

            this._storage = window.localStorage;
        
    }

    getItem(key: any) {
        return this._storage.getItem(key);
    }

    setItem(key: any, value: any) {
        this._storage.setItem(key, value);
    }

    removeItem(key: any) {
        this._storage.removeItem(key);
    }

    get length() {
        return this._storage.length();
    }

    key(index: any) {
        return this._storage.key(index);
    }
}