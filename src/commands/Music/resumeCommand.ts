import type { Guild, Message } from "discord.js-light";
import { CommandConf } from "../../decorators";
import Command from "../../structures/Command";
@CommandConf({ 
    name: "resume",
    aliases: [],
    description: "resume current queue",
    usage: "",
    cooldown: 3,
    ownerOnly: false
})

export default class resumeCommand extends Command {
    public async exec(msg: Message, args: string[]) {
        const voiceChannel = msg.member?.voice.channel
        const serverQueue = this.client.queue.get(msg.guild?.id as Guild["id"]) as any
        if (!voiceChannel) return msg.channel.send("You must join voiceChannel first");
        if (this.client.queue.has(msg.guild?.id as Guild["id"]) && voiceChannel.id !== this.client.queue.get(msg.guild?.id as Guild["id"])?.voiceChannel.id)return msg.channel.send(`You must be in **${this.client.queue?.get(msg.guild?.id as Guild["id"])?.voiceChannel.name}** to resume music`);
        const noQueue = this.client.util.embed()
        .setTitle("Error!")
        .setDescription("There are no music playing")
        .setColor(this.client.util.color)
        .setThumbnail(msg.author?.avatarURL({ dynamic: true }) as any)
        if(!serverQueue) return msg.channel.send(noQueue);
        const noPlayingEmbed = this.client.util.embed()
        .setTitle("Error!")
        .setDescription("I can't resume the song that already playing")
        .setColor(this.client.util.color)
        .setThumbnail(msg.author?.avatarURL({ dynamic: true }) as any)
        if(serverQueue.playing) return msg.channel.send(noPlayingEmbed);
        this.client.musicManager.resume(msg)
        const embed = this.client.util.embed()
        .setTitle("Resumed current queue")
        .setDescription("Your queue has been resumed!")
        .setThumbnail(msg.author?.avatarURL({ dynamic: true }) as any)
        .setColor(this.client.util.color)
        msg.channel.send(embed)
    }
}