// WavyAnimation.tsx
import React from 'react';


interface WavyAnimationProps {
  amplitude: number; // 从外部接收波浪幅度作为prop
}

const WavyAnimation: React.FC<WavyAnimationProps> = ({ amplitude }) => {
  return (
    <section>
      <div className="wavy">
        <span style={{ width: `${amplitude}vh`, height: `${amplitude}vh` }}></span>
        <span style={{ width: `${amplitude * 0.85}vh`, height: `${amplitude * 0.95}vh` }}></span>
        <span style={{ width: `${amplitude * 0.65}vh`, height: `${amplitude * 0.85}vh` }}></span>
      </div>
    </section>
  );
};

export default WavyAnimation;
