const mineflayer = require('mineflayer');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const colors = require('colors');
const SETTINGS = require("./settings.json");
const vec3 = require('vec3');


let nickname = SETTINGS["username"];
let numberofbots = SETTINGS["numberofbots"];
let version = SETTINGS["version"];
let movement = SETTINGS["movement"];


let i = 0;
let move = 0;

let ms = 2000;

function next() {
    if (i < numberofbots) {
        i++
        setTimeout(() => {
            let number = randomnubmers(3);
            createBot(`${nickname}${number}`)
            console.log(colors.brightBlue("[BOT] ") + colors.cyan(nickname + number) + colors.brightBlue(" został uruchomiony!") + colors.blue(" #" + i));
            next()
        }, 50)
    }
}


function randomnubmers(length) {
    var result = '';
    //var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters = '1234567890';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
console.log(colors.green("[?] ") + colors.brightGreen("Wybrany nick: ") + colors.green(nickname));
console.log(colors.green("[?] ") + colors.brightGreen("Wybrana ilosc botow: ") + colors.green(numberofbots));
console.log(colors.green("[?] ") + colors.brightGreen("Wybrany movement: ") + colors.green(movement));
console.log("");
next()

function createBot(name) {
    const bot = mineflayer.createBot({
        host: "mc.kersan.net",
        port: "25565",
        username: name,
        version: version,
    })

    bot.once('spawn', () => {
        //bot.chat('/rtp')
            //console.log(bot.entity.position);
            //bot.chat('/register Nigger123 Nigger123')
            /*for (let l = 0; l < 3; l++) {
                bot.chat(`Fuck Nigger`)
            }*/
            //bot.chat(`/register Nigger123 Nigger123`)

        //mineflayerViewer(bot, { port: 3000 })

        //rysoawnie sciezki bota na mapie - localhost:3000

        /*const path = [bot.entity.position.clone()]
        bot.on('move', () => {
            if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
                path.push(bot.entity.position.clone())
                bot.viewer.drawLine('path', path)
            }
        })*/
    })
    bot.on('spawn', () => {
        switch (movement) {
            case "1":
                move += 1;
                if (move == 1) {
                    console.log("");
                }
                bot.setControlState("left", false);
                console.log(colors.brightYellow("[MOVEMENT#1] ") + colors.yellow(bot.username) + colors.brightYellow(": forward"));
                bot.setControlState("forward", true);
                setTimeout(() => {
                    console.log(colors.brightYellow("[MOVEMENT#1] ") + colors.yellow(bot.username) + colors.brightYellow(": right"));
                    bot.setControlState("forward", false);
                    bot.setControlState("right", true)
                }, ms);
                setTimeout(() => {
                    console.log(colors.brightYellow("[MOVEMENT#1] ") + colors.yellow(bot.username) + colors.brightYellow(": back"));
                    bot.setControlState("right", false);
                    bot.setControlState("back", true)
                }, ms * 2);
                setTimeout(() => {
                    console.log(colors.brightYellow("[MOVEMENT#1] ") + colors.yellow(bot.username) + colors.brightYellow(": left"));
                    bot.setControlState("back", false);
                    bot.setControlState("left", true)
                }, ms * 3);
                setInterval(() => {
                    bot.setControlState("left", false);
                    console.log(colors.brightYellow("[MOVEMENT#1] ") + colors.yellow(bot.username) + colors.brightYellow(": forward"));
                    bot.setControlState("forward", true);
                    setTimeout(() => {
                        console.log(colors.brightYellow("[MOVEMENT#1] ") + colors.yellow(bot.username) + colors.brightYellow(": right"));
                        bot.setControlState("forward", false);
                        bot.setControlState("right", true)
                    }, ms);
                    setTimeout(() => {
                        console.log(colors.brightYellow("[MOVEMENT#1] ") + colors.yellow(bot.username) + colors.brightYellow(": back"));
                        bot.setControlState("right", false);
                        bot.setControlState("back", true)
                    }, ms * 2);
                    setTimeout(() => {
                        console.log(colors.brightYellow("[MOVEMENT#1] ") + colors.yellow(bot.username) + colors.brightYellow(": left"));
                        bot.setControlState("back", false);
                        bot.setControlState("left", true)
                    }, ms * 3);
                }, 4 * ms);
                break;
            case "2":
                move += 1;
                if (move == 1) {
                    console.log("");
                }
                bot.setControlState("back", false);
                console.log(colors.brightYellow("[MOVEMENT#2] ") + colors.yellow(bot.username) + colors.brightYellow(": forward"));
                bot.setControlState("forward", true);
                setTimeout(() => {
                    console.log(colors.brightYellow("[MOVEMENT#2] ") + colors.yellow(bot.username) + colors.brightYellow(": back"));
                    bot.setControlState("forward", false);
                    bot.setControlState("back", true)
                }, 10 * ms);
                setInterval(() => {
                    bot.setControlState("back", false);
                    console.log(colors.brightYellow("[MOVEMENT#2] ") + colors.yellow(bot.username) + colors.brightYellow(": forward"));
                    bot.setControlState("forward", true);
                    setTimeout(() => {
                        console.log(colors.brightYellow("[MOVEMENT#2] ") + colors.yellow(bot.username) + colors.brightYellow(": back"));
                        bot.setControlState("forward", false);
                        bot.setControlState("back", true)
                    }, 10 * ms);
                }, 20 * ms);
                break;

            default:
                move += 1;
                if (move == 1) {
                    console.log(colors.red("\n[!]") + colors.brightRed(" Wybierz movement w configu(settings.json)"));
                }
                break;
        }
    });
}