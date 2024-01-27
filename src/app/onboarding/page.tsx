'use client';

import { useState } from 'react';

import Scene from '@components/onboarding/Scene';
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
