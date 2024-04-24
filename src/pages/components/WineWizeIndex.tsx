import React from "react";
import {ScreenProps} from "@/types/Screen.props";


const WineWizeIndex: React.FC<ScreenProps> = ({toNextScreen}) => {
    return (
        <div className={"content flex-row"}>
            <div className={"enterShow flex flex-col justify-center pt-36"}>
                <img
                    className={"image_logo pb-12"}
                    src={'/WineWiz.png'}
                    alt="WineWiz"
                />
                <img
                    className={"image_logo m-auto w-40"}
                    src={'/WineWizICon.png'}
                    alt="WineWiz"
                />
            </div>
            <p
                onClick={toNextScreen}
                className={'text-center mt-10 text-[#6B003A] font-bold font-2'}>Tap to conitinue</p>
        </div>
    )
}

export default WineWizeIndex;