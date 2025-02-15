import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    // Injecting your Stream API key into Expo's runtime configuration
    streamApiKey: process.env.STREAM_API_KEY,
  },
}); 