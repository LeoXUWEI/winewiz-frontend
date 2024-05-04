import React from "react";
import { useState, useEffect, useRef } from 'react'
import { CapsuleTabs } from 'antd-mobile'
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'
import styles from './BudgetScreen.module.scss'
import { createThread } from '../../../utils/openai';

const BudgetScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
    let text = ["First, let’s start with your budget. Tap on the one budget range that is ideal to you. If you do not have a specific budget, it is fine, tap the last choice and I will help you out."]
    let audio = null;
    let flag = false;

    const speakText = async () => {
        const { speakText } = await import('../../../utils/textToSpeech');
        audio = await speakText(text.join(' '));
        audio.play();
    }

    useEffect(() => {

        if (!flag) {
            flag = true;
            speakText();
        }

        return () => {
            // stop speaking
            if (audio) {
                audio.pause();
                audio.load();
                audio = null;
            }
        }
    }, []);

    const { displayTexts, handleReset } = useDisplayWord(text)
    const [customClassName, setCustomClassName] = useState('pinot')
    let selectKey = useRef('')
    const displayTextRef = useRef<any>()

    const handleContinue = async () => {
        if (selectKey) {
            console.log('Selected key:', selectKey);
            try {
                console.log('Creating thread...');
                const threadResponse = await createThread();
                console.log('Thread created successfully:', threadResponse);
                toNextScreen();
            } catch (error) {
                console.error('Failed to create message thread:', error);
            }
        } else {
            console.log('No key selected');
        }
    };

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
        { label: 'budget wines', value: '$10 and under', key: '$10 and under' },
        { label: 'mid-range wines', value: '$10 to $25', key: '$10 to $25' },
        { label: 'premium wines', value: '$25 to $50', key: '$25 to $50' },
        { label: 'super premium wines', value: '$50 to $100', key: '$50 to $100' },
        { label: 'luxury wines', value: '$100 and up', key: '$100 and up' },
        { label: 'collector and icon wines', value: '$200 and up', key: '$200 and up' },
        // { label: 'I do not have a specific budget', value: '', key: 'no' },
    ]

    const handleChange = (key: string) => {
        selectKey.current = key
        if (typeof window !== 'undefined') {
            const selectedTab = tabs.find(tab => tab.key === key);
            const selectedLabel = selectedTab ? selectedTab.label : '';
            localStorage.setItem("budget_key", key);
            localStorage.setItem("budget_label", selectedLabel);
        }
        console.log('Key changed:', key);
    }
    return (
        <div className={styles.BudgetScreen}>
            <h1 className={'text-[#6B003A] text-[24px] font_extra_bold text-center pt-10'}>Budget</h1>
            <div className={'h-10 overflow-auto'} ref={displayTextRef}>
                {displayTexts.map((item: string, index: number) => (
                    <div className={' text-[#6B003A] text-[14px] font_medium_bold text-center mt-3 pl-5 pr-5 w-screen'} key={index}>{item}</div>
                ))}
            </div>
            <div>
                <CapsuleTabs onChange={handleChange} defaultActiveKey=''>
                    {tabs.map(item => (
                        <CapsuleTabs.Tab
                            title={<span className={'flex flex-row justify-between'}
                            >
                                <span className={'text-[#6B003A] text-[14px] font_normal_bold'}>{item.label}</span>
                                <span className={'text-[#6B003A] text-[14px] font_normal_bold'}>{item.value}</span>
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
