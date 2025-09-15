import React, { useState } from 'react';
import '../css/PhotoSelect.css';
import WhiteRoundFrame from '../../img/frames/WhiteRound.png';
import NextArrow from "../../img/NextArrow.png";

const PhotoSelect = ({ onComplete }) => {
  // 선택된 사진들의 상태 (최대 4개)
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  
  // 8개의 사진 데이터 (실제로는 사용자가 찍은 사진들이 들어갈 예정)
  const photos = [
    { id: 1, color: '#ff6e6e65', image: null },
    { id: 2, color: '#ffaf7665', image: null },
    { id: 3, color: '#fff98265', image: null },
    { id: 4, color: '#9bff7d65', image: null },
    { id: 5, color: '#7fb2ff65', image: null },
    { id: 6, color: '#594dff65', image: null },
    { id: 7, color: '#cf75ff65', image: null },
    { id: 8, color: '#ff7dd665', image: null }
  ];

  // 사진 선택/취소 핸들러
  const handlePhotoSelect = (photo) => {
    const isSelected = selectedPhotos.find(p => p.id === photo.id);
    
    if (isSelected) {
      // 이미 선택된 경우 선택 취소
      setSelectedPhotos(selectedPhotos.filter(p => p.id !== photo.id));
    } else if (selectedPhotos.length < 4) {
      // 선택되지 않은 경우 선택 추가
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  // 선택된 사진 제거 핸들러
  const handlePhotoRemove = (photoId) => {
    setSelectedPhotos(selectedPhotos.filter(p => p.id !== photoId));
  };

  // NEXT 버튼 핸들러
  const handleNext = () => {
    if (selectedPhotos.length === 4) {
      console.log('선택된 사진들:', selectedPhotos);
      // 다음 단계로 이동
      if (onComplete) {
        onComplete(selectedPhotos);
      }
    }
  };

  return (
    <div className="photoselect-container">
      {/* 제목 */}
      <div className="title">
        사진을 선택해 주세요:)
      </div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* 왼쪽 필름 프레임 */}
        <div className="film-frame">
          <div className="photoselect-frame-container">
            <img src={WhiteRoundFrame} alt="White Round Frame" className="photoselect-frame-image" />
            <div className="photoselect-frame-slots">
              {/* 첫 번째 줄: 가운데 배치 */}
              <div className="photoselect-frame-row">
                <div 
                  className="photoselect-frame-slot"
                  onClick={() => selectedPhotos[0] && handlePhotoRemove(selectedPhotos[0].id)}
                >
                  {selectedPhotos[0] ? (
                    <div 
                      className="selected-photo"
                      style={{ backgroundColor: selectedPhotos[0].color }}
                    >
                      {selectedPhotos[0].image ? (
                        <img src={selectedPhotos[0].image} alt="선택된 사진 1" />
                      ) : (
                        <div className="photoselect-photo-placeholder">사진 1</div>
                      )}
                    </div>
                  ) : (
                    <div className="empty-slot">
                      <span>1</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 두 번째 줄: 양쪽 배치 */}
              <div className="photoselect-frame-row">
                <div 
                  className="photoselect-frame-slot"
                  onClick={() => selectedPhotos[1] && handlePhotoRemove(selectedPhotos[1].id)}
                >
                  {selectedPhotos[1] ? (
                    <div 
                      className="selected-photo"
                      style={{ backgroundColor: selectedPhotos[1].color }}
                    >
                      {selectedPhotos[1].image ? (
                        <img src={selectedPhotos[1].image} alt="선택된 사진 2" />
                      ) : (
                        <div className="photoselect-photo-placeholder">사진 2</div>
                      )}
                    </div>
                  ) : (
                    <div className="empty-slot">
                      <span>2</span>
                    </div>
                  )}
                </div>
                <div 
                  className="photoselect-frame-slot"
                  onClick={() => selectedPhotos[2] && handlePhotoRemove(selectedPhotos[2].id)}
                >
                  {selectedPhotos[2] ? (
                    <div 
                      className="selected-photo"
                      style={{ backgroundColor: selectedPhotos[2].color }}
                    >
                      {selectedPhotos[2].image ? (
                        <img src={selectedPhotos[2].image} alt="선택된 사진 3" />
                      ) : (
                        <div className="photoselect-photo-placeholder">사진 3</div>
                      )}
                    </div>
                  ) : (
                    <div className="empty-slot">
                      <span>3</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 세 번째 줄: 가운데 배치 */}
              <div className="photoselect-frame-row">
                <div 
                  className="photoselect-frame-slot"
                  onClick={() => selectedPhotos[3] && handlePhotoRemove(selectedPhotos[3].id)}
                >
                  {selectedPhotos[3] ? (
                    <div 
                      className="selected-photo"
                      style={{ backgroundColor: selectedPhotos[3].color }}
                    >
                      {selectedPhotos[3].image ? (
                        <img src={selectedPhotos[3].image} alt="선택된 사진 4" />
                      ) : (
                        <div className="photoselect-photo-placeholder">사진 4</div>
                      )}
                    </div>
                  ) : (
                    <div className="empty-slot">
                      <span>4</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 사진 그리드 */}
        <div className="photoselect-photo-grid">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`photoselect-photo-item ${selectedPhotos.find(p => p.id === photo.id) ? 'selected' : ''}`}
              style={{ backgroundColor: photo.color }}
              onClick={() => handlePhotoSelect(photo)}
            >
                             {photo.image ? (
                 <img src={photo.image} alt={`사진 ${photo.id}`} />
               ) : null}
              
              {/* 선택 표시 */}
              {selectedPhotos.find(p => p.id === photo.id) && (
                <div className="selection-indicator">
                  {selectedPhotos.findIndex(p => p.id === photo.id) + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* NEXT 버튼 */}
      <div className="next-button-container">
        <div 
          className={`next-button ${selectedPhotos.length === 4 ? 'active' : 'disabled'}`}
          onClick={selectedPhotos.length === 4 ? handleNext : undefined}
        >
          <div className="next-button-border"></div>
          <div className="next-text">NEXT</div>
          <div className="photoselect-next-arrow">
            <img alt="next arrow" src={NextArrow}/>
          </div>
        </div>
      </div>

      {/* 선택 상태 표시 */}
      <div className="selection-status">
        {selectedPhotos.length}/4 사진 선택됨
      </div>
    </div>
  );
};

export default PhotoSelect;
