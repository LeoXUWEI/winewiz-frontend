import { useState } from "react";
import Image from 'next/image';
import imageLogo from '/WineWiz.png';
import WavyAnimation from '@/components/WavyAnimation/WavyAnimation';
import { WineWizScreen } from "@/pages/components/WineWizScreen";
import { BudgetScreen } from "@/pages/components/BudgetScreen";
import { MoreAboutYourNeedsScreen } from "@/pages/components/MoreAboutYourNeedsScreen";
import { WizeListeningScreen } from "@/pages/components/WizeListeningScreen";
import { WizeThinkingScreen } from "@/pages/components/WizeThinkingScreen";
import { WineWizeIndex } from "@/pages/components/WineWizeIndex";
import { PickingScreen } from "@/pages/components/PickingScreen";

const SCREENS = {
    INDEX: 'index',
    WINE_WIZ: 'wineWiz',
    BUDGET: 'budget',
    MORE_ABOUT_YOUR_NEED: 'moreAboutYourNeed',
    WIZE_LISTENING: 'wizeListening',
    WIZE_THINKING: 'wizeThinking',
    PICKING_WINE: 'pickingWine',
};

const SCREENS_MAP = {
    [SCREENS.INDEX]: SCREENS.WINE_WIZ,
    [SCREENS.WINE_WIZ]: SCREENS.BUDGET,
    [SCREENS.BUDGET]: SCREENS.MORE_ABOUT_YOUR_NEED,
    [SCREENS.MORE_ABOUT_YOUR_NEED]: SCREENS.WIZE_LISTENING,
    [SCREENS.WIZE_LISTENING]: SCREENS.WIZE_THINKING,
    [SCREENS.WIZE_THINKING]: SCREENS.PICKING_WINE,
}

const amplitudes = {
    [SCREENS.INDEX]: 450,
    [SCREENS.WINE_WIZ]: 350,
    [SCREENS.BUDGET]: 350,
    [SCREENS.MORE_ABOUT_YOUR_NEED]: 350,
    [SCREENS.WIZE_LISTENING]: 250,
    [SCREENS.WIZE_THINKING]: 150,
    [SCREENS.PICKING_WINE]: 350
};

export default function ChattingPage() {
    const [currentScreen, setCurrentScreen] = useState(SCREENS.INDEX);
    const toNextScreen = () => {
        const nextScreen = SCREENS_MAP[currentScreen];
        setCurrentScreen(nextScreen);
    }

    const SCREENS_COMPONENTS = {
        [SCREENS.INDEX]: <WineWizeIndex toNextScreen={toNextScreen} />,
        [SCREENS.WINE_WIZ]: <WineWizScreen toNextScreen={toNextScreen} />,
        [SCREENS.BUDGET]: <BudgetScreen toNextScreen={toNextScreen} />,
        [SCREENS.MORE_ABOUT_YOUR_NEED]: <MoreAboutYourNeedsScreen toNextScreen={toNextScreen} />,
        [SCREENS.WIZE_LISTENING]: <WizeListeningScreen toNextScreen={toNextScreen} />,
        [SCREENS.WIZE_THINKING]: <WizeThinkingScreen toNextScreen={toNextScreen} />,
        [SCREENS.PICKING_WINE]: <PickingScreen toNextScreen={toNextScreen} />
    };


    const currentScreenComponent = SCREENS_COMPONENTS[currentScreen];


    return (
        <div className="container h-screen">
            <WavyAnimation amplitude={amplitudes[currentScreen]} />
            {currentScreenComponent}
        </div>
    );
}