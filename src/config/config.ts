export const config = {
  ringCentral: {
    server: 'https://platform.ringcentral.com',
    clientId: 'SAMPLE_CLIENT_ID',
    clientSecret: 'SAMPLE_CLIENT_SECRET',
    username: 'SAMPLE_PHONE_NUMBER',
    password: 'SAMPLE_PASSWORD',
  },
  aws: {
    region: 'us-east-1',
    accessKeyId: 'SAMPLE_AWS_ACCESS_KEY',
    secretAccessKey: 'SAMPLE_AWS_SECRET_KEY',
  },
  google: {
    projectId: 'SAMPLE_GOOGLE_PROJECT_ID',
    keyFile: 'path/to/google-credentials.json',
  },
  server: {
    port: 3000,
    webhookUrl: 'https://your-ngrok-url.ngrok.io/webhook', // Replace with real URL later
  },
  dataFile: '../client_data.json', // Adjusted for relative path from src/data/
};

// Available promo times (Wednesday-Sunday, 10am, 12pm, 2pm PT)
export const promoTimes = {
  days: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  times: ['10:00', '12:00', '14:00'], // 24-hr format, PT
};
