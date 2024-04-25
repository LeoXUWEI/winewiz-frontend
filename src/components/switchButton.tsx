import React from 'react';
import { Button, Space } from 'antd-mobile';
import { AudioOutline } from 'antd-mobile-icons'
import styles from './switchButton.module.scss'


interface switchButtonProps {
  toNextScreen: () => void;
  customObjContent?: Array<any>
}

const switchButton: React.FC<switchButtonProps> = ({ toNextScreen, customObjContent }) => {
  return (
    <div className={`${styles.myContainer} fixed w-80 bottom-6`}>
      {customObjContent?.map((item, index) => (
        <Button block size='large' className={`${item.className} text-[18px] font_button_text`} onClick={item.onClick} key={index}>
          <Space>
            {item.showIcon && <AudioOutline />}
            <span>{item.text}</span>
          </Space>
        </Button>
      ))}
      {/* <Button block  size='large' className={customClassName} onClick={toNextScreen}>
          Tab to speak
      </Button> */}
    </div>
  );
};

export default switchButton;
