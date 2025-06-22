import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { OnboardingData } from "@/types"
import { onboardingStorage } from "@/lib/storage"

type OnboardingStatus = "loading" | "redirecting" | "authenticated"

interface UseOnboardingReturn {
  status: OnboardingStatus
  onboardingData: OnboardingData | null
}

export function useOnboarding(): UseOnboardingReturn {
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [status, setStatus] = useState<OnboardingStatus>("loading")
  const router = useRouter()

  useEffect(() => {
    if (!onboardingStorage.getIsComplete()) {
      setStatus("redirecting")
      router.push("/onboarding")
      return
    }

    const data = onboardingStorage.getData()
    if (data) {
      setOnboardingData(data)
      setStatus("authenticated")
    } else {
      // Data is missing or corrupt, force re-onboarding
      onboardingStorage.clear()
      setStatus("redirecting")
      router.push("/onboarding")
    }
  }, [router])

  return { status, onboardingData }
} 