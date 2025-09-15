import React, { useState, useEffect } from 'react';
import '../css/Start.css';

const Start = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(5);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setIsComplete(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const getText = () => {
    if (isComplete) return 'now!';
    return `in ${countdown}`;
  };

  const getClass = () => {
    if (isComplete) return 'countdown-text complete';
    return 'countdown-text animated';
  };

  return (
    <div className="start-container">
      <div className="start-text">START!</div>
      <div className={getClass()}>
        {getText()}
      </div>
    </div>
  );
};

export default Start;