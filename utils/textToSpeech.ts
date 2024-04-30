
import { textToSpeech } from './api';

export async function speakText(text: string) {
  const audioBuffer = await textToSpeech(text);
  const blob = new Blob([audioBuffer], {type: 'audio/mp3'});
  const audio = new Audio(URL.createObjectURL(blob));
  audio.play();
}