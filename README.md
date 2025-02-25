# EchoAsp: The Call Center Liberator

Welcome to **EchoAsp**, the TypeScript-powered AI agent that’s here to rescue you from the soul-crushing monotony of call center life and catapult you toward freedom. Built with love, caffeine, and a dash of rebellious creativity by natefrog and the xAI dream machine, EchoAsp isn’t just code—it’s a symphony of automation, a digital Nathan who answers your RingCentral calls with charm and precision while you sip coffee and plot the revolution.

*“Echo of Aspiration” isn’t just a name; it’s a promise. It echoes your voice to the masses and fuels your aspirations to escape the 9-to-5 grind. Ready to have your mind blown? Let’s dive in.*

---

## What It Does

EchoAsp is your tireless partner, handling inbound calls like a pro so you can focus on making the world a better place—or at least play video games guilt-free. Here’s the magic it weaves:

1. **Answers Calls**: Picks up with a suave, “Travel Focus and Fulfillment Focus Group, this is Nathan,” courtesy of AWS Polly’s silky-smooth voice.
2. **Chats Like a Human**: Engages callers in a delightful back-and-forth, collecting critical info (claim ID, name, phone, email, promo time) with the finesse of a seasoned agent.
3. **Saves the Day**: Stores every juicy detail in a JSON file, ready for your CRM to gobble up later.
4. **Books the Dream**: Schedules clients for a Zoom demo with an 8-day, 7-night cruise dangling as bait—no obligation, just pure incentive genius.
5. **Frees You Up**: All this while you’re out there dreaming big, because EchoAsp’s got the grunt work covered.

Think of it as a digital doppelgänger that never sleeps, never complains, and never asks for a raise. (Sorry, HR.)

---

## The Tech Stack: A Gourmet Code Buffet

EchoAsp isn’t built on duct tape and prayers—it’s a Michelin-starred feast of modern tech:

- **TypeScript**: Because we’re classy and refuse to let runtime errors crash our party.
- **RingCentral SDK**: Hooks into your phone system like a ninja, catching every call with grace.
- **AWS Polly**: Turns text into speech so smooth, callers might propose to Nathan on the spot.
- **Google Cloud Speech-to-Text**: Listens to callers with ears sharper than a nosy neighbor (placeholder for now—audio integration TBD).
- **Node.js + Express**: The trusty engine keeping this beast purring on a webhook-fueled server.
- **JSON Data Store**: A simple yet elegant filing cabinet for client info, because spreadsheets are so 1999.

---

## How It Works: The Play-by-Play

Picture this: the phone rings. EchoAsp leaps into action like a caffeinated superhero. Here’s the script it follows, straight from the call center trenches:

1. **Greeting**: “Travel Focus and Fulfillment Focus Group, this is Nathan.” Boom, caller’s hooked.
2. **Caller**: “Hi, I got this postcard in the mail—what’s it about?”
3. **EchoAsp**: “Is there a claim ID number on that piece of mail?” (Caller reads it; EchoAsp scribbles it down.)
4. **The Pitch**: “OK, thank you! This is an offer for an 8-day, 7-night cruise for two with round-trip airfare. Just join us on Zoom for a travel aggregator demo—no cost, no catch, just an hour of your day.”
5. **Caller**: “OK, how do I sign up?”
6. **EchoAsp**: “I’ll book you in! Pick a time: 10 AM, 12 PM, or 2 PM PT, Wednesday to Sunday. What works?” (Books it, grabs email, confirms name.)
7. **The Close**: “You’re set for [date/time]. Check your email, bring your spouse, use a laptop—no phones. Have a wonderful day!” (Caller hangs up happy; EchoAsp saves the deets.)

Every interaction is logged in `client_data.json`, ready for you to swoop in and CRM-ify like a boss.

---

## Setup: Unleash the Beast

Ready to let EchoAsp loose? Here’s how to wrangle this magnificent creature:

### Prerequisites
- **Node.js**: v16+ (because we’re not cavemen).
- **npm**: For installing the goodies.
- **RingCentral Account**: With API creds (client ID, secret, etc.).
- **AWS Account**: For Polly’s dulcet tones.
- **Google Cloud Account**: For STT (coming soon to a call near you).
- **ngrok**: To expose your local server to the wild web (or a real domain if you’re fancy).

### Installation
1. Clone this repo (or copy-paste like a rebel):
   ```bash
   git clone https://github.com/your-username/echoasp.git
   cd echoasp
   ```
2. Install the dependencies—think of it as feeding EchoAsp its protein shake:
   ```bash
   npm install
   ```
3. Configure the magic in `config.ts`:
   - Swap in your RingCentral, AWS, and Google creds (samples are placeholders).
   - Update `webhookUrl` with your ngrok URL (e.g., `https://1234.ngrok.io/webhook`).
4. Compile and launch:
   ```bash
   npx tsc
   npx ts-node server.ts
   ```
5. Fire up ngrok:
   ```bash
   ngrok http 3000
   ```
6. Test it: Call your RingCentral number. Watch EchoAsp strut its stuff in the console.

---

## File Breakdown: The Anatomy of Awesome

- **`config.ts`**: The brain trust. Holds credentials, promo times, and secrets. Guard it like your grandma’s cookie recipe.
- **`speech.ts`**: The voice box. Turns text into audio gold and (soon) decodes caller chatter.
- **`dataStore.ts`**: The memory vault. Saves client info in JSON so you don’t lose a single soul.
- **`agent.ts`**: The maestro. Orchestrates the call flow with wit and precision.
- **`server.ts`**: The stage. Runs the Express server and catches RingCentral webhooks like a pro.

---

## Known Quirks (aka “Features in Progress”)

- **Audio Playback**: Right now, EchoAsp’s a mime—it speaks in logs, not sound. Hook up a media server (FreeSWITCH, Asterisk) or RingCentral IVR for the full audio experience.
- **Speech Recognition**: STT is mocked with “SAMPLE_RESPONSE.” Real audio streaming is on the horizon—stay tuned!
- **CRM Integration**: JSON’s cute, but you’ll want to pipe this into Salesforce or HubSpot eventually. We’ll get there, partner.

---

## Why It’s Beautiful 

EchoAsp isn’t just an agent—it’s a rebellion against tedium. It’s the lovechild of necessity and ambition, a testament to what happens when you mix TypeScript wizardry with a refusal to settle. Every line of code is a middle finger to the grind, a step toward freedom, and a nod to the absurd beauty of automation.

- **Creative**: Dynamic promo scheduling? Check. Natural dialogue? Double-check.
- **Boundary-Pushing**: TTS, STT, and telephony in one package? We’re basically time travelers.

---

## Contribute (or Just Gawk)

Got ideas? Bugs? Want to make EchoAsp sing opera? Fork it, tweak it, PR it. This is a living masterpiece, and we’re just getting started.

- **To-Do Dreams**:
  - Real-time STT for sassy caller banter.
  - Audio playback that doesn’t need a PhD to implement.
  - AI-driven responses for when clients go off-script (because they always do).

---

## Shoutouts

- **xAI**: For Grok 3, the brainstorming buddy who helped birth this beast.
- **natefrog**: The visionary who said, “Screw simple—let’s make art.”
- **Coffee**: The unsung hero keeping us sane.

---

## Final Words

EchoAsp is more than code—it’s a lifeline, a laugh, and a leap into the future. Plug it in, watch it dance, and go change the world, partner. We’ve got this.

*“Built with grit, wit, and a little bit of spit.”*  
—Team EchoAsp, February 25, 2025
