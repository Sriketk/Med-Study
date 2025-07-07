"use client"

import { useRouter } from 'next/navigation';
import CategoriesPage from '@/components/categories/categories-page';
import { categories } from '@/data/categories';

export default function Categories() {
  const router = useRouter();

  const selectCategory = (categoryName: string) => {
    router.push(`/practice/${encodeURIComponent(categoryName)}`);
  };

  return (
    <CategoriesPage
      categories={categories}
      onBackToHome={() => router.push("/home")}
      onSelectCategory={selectCategory}
    />
  );
} 