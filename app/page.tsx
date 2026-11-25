import { Suspense } from "react";
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">
          <span aria-hidden="true">🐣</span> 오늘 배운 한 줄
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          하루에 하나, 배운 것을 한 줄로 남겨 보세요.
        </p>
      </header>

      <PostForm />

      <Suspense
        fallback={<p className="text-sm text-neutral-500">불러오는 중…</p>}
      >
        <PostList />
      </Suspense>
    </main>
  );
}
