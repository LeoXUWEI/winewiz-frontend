import React from "react";
import {ScreenProps} from "@/pages/components/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'


export const WizeThinkingScreen: React.FC<ScreenProps> = ({toNextScreen}) => {
    const {displayTexts} = useDisplayWord(['Wiz is thinking'])
    return (
        <>
            <div className={'text-center pt-80 text-[#6B003A] font-bold'} onClick={toNextScreen}>{displayTexts[0]}</div>
        </>
    )
}