import React from "react";
import { useState } from 'react'
import { ScreenProps } from "@/types/Screen.props";
import SwitchButton from '@/components/switchButton';
import useDisplayWord from '@/hooks/useDisplayWord'
import { setTimeout } from "timers/promises";

const WineWizScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {

    let origintext = [
        'Hi, I am Wiz, your personal wine master. ',
        'I can pick the perfect gift wine for you  with just a few questions answered. Afterwards, I will help you create personalized gift cards to make your gift special!'
    ]
    const { displayTexts } = useDisplayWord(origintext)
    const [showAll, setShowAll] = useState(false)
    const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick: Function }[]>([{
        className: 'pinot',
        text: 'Continue',
        onClick: handleContinue
    }])
    function handleContinue() {
        setShowAll(true)
        window.setTimeout(() => {
            toNextScreen()
        }, 200)
    }
    return (
        <>
            <div>
                <h1 className={'text-[#6B003A] text-[24px] font_extra_bold text-center pt-10'}>WineWiz</h1>
                {(showAll ? origintext : displayTexts).map((item: string, index: number) => (
                    <div className={'text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen'} key={index}>{item}</div>
                ))}
            </div>
            <div className={'w-80 mx-auto'}>
                {/* <Button block size='large' onClick={handleContinue} className={'adm-button bg-red-950'}>
                    Continue1
                </Button> */}
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </>
    )
}
export default WineWizScreen;