import React from "react";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SwitchButton from '@/components/switchButton';
import { ScreenProps } from "@/types/Screen.props";
import useDisplayWord from '@/hooks/useDisplayWord'
import { completions } from '../../../utils/openai'

const PickingScreen: React.FC<ScreenProps> = ({ toNextScreen }) => {
  const router = useRouter()
  const text = ["Here is what I picked for you. It is a Boordy Seyval Vidal Chardonnay..."]

  const [wineAttribute, setWineAttribute] = useState(['wedding', 'california', 'steak lover', 'Dry', 'refreshing flavor'])
  const { displayTexts, handleReset } = useDisplayWord(text)
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
  const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, showIcon?: boolean }[]>([
    {
      className: 'picking',
      text: 'Purchase this',
      onClick: handlePurchase
    },
    {
      className: 'bordered',
      text: 'Repeat your last message',
      onClick: handleReStart
    },
    {
      className: 'pinot',
      text: 'Make Giftcard',
      onClick: handleMakeGiftcard
    }
  ])

  useEffect(() => {

    if (typeof window !== 'undefined') {
      let contentFromGpt = localStorage.getItem("selectWinJson");
      if (contentFromGpt && (typeof contentFromGpt === 'string')) {
        // 去除末尾空白字符后再截取
        let jsonStr = contentFromGpt.trim();
        const index = jsonStr.lastIndexOf("}");
        if (index !== -1) {
          jsonStr = jsonStr.substring(0, index + 1);
          let jsonFormat = JSON.parse(jsonStr);
          setInfo(jsonFormat);
          setWineAttribute(jsonFormat.taste.split(', '));
        }
      }



      return () => {

      };
    }

  }, [])
  function handleReStart() {
    handleReset()
  }
  function handlePurchase() {
    window.open(info.url, '_blank');
  }
  async function handleMakeGiftcard() {

    let content = "Write a heartwarming message suitable for a gift card to accompany the gift wine " + info.category_3 + " that celebrates the " + info.theme + ". Express gratitude, reminisce about shared memories, and convey the joy of having each other in your lives. Encourage the recipient to cherish the bond you share and express optimism for the future adventures you'll embark on together. Please be concise in one or two paragraphs. You must only output the body text paragraphs of the card. You must not include the header and footer or other parts of the card."
    let res = await completions(content);
    if (typeof window !== 'undefined' && res) {
      localStorage.setItem("cardsInfo", res);
    }
    router.push('/makeGiftCard');
  }

  return (
    <>
      <div>
        <h1 className={'text-[#6B003A] text-[24px] font_normal_bold text-center pt-10'}>WineWiz</h1>
        {displayTexts.map((item: string, index: number) => (
          <div className={'text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen'} key={index}>{item}</div>
        ))}
      </div>
      <div className="flex flex-row items-center h-72  ml-5 mr-5 rounded-2xl">
        <div className="bg-[#FFDFC2] rounded-l-2xl h-56 flex flex-row items-center">
          <img
            className={"image_logo m-auto w-56"}
            src={'/wine.png'}
            alt="wine"
          />
        </div>
        <div className="bg-[#FFFFFF] rounded-r-2xl h-56 pt-5 pl-5 pb-5">
          <h3 className="text-[#6B003A] text-[18px] font_normal_bold leading-5">{info.name}</h3>
          <p className="text-[#6B003A] text-[12px] font_medium_bold w-56">{info.volume}</p>
          <p className="text-[#6B003A] text-[14px] font_normal_bold">${info.price}</p>
          <div className="flex flex-row flex-wrap">
            {wineAttribute.map(item => (
              <span key={item} className="bg-[#FBB1A1] text-[#FFFFFF] text-[12px] font_normal_bold rounded-full pt-1 pb-1 pl-2 pr-2 mr-2 mt-2">{item}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={'mt-16 w-80 mx-auto'}>
        <SwitchButton toNextScreen={toNextScreen} customObjContent={customObjContent} />
      </div>
    </>
  )
}

export default PickingScreen;
