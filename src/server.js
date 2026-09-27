const app = require('./app');
const env = require('./config/env');

// Start the HTTP server
// This is the only place in the whole project that should call .listen()
app.listen(env.port, () => {
  console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
});