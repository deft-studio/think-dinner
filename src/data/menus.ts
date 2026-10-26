import { Menu } from '../types/menu';

export const suggestedMenus: Menu[] = [
{
  name: '豚肉とキャベツの回鍋肉',
  canMakeNow: true,
  ingredients: {
    have: ['豚肉', 'キャベツ', 'にんじん'],
    needToBuy: []
  },
  amount: '2人分',
  steps: [
  'キャベツはざく切り、にんじんは薄い短冊切りにする。',
  '豚肉を中火で炒め、色が変わったら野菜を加える。',
  '味噌・醤油・砂糖を合わせた調味料を回し入れ、全体に絡めて仕上げる。'].
  join('\n')
},
{
  name: 'ふんわり卵とキャベツの炒めもの',
  canMakeNow: true,
  ingredients: {
    have: ['たまご', 'キャベツ'],
    needToBuy: []
  },
  amount: '2人分',
  steps: [
  'たまごを溶き、半熟になるまで炒めて取り出す。',
  '同じフライパンでキャベツをしんなりするまで炒める。',
  'たまごを戻し、塩こしょうで味を整えてさっと混ぜる。'].
  join('\n')
},
{
  name: '豚肉とにんじんのきんぴら風',
  canMakeNow: true,
  ingredients: {
    have: ['豚肉', 'にんじん'],
    needToBuy: []
  },
  amount: '2人分',
  steps: [
  'にんじんを細切りにし、豚肉は一口大に切る。',
  '豚肉を炒めて脂が出たら、にんじんを加えて炒める。',
  '醤油・みりんを加えて汁気がなくなるまで炒め、ごまを振る。'].
  join('\n')
},
{
  name: 'キャベツたっぷりお好み焼き',
  canMakeNow: false,
  ingredients: {
    have: ['キャベツ', 'たまご', '豚肉'],
    needToBuy: ['薄力粉', 'お好みソース']
  },
  amount: '2人分',
  steps: [
  'キャベツをみじん切りにし、薄力粉・たまご・水を混ぜた生地と合わせる。',
  'フライパンに生地を広げ、豚肉をのせて中火で5分焼く。',
  '裏返してさらに5分焼き、ソースをぬって仕上げる。'].
  join('\n')
},
{
  name: '豚汁',
  canMakeNow: false,
  ingredients: {
    have: ['豚肉', 'にんじん', 'キャベツ'],
    needToBuy: ['味噌', '豆腐']
  },
  amount: '2人分',
  steps: [
  '豚肉を炒め、にんじんとキャベツを加えて軽く炒める。',
  '水を加えて煮立たせ、アクを取りながら10分煮る。',
  '豆腐を加えてひと煮し、火を止めて味噌を溶き入れる。'].
  join('\n')
},
{
  name: 'ロールキャベツ',
  canMakeNow: false,
  ingredients: {
    have: ['キャベツ', 'たまご', 'にんじん'],
    needToBuy: ['合いびき肉', 'コンソメ']
  },
  amount: '2人分',
  steps: [
  'キャベツをやわらかくゆで、芯を薄く削ぐ。',
  '合いびき肉・たまご・みじん切りにんじんを混ぜ、キャベツで包む。',
  'コンソメスープで20分ほど煮込み、塩こしょうで味を整える。'].
  join('\n')
}];


export const usedModel = 'Claude';