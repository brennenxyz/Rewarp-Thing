import { getFormattedChat } from "../ClientsideChat/index"

let rewarping = false;
let rewarpPos = []

const fhPests = Java.type("com.jelly.farmhelperv2.feature.impl.PestsDestroyer")
const rewarp = new Thread(() => {
    ChatLib.command("/ez-stopscript", true)
    ChatLib.command("warp garden")
    Thread.sleep(1500)
    if(!fhPests.getInstance().canEnableMacro(true)) {
        ChatLib.command("ez-startscript netherwart:1", true)
    } else {
        fhPests.getInstance().start()
    }

    rewarping = false;
})

register("command", () => {
    rewarpPos = [ 
        Math.floor(Player.getX()),
        Math.floor(Player.getY()),
        Math.floor(Player.getZ()),
    ]
}).setName("rewarpset")

register("step", () => {
    let formattedChat = getFormattedChat(2);

    formattedChat.forEach((messageContent) => {
        if (messageContent.includes("§r[Pests Destroyer] Stopping!")) {
            ChatLib.chat("restarting macro 0")
            ChatLib.chat("restarting macro 1")
            ChatLib.chat("restarting macro 2")
            ChatLib.chat("restarting macro 3")
            fhPests.getInstance().stop()
            ChatLib.command("warp garden")
            setTimeout(() => {
                ChatLib.command("ez-startscript netherwart:1", true)
            }, 1500);
        }
    })

    if(Math.floor(Player.getX()) == rewarpPos[0] && Math.floor(Player.getY()) == rewarpPos[1] && Math.floor(Player.getZ()) == rewarpPos[2]) {
        if(rewarping) return;
        rewarping = true;
        rewarp.start()
    }
})