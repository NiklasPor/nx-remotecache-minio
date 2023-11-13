import { Client } from "minio";
import {
  createCustomRunner,
  CustomRunnerOptions,
  initEnv,
  RemoteCacheImplementation,
} from "nx-remotecache-custom";

const ENV_URL = "NXCACHE_MINIO_URL";
const ENV_ACCESS_KEY = "NXCACHE_MINIO_ACCESS_KEY";
const ENV_SECRET_KEY = "NXCACHE_MINIO_SECRET_KEY";
const ENV_BUCKET = "NXCACHE_MINIO_BUCKET";
const ENV_REGION = "NXCACHE_MINIO_REGION";
const ENV_PATH_STYLE = "NXCACHE_MINIO_PATH_STYLE";

const getEnv = (key: string) => process.env[key];

function stringToBool(value: string | undefined | boolean) {
  if (typeof value !== "string") return value;

  const lowercased = value.toLowerCase();
  if (lowercased === "true") return true;
  if (lowercased === "false") return false;

  return undefined;
}

interface MinioRunnerOptions {
  url: string;
  secretKey: string;
  accessKey: string;
  bucket: string;
  region?: string;
  pathStyle?: boolean;
}

function getClient(options: CustomRunnerOptions<MinioRunnerOptions>): Client {
  const url = new URL(getEnv(ENV_URL) ?? options.url);

  return new Client({
    port: parseInt(url.port),
    endPoint: url.hostname,
    useSSL: url.protocol === "https:",
    accessKey: getEnv(ENV_ACCESS_KEY) ?? options.accessKey,
    secretKey: getEnv(ENV_SECRET_KEY) ?? options.secretKey,
    region: getEnv(ENV_REGION) ?? options.region,
    pathStyle: stringToBool(getEnv(ENV_PATH_STYLE)) ?? options.pathStyle,
  });
}

const runner: unknown = createCustomRunner<MinioRunnerOptions>(
  async (options): Promise<RemoteCacheImplementation> => {
    initEnv(options);

    const client = getClient(options);
    const bucket = getEnv(ENV_BUCKET) ?? options.bucket;

    return {
      name: "Minio Storage",
      fileExists: async (filename) => {
        try {
          const result = await client.statObject(bucket, filename);
          return !!result;
        } catch (_) {
          return false;
        }
      },
      retrieveFile: (filename) => client.getObject(bucket, filename),
      storeFile: (filename, stream) =>
        client.putObject(bucket, filename, stream),
    };
  }
);

export default runner;
