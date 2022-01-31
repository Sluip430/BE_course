module.exports = {
  apps: [{
    name: 'server',
    script: 'start ts-node -- -P tsconfig.json index.ts',
    watch: '.',
  },
  ],

  deploy: {
    production: {
      user: 'sluip',
      host: '34.118.50.162',
      ref: 'origin/pre_deploy',
      repo: 'https://github.com/Sluip430/BE_course.git',
      path: '/home/sluip/FirstDeploy',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      env: {
        NODE_ENV: 'pre_deploy',
      },
      'pre-setup': 'rm -fr /home/sluip/FirstDeploy',
      'post-deploy': 'npm install',
    },
  },
};
