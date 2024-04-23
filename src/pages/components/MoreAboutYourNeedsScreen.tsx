import React from "react";
import { useState } from 'react'
import SwitchButton from '@/components/switchButton';
import {ScreenProps} from "@/pages/components/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'


export const MoreAboutYourNeedsScreen: React.FC<ScreenProps> = ({toNextScreen}) => {
    let text = [
        "So you picked super premium wines, usually costing",
        "Apart from that, what other things can you think ofabout this gift? Forinstance:",
        "1. what purpose is this gift for?",
        "2. Know Their Preference: Does your friend preferred,white,rosé,or perhaps sparkling wine?",
        "3.Food Pairing: what's on the menu?",
        "4.special Touch: Consider a wine from a region or ayear that is meaningful to your friend. Forinstance,a wine from a region they've visited ordream of visiting,or a vintage from a significantyear in their life."
    ]
    const {displayTexts, handleReset} = useDisplayWord(text)
    const [customObjContent, setCustomObjContent] = useState<{className: string, text: string, onClick: Function, showIcon?: boolean}[]>([
        {
            className: 'bordered',
            text: 'Repeat your last message',
            onClick: handleReStart
        },
        {
            className: 'white',
            text: 'Tap to speak',
            showIcon: true,
            onClick: handleSpeak
        }
    ])

    function handleReStart() {
        handleReset()
    }

    function handleSpeak() {
        toNextScreen()
    }
    return (
        <>
            <h1 className={'text-[#6B003A] text-3xl text-center font-bold pt-10'}>More about your needs</h1>
            {displayTexts.map((item: string, index: number) => (
                <div className={'mt-3 text-[#6B003A] font-bold text-left pl-5 pr-5 w-screen'} key={index}>{item}</div>
            ))}
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </>
    )
}