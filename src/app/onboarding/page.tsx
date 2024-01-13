'use client';

import { AnimatePresence } from 'framer-motion';

// TODO: 폴더 & 파일 대소문자 통일
import Scene from '@components/Onboarding/Scene';

export default function Page() {
  return (
    // TODO: AnimatePresence exit 적용안되는 오류 수정
    <AnimatePresence mode="wait">
      <Scene step={1} key={1} />
      <Scene step={2} key={2} />
      <Scene step={3} key={3} />
    </AnimatePresence>
  );
}
