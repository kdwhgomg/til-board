import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Supabase 환경변수가 없습니다. .env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요.",
  );
}

// 로그인 기능이 없으므로 세션 저장을 끈다.
export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type TilPost = {
  id: string;
  nickname: string;
  content: string;
  created_at: string;
};
