const tmi = require("tmi.js")
var channelName = "xxx"
var prefix = "!"
this.ws.close()

var config = {
    options: {
        debug: true
    }, 
    connection: {
        cluster: "aws", 
        reconnect: true
    },
    identity: {
        username: "xxx",
        password: "Xxx"
    },
    channels: [channelName]
}

var client = new tmi.client(config)
client.connect();
client.

client.on("chat", (channel, user, message, self) => {
    if (self) return;

    const args = message.slice(prefix.length).trim().split(/ +/g);
    console.log(`Args: ${args}`);
    const cmd = args.shift().toLowerCase();
    console.log(`cmd: ${cmd}`);
    try {
        let commandFile = require(`./commands/${cmd}.js`)
        commandFile.run(client, message, args, user, channel, self) 
    } catch (err) {
        return;
    }
    
})