[![npm package link](https://img.shields.io/npm/v/nx-remotecache-minio)](https://www.npmjs.com/package/nx-remotecache-minio)
[![Sponsored by LastBIM](https://img.shields.io/badge/Sponsored_by-LastBIM-6887DA)](https://lastbim.com)

# The future of `nx-remotecache-*`

Nrwl Nx just introduced us to **Powerpack**. It's the clear successor of the remote cache setup and officially supports custom caching solutions. This will mark the end of the `nx-remotecache-*` packages as custom caching solutions based on the filesystem won't work anymore starting with Nx 21.

Powerpack fills exactly the void that `nx-remotecache-custom` filled. Therefore I'm happy to give this topic back to the creators behind Nx. Thanks for the great ride – we reached over 114,000 weekly downloads on npm as I'm writing this 🥳

Feel free to read the [Introduction to Powerpack](https://nx.dev/blog/evolving-nx#introducing-nx-powerpack) by Jeff yourself. If you have any further questions checkout the pinned GitHub [issue](https://github.com/NiklasPor/nx-remotecache-custom/issues/48).

Cheers, Niklas 👋

## nx-remotecache-minio

A task runner for [@nrwl/nx](https://nx.dev/react) that uses an Minio Storage as a remote cache. This enables all team members and CI servers to share a single cache. The concept and benefits of [computation caching](https://nx.dev/angular/guides/computation-caching) are explained in the NX documentation.

This package was built with [nx-remotecache-custom](https://www.npmjs.com/package/nx-remotecache-custom) 🙌

## Compatability

|  Nx               | Remote Cache     |
| ----------------- | ---------------- |
|  `>= 21`          | `Deprecated`     |
|  `>= 20.0.0 < 21` | `>= 20.0.0`      |
|  `>= 19.0.0 < 20` | `>= 19.0.0 < 20` |
|  `>= 18.0.0 < 19` | `>= 18.0.0 < 19` |
|  `>= 17.0.0 < 18` | `>= 17.0.0 < 18` |
|  `>= 16.9.0 < 17` |  `>= 5.0.0 < 17` |
|  `< 16.9.0`       |  `< 5.0.0`       |

## Setup

```
npm install --save-dev nx-remotecache-minio
```

| Parameter  | Description                                                             |  Environment Variable / .env | `nx.json`   |
| ---------- | ----------------------------------------------------------------------- | ---------------------------- | ----------- |
| Access Key | Connect to an MinIO Storage blob via a single URL.                      | `NXCACHE_MINIO_ACCESS_KEY`   | `accessKey` |
| Secret Key | Use together with Account Key for MinIO Credentials Authentication      | `NXCACHE_MINIO_SECRET_KEY`   | `secretKey` |
| URL        | Use together with Account Name for MinIO Credentials Authentication     | `NXCACHE_MINIO_URL`          | `url`       |
| Bucket     | Required. Specify which container should be used for storing the cache. | `NXCACHE_MINIO_BUCKET`       | `bucket`    |
| Region     | Optional. Specify the location of the storage e.g. "us-west-1".         | `NXCACHE_MINIO_REGION`       | `region`    |
| PathStyle  | Optional. Set to `false` to use virtual host style.                     | `NXCACHE_MINIO_PATH_STYLE`   | `pathStyle` |

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
| `name`       | `NXCACHE_NAME`              | Set to provide task runner name for logging. Overrides name provided in implementation.               |
| `verbose`    |                             | Set to receive full stack traces whenever errors occur. Best used for debugging. **Default:** `false` |
| `silent`     |                             | Set to mute success and info logs. **Default:** `false`                                               |
| `read`       | `NXCACHE_READ`              | Set to enable / disable reading from the remote cache. **Default:** `true`                            |
| `write`      | `NXCACHE_WRITE`             | Set to enable / disable writing to the remote cache. **Default:** `true`                              |
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
