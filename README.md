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
    - `plugins` : ```
