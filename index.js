const fs = require('fs');
const axios = require('axios').default;
const clock = require('date-events')();

async function updateTest() {
    clock.on('minute', async () => {
        const db = fs.readFileSync('db.json');
        const dbJson = JSON.parse(db);
        let res = await axios.get('https://fn-api.com/api/backgrounds');
        let lobby = res.data.data.lobby;
        if(dbJson.find(x => x.name === lobby.name)) return
        let newd = {
            name: lobby.name,
            image : lobby.image,
        }
        dbJson.push(newd);
        fs.writeFileSync('db.json', JSON.stringify(dbJson, null, 2));
        console.log(newd);
    })
}

updateTest()