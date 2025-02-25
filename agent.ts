import { SDK } from '@ringcentral/sdk';
import { synthesizeSpeech } from './speech';
import { dataStore, ClientData } from './dataStore';
import { config, promoTimes } from './config';

const rc = new SDK({
  server: config.ringCentral.server,
  clientId: config.ringCentral.clientId,
  clientSecret: config.ringCentral.clientSecret,
});

const platform = rc.platform();

export class CallAgent {
  private callSession: any;

  async initialize() {
    await platform.login({
      username: config.ringCentral.username,
      password: config.ringCentral.password,
    });
    await dataStore.load();
  }

  async handleCall(call: any) {
    this.callSession = call;
    await this.answerCall();
    await this.converse();
  }

  private async answerCall() {
    const greeting = 'Travel Focus and Fulfillment Focus Group, this is Nathan';
    const audio = await synthesizeSpeech(greeting);
    await platform.post(`/restapi/v1.0/account/~/telephony/sessions/${this.callSession.sessionId}/answer`);
    // TODO: Integrate with media server to play audio (placeholder for now)
    console.log('Playing:', greeting);
  }

  private async converse() {
    const clientData: Partial<ClientData> = { callTimestamp: new Date().toISOString() };

    // Simulate client: "Hi, I got this postcard in the mail..."
    const clientIntro = "Hi, I got this postcard in the mail, and I was wondering what it’s all about.";
    console.log('Client:', clientIntro);

    // Ask for claim ID
    const claimPrompt = 'Is there a claim ID number on that piece of mail?';
    await this.speak(claimPrompt);
    const claimId = await this.listen(); // Simulated for now
    clientData.claimId = claimId || 'SAMPLE_CLAIM_123';
    clientData.phoneNumber = this.callSession.callerId || 'SAMPLE_PHONE';

    // Explain the offer
    const offer = 'OK, thank you! This is an offer for an 8-day, 7-night cruise for two with round-trip airfare for two. All you need to do to participate is hop on your computer one of these days, join us on Zoom, and we’ll show you a demonstration for a travel aggregator you can use to book hotels and resorts all over the world. There’s no cost or obligation—you receive the gifts just for attending, and it’ll take about an hour out of your day.';
    await this.speak(offer);

    // Client: "OK, how do I sign up?"
    console.log('Client: OK, how do I sign up?');

    // Offer times and collect info
    const timePrompt = 'I can make the reservation for you. You can attend at 10 AM, 12 PM, or 2 PM Pacific Time, Wednesday through Sunday. What day and time works for you?';
    await this.speak(timePrompt);
    const promoTime = await this.listen(); // Simulated: "Wednesday at 12 PM"
    clientData.promoDateTime = promoTime || 'Wednesday 12:00 PT';

    const emailPrompt = 'What’s the best email address to send the confirmation to?';
    await this.speak(emailPrompt);
    clientData.email = await this.listen() || 'sample@example.com';

    const firstNamePrompt = 'And just to confirm, what’s your first name?';
    await this.speak(firstNamePrompt);
    clientData.firstName = await this.listen() || 'John';

    const lastNamePrompt = 'What’s your last name?';
    await this.speak(lastNamePrompt);
    clientData.lastName = await this.listen() || 'Doe';

    // Confirm reservation
    const confirmation = `OK, you’re all set for ${clientData.promoDateTime}. We’ll email you the reservation confirmation. Please make sure you attend the presentation with your spouse and use a computer or laptop—no cell phones.`;
    await this.speak(confirmation);

    // Client: "OK, thank you"
    console.log('Client: OK, thank you');

    // Farewell
    const farewell = 'Thank you! Have a wonderful day.';
    await this.speak(farewell);

    // Save data
    await dataStore.save(clientData as ClientData);
  }

  private async speak(text: string) {
    const audio = await synthesizeSpeech(text);
    // TODO: Play audio via media server
    console.log('Agent:', text);
  }

  private async listen(): Promise<string> {
    // Placeholder: Real STT integration later
    return 'SAMPLE_RESPONSE';
  }
}

export const agent = new CallAgent();
