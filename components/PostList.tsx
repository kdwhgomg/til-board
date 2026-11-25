import { connection } from "next/server";
import { supabase, type TilPost } from "@/lib/supabase";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Seoul",
});

export default async function PostList() {
  // 프리렌더 시점이 아니라 요청마다 최신 목록을 읽도록 한다.
  await connection();

  const { data, error } = await supabase
    .from("til_posts")
    .select("id, nickname, content, created_at")
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<TilPost[]>();

  if (error) {
    console.error("til_posts 조회 실패:", error);
    return (
      <p className="text-sm text-red-600">
        목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-neutral-500">
        아직 기록이 없어요. 첫 번째 한 줄을 남겨 보세요!
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {data.map((post) => (
        <li
          key={post.id}
          className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800"
        >
          <p className="break-words whitespace-pre-wrap">{post.content}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-2 text-xs text-neutral-500">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              {post.nickname}
            </span>
            <time dateTime={post.created_at}>
              {dateFormatter.format(new Date(post.created_at))}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}
