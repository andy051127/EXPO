import React, { useState, useEffect } from 'react';
import '../css/FrameSelect.css';
import WhiteRoundFrame from '../../img/frames/WhiteRound.png';
import StarRoundFrame from '../../img/frames/StarRound.png';
import OceanRoundFrame from '../../img/frames/OceanRound.png';
import ShinguFunnyFrame from '../../img/frames/ShinguFunny.png';
import StarTextFrame from '../../img/frames/StarText.png';
import OceanTextFrame from '../../img/frames/OceanText.png';
import BlackRoundFrame from '../../img/frames/BlackRound.png';
import PartyRoundFrame from '../../img/frames/PartyRound.png';
import ZebraRoundFrame from '../../img/frames/ZebraRound.png';
import ShinguFrame from '../../img/frames/Shingu.png';
import WhiteTextFrame from '../../img/frames/WhiteText.png';
import BlackTextFrame from '../../img/frames/BlackText.png';
import PartyTextFrame from '../../img/frames/PartyText.png';
import ZebraTextFrame from '../../img/frames/ZebraText.png';
import NextArrow from "../../img/NextArrow.png";
import BackArrow from "../../img/BackArrow.png";
import LogoRound from "../../img/logos/LogoRound.png";
import LogoText from "../../img/logos/LogoText.png";
import Color from "../../img/logos/Color.png";
import BlackWhite from "../../img/logos/BlackWhite.png";
import FrameStar from "../../img/logos/FrameStar.png";
import FrameOcean from "../../img/logos/FrameOcean.png";
import FrameShinguFun from "../../img/logos/FrameShinguFun.png";
import FrameWhite from "../../img/logos/FrameWhite.png";
import FrameBlack from "../../img/logos/FrameBlack.png";
import FrameZebra from "../../img/logos/FrameZebra.png";
import FrameParty from "../../img/logos/FrameParty.png";
import FrameShingu from "../../img/logos/FrameShingu.png";


