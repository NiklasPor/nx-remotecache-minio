[![npm package link](https://img.shields.io/npm/v/nx-remotecache-minio)](https://www.npmjs.com/package/nx-remotecache-minio)

# nx-remotecache-minio

A task runner for [@nrwl/nx](https://nx.dev/react) that uses an Minio Storage as a remote cache. This enables all team members and CI servers to share a single cache. The concept and benefits of [computation caching](https://nx.dev/angular/guides/computation-caching) are explained in the NX documentation.

This package was built with [nx-remotecache-custom](https://www.npmjs.com/package/nx-remotecache-minio) 🙌

## Setup

```
npm install --save-dev nx-remotecache-minio
```

| Parameter  | Description                                                             |  Environment Variable / .env | `nx.json`   |
| ---------- | ----------------------------------------------------------------------- | ---------------------------- | ----------- |
| Access Key | Connect to an MinIO Storage blob via a single URL.                      | `NX_CACHE_MINIO_ACCESS_KEY`  | `accessKey` |
| Secret Key | Use together with Account Key for MinIO Credentials Authentication      | `NX_CACHE_MINIO_SECRET_KEY`  | `secretKey` |
| URL        | Use together with Account Name for MinIO Credentials Authentication     | `NX_CACHE_MINIO_URL`         | `url`       |
| Bucket     | Required. Specify which container should be used for storing the cache. | `NX_CACHE_MINIO_CONTAINER`   | `bucket`    |
| Region     | Optional. Specify the location of the storage e.g. "us-west-1".         | `NX_CACHE_MINIO_REGION`      | `region`    |

```json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx-remotecache-minio",
      "options": {
        // All of the minio specific options can also be inserted via environment variables! ⬆️
        "accessKey": "minioadmin",
        "secretKey": "minioadmin",
        "url": "http://192.168.0.221:9000",
        "bucket": "nx-cache",
        "region": "us-west-1", // optional
        "cacheableOperations": ["build", "test", "lint", "e2e"]
      }
    }
  }
}
```

## Run it 🚀

Running tasks should now show the storage or retrieval from the remote cache:

```
------------------------------------------------------------------------
Built Angular Package
 - from: /Users/name/example-workspace/libs/example-lib
 - to:   /Users/name/example-workspace/dist/libs/example-lib
------------------------------------------------------------------------
------------------------------------------------------------------------
Stored output to remote cache: Minio Storage
Hash: d3d2bea71ea0f3004304c5cc88cf91be50b02bb636ebbdfcc927626fd8edf1ae
------------------------------------------------------------------------
```

## Advanced Configuration

| Option       | Environment Variable / .env | Description                                                                                           |
| ------------ | --------------------------- | ----------------------------------------------------------------------------------------------------- |
| `name`       | `NX_CACHE_NAME`             | Set to provide task runner name for logging. Overrides name provided in implementation.               |
| `verbose`    |                             | Set to receive full stack traces whenever errors occur. Best used for debugging. **Default:** `false` |
| `silent`     |                             | Set to mute success and info logs. **Default:** `false`                                               |
| `dotenv`     |                             | Set to `false` to disable reading `.env` into `process.env`. **Default:** `true`                      |
| `dotenvPath` |                             | Set to read `.env` files from a different folder.                                                     |

```json
"tasksRunnerOptions": {
  "default": {
    "options": {
      "name": "My Storage",
      "verbose": true,
      "silent": true
    }
  }
}
```

## All Custom Runners

| Runner                                                                     | Storage             |
| -------------------------------------------------------------------------- | ------------------- |
| [nx-remotecache-azure](https://www.npmjs.com/package/nx-remotecache-azure) |  Azure Blob Storage |
| [nx-remotecache-minio](https://www.npmjs.com/package/nx-remotecache-minio) |  MinIO Storage      |
