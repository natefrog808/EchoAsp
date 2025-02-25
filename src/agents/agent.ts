import { SDK } from '@ringcentral/sdk';
import { synthesizeSpeech } from '../speech/speech';
import { dataStore, ClientData } from '../data/dataStore';
import { config, promoTimes } from '../config/config';

const rc = new SDK({
  server: config.ringCentral.server,
  clientId: config.ringCentral.clientId,
  clientSecret: config.ringCentral.clientSecret,
});

const platform = rc.platform();

export class CallAgent {
  private callSession: any;

  async initialize() {
    try {
      await platform.login({
        username: config.ringCentral.username,
        password: config.ringCentral.password,
      });
      await dataStore.load();
      console.log('EchoAsp initialized—Nathan’s ready to roll!');
    } catch (error) {
      console.error('Initialization failed:', error);
      throw new Error('Agent down! Check creds or network.');
    }
  }

  async handleCall(call: any) {
    this.callSession = call;
    try {
      await this.answerCall();
      await this.converse();
      await this.endCall();
    } catch (error) {
      console.error('Call handling error:', error);
      await this.endCall();
    }
  }

  private async answerCall() {
    const greeting = 'Travel Focus and Fulfillment Focus Group, this is Nathan';
    const audio = await synthesizeSpeech(greeting);
    await platform.post(`/restapi/v1.0/account/~/telephony/sessions/${this.callSession.sessionId}/answer`);
    await this.playAudio(audio); // Audio magic incoming
    console.log('Nathan says:', greeting);
  }

  private async converse() {
    const clientData: Partial<ClientData> = { callTimestamp: new Date().toISOString() };

    // Step 1: Client intro (simulated for now)
    const clientIntro = "Hi, I got this postcard in the mail, and I was wondering what it’s all about.";
    console.log('Caller:', clientIntro);

    // Step 2: Claim ID
    const claimPrompt = 'Is there a claim ID number on that piece of mail?';
    await this.speak(claimPrompt);
    clientData.claimId = await this.listen() || 'SAMPLE_CLAIM_123';
    clientData.phoneNumber = this.callSession.callerId || 'SAMPLE_PHONE';

    // Step 3: The Pitch
    const offer = 'OK, thank you! This is an offer for an 8-day, 7-night cruise for two with round-trip airfare. All you need to do is hop on your computer, join us on Zoom, and we’ll show you a demo of a travel aggregator for booking hotels and resorts worldwide. No cost, no obligation—just an hour of your day, and the trip’s yours for attending!';
    await this.speak(offer);

    // Step 4: Booking
    console.log('Caller: OK, how do I sign up?');
    const timeOptions = promoTimes.map(t => `${t.day} at ${t.time} PT`).join(', ');
    const timePrompt = `I can reserve your spot. We’ve got ${timeOptions}. What works for you?`;
    await this.speak(timePrompt);
    const promoTime = await this.listen() || 'Wednesday 12:00 PT';
    clientData.promoDateTime = this.validatePromoTime(promoTime) || promoTime;

    const emailPrompt = 'What’s the best email to send your confirmation to?';
    await this.speak(emailPrompt);
    clientData.email = await this.listen() || 'sample@example.com';

    const firstNamePrompt = 'And your first name, please?';
    await this.speak(firstNamePrompt);
    clientData.firstName = await this.listen() || 'John';

    const lastNamePrompt = 'Last name?';
    await this.speak(lastNamePrompt);
    clientData.lastName = await this.listen() || 'Doe';

    // Step 5: Confirmation
    const confirmation = `You’re all set for ${clientData.promoDateTime}. We’ll email you the Zoom details. Please join with your spouse on a laptop—no phones allowed. Any questions?`;
    await this.speak(confirmation);

    // Step 6: Farewell
    console.log('Caller: OK, thank you');
    const farewell = 'My pleasure! Have a fantastic day!';
    await this.speak(farewell);

    // Save the goods
    await dataStore.save(clientData as ClientData);
    console.log('Client data saved:', clientData);
  }

  private async speak(text: string) {
    const audio = await synthesizeSpeech(text);
    await this.playAudio(audio);
    console.log('Nathan says:', text);
  }

  private async listen(): Promise<string> {
    // TODO: Integrate STT (Google Cloud or Deepgram)
    console.log('Listening...');
    return 'SAMPLE_RESPONSE'; // Placeholder till STT’s live
  }

  private async playAudio(audio: Buffer) {
    // TODO: Real audio playback
    // Option 1: RingCentral IVR (needs API support)
    // await platform.post(`/restapi/v1.0/account/~/telephony/sessions/${this.callSession.sessionId}/play`, { audio });
    // Option 2: Media server (FreeSWITCH/Asterisk) integration
    // For now, just log it
    console.log('Audio queued (placeholder):', audio.length, 'bytes');
  }

  private validatePromoTime(input: string): string | undefined {
    const normalized = input.toLowerCase();
    return promoTimes.find(t => normalized.includes(t.day.toLowerCase()) && normalized.includes(t.time.toLowerCase()))
      ? `${input}`
      : undefined;
  }

  private async endCall() {
    try {
      await platform.post(`/restapi/v1.0/account/~/telephony/sessions/${this.callSession.sessionId}/hangup`);
      console.log('Call ended smoothly');
    } catch (error) {
      console.error('Hangup failed:', error);
    }
  }
}

export const agent = new CallAgent();
