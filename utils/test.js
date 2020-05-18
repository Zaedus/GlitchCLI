const keytar = require('keytar');

(async () => {
    console.log(await keytar.getPassword("glitchcli", "codea"));
})()
