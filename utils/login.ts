import { Me } from "glitchapi.js";
const keytar = require('keytar');

export function login() : Promise<Me> {
    return new Promise<Me>(async (res, rej) => {
        const me = new Me();

        me.on("ready", () => {
            res(me);
        })
        const key = await keytar.getPassword("glitchcli", "code");
        console.log(key)
        if(!key) return rej("No logged in user.");
        me.signin(key).catch(rej);
    })
}