const FrameSelect = ({ selectedPhotos, onComplete, onBack }) => {
  // 선택된 프레임 상태 (기본값 설정)
  const [selectedFrame, setSelectedFrame] = useState('frame1');
  const [selectedLogo, setSelectedLogo] = useState('logo1');
  const [selectedPhotoColor, setSelectedPhotoColor] = useState('color1');
  const [selectedSpecialFrame, setSelectedSpecialFrame] = useState(null);
  
    // 현재 프레임 이미지 상태
  const [currentFrameImage, setCurrentFrameImage] = useState(WhiteRoundFrame);
  
  // 프레임 이미지 업데이트
  useEffect(() => {
    setCurrentFrameImage(getFrameImage());
  }, [selectedLogo, selectedSpecialFrame, selectedFrame]);
  
  
  // 프레임 이미지 결정 함수
  const getFrameImage = () => {
    // Logo와 Special Frame 조합
    if (selectedSpecialFrame) {
      if (selectedLogo === 'logo1') {
        switch (selectedSpecialFrame) {
          case 'special1':
            return StarRoundFrame;
          case 'special2':
            return OceanRoundFrame;
          case 'special3':
            return ShinguFunnyFrame;
          default:
            return WhiteRoundFrame;
        }
      } else if (selectedLogo === 'logo2') {
        switch (selectedSpecialFrame) {
          case 'special1':
            return StarTextFrame;
          case 'special2':
            return OceanTextFrame;
          case 'special3':
            return ShinguFunnyFrame;
          default:
            return WhiteRoundFrame;
        }
      }
    }
    
    // Logo와 Frame 조합
    if (selectedFrame) {
      if (selectedLogo === 'logo1') {
        switch (selectedFrame) {
          case 'frame1':
            return WhiteRoundFrame;
          case 'frame2':
            return BlackRoundFrame;
          case 'frame3':
            return PartyRoundFrame;
          case 'frame4':
            return ZebraRoundFrame;
          case 'frame5':
            return ShinguFrame;
          default:
            return WhiteRoundFrame;
        }
      } else if (selectedLogo === 'logo2') {
        switch (selectedFrame) {
          case 'frame1':
            return WhiteTextFrame;
          case 'frame2':
            return BlackTextFrame;
          case 'frame3':
            return PartyTextFrame;
          case 'frame4':
            return ZebraTextFrame;
          case 'frame5':
            return ShinguFrame;
          default:
            return WhiteRoundFrame;
        }
      }
    }
    
    // 기본값
    return WhiteRoundFrame;
  };

  // 프레임 선택 핸들러
  const handleFrameSelect = (frameType, frameId) => {
    switch (frameType) {
      case 'logo':
        setSelectedLogo(frameId);
        break;
      case 'photoColor':
        setSelectedPhotoColor(frameId);
        break;
      case 'specialFrame':
        // Special Frame 선택 시 Frame 선택 해제
        setSelectedSpecialFrame(frameId);
        setSelectedFrame(null);
        break;
      case 'frame':
        // Frame 선택 시 Special Frame 선택 해제
        setSelectedFrame(frameId);
        setSelectedSpecialFrame(null);
        break;
      default:
        break;
    }
  };

  // BACK 버튼 핸들러
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  // NEXT 버튼 핸들러
  const handleNext = () => {
    if (onComplete) {
      onComplete({
        selectedFrame,
        selectedLogo,
        selectedPhotoColor,
        selectedSpecialFrame
      });
    }
  };

  return (
    <div className="frameselect-container">
      {/* 제목 */}
      <div className="frameselect-title">
        프레임을 선택해 주세요!
      </div>

      {/* 메인 콘텐츠 */}
      <div className="frameselect-main-content">
        {/* 왼쪽: 사진 프레임 */}
        <div className="frameselect-film-frame">
          <div className="frameselect-frame-container">
            <img src={currentFrameImage} alt="Frame" className="frameselect-frame-image" />
            <div className="frameselect-frame-slots">
              {/* 첫 번째 줄: 가운데 배치 */}
              <div className="frameselect-frame-row">
                <div className="frameselect-frame-slot">
                  {selectedPhotos && selectedPhotos[0] ? (
                    <div 
                      className="frameselect-selected-photo"
                      style={{ backgroundColor: selectedPhotos[0].color }}
                    >
                      {selectedPhotos[0].image ? (
                        <img src={selectedPhotos[0].image} alt="선택된 사진 1" />
                      ) : (
                        <div className="frameselect-photo-placeholder">사진 1</div>
                      )}
                    </div>
                  ) : (
                    <div className="frameselect-empty-slot">
                      <span>1</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 두 번째 줄: 양쪽 배치 */}
              <div className="frameselect-frame-row">
                <div className="frameselect-frame-slot">
                  {selectedPhotos && selectedPhotos[1] ? (
                    <div 
                      className="frameselect-selected-photo"
                      style={{ backgroundColor: selectedPhotos[1].color }}
                    >
                      {selectedPhotos[1].image ? (
                        <img src={selectedPhotos[1].image} alt="선택된 사진 2" />
                      ) : (
                        <div className="frameselect-photo-placeholder">사진 2</div>
                      )}
                    </div>
                  ) : (
                    <div className="frameselect-empty-slot">
                      <span>2</span>
                    </div>
                  )}
                </div>
                <div className="frameselect-frame-slot">
                  {selectedPhotos && selectedPhotos[2] ? (
                    <div 
                      className="frameselect-selected-photo"
                      style={{ backgroundColor: selectedPhotos[2].color }}
                    >
                      {selectedPhotos[2].image ? (
                        <img src={selectedPhotos[2].image} alt="선택된 사진 3" />
                      ) : (
                        <div className="frameselect-photo-placeholder">사진 3</div>
                      )}
                    </div>
                  ) : (
                    <div className="frameselect-empty-slot">
                      <span>3</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 세 번째 줄: 가운데 배치 */}
              <div className="frameselect-frame-row">
                <div className="frameselect-frame-slot">
                  {selectedPhotos && selectedPhotos[3] ? (
                    <div 
                      className="frameselect-selected-photo"
                      style={{ backgroundColor: selectedPhotos[3].color }}
                    >
                      {selectedPhotos[3].image ? (
                        <img src={selectedPhotos[3].image} alt="선택된 사진 4" />
                      ) : (
                        <div className="frameselect-photo-placeholder">사진 4</div>
                      )}
                    </div>
                  ) : (
                    <div className="frameselect-empty-slot">
                      <span>4</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 프레임 선택 옵션들 */}
        <div className="frameselect-options">
          {/* Logo 섹션 */}
          <div className="frameselect-option-section">
            <div className="frameselect-section-title">Logo</div>
            <div className="frameselect-option-buttons">
              <button 
                className={`frameselect-option-button ${selectedLogo === 'logo1' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('logo', 'logo1')}
              >
                <img src={LogoRound}></img>
              </button>
              <button 
                className={`frameselect-option-button ${selectedLogo === 'logo2' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('logo', 'logo2')}
              >
                <img src={LogoText}></img>
              </button>
            </div>
          </div>

          {/* Photo Color 섹션 */}
          <div className="frameselect-option-section">
            <div className="frameselect-section-title">Photo Color</div>
            <div className="frameselect-option-buttons">
              <button 
                className={`frameselect-option-button ${selectedPhotoColor === 'color1' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('photoColor', 'color1')}
              >
                <img src={Color}></img>
              </button>
              <button 
                className={`frameselect-option-button ${selectedPhotoColor === 'color2' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('photoColor', 'color2')}
              >
                <img src={BlackWhite}></img>
              </button>
            </div>
          </div>

          {/* Special Frame 섹션 */}
          <div className="frameselect-option-section">
            <div className="frameselect-section-header">
              <div className="frameselect-section-title">Special Frame</div>
              <div className="frameselect-special-description">
                정말 특별한 사람들을 위한 프레임
              </div>
            </div>
            <div className="frameselect-option-buttons">
              <button 
                className={`frameselect-option-button ${selectedSpecialFrame === 'special1' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('specialFrame', 'special1')}
              >
                <img src={FrameStar}></img>
              </button>
              <button 
                className={`frameselect-option-button ${selectedSpecialFrame === 'special2' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('specialFrame', 'special2')}
              >
                <img src={FrameOcean}></img>
              </button>
              <button 
                className={`frameselect-option-button ${selectedSpecialFrame === 'special3' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('specialFrame', 'special3')}
              >
                <img src={FrameShinguFun}></img>
              </button>
            </div>
          </div>

          {/* Frame 섹션 */}
          <div className="frameselect-option-section">
            <div className="frameselect-section-title">Frame</div>
            <div className="frameselect-option-buttons">
              <button 
                className={`frameselect-option-button ${selectedFrame === 'frame1' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('frame', 'frame1')}
              >
                <img src={FrameWhite}></img>

              </button>
              <button 
                className={`frameselect-option-button ${selectedFrame === 'frame2' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('frame', 'frame2')}
              >
                <img src={FrameBlack}></img>

              </button>
              <button 
                className={`frameselect-option-button ${selectedFrame === 'frame3' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('frame', 'frame3')}
              >
                <img src={FrameParty}></img>

              </button>
              <button 
                className={`frameselect-option-button ${selectedFrame === 'frame4' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('frame', 'frame4')}
              >
                <img src={FrameZebra}></img>

              </button>
              <button 
                className={`frameselect-option-button ${selectedFrame === 'frame5' ? 'selected' : ''}`}
                onClick={() => handleFrameSelect('frame', 'frame5')}
              >
                <img src={FrameShingu}></img>

              </button>
            </div>
          </div>
        </div>
      </div>



      {/* BACK 버튼 */}
      <div className="frameselect-back-button-container">
        <div 
          className="frameselect-back-button"
          onClick={handleBack}
        >
          <div className="frameselect-back-button-border"></div>
          <div className="frameselect-back-text">BACK</div>
          <div className="frameselect-back-arrow">
            <img alt="back arrow" src={BackArrow}/>
          </div>
        </div>
      </div>

      {/* NEXT 버튼 */}
      <div className="frameselect-next-button-container">
        <div 
          className="frameselect-next-button"
          onClick={handleNext}
        >
          <div className="frameselect-next-button-border"></div>
          <div className="frameselect-next-text">NEXT</div>
          <div className="frameselect-next-arrow">
            <img alt="next arrow" src={NextArrow}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameSelect;

