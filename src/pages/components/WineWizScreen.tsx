import React, { useEffect, useState } from "react";
import { ScreenProps } from "@/types/Screen.props";
import SwitchButton from '@/components/switchButton';
import useDisplayWord from '@/hooks/useDisplayWord';

const WineWizScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
    const initialText = [
        'Hi, I am Wiz, your personal wine master.',
        'I can pick the perfect gift wine for you with just a few questions answered. Afterwards, I will help you create personalized gift cards to make your gift special!'
    ];
    const { displayTexts, handleReset } = useDisplayWord(initialText);

    const speakText = async () => {
        const { speakText } = await import('../../../utils/textToSpeech');
        speakText(initialText.join(' '));
    }

    const stopSpeaking = async () => {
        const { stopSpeaking } = await import('../../../utils/textToSpeech');
        stopSpeaking();
    }

    useEffect(() => {
        speakText();

        return () => {
            // stop speaking
            console.log('stopSpeaking')
            stopSpeaking();
        }
    }, []);

    const [showFullText, setShowFullText] = useState(false);
    const [buttonContent, setButtonContent] = useState([
        { className: 'pinot', text: 'Continue', onClick: () => handleContinue() }
    ]);

    const handleContinue = () => {
        setShowFullText(true);
        setTimeout(toNextScreen, 200);
    };

    return (
        <>
            <div>
                <h1 className="text-[#6B003A] text-[24px] font_extra_bold text-center pt-10">WineWiz</h1>
                {(showFullText ? initialText : displayTexts).map((item, index) => (
                    <div className="text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen" key={index}>
                        {item}
                    </div>
                ))}
            </div>
            <div className="w-80 mx-auto">
                <SwitchButton toNextScreen={toNextScreen} customObjContent={buttonContent} />
            </div>
        </>
    );
};

export default WineWizScreen;
