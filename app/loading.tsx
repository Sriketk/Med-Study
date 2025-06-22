import LoadingScreen from "@/components/shared/loading-screen"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingScreen progress={50} step="Loading page..." />
}
