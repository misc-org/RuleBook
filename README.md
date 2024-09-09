# RuleBook 引き継ぎ用ドキュメント

今後修正等をする場合のドキュメンテーションです。

## 環境構築

特に環境依存のものはないはずなので、下記のコマンドで大丈夫だと思います。

```terminal
gir clone https://github.com/misc-org/RuleBook.git #リポジトリのクローン
cd RuleBook #クローンしたファイルに移動
npm i #依存関係のインストール
```

または `GitHub Desktop` 等の GUI ツールでも構いません。ディレクトリに移動して `npm i` してください。

### 拡張機能

vscode または webstorm 等の拡張機能を持つ IDE を使用する場合は `Astro` 拡張機能を入れるといいでしょう。言語サーバーないと難しいので。

- [vscode](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [webstorm](https://plugins.jetbrains.com/plugin/20959-astro)

## config とか色々

> [!IMPORTANT]
> `.gitignore` で `package-lock.json` をパスしたい気持ちはわかりますが、デプロイで必要らしいので残しておいてください。

### package.json

特にいじることはないかと。開発依存追加してもいいけど、必要最低限だね。自分で組んだ方が処理軽い時はそうした方がイイかも。

### package-lock.json

ノータッチ。どうせ上書きされるので。

### .gitignore

一応 `.env` は入れてるけど、`.env.development` とか追加するなら気をつけてもらって。

### .gitpod.yaml

gitpod 使ったから入ってるけど別にいらない。

### astro.config.mjs

結構重要。

- `integrations` : プラグイン系は `npx astro add` ってすれば勝手にやってくれると思うけど、手動で入れるならここ。
- `site` : ベースリンク。基本変更不要だけど、ホスト先変えたり、リンクが変わるならここも変える。変える時はこっちも参照。
- `base` : github pages の時は、リポジトリ名だけ別にしなきゃいけないらしい。上同様変える時はこっちも変更。
- `redirect` : 流石にリンクを `/start/start` ってするのはカッコ悪いからつけてみた。多分別のとこでやった方がきれい。

### postcss.config.cjs

`postcss` 使いたいから入れただけ。特にプラグインとかは入れてないし、使いたい時は 公式ドキュメント 参照。

### tailwind.mjs

`tailwind` 使いたいから( 以下略 )。

- `darkMode: 'class'` : ダークモードをどれで管理するか。一応クラスで管理してるからノータッチ or ダークモードシステムの見直し。

### tsconfig.json

僕の方が教えてほしい( 泣 )

- `compileOptions` : 大体ここに入れる( らしい )
    - `plugins` : `"name": "@astrojs/ts-plugin"` は vscode 使ってない人用に入れておく。vscode では不要らしい。
    - `"verbatimModuleSyntax": true,` : なんだっけ… 確か TypeScript のインポート関係で型チェックとか　`import type` とか使えるようにするやつ
    - `baseURL` : お決まりの。`src` とかファイル構造変えるならこれもセットに変えた方がイイかも。
    - `paths` : `@lib/` とかのやつ。一応直下も拾えるように全部二パターン登録してる。

## src

全部書く必要あるかな… 最低限に絞るからまあ他は頑張って読み取って。

### pages

astro がデフォルトで pages がルートになるらしい。

#### [...path].astro

こんだけでルート以降のパスを勝手に取得して `Astro.params` に入れてくれる。便利だね！

今回みたいに動的ページだけの時は、このページだけ作っておけばどうにかなりそう。代わりにルート関係の制約ができるからそこだけ守らないとすぐ 404 が出る。

```astro
export const getStaticPaths = (async () => {
    const MDXs = await getCollection("mdx");
    return MDXs.map((entry: Entry) => ({
        params: {path: `/${entry.slug}`},
        props: {entry},
    }));
}) satisfies GetStaticPaths;
```

`getStaticPaths` 関数をエクスポートするだけで、勝手に astro 側が実行してくれる。優秀だね。

`getCollection` 関数は、`src/content` 内のファイル名で指定したらそっから md or mdx を一気に全部持ってきてくれる。優秀か？？
使う時は `src/content/config.ts` でエンドポイントと作ってあげて、そこで型指定とかしておくと使えるようになるらしい。エラーが出る時は一回 `run dev` すると `.astro` ファイルがディレクトリ直下に生成されて、それでエラーが治る…らしい。

あとは型ですぐ怒られるから `satisfies GetStaticPaths` で型指定。無理矢理だね。

### layout

レイアウト専用コンポーネント的な。`head` とかをここに入れておくのが通例らしい。

md or mdx でインポートすると、Markdown 自体のレイアウトも調整可能。天才か？

`default.astro` がページ全体に適応されてるレイアウトで、`mdx.astro` が Markdown 用のレイアウト。

#### default.astro

もうすごい頭の悪いことしてるから改善案モトム。

`<ViewTransitions/>` を `head` に入れるだけでページ遷移時のトランジョンを設定してくれるんだけど、何如せん SPA と相性が悪くて、トランジョン後に状態を維持してくれる機能があるんだけど、こいつがひどい。

仕組みとしては僕も曖昧だけど、前のページと今のページで同じ要素を見つけて、それはそれで扱うからページの読み込み速度も早いし、みたいな仕様らしい。

ただ、ここで問題になるのが、例えば今回だったらナビゲーションバーに使ってるアイコンを `astro-icon` で指定してるんだけど、こいつを mdx 内でも使う時に、アイコンが同じだと生成するコードも同じだからそのページから遷移するときだけナビゲーションバーのアイコンも消えるっていう( 語彙力 )

まあ結局 mdx 内で使うコンポーネント変えたので今は問題なし。

### lib

は…特にいうことはない。ただのコンポーネント群。個人的にテーマ切り替えのボタンがお気に入り。

#### pages.ts

こいつだけ紹介。前項 [[...path].astro](#[...path].astro) で、`getStaticPaths` を使って全取得って言ったけど、流石に順番とかまでは指定できないから、階層構造だけこっちで書いてます。

ページの追加・削除・名前修正の時はこっちも必須です。あとグループ名もここで決めてるのであしからず。

### content

#### config.ts

バック側のエンドポイント。`getCollection` 実行時にはこっから呼び出されてるっぽい。
基本的に型を指定してるだけだけど、何故か mdx にも型指定が適応されるから、 mdx でも指定した型は全部書かないと怒られる。

#### mdx

ファイル名じゃないけど、一応 mdx の書き方。基本的な部分は Markdown とほぼ一緒だし、せいぜい js が増えたくらいだからそこは割愛。ここでは astro とのコラボレーションの部分だけ。

- frontmatter : ファイルの情報をまとめる。`title` はナビゲーションの表示されるやつ兼各ページの `Head` になる。`tags` に `ness` を追加すると、必読項目としてマークされるよにしてます。なんでか知らないけど `""` をつけてもつけなくても一緒。多分勝手に文字列化してくれるんだと思う。

## .github/workflows/deploy.yaml

触らぬ神に祟りなしです。僕もコピペしただけです。逆に触るとエラー起きそうだし、せいぜいタイトル変えるくらいかと。

## 最後に

あまり難しいこともしていないので、多分普通に読めると思います。

もし何書いてんだこれってなったら Slack とかで　@shiki-01 と同じアイコンの人に DM してください。多分みます。
