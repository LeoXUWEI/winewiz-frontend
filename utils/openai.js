import OpenAI from "openai";
import dotenv from 'dotenv';
import nodeLibs from 'node-libs-browser';
global.child_process = nodeLibs.child_process;

dotenv.config({ path: '.env.local'});
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
let messageThread = '';
let transcription = '';

const openai = new OpenAI({
  organization: 'org-WWX61vrDTDnPOaeYP5nfSHp5',
  project: 'proj_EarbTb8ACn36A1mtF6axI6Qu',
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export async function retrieveAssistant() {
  // Retrieve assistant 
  console.log("Retrieving assistant...");
  const myAssistant = await openai.beta.assistants.retrieve(
    "asst_SYN9pOE7SvPhVjQiaEvFTHm0"
  );
  console.log("Assistant retrieved!");
  console.log(myAssistant);
}

export async function createThread(keyinput) {
  try {
    messageThread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: `Hello, please help me pick a wine and my budget is around ${keyinput} dollars.`
        },
      ],
    });
    console.log("Message thread created!");
    console.log(messageThread);
    return messageThread;
  } catch (error) {
    console.error("Error creating message thread:", error);
    throw error;
  }
}

export async function transcribeAudio(audioStream) {
  transcription = await openai.audio.transcriptions.create({
    model: "whisper-1",
    file: audioStream,
  });

  console.log(transcription.text);
  return transcription.text;
}