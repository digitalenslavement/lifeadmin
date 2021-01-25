# PATHS

Config Paths Must Be Set Relatively To @app Directory (e.g. `./*` equals `@app/*`)

# USAGE

Config will be loaded as environment variable "GLOBAL_CONFIG", key-values of .json are reachable via this variable properties, e.g. GLOBAL_CONFIG["db-path"]

If you want to add new key-value pair into config, add it to `./interface.ts` as well
