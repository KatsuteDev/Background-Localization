const fs = require("fs");
const path = require("path");

const readme = JSON.parse(fs.readFileSync(path.join(__dirname, "en", "readme.json"), "utf-8"));
const translations = JSON.parse(fs.readFileSync(path.join(__dirname, "en", "translations.json"), "utf-8"));

let error = false;

const wildcard = (str) => ((str ?? "").match(/{\d+}/g) ?? []).length;

for(const folder of fs.readdirSync(__dirname).filter(f => !f.includes('.') && f !== "en")){
    /* readme */ {
        const obj = JSON.parse(fs.readFileSync(path.join(__dirname, folder, "readme.json"), "utf-8"));

        for(const key of Object.keys(readme)){
            if(!Object.keys(obj).includes(key)){
                console.error(`[${folder}] Missing README translation for '${key}'`);
                error = true;
                continue;
            }

            const [wcO, wcT] = [wildcard(obj[key]), wildcard(readme[key])];

            if(wcO !== wcT){
                console.error(`[${folder}] '${key}' has incorrect amount of placeholders (${wcO} ≠ ${wcT})`);
                error = true;
                continue;
            }
        }
    }

    /* translations */ {
        const obj = JSON.parse(fs.readFileSync(path.join(__dirname, folder, "translations.json"), "utf-8"));

        for(const key of Object.keys(translations)){
            if(!Object.keys(obj).includes(key)){
                console.error(`[${folder}] Missing translation for '${key}'`);
                error = true;
                continue;
            }

            const [wcO, wcT] = [wildcard(obj[key]), wildcard(translations[key])];

            if(wcO !== wcT){
                console.error(`[${folder}] '${key}' has incorrect amount of placeholders (${wcO} ≠ ${wcT})`);
                error = true;
                continue;
            }
        }
    }
}

error && process.exit(1);