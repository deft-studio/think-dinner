# think-dinner

冷蔵庫にある食材を入力すると、AIが献立を提案するWebツール。今ある食材だけでなく「これを買い足せばこのメニューも作れます」という提案も出す。

- 企画の背景：[docs/planning.md](docs/planning.md)
- 設計ドキュメント：[docs/design-spec.md](docs/design-spec.md)

## 特徴

- 冷蔵庫にある食材を登録・管理（自分と彼女で共有）
- 苦手な食材（NG食材）を登録して、AIの提案から除外できる
- AIが6品目の献立を提案（今の食材で作れる3品目／買い足せば作れる3品目に分けて表示）
- 使用するAIモデルを切り替えられる（OpenRouter経由）

## 技術スタック

| 層                   | 技術 |
| -------------------- | ---- |
| フロントエンド       | Next.js, shadcn/ui |
| バックエンド         | Next.js API Routes |
| DB                   | Supabase |
| AI/LLM               | OpenRouter |
| インフラ・デプロイ先 | Vercel（mainへのマージで自動公開） |
| CI/CD・テスト        | GitHub Actions（未設定。`docs/tasks.md`のタスク5） |
| 運用                 | Dependabot、GitHubの秘密の値のスキャン |

## 構成

- 直下 — アプリ本体のコード（Next.js）
- `docs/` — 企画書・設計書・タスク・稼働状況
- `.github/` — Dependabotの設定・PRのテンプレート

## 開発について

開発の決まり（AIエージェント向け）は[AGENTS.md](AGENTS.md)。
