'use client';

import { useRouter } from 'next/navigation';

import { SETTINGS, Setting } from '@constants/settings';
import RightArrowIcon from 'public/assets/icon24/right_arrow_24.svg';

export default function Page() {
  const { push } = useRouter();

  const handleClickSettingItem = (setting: Setting) => () => {
    if (setting.url) {
      push(setting.url);
    }
  };
  return (
    <ul className="pt-[56px]">
      {SETTINGS.map((setting, index) => (
        <li
          key={index}
          className="flex justify-between items-center py-[8px] pl-[24px] pr-[16px] h-[56px]"
          onClick={handleClickSettingItem(setting)}
        >
          <p className="body-16-bold">{setting.title}</p>
          {setting.url && <RightArrowIcon />}
        </li>
      ))}
    </ul>
  );
}
