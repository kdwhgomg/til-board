export const NICKNAME_MAX = 20;
export const CONTENT_MAX = 140;

// Postgres char_length와 같은 기준(코드 포인트)으로 센다. 이모지가 2자로 세지지 않도록.
export function charCount(value: string): number {
  return [...value].length;
}

export type PostInput = { nickname: string; content: string };

export function validatePost(input: PostInput): string | null {
  if (input.nickname.length === 0) return "닉네임을 입력해 주세요.";
  if (charCount(input.nickname) > NICKNAME_MAX)
    return `닉네임은 ${NICKNAME_MAX}자 이하로 입력해 주세요.`;
  if (input.content.length === 0) return "내용을 입력해 주세요.";
  if (charCount(input.content) > CONTENT_MAX)
    return `내용은 ${CONTENT_MAX}자 이하로 입력해 주세요.`;
  return null;
}
