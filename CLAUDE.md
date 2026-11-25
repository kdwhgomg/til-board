# CLAUDE.md — TIL Board ("오늘 배운 한 줄")

## 프로젝트 개요
닉네임 + 한 줄(140자)을 Supabase에 저장하고 최신순으로 보여주는 웹앱. Vercel 배포.
자세한 기획: `IDEA.md`, 작업 절차: `업무지침서.md`

## 기술 스택
- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres, RLS) — `@supabase/supabase-js`
- Vercel 배포 (GitHub 연동)

## 폴더 구조 (목표)
```
app/            페이지, 레이아웃, Server Action
components/     PostForm, PostList
lib/supabase.ts Supabase 클라이언트
supabase/schema.sql  테이블 + RLS
```

## 명령어
- `npm run dev`   개발 서버 (http://localhost:3000)
- `npm run build` 프로덕션 빌드 (배포 전 반드시 통과)
- `npm run lint`  린트

## 환경변수
`.env.local` (git 커밋 금지), Vercel 프로젝트 설정에도 동일하게 등록
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
- `service_role` 키는 절대 클라이언트/저장소에 넣지 않는다.

## 작업 규칙
1. 새 작업은 **Plan 모드**로 계획을 먼저 제시하고 승인 후 구현한다.
2. 한 번에 한 기능만 변경한다 (작게 만들고 → 확인 → 다음).
3. 에러가 나면 로그를 읽고 원인 분석 → 수정 → 재실행을 스스로 반복한다. 3회 실패 시 사용자에게 보고.
4. 요구하지 않은 기능·라이브러리를 추가하지 않는다 (MVP 범위: `IDEA.md` 4항).
5. DB 스키마 변경은 `supabase/schema.sql`에 반영하고 변경 이유를 설명한다.
6. 사용자 입력은 항상 서버/DB 양쪽에서 검증한다 (닉네임 ≤20, 내용 ≤140).
7. 커밋·푸시·배포는 사용자가 요청할 때만 한다.

## 코딩 컨벤션
- TypeScript strict, 함수형 컴포넌트, 파일 하나에 컴포넌트 하나
- UI 문구는 한국어, 코드/변수명은 영어
- 주석은 "왜"가 필요한 곳에만 짧게

## 완료 기준 (Definition of Done)
- [ ] `npm run build` 성공, 린트 오류 없음
- [ ] 글 작성 → 목록 즉시 반영 확인
- [ ] 빈 값/길이 초과 시 오류 메시지 표시
- [ ] 모바일 폭(375px)에서 레이아웃 정상
- [ ] 비밀키가 저장소에 없음
