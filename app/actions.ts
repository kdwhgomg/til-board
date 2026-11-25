"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { validatePost, type PostInput } from "@/lib/validation";

export type PostFormState = {
  ok: boolean;
  message: string;
  values: PostInput;
};

export async function createPost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const values: PostInput = {
    nickname: String(formData.get("nickname") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
  };

  const invalid = validatePost(values);
  if (invalid) return { ok: false, message: invalid, values };

  // 도배 방지: 같은 닉네임의 직전 글과 내용이 같으면 거부
  const { data: last, error: lastError } = await supabase
    .from("til_posts")
    .select("content")
    .eq("nickname", values.nickname)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ content: string }>();

  if (lastError) {
    console.error("직전 글 조회 실패:", lastError);
    return { ok: false, message: "저장하지 못했어요. 잠시 후 다시 시도해 주세요.", values };
  }
  if (last?.content === values.content) {
    return { ok: false, message: "같은 내용을 연속으로 올릴 수 없어요.", values };
  }

  const { error } = await supabase.from("til_posts").insert(values);
  if (error) {
    console.error("til_posts 저장 실패:", error);
    // 23514: CHECK 제약 위반 (DB 쪽 길이 검증)
    const message =
      error.code === "23514"
        ? "입력 길이를 확인해 주세요. (닉네임 20자, 내용 140자 이하)"
        : "저장하지 못했어요. 잠시 후 다시 시도해 주세요.";
    return { ok: false, message, values };
  }

  revalidatePath("/");
  // 닉네임은 다음 글을 위해 남기고 내용만 비운다.
  return {
    ok: true,
    message: "기록했어요!",
    values: { nickname: values.nickname, content: "" },
  };
}
