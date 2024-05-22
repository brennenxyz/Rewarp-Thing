import { getFormattedChat } from "../ClientsideChat/index"
import PogObject from "../PogData"


let rewarping = false;

const data = new PogObject("Rewarper", { rewarpPos: [], type: "netherwart:1" })
const fhPests = Java.type("com.jelly.farmhelperv2.feature.impl.PestsDestroyer")

const rewarp = new Thread(() => {
    ChatLib.command("/ez-stopscript", true)
    ChatLib.command("warp garden")
    Thread.sleep(1500)
    if(!fhPests.getInstance().canEnableMacro(true)) {
        ChatLib.command("ez-startscript " + data.type, true)
    } else {
        fhPests.getInstance().start()
    }

    rewarping = false;
})

register("command", () => {
    data.rewarpPos = [ Math.floor(Player.getX()), Math.floor(Player.getY()), Math.floor(Player.getZ()) ]
    data.save()
}).setName("rewarpset")

register("command", (arg1) => {
    data.type = arg1
    data.save()
}).setName("typeset")

register("step", () => {
    let formattedChat = getFormattedChat(2);

    formattedChat.forEach((messageContent) => {
        if (messageContent.includes("§r[Pests Destroyer] Stopping!")) {
            fhPests.getInstance().stop()
            ChatLib.chat("[Rewarper] Pests Destroyer Stopped...")
            
            ChatLib.command("warp garden")
            ChatLib.chat("[Rewarper] Rewarping...")

            setTimeout(() => {
                ChatLib.command("ez-startscript " + data.type, true)
                ChatLib.chat("[Rewarper] Starting Taunahi Script...")
            }, 1500);
        }
    })

    if(Math.floor(Player.getX()) == data.rewarpPos[0] && Math.floor(Player.getY()) == data.rewarpPos[1] && Math.floor(Player.getZ()) == data.rewarpPos[2]) {
        if(rewarping) return;
        rewarping = true;
        rewarp.start()
    }
})
