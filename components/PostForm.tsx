"use client";

import { useActionState, useState } from "react";
import { createPost, type PostFormState } from "@/app/actions";
import { CONTENT_MAX, NICKNAME_MAX, charCount } from "@/lib/validation";

const initialState: PostFormState = {
  ok: false,
  message: "",
  values: { nickname: "", content: "" },
};

export default function PostForm() {
  const [state, formAction, pending] = useActionState(createPost, initialState);
  const [contentLength, setContentLength] = useState(0);
  const [prevState, setPrevState] = useState(state);

  // 제출 결과로 폼 값이 바뀌면 글자 수도 맞춘다 (렌더 중 상태 조정 패턴).
  if (state !== prevState) {
    setPrevState(state);
    setContentLength(charCount(state.values.content));
  }

  const over = contentLength > CONTENT_MAX;

  return (
    <form action={formAction} className="mb-8 flex flex-col gap-3">
      <input
        name="nickname"
        defaultValue={state.values.nickname}
        maxLength={NICKNAME_MAX}
        placeholder="닉네임 (20자 이내)"
        aria-label="닉네임"
        className="w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
      />
      <textarea
        name="content"
        defaultValue={state.values.content}
        maxLength={CONTENT_MAX}
        rows={3}
        placeholder="오늘 배운 것을 한 줄로 남겨 주세요 (140자 이내)"
        aria-label="내용"
        onChange={(e) => setContentLength(charCount(e.target.value))}
        className="w-full resize-none rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
      />
      <div className="flex items-center justify-between gap-3">
        <span className={`text-xs ${over ? "text-red-600" : "text-neutral-500"}`}>
          {contentLength}/{CONTENT_MAX}
        </span>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
        >
          {pending ? "저장 중…" : "남기기"}
        </button>
      </div>
      {state.message && (
        <p
          role="status"
          className={`text-sm ${state.ok ? "text-green-600" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
