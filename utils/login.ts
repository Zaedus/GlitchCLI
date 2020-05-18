import { Me } from "glitchapi.js";
const keytar = require('keytar');

export function login() : Promise<Me> {
    return new Promise<Me>(async (res, rej) => {
        const me = new Me();

        me.on("ready", () => {
            res(me);
        })

        me.signin(await keytar.getPassword("glitchcli", "code")).catch(rej);
    })
}