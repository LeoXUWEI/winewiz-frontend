import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { SendOutline } from 'antd-mobile-icons'
import SwitchButton from '@/components/switchButton';
import { Value } from "sass";
export default function MakeGiftCard({ toNextScreen }: { toNextScreen: any }) {
  const router = useRouter()
 
  const { isSaved ,image} = router.query
  
  const [cardInfo, setCardInfo] = useState("")
  const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, children?: any }[]>([
    {
      className: 'shallowPiont',
      text: 'Share',
      children: <SendOutline />,
      onClick: handleShare
    }
  ])

  const [info, setInfo] = useState({
    "name": "Chateau Palmer Margaux, 2010",
    "msg": "The Chateau Palmer Margaux 2010 is an exquisite choice for a luxury wine, especially for those with a budget of $100 and up. Priced at $575, this Bordeaux blend from the Margaux region in France is renowned for its depth and complexity. The wine connoisseur will appreciate the full-bodied richness, black/purple color, and the delicate balance of blackberry and cassis notes with a hint of camphor and barbecue smoke. It's tannic yet poised, ensuring a memorable tasting experience.",
    "keywords": "luxury wine, budget $100 and up",
    "theme": "Opulent elegance",
    "volume": "750ml",
    "product_highlights": "It is tannic and backward, but has a sensational black/purple color and a gorgeous nose of camphor, barbecue smoke, blackberry and cassis. Full-bodied, this wine has a precision and freshness...",
    "country_state": "France",
    "category_2": "Red Wine",
    "price": "",
    "category_3": "Bordeaux Blend",
    "brand": "Chateau Palmer",
    "style": "Full-bodied",
    "body": "Full-bodied",
    "taste": "Blackberry, cassis, camphor, barbecue smoke",
    "food_pairings": "Beef, Lamb, Hard Cheese",
    "abv": "14%",
    "url": "https://www.totalwine.com/wine/red-wine/bordeaux-blend/chateau-palmer-margaux/p/31310750",
    "img": "https://www.totalwine.com/dynamic/x1000,sq/media/sys_master/twmmedia/hd7/h49/17193102278686.png"
  });

  const [item, setItems] = useState([
    { label: 'Country/State', value: 'Maryland' },
    { label: 'Wine Type', value: 'White Wine' },
    { label: 'Style', value: 'Dry' },
    { label: 'Body', value: 'Light-bodied' },
    { label: 'Brand', value: 'Boordy' },
    { label: 'Varietal', value: 'Chardonnay' },
    { label: 'Taste', value: 'Melon, Herb' }
  ]);

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
          setInfo(jsonFormat);

          // 将info的信息转换为item数组
          const item = [
            { label: 'Country/State', value: info.country_state },
            { label: 'Wine Type', value: info.category_2 },
            { label: 'Varietal', value: info.category_3 },
            { label: 'Brand', value: info.brand },
            { label: 'Style', value: info.style },
            { label: 'Body', value: info.body },
            { label: 'Taste', value: info.taste },
            { label: 'Food Pairings', value: info.food_pairings },
            { label: 'ABV', value: info.abv }
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
          {isSaved ? <img src={'6ccfa742f3aa74d2fade4bac928f958b.png'} alt="" className="h-full w-full object-cover" /> :
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
            src={'/wine.png'}
            alt="wine"
          />
          <div>
            <h3 className="text-[#6B003A] text-[18px] font_normal_bold leading-4">{info.name}</h3>
            <p className="text-[#6B003A] text-[12px] font_medium_bold w-56">{info.volume}</p>
            <p className="text-[#6B003A] text-[14px] font_medium_bold w-48 leading-5">{info.msg}</p>
          </div>
        </div>
        <div className="mt-5">
          {
            item.map(item => (
              <p key={item.label} className="flex flex-row justify-between">
                <span className="text-[#6B003A] text-[14px] font_normal_bold pl-5">{item.label}</span>
                <span className="text-[#6B003A] text-[14px] font_medium_bold pr-5">{item.value}</span>
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
