import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { SendOutline } from 'antd-mobile-icons'
import SwitchButton from '@/components/switchButton';
import { Value } from "sass";
export default function MakeGiftCard({ toNextScreen }: { toNextScreen: any }) {
  const router = useRouter()

  const { isSaved, image } = router.query

  const [cardInfo, setCardInfo] = useState("")
  const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, children?: any }[]>([
    {
      className: 'shallowPiont',
      text: 'Share',
      children: <SendOutline />,
      onClick: handleShare
    }
  ])

  const info = useRef<any>();

  const [item, setItems] = useState<any>();

  useEffect(() => {

    if (typeof window !== 'undefined') {
      let cardsInfo = localStorage.getItem("cardsInfo") as string;
      setCardInfo(cardsInfo);

      let contentFromGpt = localStorage.getItem("selectWinJson");
      if (contentFromGpt && (typeof contentFromGpt === 'string')) {
        // 去除末尾空白字符后再截取
        let jsonStr = contentFromGpt.trim();
        const index = jsonStr.lastIndexOf("}");
        if (index !== -1) {
          jsonStr = jsonStr.substring(0, index + 1);
          let jsonFormat = JSON.parse(jsonStr);
          info.current = jsonFormat

          // 将info的信息转换为item数组
          const item = [
            { label: 'Country/State', value: info.current.country_state },
            { label: 'Wine Type', value: info.current.category_2 },
            { label: 'Varietal', value: info.current.category_3 },
            { label: 'Brand', value: info.current.brand },
            { label: 'Style', value: info.current.style },
            { label: 'Body', value: info.current.body },
            { label: 'Taste', value: info.current.taste },
            { label: 'Food Pairings', value: info.current.food_pairings },
            { label: 'ABV', value: info.current.abv }
          ];
          setItems(item);
        }
      }
    }

    if (isSaved) {
      setCustomObjContent([
        {
          className: 'pinot',
          text: 'Share',
          children: <SendOutline />,
          onClick: handleShare
        }
      ])
    }
  }, [])

  function handleShare() {
    console.log('share')
  }
  const handleEditPicture = () => {
    if (isSaved) return
    router.push('/uploadImage')
  }
  return (
    <div className="container bg-[#F7ECE4] overscroll-y-scroll h-full">
      <h1 className={'text-[#6B003A] text-[24px] font_extra_bold text-center pt-10'}>Make Gift Card</h1>
      <div className={'text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen'}>Here is how your gift card will look like</div>
      <div className={'ml-5 mr-5 pt-5 pb-5 mt-5 bg-[#FFFFFF] rounded-2xl'}>
        <div onClick={handleEditPicture} className={'ml-5 mr-5 bg-[#FFDFC2] h-[212px] rounded-2xl flex flex-row justify-center items-center'}>
          {isSaved ? <img src={'6ccfa742f3aa74d2fade4bac928f958b.png'} alt="generatedImg" className="h-full w-full object-cover" /> :
            <div className="w-[155px] h-[48px] border-solid border-3 border-[#6B003A] rounded-[24px] flex flex-row justify-center items-center">
              <span className="text-[#6B003A] text-[18px] font_normal_bold">Edit Picture</span>
            </div>
          }
        </div>
        <div className="mt-5">
          <div>
            <p className="text-[#6B003A] text-[14px] font_medium_bold text-left italic ml-5 mr-5">{cardInfo}</p><br />
          </div>
        </div>
        <div className="border-t-2 border-[#6B003A]" />
        <div className="flex flex-row mt-5">
          <img
            className={"image_logo m-auto w-32"}
            src={info.current?.img}
            alt="wine"
          />
          <div>
            <h3 className="text-[#6B003A] text-[18px] font_normal_bold leading-4">{info.current?.name}</h3>
            <p className="text-[#6B003A] text-[12px] font_medium_bold w-56">{info.current?.volume}</p>
            <p className="text-[#6B003A] text-[14px] font_medium_bold w-48 leading-5">{info.current?.msg}</p>
          </div>
        </div>
        <div className="mt-5">
          {
            item && item.map((item: any) => (
              <p key={item.label} className="flex flex-row justify-between">
                <span className="text-[#6B003A] text-[14px] text-left font_normal_bold pl-5">{item.label}</span>
                <span className="text-[#6B003A] text-[14px] text-right font_medium_bold pr-5">{item.value}</span>
              </p>
            ))
          }
        </div>
      </div>
      <div className={'mt-10 w-80 mx-auto pb-10'}>
        <SwitchButton customObjContent={customObjContent} isFreePosition={true} />
      </div>
    </div>
  );
}
