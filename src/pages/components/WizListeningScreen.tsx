import React from "react";
import { useState, useEffect } from 'react';
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord';
import {transcribeAudio } from '../../../utils/openai'
import { startRecording, stopRecording } from '../../../utils/audio';

const WizListeningScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
    const text = ['Wiz is listening'];
    const { displayTexts, handleReset } = useDisplayWord(text);

    const [recording, setRecording] = useState<MediaRecorder | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

    useEffect(() => {
        const start = async () => {
            const recordingObject = await startRecording();
            setRecording(recordingObject);
        };

        start();

        return () => {
            // Ensure to clean up and handle the promise correctly when unmounting
            const stop = async () => {
                if (recording) {
                    const blob = await stopRecording(recording);
                    setAudioBlob(blob);
                }
            };
            stop();
        };
    }, []);

    const handleSend = async () => {
        if (recording) {
            const blob = await stopRecording(recording); // Correctly wait for the promise to resolve
            setRecording(null);
            setAudioBlob(blob);

            if (blob) {
                // Send audio for transcription
                const file = new File([blob], "userspeak.mp3");
                const transcription = await transcribeAudio(file);
                console.log("transcription"+transcription); // Logging the transcription
                toNextScreen();
            }
        }
    };

    const customObjContent = [
        {
            className: 'bubblyrose',
            text: 'Tap to send',
            showIcon: true,
            onClick: handleSend
        }
    ];

    return (
        <>
            <div className={'text-[#6B003A] text-[24px] font_normal_bold text-center pt-80'}>{displayTexts[0]}</div>
            <div className={'mt-16 w-80 mx-auto'}>
                <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
            </div>
        </>
    )
}

export default WizListeningScreen;