'use client';

import { useState } from 'react';

// TODO: 폴더 & 파일 대소문자 통일
import Scene from '@components/Onboarding/Scene';
import { ONBOARDING_CONTENT } from '@constants/onboarding';

export default function Page() {
  const [step, setStep] = useState(ONBOARDING_CONTENT[0].step);

  return (
    <div>
      {ONBOARDING_CONTENT.map(
        (content) =>
          step >= content.step && (
            <Scene
              step={content.step}
              title={content.title}
              content={content.content}
              videoUrl={content.videoUrl}
              icon={content.icon}
              onNextStep={() => setStep((prev) => prev + 1)}
              key={content.step}
            />
          ),
      )}
    </div>
  );
}
