import React from "react";
import { useState, useEffect, useRef } from 'react'
import { CapsuleTabs } from 'antd-mobile'
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'
import styles from './BudgetScreen.module.scss'

const BudgetScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
    let text = ["First, let’s start with your budget. Tap on the one budget range that is ideal to you. If you do not have a specific budget, it is fine, tap the last choice and I will help you out."]
    const { displayTexts, handleReset } = useDisplayWord(text)
    const [customClassName, setCustomClassName] = useState('pinot')
    let selectKey = useRef('')
    const displayTextRef = useRef<any>()
    const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick: Function }[]>([
        {
            className: 'bordered',
            text: 'Repeat your last message',
            onClick: handleReStart
        },
        {
            className: 'pinot',
            text: 'Continue',
            onClick: handleContinue
        }
    ])
    useEffect(() => {
        displayTextRef?.current.scrollTo(0, displayTextRef?.current.scrollHeight);
    }, [displayTexts])
    function handleReStart() {
        handleReset()
    }
    const tabs = [
        { label: 'budget wines', value: '$10 and under', key: 'budget' },
        { label: 'mid-range wines', value: '$10 to $25', key: 'mid-range' },
        { label: 'premium wines', value: '$25 to $50', key: 'premium' },
        { label: 'super premium wines', value: '$50 to $100', key: 'super' },
        { label: 'luxury wines', value: '$100 and up', key: 'luxury' },
        { label: 'collector and icon wines', value: '$200 and up', key: 'collector' },
        { label: 'I do not have a specific budget', value: '', key: 'no' },
    ]
    function handleContinue() {
        if (selectKey.current) {
            toNextScreen()
        }
    }
    const handleChange = (key: string) => {
        selectKey.current = key
    }
    return (
        <div className={styles.BudgetScreen}>
            <h1 className={'text-[#6B003A] text-[24px] font_page_title text-center pt-10'}>Budget</h1>
            <div className={'h-10 overflow-auto'} ref={displayTextRef}>
                {displayTexts.map((item: string, index: number) => (
                    <div className={' text-[#6B003A] text-[14px] font_paragraph text-center mt-3 pl-5 pr-5 w-screen'} key={index}>{item}</div>
                ))}
            </div>
            <div>
                <CapsuleTabs onChange={handleChange} defaultActiveKey=''>
                    {tabs.map(item => (
                        <CapsuleTabs.Tab
                            title={<span className={'flex flex-row justify-between'}
                            >
                                <span className={'text-[#6B003A] text-[14px] font_display_text'}>{item.label}</span>
                                <span className={'text-[#6B003A] text-[14px] font_display_text'}>{item.value}</span>
                            </span>}
                            key={item.key}
                        />)
                    )}
                </CapsuleTabs>
            </div>
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </div>
    )
}
export default BudgetScreen;