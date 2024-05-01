import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local'});
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

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
