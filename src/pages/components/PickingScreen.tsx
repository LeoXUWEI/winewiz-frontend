import React from "react";
import { useState, useEffect } from 'react'
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'


const PickingScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {

    const { displayTexts, handleReset, setDisplayTexts } = useDisplayWord([])
    const [showPicking, setShowPicking] = useState(false)
    const [pickText, setPickText] = useState("");
    const [displayPickText, setDisplayPickText] = useState("");
    const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, showIcon?: boolean }[]>([
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

        if (typeof window !== 'undefined') {
            let contentFromGpt = localStorage.getItem("contentFromGpt");
            if (contentFromGpt && (typeof contentFromGpt === 'string')) {
                let jsonFormat = JSON.parse(contentFromGpt);
                let list = [];
                list.push(jsonFormat.msg);
                setDisplayTexts(list);
            }

            let index = 0;
            const interval = setInterval(() => {


                if (contentFromGpt && (typeof contentFromGpt === 'string')) {
                    let jsonFormat = JSON.parse(contentFromGpt);

                    if (index <= jsonFormat.keywords.length) {
                        setDisplayPickText(jsonFormat.keywords.substring(0, index));
                        index++;

                    } else {
                        clearInterval(interval);
                    }
                }

            }, 100);

            return () => {
                clearInterval(interval);
            };
        }
    }, []);

    function handleReStart() {
        handleReset()
    }
    function handlePick() {
        setCustomObjContent(prevContent => ([]))
        setShowPicking(() => true)
        if (typeof window !== 'undefined') {
            let contentFromGpt = localStorage.getItem("contentFromGpt")?.toString;
            if (contentFromGpt && (typeof contentFromGpt === 'string')) {
                let jsonFormat = JSON.parse(contentFromGpt);
                setPickText(jsonFormat.keywords);
            }
        }

    }
    return (
        <>
            <div>
                <h1 className={'text-[#6B003A] text-[24px] font_normal_bold text-center pt-10'}>WineWiz</h1>
                {displayTexts.map((item: string, index: number) => (
                    <div className={'text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen'} key={index}>{item}</div>
                ))}
            </div>
            <div className={'w-80 h-56 mx-auto mt-10 border-dashed border-2 border-white rounded-lg p-2'}>
                <span className={'text-[#6B003A] text-[14px] font_normal_bold'}>{displayPickText}</span>
            </div>
            {showPicking && <p className={'text-white text-[18px] font_extra_bold text-center mt-10 ='}>Wiz is picking..</p>}
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </>
    )
}

export default PickingScreen;