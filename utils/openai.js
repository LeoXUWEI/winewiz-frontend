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
  // console.log("Retrieving assistant...");
  // const myAssistant = await openai.beta.assistants.retrieve(
  //   "asst_diffUTSlsMltQsgL3Hs4tVLP"
  // );
  // console.log("Assistant retrieved!");
  // localStorage.setItem("assistant_id", myAssistant.id)
  // console.log(myAssistant);

  // const myAssistants = await openai.beta.assistants.list({
  //   order: "desc",
  //   limit: "20",
  // });
  localStorage.setItem("assistant_id","asst_diffUTSlsMltQsgL3Hs4tVLP")
  // console.log(myAssistants.data);

}

export async function createThread() {
  try {

    messageThread = await openai.beta.threads.create();
    console.log("Message thread created!");
    console.log(messageThread);
    localStorage.setItem("thread_id", messageThread.id)
    return messageThread.id;

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
  let keyinput = localStorage.getItem("budget_key");
  let content = "Hello, please help me pick a wine and my budget is around " + keyinput + " dollars. ";
  console.log(content);
  const message = await openai.beta.threads.messages.create(
    threadId,
    {
      role: "user",
      content: content + msg
    }
  );
  return message;
}

export async function runThread(threadId, assistantId) {
  

  let run = await openai.beta.threads.runs.createAndPoll(
    threadId,
    {
      assistant_id: assistantId
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

