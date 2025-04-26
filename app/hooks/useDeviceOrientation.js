'use client';

import { useState, useEffect } from 'react';

export default function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({
    isPortrait: true,
    isLandscape: false,
    isSmallScreen: false
  });

  useEffect(() => {
    const handleResize = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      const isLandscape = window.innerWidth > window.innerHeight;
      const isSmallScreen = window.innerHeight < 600 && isLandscape;
      
      setOrientation({
        isPortrait,
        isLandscape,
        isSmallScreen
      });
    };

    // 初始检测
    handleResize();

    // 添加事件监听器
    window.addEventListener('resize', handleResize);
    
    // 如果设备支持orientation change事件
    if (typeof window.orientation !== 'undefined') {
      window.addEventListener('orientationchange', handleResize);
    }

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (typeof window.orientation !== 'undefined') {
        window.removeEventListener('orientationchange', handleResize);
      }
    };
  }, []);

  return orientation;
} 