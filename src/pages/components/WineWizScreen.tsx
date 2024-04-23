import React from "react";
import { useState } from 'react'
import {ScreenProps} from "@/pages/components/Screen.props";
import SwitchButton from '@/components/switchButton';
import useDisplayWord from '@/hooks/useDisplayWord'
import { setTimeout } from "timers/promises";

export const WineWizScreen: React.FC<ScreenProps> = ({toNextScreen}) => {
    
    let origintext = [
        'Hi, l am wiz, your personal wine master.',
        'i can pick the perfect gift wine for you with just a few questions answered.Afterwards,i will help you budget wines create personalized gift cards to make your gift special!'
    ]
    const {displayTexts} = useDisplayWord(origintext)
    const [showAll, setShowAll] = useState(false)
    const [customObjContent, setCustomObjContent] = useState<{className: string, text: string, onClick: Function}[]>([{
        className: 'pinot',
        text: 'Continue',
        onClick: handleContinue
    }])
    function handleContinue(){
        setShowAll(true)
        window.setTimeout(() => {
            toNextScreen()
        }, 200)
    }
    return (
        <>
            <div>
                <h1 className={'text-[#6B003A] text-3xl text-center font-bold pt-10'}>WineWiz</h1>
                { (showAll ? origintext : displayTexts).map((item: string, index: number) => (
                    <div className={'text-left mt-3 text-[#6B003A] font-bold pl-5 pr-5 w-screen'} key={index}>{item}</div>
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