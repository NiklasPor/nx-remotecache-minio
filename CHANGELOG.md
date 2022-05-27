# Changelog

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2.0.0

### Breaking Changes

- Implementation is now stream based to reduce memory overhead.
- All file system writes are now fully asynchronous.
- Filenames are now suffixed to prevent incorrect cache hits with older version

## 1.2.0

### Added

- Added `name` task runner option and `NX_CACHE_NAME` env variable to set a custom cache name

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
