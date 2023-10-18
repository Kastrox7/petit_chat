/*
 * NOTICE OF LICENCE
 * Le code source de ce fichier est propriété de Mathieu Coingt
 *
 * Contact : Mathieu Coingt <mathieu@coingt.dev>
 * Website : https://coingt.dev
 * Date : 11/09/2021 18:30
 */

"use strict";

function afterDeployProd(context) {
	return [
		`rm -rf ${context.release.path}/translations`,
		`mkdir -p ${context.options.deployPath}/${context.options.sharedFolder}/translations`,
		`ln -s ${context.options.deployPath}/${context.options.sharedFolder}/translations ${context.release.path}/translations`,
		`php ${context.release.path}/bin/console d:m:m -n`,
		`php ${context.release.path}/bin/console c:c`,
	];
}

module.exports = function (options) {
	return {
		common: {
			mode: 'synchronize',
			currentReleaseLink: 'current',
			localPath: process.cwd(), //Use "process.cwd()" if the local path needs to be "./". Don't leave it blank
			share: {
				'uploads': 'public/uploads',
				'media-cache': 'public/media',
				'log': 'var/log',
			},
			exclude: [
				'.ddev/**',
				'.ddev',
				'.git/**',
				'.git',
				'.github/**',
				'.github',
				'.npm/**',
				'.npm',
				'assets/**',
				'assets',
				'public/media/**',
				'public/media',
				'public/uploads/**',
				'public/uploads',
				'tests/**',
				'tests',
				'var/**',
				'var',
			],
			create: [
				'var',
				'var/log'
			],
		},
		
		environments: {
			production: {
				host: process.env.SSH_HOST,
				username: process.env.SSH_LOGIN,
				password: process.env.SSH_PWD,
				port: 22,
				deployPath: process.env.SSH_PATH,
				onAfterDeploy: afterDeployProd,
			},
		}
	};
};
