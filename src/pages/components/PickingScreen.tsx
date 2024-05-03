import React from "react";
import { useState, useEffect, useRef } from 'react'
import { AudioOutline } from 'antd-mobile-icons'
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'
import { startRecording, stopRecording } from '../../../utils/audio';
import { transcribeAudio, createMessageSingle, runThread, listMessage } from '../../../utils/openai'
const PickingScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {

    const { displayTexts, handleReset, setDisplayTexts } = useDisplayWord([])
    const [showPicking, setShowPicking] = useState(false)
    const [displayPickText, setDisplayPickText] = useState("");
    let recording = useRef<MediaRecorder | null>();
    const [audioBlob, setAudioBlob] = useState<Blob | null>();
    const displayTextRef = useRef<any>();
    const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, children?: any }[]>([
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
            children: <AudioOutline />,
            text: 'Tap to speak',
            onClick: recordVoice
        }
    ])


    const speakText = async () => {
        const { speakText } = await import('../../../utils/textToSpeech');
        speakText(displayTexts[displayTexts.length - 1]);
    }

    useEffect(() => {
        displayTextRef?.current.scrollTo(0, displayTextRef?.current.scrollHeight);
    }, [displayTexts])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            let contentFromGpt = localStorage.getItem("contentFromGpt");
            if (contentFromGpt && (typeof contentFromGpt === 'string')) {
                let jsonFormat = ''
                try {
                    jsonFormat = JSON.parse(contentFromGpt);
                } catch (e) {
                    console.log(e)
                    jsonFormat = {
                        "msg": "I've selected the Hollywood Vine 2480 Cabernet, 2014 for its exceptional characteristics and alignment with your budget range of $50 to $100. This full-bodied cabernet is noted for its opulent creme de cassis aromas, integrated with high-quality oak, licorice, and cedar. Praised for its ripe, concentrated flavor with sweet tannin, it delivers a long finish, making it an excellent choice for a super-premium wine under $100.",
                        "name": "Hollywood Vine 2480 Cabernet, 2014",
                        "keywords": "super premium, budget $50 to $100",
                        "theme": "Elegant and sophisticated gathering",
                        "volume": "750ml",
                        "category_3": "Cabernet Sauvignon",
                        "rating": "4.7",
                        "product_highlights": "Napa, CA- This \'garage\' wine is a limited production newcomer. The opaque purple-colored Cabernet possesses pure creme de cassis aromas intermixed with high quality oak, licorice, and cedar. It is full-bodied and ripe, with sweet tannin, marvelous concentration, and a long finish.",
                        "country_state": "California",
                        "region": "Napa Valley",
                        "brand": "Hollywood Vine",
                        "abv": "14.80%",
                        "varietal": "Cabernet Sauvignon",
                        "food_pairings": "Beef, Hard Cheese, Lamb",
                        "url": "https://www.totalwine.com/wine/red-wine/cabernet-sauvignon/hollywood-vine-2480-cabernet/p/36082750",
                        "img": "https://www.totalwine.com/dynamic/x1000,sq/media/sys_master/twmmedia/heb/h19/8812464078878.png"
                    };
                }
                displayTexts.push(jsonFormat.msg);
                setDisplayTexts(displayTexts);
                speakText();
            }

            let index = 0;
            const interval = setInterval(() => {
                let oldisplayPickText = displayPickText;
                if (contentFromGpt && (typeof contentFromGpt === 'string')) {
                    let jsonFormat = JSON.parse(contentFromGpt);

                    if (index <= jsonFormat.keywords.length) {

                        setDisplayPickText(oldisplayPickText + jsonFormat.keywords.substring(0, index));
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

    async function recordVoice() {
        console.log(recording);
        if (!recording.current) {
            recording = { current: await startRecording() };

            const newCustomObjContent: { className: string, text: string, onClick?: Function, showIcon?: boolean }[] = customObjContent.map((item, index) => {
                if (index === 2) {
                    return { ...item, text: 'tap to send' };
                }
                return item;
            });
            setCustomObjContent(newCustomObjContent)
        } else {
            const blob = await stopRecording(recording.current);
            setAudioBlob(blob);
            recording.current = null;
            const newCustomObjContent: { className: string, text: string, onClick?: Function, showIcon?: boolean }[] = customObjContent.map((item, index) => {
                if (index === 2) {
                    return { ...item, text: 'tap to speak' };
                }
                return item;
            });
            setCustomObjContent(newCustomObjContent)

            if (blob) {
                // Send audio for transcription
                const file = new File([blob], "userspeak.mp3");
                const transcription = await transcribeAudio(file);
                if (transcription) {
                    //构建数据传递 gpt
                    localStorage.setItem("contentFromGpt", '');
                    let threadId = localStorage.getItem("thread_id");
                    let msgFromGpt = await createMessageSingle(threadId, transcription);
                    console.log('msgFromGpt' + JSON.stringify(msgFromGpt));
                    if (typeof window !== 'undefined') {
                        let assistantId = localStorage.getItem('assistant_id');
                        let run = await runThread(threadId, assistantId);
                        if (run.status === 'completed') {
                            let messages = await listMessage(run.thread_id);
                            let content = (messages.data[0].content[0] as any).text.value;
                            if (typeof window !== 'undefined') {

                                console.log(content);


                                if (content && (typeof content === 'string')) {
                                    let jsonFormat = JSON.parse(content);
                                    displayTexts.push(jsonFormat.msg)
                                    setDisplayTexts(displayTexts);
                                    speakText();
                                    let index = 0;
                                    const interval = setInterval(() => {


                                        if (content && (typeof content === 'string')) {
                                            let jsonFormat = JSON.parse(content);

                                            if (index <= jsonFormat.keywords.length) {
                                                setDisplayPickText(prevDisplayPickText => prevDisplayPickText + jsonFormat.keywords.substring(index, index + 1));
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
                            }
                        } else {
                            console.log(run.status);
                        }
                    }
                }
            }
        }
    }
    function handleReStart() {
        handleReset()
    }
    function handlePick() {
        setCustomObjContent(prevContent => ([]))
        setShowPicking(() => true)
        if (typeof window !== 'undefined') {
            localStorage.setItem("PickText", displayPickText);
        }
        toNextScreen();
    }
    return (
        <>
            <div>
                <h1 className={'text-[#6B003A] text-[24px] font_normal_bold text-center pt-10'}>WineWiz</h1>
                <div className={'h-10 overflow-auto'} ref={displayTextRef}>
                    {displayTexts.map((item: string, index: number) => (
                        <div className={'text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen'} key={index}>{item}</div>
                    ))}
                </div>
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
