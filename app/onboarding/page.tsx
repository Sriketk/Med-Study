"use client"

import { useRouter } from 'next/navigation';
import OnboardingFlow from '@/components/onboarding/onboarding-flow';
import { OnboardingData } from '@/types';
import { onboardingStorage } from '@/lib/storage';

export default function OnboardingPage() {
  const router = useRouter();

  const handleOnboardingComplete = (data: OnboardingData) => {
    onboardingStorage.setData(data);
    router.push("/home");
  };

  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
} 