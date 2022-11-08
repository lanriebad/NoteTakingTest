const PROXY_CONF_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:6000',
    secure: false
  }
];

module.exports = PROXY_CONF_CONFIG;
