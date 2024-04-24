import React from "react";
import {ScreenProps} from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'


const WizeThinkingScreen: React.FC<ScreenProps> = ({toNextScreen}) => {
    const {displayTexts} = useDisplayWord(['Wiz is thinking'])
    return (
        <>
            <div className={'text-center pt-80 text-[#6B003A] font-bold'} onClick={toNextScreen}>{displayTexts[0]}</div>
        </>
    )
}
export default WizeThinkingScreen;