# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 18.0.0

## Breaking Changes

- Nx support starts at 18.0.0

## 17.1.1

### Chore

- Update README.md & CHANGELOG.md

## 17.1.0

### Added

- Nx Tasks are now available in the callback passed to `createCustomRunner`. Fixes [#30](https://github.com/NiklasPor/nx-remotecache-custom/issues/30).

### Fixed

- Prevent call to `getSafeRemoteCacheImplementation` if both `read` and `write` are disabled.
- Fix filter source implementation to work OS independently. Fixes [#31](https://github.com/NiklasPor/nx-remotecache-custom/issues/31).

## 17.0.0

### Breaking Change

- Major versioning is now synced to nx.
- Nx support now starts at `17.0.0`.

### Added

- Users can now set `pathStyle` to `false` for non AWS endpoints. Thanks to [Zeeko](https://github.com/ZeekoZhu).

### Fixed

- Nx dev/peer dependency switched from `@nx/workspace` to `nx`. Fixes [#27](https://github.com/NiklasPor/nx-remotecache-custom/issues/27).

## 5.0.1

### Fixed

- Fixes [#26](https://github.com/NiklasPor/nx-remotecache-custom/issues/26) (`local cache artifact in "*" was not been generated on this machine`) error.

## 5.0.0

### Breaking Change

- Nx support now starts at `16.9.0` (due to breaking internal cache changes).

## 4.2.0

### Fixed

- Fixed `zlib: unexpected end of file` error for version Node 18.
- `read` and `write` flags now prioritize environment variables over the `nx.json`.
- Support for Nx version 16.6.0+ by removing the machine id from stored artifacts.

## 4.1.0

### Added

- Options `read` and `write` now allow to disable reading and writing from / to the remote cache separately.

## 4.0.0

### Breaking Changes

- Nx support now starts at 16.0.0

## 3.0.0

### Breaking Changes

- Environment variables now start with `NXCACHE_` instead of `NX_CACHE_` to prevent leaking credentials

## 2.0.0

### Breaking Changes

- Implementation is now stream based to reduce memory overhead.
- All file system writes are now fully asynchronous.
- Filenames are now suffixed to prevent incorrect cache hits with older version

## 1.2.0

### Added

- Added `name` task runner option and `NXCACHE_NAME` env variable to set a custom cache name

# 1.1.0

### Added

- Support for region option to specify storage location

# 1.0.0

### Changed

- Code cleanup
- Finish up documentation

## 0.0.1

### Added

- Initial release of `ngx-remotecache-minio`
