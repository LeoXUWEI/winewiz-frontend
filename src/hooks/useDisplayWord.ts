import { useState, useEffect } from 'react';

const useDisplayWord = (texts: Array<string>) => {
  const [displayTexts, setDisplayTexts] = useState<Array<string>>([]);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const handleReset = () => {
    setTextIndex(0)
    setCharIndex(0)
    setDisplayTexts([])
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (textIndex < texts.length) {
        const currentText = texts[textIndex];
        if (charIndex < currentText.length) {
          setDisplayTexts(prevTexts => {
            const updatedTexts = [...prevTexts];
            if (!updatedTexts[textIndex]) {
              updatedTexts[textIndex] = "";
            }
            updatedTexts[textIndex] += currentText[charIndex];
            return updatedTexts;
          });
          setCharIndex(charIndex + 1);
        } else {
          setTextIndex(textIndex + 1);
          setCharIndex(0);
        }
      }
    }, 10); 

    return () => clearTimeout(timeout);
  }, [texts, textIndex, charIndex]); 

  return { displayTexts, handleReset};
};

export default useDisplayWord;
