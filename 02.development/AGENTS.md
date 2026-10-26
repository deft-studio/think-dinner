# 開発の決まり（AIエージェント向け）

パスは、リポジトリの直下からの位置で書く（このファイルは`02.development/`にある）。

## 進め方
- 推測しない：仕様・接続先・APIの使い方は、設計書・コード・公式の文書で確かめてから書く。確かめられなければ止まって人に聞く
- おかしいと気づいたら、その場で止まって人に報告する。勝手に別の手段や代わりの実装に切り替えない
- モック・スタブはテストの中だけで使う。本番のコードに置かない。エラーを握りつぶして、動いているように見せない
- 土台から積む：DB（Supabase）やAI（OpenRouter）とのつながりを先に作り、本物で動くことを確かめてから、その上に画面を作る
- 1つの部品には1つの役割だけ。ロジックは`src/lib/`、AIの呼び出しはサーバー側の`src/app/api/`、画面は`src/app/`・`src/components/`に分ける

## 完了の基準
- 判定・計算などのロジックは、テストを先に書き、そのテストが通ることを完了とする。テストの仕組み（Vitest等）はまだ無いので、ロジックを足す時は、入れることから人に相談する
- 変更のたびに、lint・ビルドを流す（`npm run lint`・`npm run build`）
- PRの前に、作った本人とは別のAIでレビューし、指摘が無くなるまで直す

## セキュリティ
- ログインが無く、DBはRLSで匿名（ログインしていない人）に読み書きを許している（設計の前提）。個人の情報を足す時や、権限を変える時は、必ず人に確かめる
- AIの鍵（OpenRouter）は、サーバー側だけで使い、ブラウザに出さない
- 秘密の値（鍵・トークン）を、コード・ログ・PRに出さない

## このリポジトリの資料
- 仕様：`01.planning/design-spec.md`／タスク：`02.development/tasks.md`
- DBの変更は、必ず`02.development/supabase/migrations/`にSQLを書いてから適用する

## 学習用のリポジトリ
- 初めて使う技術は、AIが全部書かない。手順と使う道具を示し、人が実装した後に答え合わせをする。前に使ったことのあるやり方は、AIが書いてよい

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
