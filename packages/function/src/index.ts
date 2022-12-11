import { InteractionResponseType, InteractionType, verifyKey } from "discord-interactions";

import { getEnv, isProduction } from "utils/env";
import { getSecret } from "utils/secret";

import type { HttpFunction, Request, Response } from "@google-cloud/functions-framework";

export const interactions: HttpFunction = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  isValidRequest(req).then((isValid) => {
    if (!isValid) {
      res.status(401).send();
      return;
    }

    // Handle request
    const interaction = req.body;

    if (interaction !== undefined && interaction.type === InteractionType.APPLICATION_COMMAND) {
      // Handle application command
      res.status(200).header({
        "Content-Type": "application/json",
      }).send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: "Hello world!",
        },
      });
    } else {
      // NOTE: there are other interaction types, but we don't need to handle them for now
      pong(res);
      return;
    }

  });
}

async function isValidRequest(req: Request): Promise<boolean> {
  const sig = req.headers["x-signature-ed25519"];
  const time = req.headers["x-signature-timestamp"];
  const rawBody = req.rawBody;

  if (!sig || !time || !rawBody) {
    return false;
  }

  return await verifyKey(rawBody, sig.toString(), time.toString(), await getPublicKey());
}

function pong(res: Response) {
  res.send({
    type: InteractionResponseType.PONG,
  });
}

async function getPublicKey(): Promise<string> {
  if(isProduction()) {
    return await getSecret("DISCORD_PUBLIC_KEY");
  } else {
    require("dotenv").config();
    return getEnv("DISCORD_PUBLIC_KEY");
  }
}
