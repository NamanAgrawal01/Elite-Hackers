import React, { useState, useEffect } from 'react';

export const TypeWriter = ({ phrases, typingSpeed = 80, eraseSpeed = 40, holdTime = 3500 }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const currentTheme = loopNum % phrases.length;
    const fullText = phrases[currentTheme];

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length - 1));
      }, eraseSpeed);
    } else {
      timer = setTimeout(() => {
        setText(fullText.substring(0, text.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && text === fullText) {
      timer = setTimeout(() => setIsDeleting(true), holdTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, phrases, loopNum, typingSpeed, eraseSpeed, holdTime]);

  return (
    <span className="font-mono text-primary">
      {text}
      <span className="animate-pulse border-r-2 border-primary ml-1 h-5 inline-block align-middle"></span>
    </span>
  );
};

export default TypeWriter;
