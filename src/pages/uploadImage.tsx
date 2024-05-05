import { useState, useRef } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router'
import SwitchButton from '@/components/switchButton';
import avatarPhoto from '../../public/4382a4763a19dc4ed6b8f1e9984194d8.png'
export default function MakeGiftCard() {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<any>('')
  const [generateUrl, setGenerateUrl] = useState(false)
  const selectedIndex = useRef(-1)
  const [customObjContent, setCustomObjContent] = useState<{ className: string, text: string, onClick?: Function, children?: any }[]>([])
  const imageStyle = ['Photorealistic', 'Anime', 'Oil paint', 'Watercolor', 'Disney 2D', 'Disney 3D', 'Vector Illustration']
  const handleSave = () => {
    router.push('/makeGiftCard?isSaved=true')
  }
  function handleGenerate() {
    setGenerateUrl(true)
    setCustomObjContent([
      {
        className: 'pinot',
        text: 'Save',
        onClick: handleSave
      }
    ])
  }
  const handleUploadPhoto = () => {
    setAvatarUrl(avatarPhoto)
  }
  const handleSelect = (index: number) => {
    if (generateUrl) {
      return
    }
    selectedIndex.current = index
    setCustomObjContent([
      {
        className: 'pinot',
        text: 'Generate',
        onClick: handleGenerate
      }
    ])
  }
  return (
    <>
      <div className="container bg-[#F7ECE4] overscroll-y-scroll h-screen">
        <h1 className={'text-[#6B003A] text-[24px] font_extra_bold text-center pt-10'}>Image</h1>
        <div className={'text-[#6B003A] text-[14px] font_medium_bold text-left mt-3 pl-5 pr-5 w-screen'}>
          Now, upload a photo and choose a style you want to apply to the image you use on the gift card.
        </div>
        <div className="text-[#6B003A] font_normal_bold text-[18px] ml-5 pt-2">Picture</div>
        <div onClick={handleUploadPhoto} className={'ml-5 mr-5 bg-[#FFDFC2] h-[212px] rounded-2xl flex flex-row justify-center items-center'}>
          {
            avatarUrl ?
              <img src={`${generateUrl ? '6ccfa742f3aa74d2fade4bac928f958b.png' : '/4382a4763a19dc4ed6b8f1e9984194d8.png'}`} alt="" className="h-full w-full object-cover" /> :
              <div className="w-[155px] h-[48px] border-solid border-3 border-[#6B003A] rounded-[24px] flex flex-row justify-center items-center">
                <span className="text-[#6B003A] text-[18px] font_normal_bold">Upload Photo</span>
              </div>
          }
        </div>
        {avatarUrl && <div className="ml-5 mr-5 mt-2 flex flex-row flex-wrap">
          {imageStyle.map((item, index: number) => (
            <span onClick={() => handleSelect(index)} className={`block p-2 mr-2 mb-2 text-[14px] text-[#6B003A] font_normal_bold rounded-2xl ${index === selectedIndex.current ? 'bg-[#FBB1A1]' : 'bg-[#FFFFFF]'}`} key={item}>{item}</span>
          ))}
        </div>
        }
        <div className={'mt-10 w-80 mx-auto pb-10'}>
          <SwitchButton customObjContent={customObjContent} isFreePosition={true} />
        </div>
      </div>
    </>
  );
}
