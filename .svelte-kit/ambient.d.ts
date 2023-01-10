
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const RISIDIO_API: string;
	export const TERM_PROGRAM: string;
	export const NODE: string;
	export const SQUARE_ACCESS_TOKEN: string;
	export const INIT_CWD: string;
	export const NVM_CD_FLAGS: string;
	export const SHELL: string;
	export const TERM: string;
	export const DOCKER_HUB_TOKEN: string;
	export const BB_PATH: string;
	export const CATALINA_HOME: string;
	export const npm_config_metrics_registry: string;
	export const TMPDIR: string;
	export const WPHRASE: string;
	export const npm_config_global_prefix: string;
	export const TERM_PROGRAM_VERSION: string;
	export const STACKS_PRIKEY: string;
	export const BTC_ACCESS_KEY_ID: string;
	export const CLOUDINARY_API_SECRET: string;
	export const COLOR: string;
	export const TERM_SESSION_ID: string;
	export const npm_config_noproxy: string;
	export const npm_config_local_prefix: string;
	export const STACKS_SIGNER_PRIKEY: string;
	export const ATOM_HOME: string;
	export const STACKS_PUBKEY: string;
	export const ANSIBLE_HOSTS: string;
	export const MY_MAINT_BIN: string;
	export const USER: string;
	export const SQUARE_APPLICATION_SECRET: string;
	export const NVM_DIR: string;
	export const COMMAND_MODE: string;
	export const DOCKER_BDX_HOME: string;
	export const npm_config_globalconfig: string;
	export const SPRING_PROFILES_ACTIVE: string;
	export const SSH_AUTH_SOCK: string;
	export const STACKS_ALLOWED_IP: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_execpath: string;
	export const NEO_HOME1: string;
	export const SQUARE_APPLICATION_ID: string;
	export const MAVEN_OPTS: string;
	export const NEO_HOME2: string;
	export const BACKUP_PHRASE: string;
	export const PATH: string;
	export const SQUARE_SM_APPLICATION_ID: string;
	export const MAVEN_HOME: string;
	export const SQUARE_SM_LOCATION_ID: string;
	export const npm_package_json: string;
	export const npm_config_engine_strict: string;
	export const _: string;
	export const npm_config_userconfig: string;
	export const npm_config_init_module: string;
	export const __CFBundleIdentifier: string;
	export const npm_command: string;
	export const PWD: string;
	export const JAVA_HOME: string;
	export const RABBIT_HOME: string;
	export const npm_lifecycle_event: string;
	export const EDITOR: string;
	export const AWS_SECRET_ACCESS_KEY: string;
	export const npm_package_name: string;
	export const LANG: string;
	export const ITERM_PROFILE: string;
	export const AWS_REGION: string;
	export const XPC_FLAGS: string;
	export const STXECO_API: string;
	export const AWSCLI_HOME: string;
	export const OPENNODE_API_KEY: string;
	export const npm_config_node_gyp: string;
	export const npm_package_version: string;
	export const XPC_SERVICE_NAME: string;
	export const AWS_ACCESS_KEY_ID: string;
	export const COLORFGBG: string;
	export const HOME: string;
	export const SHLVL: string;
	export const STACKS_SIGNER_ADDRESS: string;
	export const CLOUDINARY_ENV_VAR: string;
	export const MY_BIN2: string;
	export const SAFE_PATH: string;
	export const OPENNODE_API_KEY_SM: string;
	export const GRPCPATH: string;
	export const NODEJS_HOME: string;
	export const ITERM_SESSION_ID: string;
	export const GIT_HOME: string;
	export const npm_config_cache: string;
	export const LOGNAME: string;
	export const npm_lifecycle_script: string;
	export const MY_BIN: string;
	export const SQUARE_LOCATION_ID: string;
	export const GOPATH: string;
	export const NVM_BIN: string;
	export const npm_config_user_agent: string;
	export const STACKS_NETWORK: string;
	export const MYSQL_HOME: string;
	export const OPENNODE_ECOM_KEY: string;
	export const STACKS_SIGNER_PUBKEY: string;
	export const CLOUDINARY_API_KEY: string;
	export const SQUARE_SM_APPLICATION_SECRET: string;
	export const NODE_HOME: string;
	export const COINFUSION_SCRIPTS: string;
	export const npm_node_execpath: string;
	export const npm_config_prefix: string;
	export const COLORTERM: string;
	export const SQUARE_SM_ACCESS_TOKEN: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {

}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env).
 * 
 * This module cannot be imported into client-side code.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		RISIDIO_API: string;
		TERM_PROGRAM: string;
		NODE: string;
		SQUARE_ACCESS_TOKEN: string;
		INIT_CWD: string;
		NVM_CD_FLAGS: string;
		SHELL: string;
		TERM: string;
		DOCKER_HUB_TOKEN: string;
		BB_PATH: string;
		CATALINA_HOME: string;
		npm_config_metrics_registry: string;
		TMPDIR: string;
		WPHRASE: string;
		npm_config_global_prefix: string;
		TERM_PROGRAM_VERSION: string;
		STACKS_PRIKEY: string;
		BTC_ACCESS_KEY_ID: string;
		CLOUDINARY_API_SECRET: string;
		COLOR: string;
		TERM_SESSION_ID: string;
		npm_config_noproxy: string;
		npm_config_local_prefix: string;
		STACKS_SIGNER_PRIKEY: string;
		ATOM_HOME: string;
		STACKS_PUBKEY: string;
		ANSIBLE_HOSTS: string;
		MY_MAINT_BIN: string;
		USER: string;
		SQUARE_APPLICATION_SECRET: string;
		NVM_DIR: string;
		COMMAND_MODE: string;
		DOCKER_BDX_HOME: string;
		npm_config_globalconfig: string;
		SPRING_PROFILES_ACTIVE: string;
		SSH_AUTH_SOCK: string;
		STACKS_ALLOWED_IP: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_execpath: string;
		NEO_HOME1: string;
		SQUARE_APPLICATION_ID: string;
		MAVEN_OPTS: string;
		NEO_HOME2: string;
		BACKUP_PHRASE: string;
		PATH: string;
		SQUARE_SM_APPLICATION_ID: string;
		MAVEN_HOME: string;
		SQUARE_SM_LOCATION_ID: string;
		npm_package_json: string;
		npm_config_engine_strict: string;
		_: string;
		npm_config_userconfig: string;
		npm_config_init_module: string;
		__CFBundleIdentifier: string;
		npm_command: string;
		PWD: string;
		JAVA_HOME: string;
		RABBIT_HOME: string;
		npm_lifecycle_event: string;
		EDITOR: string;
		AWS_SECRET_ACCESS_KEY: string;
		npm_package_name: string;
		LANG: string;
		ITERM_PROFILE: string;
		AWS_REGION: string;
		XPC_FLAGS: string;
		STXECO_API: string;
		AWSCLI_HOME: string;
		OPENNODE_API_KEY: string;
		npm_config_node_gyp: string;
		npm_package_version: string;
		XPC_SERVICE_NAME: string;
		AWS_ACCESS_KEY_ID: string;
		COLORFGBG: string;
		HOME: string;
		SHLVL: string;
		STACKS_SIGNER_ADDRESS: string;
		CLOUDINARY_ENV_VAR: string;
		MY_BIN2: string;
		SAFE_PATH: string;
		OPENNODE_API_KEY_SM: string;
		GRPCPATH: string;
		NODEJS_HOME: string;
		ITERM_SESSION_ID: string;
		GIT_HOME: string;
		npm_config_cache: string;
		LOGNAME: string;
		npm_lifecycle_script: string;
		MY_BIN: string;
		SQUARE_LOCATION_ID: string;
		GOPATH: string;
		NVM_BIN: string;
		npm_config_user_agent: string;
		STACKS_NETWORK: string;
		MYSQL_HOME: string;
		OPENNODE_ECOM_KEY: string;
		STACKS_SIGNER_PUBKEY: string;
		CLOUDINARY_API_KEY: string;
		SQUARE_SM_APPLICATION_SECRET: string;
		NODE_HOME: string;
		COINFUSION_SCRIPTS: string;
		npm_node_execpath: string;
		npm_config_prefix: string;
		COLORTERM: string;
		SQUARE_SM_ACCESS_TOKEN: string;
		NODE_ENV: string;
		[key: string]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: string]: string | undefined;
	}
}
