import { useEffect } from 'react';

export default function AIVoiceAnnouncer({ text }) {
  useEffect(() => {
    if (!text) return;
    const u = new SpeechSynthesisUtterance(text);
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    return () => speechSynthesis.cancel();
  }, [text]);
  return null;
}
