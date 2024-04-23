import React from "react";
import { useState, useEffect, useRef } from 'react'
import { CapsuleTabs } from 'antd-mobile'
import SwitchButton from '@/components/switchButton';
import {ScreenProps} from "@/pages/components/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'
import styles from './BudgetScreen.module.scss'

export const BudgetScreen: React.FC<ScreenProps> = ({toNextScreen}) => {
    let text = ["First, let's start withSo you picked super premium wines, usually costingrour budget. Tap on the onedeal to you, lf you do not .."]
    const {displayTexts, handleReset} = useDisplayWord(text)
    const [customClassName, setCustomClassName] = useState('pinot')
    let selectKey = useRef('')
    const displayTextRef = useRef<any>()
    const [customObjContent, setCustomObjContent] = useState<{className: string, text: string, onClick: Function}[]>([
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
        { label: 'super premium wi', value: '$50 to $100', key: 'super' },
        { label: 'luxury wines', value: '$100 and up', key: 'luxury' },
        { label: 'collector and iconwines', value: '$200 and up', key: 'collector' },
        { label: 'i do not have a spcific budget', value: '$10 and under', key: 'no' },
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
            <h1 className={'text-[#6B003A] text-3xl text-center font-bold pt-10'}>Budget</h1>
            <div className={'h-10 overflow-auto'} ref={displayTextRef}>
                {displayTexts.map((item: string, index: number) => (
                    <div className={'text-left mt-3 text-[#6B003A] font-bold pl-5 pr-5 w-screen'} key={index}>{item}</div>
                ))}
            </div>
            <div>
                <CapsuleTabs onChange={handleChange} defaultActiveKey=''>
                    { tabs.map(item => (
                        <CapsuleTabs.Tab
                            title={<span className={'flex flex-row justify-between'}
                        >
                                <span className={'text-[#6B003A]'}>{item.label}</span>
                                <span className={'text-[#6B003A]'}>{item.value}</span>
                            </span>}
                            key={item.key}
                        />)
                    ) }
                </CapsuleTabs>
            </div>
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </div>
    )
}