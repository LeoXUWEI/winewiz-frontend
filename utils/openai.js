import OpenAI from "openai";
import dotenv from 'dotenv';
import nodeLibs from 'node-libs-browser';
global.child_process = nodeLibs.child_process;

dotenv.config({ path: '.env.local' });
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
    "asst_diffUTSlsMltQsgL3Hs4tVLP"
  );
  console.log("Assistant retrieved!");
  localStorage.setItem("assistant_id", myAssistant.id)
  console.log(myAssistant);
}

export async function createThread(keyinput) {
  try {
    let threadId = localStorage.getItem("thread_id");
    let content = "Hello, please help me pick a wine and my budget is around " + keyinput + " dollars. return json format";
    console.log(content);
    if (!threadId) {
      messageThread = await openai.beta.threads.create({
        messages: [
          {
            role: "user",
            content: content
          },
        ],
      });
      console.log("Message thread created!");
      console.log(messageThread);
      localStorage.setItem("thread_id", messageThread.id)
      return messageThread.id;
    }
    return threadId;
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

export async function createMessages(threadId, msg) {
  const message = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: msg
    }
  );
  return message;
}

export async function runThread(threadId, assistantId) {
  let run = await openai.beta.threads.runs.createAndPoll(
    threadId,
    {
      assistant_id: assistantId,
      instructions: "must return json format"
    }
  );
  return run;
}

export async function listMessage(threadId,) {
  const messages = await openai.beta.threads.messages.list(
    threadId
  );
  return messages;
}

