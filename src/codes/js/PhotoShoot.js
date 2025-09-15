import React, { useState, useEffect, useRef } from 'react';
import '../css/PhotoShoot.css';

const PhotoShoot = ({ onComplete }) => {
  const [countdown, setCountdown] = useState(10);
  const [photoCount, setPhotoCount] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // 이미 완료된 경우 타이머 중지
    if (isComplete) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // 새로운 타이머 시작 (기존 타이머가 없을 때만)
    if (!timerRef.current) {
      console.log('타이머 시작, 현재 촬영 횟수:', photoCount);
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          console.log('카운트다운:', prev, '촬영 횟수:', photoCount);
          
          if (prev <= 0) {
            console.log('촬영 실행! 현재 촬영 횟수:', photoCount);
            
            // 촬영 실행
            setIsShooting(true);
            setTimeout(() => setIsShooting(false), 500);
            
            // 촬영 횟수 증가
            setPhotoCount(currentCount => {
              const newCount = currentCount + 1;
              console.log('촬영 완료:', newCount, '/ 8');
              return newCount;
            });
            
            return 10; // 리셋
          }
          return prev - 1;
        });
      }, 1000);
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isComplete, photoCount]);

  // 8회 완료 체크를 별도 useEffect로 분리
  useEffect(() => {
    if (photoCount >= 8) {
      console.log('8회 촬영 완료! 완료 처리 시작');
      
      // 타이머 정리
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // 1초 후 완료 메시지 표시
      setTimeout(() => {
        setIsComplete(true);
        // 5초 후 다음 화면 전환
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 5000);
      }, 1000);
    }
  }, [photoCount, onComplete]);

  const getCountdownText = () => {
    if (countdown === 0) return 'now!';
    return countdown.toString();
  };

  const getCountdownClass = () => {
    if (countdown <= 3) return 'countdown-number red';
    return 'countdown-number';
  };

  if (isComplete) {
    return (
      <div className="photo-shoot-container">
        <div className="complete-message">
          촬영이 완료되었습니다!
        </div>
      </div>
    );
  }

  return (
    <div className="photo-shoot-container">
      <div className="camera-screen"></div>
      
      <div className="photo-count">
        <div className="count-label">촬영 횟수</div>
        <div className="count-number">{photoCount}/8</div>
      </div>
      
      <div className="divider"></div>
      
      <div className="time-remaining">
        <div className="time-label">남은 시간</div>
        <div className={getCountdownClass()}>
          {getCountdownText()}
        </div>
      </div>
      
      {isShooting && (
        <div className="shooting-overlay">
          <div className="shooting-effect">📸</div>
        </div>
      )}
    </div>
  );
};

export default PhotoShoot;