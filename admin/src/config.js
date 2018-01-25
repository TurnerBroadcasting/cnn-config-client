export default {    
    'apiServerUrl' : (process.env.NODE_ENV !== 'production') ?  'http://cnn-config-server.dev.services.ec2.dmtio.net' :  'http://cnn-config.api.cnn.io',
    'authToken':(process.env.NODE_ENV!=='production') ? 'Bearer th1s1sat3stt0k3n!':'Bearer '
  };
  