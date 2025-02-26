// speech.ts: The Voice Box of EchoAsp’s Soul
// Herein lies the alchemy of sound—where text becomes melody, and silence awaits
// the whisper of callers. A duet of AWS Polly’s golden tones and Google’s keen ears,
// this is the breath of Nathan, the echo of aspiration itself.

import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly'; // The siren’s loom
import { SpeechClient } from '@google-cloud/speech'; // The listener in the shadows
import { config } from '../config/config'; // The key to our enchanted realm

// Awaken Polly, the bard of the clouds, with credentials as her mantle
const pollyClient = new PollyClient({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

// Summon the SpeechClient, a sentinel poised to hear the world’s tales
const speechClient = new SpeechClient({ keyFilename: config.google.keyFile });

// Craft speech from the ether, a gift of sound for Nathan’s lips
export async function synthesizeSpeech(text: string): Promise<Buffer> {
  // A command to weave words into song, Matthew’s voice as our chosen muse
  const command = new SynthesizeSpeechCommand({
    Text: text,              // The script of our rebellion
    OutputFormat: 'mp3',     // A vessel of harmony
    VoiceId: 'Matthew',      // Smooth as silk, steady as stone
    LanguageCode: 'en-US',   // The tongue of our liberation
  });
  
  // Send the spell aloft, await the echo of creation
  const response = await pollyClient.send(command);
  
  // Return the melody, a buffer of bytes pulsing with life
  return Buffer.from(response.AudioStream as Uint8Array);
}

// Hear the caller’s voice, a dream yet to fully awaken
export async function recognizeSpeech(audio: Buffer): Promise<string> {
  // Prepare the canvas, a request to capture fleeting sound
  const request = {
    audio: { content: audio.toString('base64') }, // A whisper encoded in shadow
    config: {
      encoding: 'MP3' as const,      // The shape of our echoes
      sampleRateHertz: 16000,        // The rhythm of clarity
      languageCode: 'en-US',         // The language of our quest
    },
  };
  
  // Cast the net, seek the words within the wind
  const [response] = await speechClient.recognize(request);
  
  // Pluck the first thread of meaning, or return silence’s embrace
  return response.results?.[0]?.alternatives?.[0]?.transcript || '';
  // TODO: Soon, this shall bloom—an ear to match Nathan’s golden tongue
}
