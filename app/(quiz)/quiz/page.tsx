'use client';

import { useState } from 'react';

import { LoadingAnimation } from './LoadingAnimation';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Breakfast } from './Step2Breakfast';
import { Step3Lunch } from './Step3Lunch';
import { Step4Snack } from './Step4Snack';
import { Step5Dinner } from './Step5Dinner';
import { Step6OtherInfos } from './Step6OtherInfos';

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = (data: any) => {
    setQuizData((prev) => ({ ...prev, ...data }));
    if (step < 6) {
      setStep((prev) => prev + 1);
    } else {
      setIsLoading(true);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  if (isLoading) {
    return <LoadingAnimation duration={5000} />;
  }

  switch (step) {
    case 1:
      return <Step1BasicInfo onNext={handleNext} />;
    case 2:
      return <Step2Breakfast onNext={handleNext} onPrev={handlePrev} />;
    case 3:
      return <Step3Lunch onNext={handleNext} onPrev={handlePrev} />;
    case 4:
      return <Step4Snack onNext={handleNext} onPrev={handlePrev} />;
    case 5:
      return <Step5Dinner onNext={handleNext} onPrev={handlePrev} />;
    case 6:
      return <Step6OtherInfos onNext={handleNext} onPrev={handlePrev} />;
    default:
      return null;
  }
}
