/**
 * Get environment variable value
 * @param name environment variable name
 * @param defaultValue default value if environment variable is not set
 * @returns environment variable value
 */
export function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Missing environment variable: ${name}`);
    }
    return defaultValue;
  }
  return value;
}

/**
 * if `FUNCTION_TARGET` is set, it should be running in production because `FUNCTION_TARGET` is only set on Google Cloud Functions.
 * see: https://cloud.google.com/functions/docs/configuring/env-var
 * @returns true if running in production, false if running in development
 */
export function isProduction(): boolean {
  try {
    getEnv("FUNCTION_TARGET");
    return true;
  } catch {
    return false;
  }
}
