import React, { useState, useEffect } from 'react';
import '../css/NumSelect.css';
import NextArrow from "../../img/NextArrow.png"
import BackArrow from "../../img/BackArrow.png"
import EllipseCircle from "../../img/EllipseCircle.png"

const BackButton = ({ onClick }) => {
  return (
    <div className="back-button-container" onClick={onClick}>
      <div className="back-button">
        <div className="back-button-border"></div>
        <div className="back-text">BACK</div>
        <div className="numselect-back-arrow">
          <img alt="back arrow" src={BackArrow} />
        </div>
      </div>
    </div>
  );
};

const NextButton = ({ onClick }) => {
  return (
    <div className="next-button-container" onClick={onClick}>
      <div className="next-button">
        <div className="next-button-border"></div>
        <div className="next-text">NEXT</div>
        <div className="numselect-next-arrow">
          <img alt="next arrow" src={NextArrow} />
        </div>
      </div>
    </div>
  );
};

const NumSelect = ({ onBack, onNext, initialCount = 1 }) => {
  const [photoCount, setPhotoCount] = useState(initialCount);

  // initialCount가 변경될 때마다 photoCount 업데이트
  useEffect(() => {
    setPhotoCount(initialCount);
  }, [initialCount]);

  const handleDecrease = () => {
    if (photoCount > 1) {
      setPhotoCount(photoCount - 1);
    }
  };

  const handleIncrease = () => {
    if (photoCount < 2) {
      setPhotoCount(photoCount + 1);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext(photoCount);
    }
  };

  return (
    <div className="num-select-container">
      {/* 제목 */}
      <div className="title-text">
        사진 수량을 선택해 주세요.
      </div>

      {/* 카운터 섹션 */}
      <div className="counter-section">
        {/* 마이너스 버튼 */}
        <div 
          className={`minus-button ${photoCount <= 1 ? 'disabled' : ''}`}
          onClick={handleDecrease}
        >
          <img alt="minus circle" src={EllipseCircle} />
          <div className="minus-line"></div>
        </div>

        {/* 숫자 표시 */}
        <div className="count-display">
          {photoCount}
        </div>

        {/* 플러스 버튼 */}
        <div 
          className={`plus-button ${photoCount >= 2 ? 'disabled' : ''}`}
          onClick={handleIncrease}
        >
          <img alt="plus circle" src={EllipseCircle} />
          <div className="plus-line-horizontal"></div>
          <div className="plus-line-vertical"></div>
        </div>
      </div>

      {/* 하단 버튼들 */}
      <div className="bottom-buttons">
        <BackButton onClick={handleBack} />
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
};

export default NumSelect;
