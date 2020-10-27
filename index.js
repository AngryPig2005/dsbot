const request = require('request');
const https = require('https');


class Bot {
    constructor(on_message, on_emoji){
        this.on_discord_message = on_message;
        this.test = 'Hello Mir';
        this.on_emoji = on_emoji;

        this.send_message = function (link_on_channel, content) {
            var options = {
              'method': 'POST',
              'url': link_on_channel,
              'headers': {
                'Authorization': 'Bot NzYyMzQ1NTI5NTc2OTE0OTQ0.X3nzmQ.q4FApy0fUniBTcq7HTg-mxtJxrU',
                'Content-Type': 'application/json',
                'Cookie': '__cfduid=dfd328fd7dbb116e2866057afa7ceb0791603449788'
              },
              body: JSON.stringify({"content":content,"tts":false})

            };
            request(options, function (error, response) {
              if (error) throw new Error(error);
              console.log(response.body);
            })
        }

        this.run = function (token){
            const WebSocket = require('ws');
            const socket = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
            socket.onmessage = function(event) {
                const msg = JSON.parse(event.data)
                console.log(msg.op);
                console.log('[message]:');
                console.log(msg)
                //
                //
                //
                if (msg.op == 0) {
                    let txt = msg.d.content;
                    console.log(txt)
                    if (msg.t == 'MESSAGE_REACTION_ADD'){
                        my_bot.on_emoji(msg)
                    }
                    if (typeof(txt) == "string"){
                        my_bot.on_discord_message(msg) //KOSTIL!!!
                        //this.on_discord_message() // TODO: Понять почему не робит
                    }
                }
                //
                //
                //
                if (msg.op == 10) {
                    //login
                    socket.send(JSON.stringify({
                    "op": 2,
                    "d": {
                      "token": token,
                      "properties": {
                        "$os": "linux",
                        "$browser": "rock's_bot",
                        "$device": "rock's_bot"
                      }
                          }
                      }));
                    //start heardbiting
                    let heartbeat_interval = msg.d.heartbeat_interval;
                    console.log(heartbeat_interval);
                    setInterval(
                        () => {
                        console.log('Отправлен хардбит');
                        socket.send(
                          `
                          {
                              "op": 1,
                              "d": null
                          }
                          `
                        )}, heartbeat_interval);
                };
            };
        }
}
};



var my_bot = new Bot(
    message=>{
        if (message.d.content.split(" ")[0] == '<@!762345529576914944>') {
            if (message.d.content.split(" ")[1] != 'dog' &&(message.d.content.split(" ")[1] == 'kot' || Math.floor(Math.random() * Math.floor(2))>0)){
                console.log('Халлоу мир', message.d.author.avatar, message.d.member.nick);
                https.get('https://api.thecatapi.com/v1/images/search', (res) => {
                      const { statusCode } = res;
                      const contentType = res.headers['content-type'];
                      res.setEncoding('utf8');
                      let rawData = '';
                      res.on('data', (chunk) => { rawData += chunk; });
                      res.on('end', () => {
                        try {
                          let kot = Object.entries(JSON.parse(rawData)[0]).filter(([key, value]) => key=="url")[0][1];
                          my_bot.send_message('https://discord.com/api/channels/756115666808864808/messages', kot)
                          console.log(/*rawData,*/ kot[0][1]);
                          //post_cat(kot[0][1])
                          /*request.post({
                              url:'https://discordapp.com/api/webhooks/757179770764263464/foNc6XwdtJTvTltVSFFXr0xlfCeKcAdxBpD0cf7QDhTzq9J5nRvalekIqGCbXVh1o4dR',
                              form: {
                                  username: message.d.member.nick,
                                  avatar_url: kot[0][1],
                                  content: kot[0][1]
                              }},
                              (err,httpResponse,body)=>console.log('Cat has been send'));*/

                        } catch (e) {
                          console.error(e.message);
                        }
                      });
                    }).on('error', (e) => {
                      console.error('Got error');
                    });
            }else{

                https.get('https://dog.ceo/api/breeds/image/random', (res) => {
                      const { statusCode } = res;
                      const contentType = res.headers['content-type'];
                      res.setEncoding('utf8');
                      let rawData = '';
                      res.on('data', (chunk) => { rawData += chunk; });
                      res.on('end', () => {
                        try {
                          let kot = Object.entries(JSON.parse(rawData)).filter(([key, value]) => key=="message")[0][1];
                          my_bot.send_message('https://discord.com/api/channels/756115666808864808/messages', kot)
                          console.log(/*rawData,*/ kot);

                        } catch (e) {
                          console.error(e.message);
                        }
                      });
                    }).on('error', (e) => {
                      console.error('Got error');
                    });

            };



    }
},




message => {if (message.d.emoji.name == '👍') {
                if (Math.floor(Math.random() * Math.floor(2))>0){
                    https.get('https://api.thecatapi.com/v1/images/search', (res) => {
                          const { statusCode } = res;
                          const contentType = res.headers['content-type'];
                          res.setEncoding('utf8');
                          let rawData = '';
                          res.on('data', (chunk) => { rawData += chunk; });
                          res.on('end', () => {
                            try {
                              let kot = Object.entries(JSON.parse(rawData)[0]).filter(([key, value]) => key=="url")[0][1];
                              my_bot.send_message('https://discord.com/api/channels/756115666808864808/messages', kot)
                              console.log(/*rawData,*/ kot[0][1]);
                              //post_cat(kot[0][1])
                              /*request.post({
                                  url:'https://discordapp.com/api/webhooks/757179770764263464/foNc6XwdtJTvTltVSFFXr0xlfCeKcAdxBpD0cf7QDhTzq9J5nRvalekIqGCbXVh1o4dR',
                                  form: {
                                      username: message.d.member.nick,
                                      avatar_url: kot[0][1],
                                      content: kot[0][1]
                                  }},
                                  (err,httpResponse,body)=>console.log('Cat has been send'));*/

                            } catch (e) {
                              console.error(e.message);
                            }
                          });
                        }).on('error', (e) => {
                          console.error('Got error');
                        });
                }else{

                    https.get('https://dog.ceo/api/breeds/image/random', (res) => {
                          const { statusCode } = res;
                          const contentType = res.headers['content-type'];
                          res.setEncoding('utf8');
                          let rawData = '';
                          res.on('data', (chunk) => { rawData += chunk; });
                          res.on('end', () => {
                            try {
                              let kot = Object.entries(JSON.parse(rawData)).filter(([key, value]) => key=="message")[0][1];
                              my_bot.send_message('https://discord.com/api/channels/756115666808864808/messages', kot)
                              console.log(/*rawData,*/ kot);

                            } catch (e) {
                              console.error(e.message);
                            }
                          });
                        }).on('error', (e) => {
                          console.error('Got error');
                        });

                };


            }
        }
);

console.log(my_bot.test)
console.log(my_bot.on_discord_message)
my_bot.run('NzYyMzQ1NTI5NTc2OTE0OTQ0.X3nzmQ.q4FApy0fUniBTcq7HTg-mxtJxrU')
