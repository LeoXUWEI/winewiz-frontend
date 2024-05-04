import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { SendOutline } from 'antd-mobile-icons'
import SwitchButton from '@/components/switchButton';
export default function MakeGiftCard() {
  const router = useRouter()
  const { isSaved } = router.query
  const [cardInfo,setCardInfo] =useState("")
  const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, children?: any }[]>([
    {
      className: 'shallowPiont',
      text: 'Share',
      children: <SendOutline />,
      onClick: handleShare
    }
  ])
  useEffect(() => {

    if (typeof window !== 'undefined') {
      let cardsInfo = localStorage.getItem("cardsInfo") as string;
      setCardInfo(cardsInfo);
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
  const text = [
    'To Justin & Partner,',
    "In the symphony of life's sweetest moments, may your wedding day be the crescendo that echoes joyfully into a lifetime of shared memories and dreams come true.",
    "As you both intertwine your lives, like the blended notes of this Boordy Seyval Vidal Chardonnay, may your days be filled with a perfect balance of harmony, zest, and the warmth of the sun that ripened its grapes.",
    "May this bottle symbolize the richness of your past and the brightness of your future, a testament to the love that grows and a toast to the laughter yet to come.Congratulations on finding your forever blend.Cheers to love, laughter, and happily ever after!",
    "Warmest Wishes,"
  ]
  const item = [
    { label: 'Country/State', value: 'Maryland' },
    { label: 'Wine Type', value: 'White Wine' },
    { label: 'Style', value: 'Dry' },
    { label: 'Body', value: 'Light-bodied' },
    { label: 'Brand', value: 'Boordy' },
    { label: 'Varietal', value: 'Chardonnay' },
    { label: 'Taste', value: 'Melon, Herb' }
  ]
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
          {isSaved ? <img src={'6ccfa742f3aa74d2fade4bac928f958b.png'} alt="" className="h-full w-full object-cover" /> :
            <div className="w-[155px] h-[48px] border-solid border-2 border-[#6B003A] rounded-[24px] flex flex-row justify-center items-center">
              <span className="text-[#6B003A] font_medium_bold">Edit Picture</span>
            </div>
          }
        </div>
        <div className="mt-5">
           <div>
            <p className="text-[#6B003A] text-[14px] font_medium_bold text-left ml-5 mr-5">{cardInfo}</p><br />
          </div> 
        </div>
        <div className="border-t-2 border-[#6B003A]" />
        <div className="flex flex-row mt-5">
          <img
            className={"image_logo m-auto w-32"}
            src={'/wine.png'}
            alt="wine"
          />
          <div>
            <h3 className="text-[#6B003A] text-[18px] leading-4">Boordy Seyval Vidal Chardonnay</h3>
            <p className="text-[#6B003A] text-[12px] w-56">750ml</p>
            <p className="text-[#6B003A] text-[14px] w-48 leading-5">Maryland - Crisp, clean, and dry - with hints of tropical fruit and herbs on the nose, the Rockfish is out most versatile white wine. Pair with veal, roasted pork and seafood dishes.</p>
          </div>
        </div>
        <div className="mt-5">
          {
            item.map(item => (
              <p key={item.label} className="flex flex-row justify-between">
                <span className="text-[#6B003A] text-[14px] pl-5 font-bold">{item.label}</span>
                <span className="text-[#6B003A] text-[14px] pr-5">{item.value}</span>
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
