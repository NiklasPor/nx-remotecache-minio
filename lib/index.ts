import { Client } from "minio";
import {
  createCustomRunner,
  CustomRunnerOptions,
  initEnv,
  RemoteCacheImplementation,
} from "nx-remotecache-custom";

const ENV_URL = "NX_CACHE_MINIO_URL";
const ENV_ACCESS_KEY = "NX_CACHE_MINIO_ACCESS_KEY";
const ENV_SECRET_KEY = "NX_CACHE_MINIO_SECRET_KEY";
const ENV_BUCKET = "NX_CACHE_MINIO_BUCKET";
const ENV_REGION = "NX_CACHE_MINIO_REGION";

const getEnv = (key: string) => process.env[key];

interface MinioRunnerOptions {
  url: string;
  secretKey: string;
  accessKey: string;
  bucket: string;
  region?: string;
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
