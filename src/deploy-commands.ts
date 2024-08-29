import "dotenv/config";
import { REST, Routes } from "discord.js";
import changeTarget from "./commands/change-target";

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.APP_ID;

const commands = [];

commands.push(changeTarget.data.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token!);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(Routes.applicationCommands(clientId!), {
      body: commands,
    })) as any;

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
