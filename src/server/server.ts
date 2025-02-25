import express from 'express';
import { agent } from '../agents/agent';
import { config } from '../config/config';

const app = express();
app.use(express.json());

async function start() {
  await agent.initialize();

  // Setup RingCentral subscription
  const platform = agent['platform']; // Access private field for demo
  await platform.post('/restapi/v1.0/subscription', {
    eventFilters: ['/restapi/v1.0/account/~/telephony/sessions'],
    deliveryMode: { transportType: 'WebHook', address: config.server.webhookUrl },
  }).then((response) => console.log('Subscription active:', response.data));

  app.post('/webhook', (req, res) => {
    const event = req.body;
    if (event.event === '/restapi/v1.0/account/~/telephony/sessions' && event.body.eventType === 'CallStarted') {
      agent.handleCall(event.body).catch(console.error);
    }
    res.status(200).send('OK');
  });

  app.listen(config.server.port, () => console.log(`Agent live on port ${config.server.port}`));
}

start().catch(console.error);
