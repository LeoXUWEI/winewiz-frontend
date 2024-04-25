import React from "react";
import { ScreenProps } from "@/types/Screen.props";


const WineWizeIndex: React.FC<ScreenProps> = ({ toNextScreen }) => {
    return (
        <div className={"content flex-row"}>
            <div className={"enterShow flex flex-col justify-center pt-36"}>
                {/* <img
                    className={"image_logo pb-12"}
                    src={'/WineWiz.png'}
                    alt="WineWiz"
                /> */}
                <p
                    className={'text-center pb-12 text-[#6B003A] text-[64px] font_product_title'}>WineWiz
                </p>

                <img
                    className={"image_logo m-auto w-40"}
                    src={'/WineWizICon.png'}
                    alt="WineWiz"
                />
            </div>
            <p
                onClick={toNextScreen}
                className={'text-center mt-10 text-[#6B003A] text-[18px] font_button_text'}>tap to continue
            </p>
        </div>
    )
}

export default WineWizeIndex;