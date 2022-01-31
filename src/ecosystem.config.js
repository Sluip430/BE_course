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
      ref: 'origin/aws_s3_second',
      repo: 'git@github.com/Sluip430/BE_course',
      path: '/home/user/Documents/BE_course',
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      env: {
        NODE_ENV: 'aws_s3_second',
      },
      'pre-setup': 'rm -fr /home/user/Documents/BE_course',
      'post-deploy': 'npm install && pm2 start ts-node -- -P tsconfig.json index.ts',
    },
  },
};
