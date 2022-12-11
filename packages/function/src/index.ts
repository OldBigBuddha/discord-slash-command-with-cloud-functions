import * as ff from "@google-cloud/functions-framework";

ff.http("interactions", (_: ff.Request, res: ff.Response) => {
  res.send("OK");
});
