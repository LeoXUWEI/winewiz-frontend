import React from "react";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'


const PickingScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
    const router = useRouter()
    const text = ["Here is what I picked for you. It is a Boordy Seyval Vidal Chardonnay..."]
    const wineAttribute = ['wedding', 'california', 'steak lover', 'Dry', 'refreshing flavor']
    const { displayTexts, handleReset } = useDisplayWord(text)
    const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, showIcon?: boolean }[]>([
        {
            className: 'picking',
            text: 'Purchase this',
            onClick: handlePurchase
        },
        {
            className: 'bordered',
            text: 'Repeat your last message',
            onClick: handleReStart
        },
        {
            className: 'pinot',
            text: 'Make Giftcard',
            onClick: handleMakeGiftcard
        }
    ])
    function handleReStart() {
        handleReset()
    }
    function handlePurchase() {
        
    }
    function handleMakeGiftcard() {
      router.push('/makeGiftCard')
    }
    return (
        <>
            <div>
                <h1 className={'text-[#6B003A] text-[24px] font_normal_bold text-center pt-10'}>WineWiz</h1>
                {displayTexts.map((item: string, index: number) => (
                    <div className={'text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen'} key={index}>{item}</div>
                ))}
            </div>
            <div className="flex flex-row items-center h-72 mt-10 ml-5 mr-5 rounded-2xl">
              <div className="bg-[#FFDFC2] h-56 flex flex-row items-center">
                <img
                    className={"image_logo m-auto w-56"}
                    src={'/wine.png'}
                    alt="wine"
                />
              </div>
              <div className="bg-[#FFFFFF] h-56 pt-5 pl-5">
                <h3 className="text-[#6B003A] text-[18px] leading-5 font-bold">Boordy Seyval Vidal Chardonnay</h3>
                <p className="text-[#6B003A] text-[12px] w-56">750ml</p>
                <p className="text-[14px] text-[#6B003A] font-bold">$12.99</p>
                <div className="flex flex-row flex-wrap">
                  {wineAttribute.map(item => (
                    <span key={item} className="bg-[#FBB1A1] text-[#FFFFFF] text-[12px] font-bold rounded-full p-1.5 mr-2 mt-2">{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </>
    )
}

export default PickingScreen;