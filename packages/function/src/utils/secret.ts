import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

const GCP_PROJECT_ID = "discord-slash-command-sample";

export async function getSecret(secretName: string): Promise<string> {
  const [version] = await client.accessSecretVersion({
    name: `projects/${GCP_PROJECT_ID}/secrets/${secretName}/versions/latest`,
  });

  if (version.payload == null || version.payload.data == null) {
    throw new Error("No payload found");
  }
  return version.payload.data.toString();
}
