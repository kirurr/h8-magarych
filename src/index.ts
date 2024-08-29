import "dotenv/config";
import {
  Client,
  GatewayIntentBits,
  Events,
  Collection,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import changeTarget from "./commands/change-target";
import { readTargetUserId } from "./utils";

type Command = {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
};

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.commands = new Collection();

client.commands.set(changeTarget.data.name, changeTarget);

client.once("ready", () => {
  console.log(`Бот ${client.user!.tag} успешно запущен!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.on("messageCreate", (message) => {
	const targetUserId = readTargetUserId();
  if (message.author.id === targetUserId && !message.author.bot) {
    message.reply("магарыч пидарас!");
  }
});
const token = process.env.DISCORD_TOKEN;
client.login(token);
