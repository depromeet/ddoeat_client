'use client';

import { useState } from 'react';

// TODO: 폴더 & 파일 대소문자 통일
import Scene from '@components/Onboarding/Scene';

const steps = [1, 2, 3];

export default function Page() {
  const [step, setStep] = useState(steps[0]);

  return (
    <div>
      {steps.map(
        (value) =>
          step >= value && (
            <Scene
              step={value}
              onNextStep={() => setStep((prev) => prev + 1)}
              key={value}
            />
          ),
      )}
    </div>
  );
}
