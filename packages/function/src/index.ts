import type { HttpFunction } from "@google-cloud/functions-framework";

export const interactions: HttpFunction = (_, res) => {
  res.send("Hello Cloud Function!");
}
