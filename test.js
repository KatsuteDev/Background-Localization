const fs = require("fs");
const path = require("path");

const r1 = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, "en", "readme.json"), "utf-8")));
const t1 = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, "en", "translations.json"), "utf-8")));

let error = false;

for(const folder of fs.readdirSync(__dirname).filter(f => !f.includes('.') && f !== "en")){
    const r2 = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, folder, "readme.json"), "utf-8")));

    for(const key of r1){
        if(!r2.includes(key)){
            console.error(`[${folder}] Missing README translation for '${key}'`);
            error = true;
        }
    }

    const t2 = Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname, folder, "translations.json"), "utf-8")));

    for(const key of t1){
        if(!t2.includes(key)){
            console.error(`[${folder}] Missing package translation for '${key}'`);
            error = true;
        }
    }
}

if(error){
    process.exit(1);
}