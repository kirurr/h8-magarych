import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { writeTargetUserId } from "../utils.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("change-target")
    .setDescription("сменить id магарыча")
    .addStringOption((option) =>
      option.setName("target").setDescription("id магарыча"),
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("id магарыча"),
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("user");
    const string = interaction.options.getString("target");

    if (user) {
      interaction.reply(`теперь магарыч - ${user.displayName}`);
			writeTargetUserId(user.id);
      return;
    }
    if (string) {
      interaction.reply(`теперь id магарыча - ${string}`);
			writeTargetUserId(string);
      return;
    }

		interaction.reply("не указано ни id магарыча, ни имя магарыча, теперь ты магарыч");
		writeTargetUserId(interaction.user.id);
  },
};
