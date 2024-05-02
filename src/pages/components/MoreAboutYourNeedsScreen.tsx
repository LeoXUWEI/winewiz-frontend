import React from "react";
import { useState } from 'react'
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'


const MoreAboutYourNeedsScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
    let text = [] as any;
    if (typeof window !== 'undefined') {
        text = [
            "So you picked " + localStorage.getItem("budget_label") + ", usually costing " + localStorage.getItem("budget_key") + ".",
            "Apart from that, what other things can you think of about this gift? For instance:",
            "1. What purpose is this gift for?",
            "2. Know Their Preference: Does your friend prefer red, white, rosé, or perhaps sparkling wine?",
            "3. Food Pairing: What's on the menu?",
            "4. Special Touch: Consider a wine from a region or a year that is meaningful to your friend. For instance, a wine from a region they have visited or dream of visiting, or a vintage from a significant year in their life."
        ]
    }
    const { displayTexts, handleReset } = useDisplayWord(text)
    const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick: Function, showIcon?: boolean }[]>([
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
            <h1 className={'text-[#6B003A] text-[24px] font_extra_bold text-center pt-10'}>More about your needs</h1>
            {displayTexts.map((item: string, index: number) => (
                <div className={'text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen'} key={index}>{item}</div>
            ))}
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </>
    )
}

export default MoreAboutYourNeedsScreen;