import React from "react";
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'


const WizThinkingScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
    const { displayTexts } = useDisplayWord(['Wiz is thinking'])
    return (
        <>
            <div className={'text-[#6B003A] text-[24px] font_normal_bold text-center pt-80'} onClick={toNextScreen}>{displayTexts[0]}</div>
        </>
    )
}
export default WizThinkingScreen;