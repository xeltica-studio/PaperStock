import MarkdownIt from "markdown-it";
import { NextApiHandler } from "next";

const md = `
XelticaMCには、公式のDiscordサーバー「XelticaMC Discord」があります。

参加しなくても本サーバーで遊ぶことはできますが、参加することで次のようなメリットがあります！

* ゲーム内のプレイヤーと会話できる
* 最新情報を素早く入手
* 通話で交流できる
* マインクラフト内外の幅広い活動をしている「部活動」への参加
* 質問やバグ報告のためにスタッフと直接お話できるサポートチケット機能

[参加したい方はこちらへ！](https://discord.gg/3zuQwTASye)

# Discordと連携する

XelticaMC Minecraftサーバーと、XelticaMC Discordはいくつかの連携機能を持っています。

## チャット連携

Discord鯖の **#ゲーム内チャット** チャンネルがマイクラのゲーム内チャットと繋がっており、相互に会話ができるようになっています。

また、ゲーム内チャットチャンネル以外にも繋がっているチャンネルがあります。（執筆中）

## アカウント連携

サーバー内アカウントをあなたのDiscordアカウントに紐付けることができます。

[市民への昇格](/citizen) に必要な作業です。


**1.** マイクラ内でコマンド \`/discord link\` を実行します。すると、次のような指示が発生します。

![](/assets/discord-link.png)

**2.** Discord鯖のユーザー一覧から「エンダーマン」を探し、右クリックで「メッセージ」を選択します。

![](/assets/discord-link-2.png)

スマートフォンの場合はタップし、[メッセージ]を選択します。

![](/assets/discord-link-3.jpeg)

**3.** エンダーマンbotとのダイレクトメッセージ欄に移動したら、**1.** で提示された4桁の番号を投稿します。

**4.** bot からの成功メッセージがあれば成功です！

### 連携解除

\`/discord unlink\` とすることで連携を解除できます。

### 連携されているかどうかの確認

\`/discord linked\` とすることで連携確認ができます。
`;

const handler: NextApiHandler = async (req, res) => {
  res.json({
    title: '公式Discord',
    body: MarkdownIt().render(md),
  });
};

export default handler;