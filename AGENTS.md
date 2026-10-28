# 開発の決まり（AIエージェント向け）

パスは、リポジトリの直下からの位置で書く。

## 進め方
- 推測しない：仕様・接続先・APIの使い方は、設計書・コード・公式の文書で確かめてから書く。確かめられなければ止まって人に聞く
- おかしいと気づいたら、その場で止まって人に報告する。勝手に別の手段や代わりの実装に切り替えない
- シンプルに作る：頼まれたことに要るものだけを作る。頼まれていない機能・設定の切り替え、1回しか使わない共通化、起こりえない場合のエラー処理を足さない。もっと簡単なやり方があれば、作る前に人に言う
- 必要な所だけ変える：頼まれた変更に要る所だけを直す。周りのコードの書き方の直し・整理を、ついでにしない。関係ない所の不具合や使われていないコードに気づいたら、直したり消したりせず人に報告する（自分の変更で使われなくなったものは消す）
- モック・スタブはテストの中だけで使う。本番のコードに置かない。エラーを握りつぶして、動いているように見せない
- 土台から積む：DB（Supabase）やAI（OpenRouter）とのつながりを先に作り、本物で動くことを確かめてから、その上に画面を作る
- 1つの部品には1つの役割だけ。Supabaseへの接続は`src/lib/`、AIへの指示文とモデルの一覧は`src/data/`、AIの呼び出しはサーバー側の`src/app/api/`、画面は`src/app/`・`src/components/`に分ける（今は食材の読み書きが`src/app/page.tsx`の中にある）
- 1文で言える小さい変更（文言・色・明らかな不具合の直し等）は、計画やタスク分割を飛ばして直してよい。仕様・データの形・権限が変わるものは、先に`docs/tasks.md`にタスクを書く

## 完了の基準
- 判定・計算などのロジックは、テストを先に書き、そのテストが通ることを完了とする。テストの仕組みはまだ無いので、ロジックを足す時は、入れることから人に相談する
- 変更のたびに、lint・ビルド（`npm run lint`・`npm run build`）を流す。成否は出力の最後の行ではなく、終了コードで確かめる
- 画面を変えたら、AIが自分でブラウザで開いて確かめ、スクリーンショットをPRに貼る
- PRを作ると、ClaudeのレビューがGitHubで自動で付く（`.github/workflows/claude-review.yml`）。直すのは、正しさ（不具合・セキュリティ）と要件に関わる指摘だけ。好みの指摘は直さなくてよい。直した後にもう一度見てほしい時は、PRに`@claude`と書く
- レビューでは、コードと資料の食い違いも見る。下の「いつ何を直すか」に沿って資料を直し、直した資料をPRに書く

## セキュリティ
- ログインが無く、DBはRLSで匿名（ログインしていない人）に読み書きを許している（設計の前提）。個人の情報を足す時や、権限を変える時は、必ず人に確かめる
- OpenRouterの鍵は、サーバー側だけで使い、ブラウザに出さない
- AIへの窓口には、回数の制限・入力の長さの上限を必ず付ける。AIの出力で、DBの書き込みなど強い操作をさせない（今の`/api/suggest`には制限が無い。`docs/tasks.md`のタスク7で直す）
- 秘密の値（鍵・トークン）を、コード・ログ・PRに出さない。秘密のファイル（`.env*`・`.dev.vars*`・`*.pem`）をコミットしない。公開リポジトリなので、GitHubの秘密の値のスキャンとpushの保護で確かめている
- 機密情報・個人情報（本当の氏名・住所・年収・資産・会社名など）を、コード・コメント・テストデータ・資料・PR・コミットメッセージ・スクリーンショットに書かない（リポジトリの公開・非公開を問わない）

## このリポジトリの資料
| 資料 | 書くこと |
| --- | --- |
| `docs/planning.md` | なぜ作るか・誰向けか・将来やること |
| `docs/design-spec.md` | 今の姿（機能・権限・技術を選んだ理由・やらないこと） |
| `docs/tasks.md` | やること（唯一の置き場） |
| `docs/decisions/` | 後から変えるのが大変な判断（まだ無い。最初の記録を書く時に作る） |
| `docs/status.md` | 今の状態と、システムが見つけた異常 |
| `README.md` | 見せるための紹介（特徴・技術・公開URL・スクリーンショット） |

- DBの変更は、必ず`supabase/migrations/`にSQLを書いてから適用する

## いつ何を直すか
| こんな変更をした時 | 直す資料 |
| --- | --- |
| 機能・画面・データの形・権限が変わった | `docs/design-spec.md` |
| 後から変えるのが大変な判断をした（DB・公開先・AIの窓口・中心のライブラリなど） | `docs/decisions/`に新しい記録を足す。前の記録は書き換えず、置き換えられたことだけ書く |
| 目的・対象・将来やることが変わった | `docs/planning.md` |
| タスクが終わった | `docs/tasks.md`の見出しを1行＋PRのリンクに縮める（完了条件の全文はPRの本文に残す） |
| やることが増えた | `docs/tasks.md`（Issueは受付の箱。やると決めたらtasksへ移してIssueを閉じる） |
| 実装でハマった | `docs/gotchas.md`（無ければ作る） |
| 公開の状態が変わった（公開・停止）、異常が起きた | `docs/status.md`（影響が大きい事故は、直した後に`docs/postmortems/`へ振り返りを書く。手順は`_infra/runbooks/`） |
| 特徴・技術・公開URL・見た目が変わった | `README.md` |
| コマンドが変わった | このファイルの「コマンド」 |

## コマンド
- 起動：`npm run dev`→ http://localhost:3000
- 確かめる：`npm run lint`・`npm run build`
- 公開：mainへのマージで、VercelのGit連携が自動で公開する（手で公開しない）。PRごとにプレビュー用のURLも作られる

## 学習用のリポジトリ
- 初めて使う技術は、AIが全部書かない。手順と使う道具を示し、人が実装した後に答え合わせをする。前に使ったことのあるやり方は、AIが書いてよい

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
