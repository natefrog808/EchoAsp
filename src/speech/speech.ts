import { PollyClient, SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import { SpeechClient } from '@google-cloud/speech';
import { config } from '../config/config';

const pollyClient = new PollyClient({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

const speechClient = new SpeechClient({ keyFilename: config.google.keyFile });

// Generate speech from text
export async function synthesizeSpeech(text: string): Promise<Buffer> {
  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Matthew', // Smooth, professional voice
    LanguageCode: 'en-US',
  });
  const response = await pollyClient.send(command);
  return Buffer.from(response.AudioStream as Uint8Array);
}

// Recognize speech from audio (placeholder for real audio stream)
export async function recognizeSpeech(audio: Buffer): Promise<string> {
  const request = {
    audio: { content: audio.toString('base64') },
    config: {
      encoding: 'MP3' as const,
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
  };
  const [response] = await speechClient.recognize(request);
  return response.results?.[0]?.alternatives?.[0]?.transcript || '';
}
