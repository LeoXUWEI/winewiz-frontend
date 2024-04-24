import React from "react";
import { useState } from 'react'
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'

const WizeListeningScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
    const text = ['Wiz is listening']
    const { displayTexts, handleReset } = useDisplayWord(text)
    const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, showIcon?: boolean }[]>([
        // {
        //     className: 'bordered',
        //     text: 'Repeat your last message',
        //     onClick: handleReStart
        // },
        {
            className: 'bubblyrose',
            text: 'Tap to send',
            showIcon: true,
            onClick: handleSend
        }
    ])
    function handleReStart() {
        handleReset()
    }
    function handleSend() {
        toNextScreen()
    }
    return (
        <>
            <div className={'text-center pt-80 text-[#6B003A] font-bold'}>{displayTexts[0]}</div>
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </>
    )
}

export default WizeListeningScreen;