import React from "react";
import { useState, useEffect } from 'react'
import SwitchButton from '@/components/switchButton';
import {ScreenProps} from "@/pages/components/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'


export const PickingScreen: React.FC<ScreenProps> = ({toNextScreen}) => {
    const text = ["Great, so it is for your friend's wedding. Any moreinformation l should know? For instance, their..."]
    const pickingText = "Great, so it is for your friend's wedding"
    const {displayTexts, handleReset} = useDisplayWord(text)
    const [showPicking, setShowPicking] = useState(false)
    const [pickText, setPickText] = useState("");
    const [displayPickText, setDisplayPickText] = useState("");
    const [customObjContent, setCustomObjContent] = useState<{className: string, text: string, onClick?: Function, showIcon?:boolean}[]>([
        {
            className: 'picking',
            text: 'Start Picking',
            onClick: handlePick
        },
        {
            className: 'bordered',
            text: 'Repeat your last message',
            onClick: handleReStart
        },
        {
            className: 'white',
            showIcon: true,
            text: 'Tap to speak',
        }
    ])
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
          if (index <= pickText.length) {
            setDisplayPickText(pickText.substring(0, index));
            index++;
          } else {
            clearInterval(interval);
          }
        }, 100);
        return () => {
          clearInterval(interval);
        };
      }, [pickText]); 
    function handleReStart() {
        handleReset()
    }
    function handlePick() {
        setCustomObjContent(prevContent => ([]))
        setShowPicking(() => true)
        setPickText(pickingText)
    }
    return (
        <>
            <div>
                <h1 className={'text-[#6B003A] text-3xl text-center font-bold pt-10'}>WineWiz</h1>
                {displayTexts.map((item: string, index: number) => (
                    <div className={'text-left mt-3 text-[#6B003A] font-bold pl-5 pr-5 w-screen'} key={index}>{item}</div>
                ))}
            </div>
            <div className={'w-80 h-56 mx-auto mt-10 border-dashed border-2 border-white rounded-lg p-2'}>
                <span className={'text-[#6B003A] font-bold'}>{displayPickText}</span>
            </div>
            { showPicking && <p className={'text-center text-white mt-10 text-xl'}>Wiz is picking..</p> }
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </>
    )
}