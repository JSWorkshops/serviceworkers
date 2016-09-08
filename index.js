"use strict";
const express = require('express');
const app = express();
const colors = require('colors');
app.use(express.static('.'));

console.log(`
  ${"💖 SERVICE WORKERS WORKSHOP! 💖".underline.yellow}
`)

if(parseInt(/\d/.exec(process.version)[0]) < 6){
  console.error(`
  🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  🔥 ${"Please update to NodeJS 6.3.1+".red} 🔥
  🔥                                🔥
  🔥  ${"https://nodejs.org/".blue}           🔥
  🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
  `);
}

app.listen(3000, () => {
  console.log(`

  ${"Site".blue} - ${"Service Workers:".grey}

    ⭐️ ${"http://localhost:3000/".underline}

`);

});