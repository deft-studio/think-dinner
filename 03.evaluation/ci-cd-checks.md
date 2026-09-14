---
created: "YYYY-MM-DD"
type: memo
status: not-implemented
---

# 03.evaluation — CI/CDチェック（技術系）メモ

> このテンプレートの使い方：機械的に自動判定できる技術チェックのみをここに書く。法律・事業判断が絡む項目（特商法・個人情報保護法等）は`legal-review-checklist.md`側に書く。技術スタックが違えば「対象項目」の中身は総取り替えでよい（Next.js系ならPlaywright/Lighthouse、Pythonバッチ系ならruff/pip audit等、商品の実態に合わせる）。
> このファイルは実装前のメモとして作る。GitHub Actions等の実装が済んだら、`status: not-implemented`をやめて実装状況に更新する。

## 方針

機械的に判定できる技術チェックはCI/CDに組み込み、pushやPR時に自動実行する。{他商品と技術スタックが大きく異なる場合、ここに一言補足する（例：Web系のチェック項目はほぼ該当しない、等）}

## 対象項目

| チェック | 内容 | 実装候補ツール |
|---|---|---|
| {チェック名} | {何を確認するか} | {使う予定のツール} |

## 未着手

- GitHub Actionsワークフローファイル（`.github/workflows/`）自体が存在しない
- テストコードが存在しない

## 次にやること（実装時）

1. {最小構成（lintと依存脆弱性チェック程度）からCIを始める}
2. {段階的に追加する項目}
