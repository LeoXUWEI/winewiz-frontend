import { useState } from "react";
import Image from 'next/image';
import imageLogo from '/WineWiz.png';
import WavyAnimation from '@/components/WavyAnimation/WavyAnimation';
import WineWizScreen from "@/pages/components/WineWizScreen";
import BudgetScreen from "@/pages/components/BudgetScreen";
import MoreAboutYourNeedsScreen from "@/pages/components/MoreAboutYourNeedsScreen";
import WizListeningScreen from "@/pages/components/WizListeningScreen";
import WizThinkingScreen from "@/pages/components/WizThinkingScreen";
import WineWizIndex from "@/pages/components/WineWizIndex";
import PickingScreen from "@/pages/components/PickingScreen";

const SCREENS = {
    INDEX: 'index',
    WINE_WIZ: 'wineWiz',
    BUDGET: 'budget',
    MORE_ABOUT_YOUR_NEED: 'moreAboutYourNeed',
    WIZ_LISTENING: 'wizListening',
    WIZ_THINKING: 'wizThinking',
    PICKING_WINE: 'pickingWine',
};

const SCREENS_MAP = {
    [SCREENS.INDEX]: SCREENS.WINE_WIZ,
    [SCREENS.WINE_WIZ]: SCREENS.BUDGET,
    [SCREENS.BUDGET]: SCREENS.MORE_ABOUT_YOUR_NEED,
    [SCREENS.MORE_ABOUT_YOUR_NEED]: SCREENS.WIZ_LISTENING,
    [SCREENS.WIZ_LISTENING]: SCREENS.WIZ_THINKING,
    [SCREENS.WIZ_THINKING]: SCREENS.PICKING_WINE,
}

const amplitudes = {
    [SCREENS.INDEX]: 450,
    [SCREENS.WINE_WIZ]: 350,
    [SCREENS.BUDGET]: 350,
    [SCREENS.MORE_ABOUT_YOUR_NEED]: 350,
    [SCREENS.WIZ_LISTENING]: 250,
    [SCREENS.WIZ_THINKING]: 150,
    [SCREENS.PICKING_WINE]: 350
};

export default function ChattingPage() {
    const [currentScreen, setCurrentScreen] = useState(SCREENS.INDEX);
    const toNextScreen = () => {
        const nextScreen = SCREENS_MAP[currentScreen];
        setCurrentScreen(nextScreen);
    }

    const SCREENS_COMPONENTS = {
        [SCREENS.INDEX]: <WineWizIndex toNextScreen={toNextScreen} />,
        [SCREENS.WINE_WIZ]: <WineWizScreen toNextScreen={toNextScreen} />,
        [SCREENS.BUDGET]: <BudgetScreen toNextScreen={toNextScreen} />,
        [SCREENS.MORE_ABOUT_YOUR_NEED]: <MoreAboutYourNeedsScreen toNextScreen={toNextScreen} />,
        [SCREENS.WIZ_LISTENING]: <WizListeningScreen toNextScreen={toNextScreen} />,
        [SCREENS.WIZ_THINKING]: <WizThinkingScreen toNextScreen={toNextScreen} />,
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