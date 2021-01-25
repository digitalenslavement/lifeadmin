# PATHS

Config Paths Must Be Set Relatively To @src Directory (e.g. `./*` equals `@src/*`)

# USAGE

Config will be loaded as AppModule static member `_CONFIG`, key-values of .json are reachable via this variable properties, e.g. AppModule._CONFIG.db_path.

If you want to add new key-value pair into config, add it to `./interface.ts` as well
