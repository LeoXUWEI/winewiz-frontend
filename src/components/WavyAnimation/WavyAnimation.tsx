// WavyAnimation.tsx
import React, { useEffect, useState } from 'react';


interface WavyAnimationProps {
  amplitude: number; // 从外部接收波浪幅度作为prop
}

const WavyAnimation: React.FC<WavyAnimationProps> = ({ amplitude }) => {
  const [currentAmplitude, setCurrentAmplitude] = useState(amplitude);

  useEffect(() => {
    setCurrentAmplitude(amplitude);
  }, [amplitude]);

  return (
    <section>
      <div className="wavy">
        <span style={{ width: `${currentAmplitude}vh`, height: `${currentAmplitude}vh`, transition: 'all 0.5s linear' }}></span>
        <span style={{ width: `${currentAmplitude * 0.85}vh`, height: `${currentAmplitude * 0.85}vh`, transition: 'all 0.5s linear' }}></span>
        <span style={{ width: `${currentAmplitude * 0.65}vh`, height: `${currentAmplitude * 0.65}vh`, transition: 'all 0.5s linear' }}></span>
      </div>
    </section>
  );
};

export default WavyAnimation;
