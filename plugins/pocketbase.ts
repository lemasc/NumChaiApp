import PocketBase from "pocketbase";
import Constants from "expo-constants";
/**
 * Define the PocketBase server url. If undefined, it will be retrieved from the expo manifest.
 */
const serverUrl: string | undefined = undefined;

/**
 * In case the server url is not defined, define the port to use to access the local server.
 */
const localPocketbasePort = 8090;

const getUrlFromExpo = () => {
  // Parse the expo manifest to get the hostUri and bundleUrl.
  const { hostUri, bundleUrl } = Constants.manifest;
  if (!hostUri) {
    throw new Error(
      "Couldn't retrieve Pocketbase URL from Expo manifest. Please specify explicitly."
    );
  }
  const replacedPort = hostUri.replace(/:[0-9]{4,}/, `:${localPocketbasePort}`);
  const isHttps = /^https/.test(bundleUrl);
  const protocol = isHttps ? "https" : "http";
  return `${protocol}://${replacedPort}`;
};

const url = serverUrl || getUrlFromExpo();

console.log(url);
const pb = new PocketBase(url);

export default pb;
