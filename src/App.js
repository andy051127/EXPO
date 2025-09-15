import React, { useState } from 'react';
import './App.css';
import MainNoon from './codes/js/MainNoon';
import NumSelect from './codes/js/NumSelect';
import Start from './codes/js/Start';
import PhotoShoot from './codes/js/PhotoShoot';
import PhotoSelect from './codes/js/PhotoSelect';
import FrameSelect from './codes/js/FrameSelect';
import QR from './codes/js/QR';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [photoCount, setPhotoCount] = useState(1);
  const [selectedFrameData, setSelectedFrameData] = useState(null);

  // 네비게이션 함수들
  const goToNumSelect = () => {
    setCurrentPage('numSelect');
  };

  const goToStart = () => {
    setCurrentPage('start');
  };

  const goToPhotoShoot = () => {
    setCurrentPage('photoShoot');
  };

  const goToPhotoSelect = () => {
    setCurrentPage('photoSelect');
  };

  const goToFrameSelect = () => {
    setCurrentPage('frameSelect');
  };

  const goToQR = () => {
    setCurrentPage('qr');
  };

  const goToMain = () => {
    setCurrentPage('main');
    // 상태 초기화 (photoCount는 유지)
    setSelectedPhotos([]);
    setSelectedFrameData(null);
  };

  // NumSelect에서 사진 수량 저장
  const handleNumSelectComplete = (count) => {
    setPhotoCount(count);
    goToStart();
  };

  // PhotoSelect에서 선택된 사진들 저장
  const handlePhotoSelectComplete = (photos) => {
    setSelectedPhotos(photos);
    goToFrameSelect(); // FrameSelect로 이동
  };

  // FrameSelect에서 프레임 선택 완료
  const handleFrameSelectComplete = (frameData) => {
    setSelectedFrameData(frameData);
    console.log('선택된 프레임 데이터:', frameData);
    console.log('선택된 사진들:', selectedPhotos);
    // QR 코드 페이지로 이동
    goToQR();
  };

  // 메인 화면
  if (currentPage === 'main') {
    return (
      <div className="App">
        <MainNoon onStartClick={goToNumSelect} />
      </div>
    );
  }

  // 수량 선택 화면
  if (currentPage === 'numSelect') {
    return (
      <div className="App">
        <NumSelect 
          onNext={handleNumSelectComplete} 
          onBack={goToMain} 
          initialCount={photoCount}
        />
      </div>
    );
  }

  // 시작 카운트다운 화면
  if (currentPage === 'start') {
    return (
      <div className="App">
        <Start onComplete={goToPhotoShoot} />
      </div>
    );
  }

  // 사진 촬영 화면
  if (currentPage === 'photoShoot') {
    return (
      <div className="App">
        <PhotoShoot onComplete={goToPhotoSelect} />
      </div>
    );
  }

  // 사진 선택 화면
  if (currentPage === 'photoSelect') {
    return (
      <div className="App">
        <PhotoSelect onComplete={handlePhotoSelectComplete} />
      </div>
    );
  }

  // 프레임 선택 화면
  if (currentPage === 'frameSelect') {
    return (
      <div className="App">
        <FrameSelect 
          selectedPhotos={selectedPhotos}
          onComplete={handleFrameSelectComplete}
          onBack={goToPhotoSelect}
        />
      </div>
    );
  }

  // QR 코드 화면
  if (currentPage === 'qr') {
    return (
      <div className="App">
        <QR onComplete={goToMain} />
      </div>
    );
  }

  // 기본값: 메인 화면
  return (
    <div className="App">
      <MainNoon onStartClick={goToNumSelect} />
    </div>
  );
}

export default App;