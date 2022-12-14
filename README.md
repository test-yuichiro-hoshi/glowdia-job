# グロジョブ

## 機能

1. ツールバーアイコン１クリックで勤務入力一覧へ遷移
2. 勤務入力画面でJSON文字列をコピペすると入力フォーム用TSVに変換
3. Applyボタンで一気に入力フォームへTSV情報を流し込み

## 初期導入

ツールバーアイコンをクリックすると勤務システムログイン画面に遷移するのでログインしてください。
そのあとログアウトしてください。

## 使い方１

ツールバーアイコンをクリックすると、新しいタブで勤務入力一覧ページが表示されるようになります。
他のタブでログイン中だとエラーが出るので、タブを閉じて再度実行してください。

## 使い方２

以下のテンプレートを元にその日の勤務情報を用意します。

```
{"place": "旧ベクテ社内", "restStart": "12:00", "restEnd": "13:00", "start": "10:30", "end": "18:00", "body": "スカパーCMS 開発、開発部 会議(17:00-18:00)"}
```

ページ最上部のテキストフィールドにCtrl-Vでコピペします。（マウスはだめです。キーボードショートカットをお使いください）

内容が正しければ、直下のテキストエリアにプレ入力状態が表示されます。

直したいところがあれば直接編集してください。（テレワークと出社が混在する等）

問題なければ Apply ボタンを押します。一気に入力フォームへ流し込みます。

入力に不備がないことを確認したら、保存ボタンを押して確定して、ログアウトしてください。

なお土日祝日は自分で自動取得ボタンを押してください。

### 必須情報

* place デフォルトの作業場所
* restStart 休憩開始時間
* restEnd 休憩終了時間
* start 勤務開始時間
* end 勤務終了時間
* body 勤務内容（詳細は後述）

時間について、分は自動で6分単位に変換されます。(10:40なら10:36)

### オプション情報

* work 作業内容（指定がない場合は テレワーク ）

JSONに他の項目が存在していても無視されます。

#### 勤務内容

勤務内容は 読点（、）で区切ります。

勤務内容の書式はいくつかあります。

* プロジェクト 作業内容

プロジェクトと作業内容の間は 半角スペース を入れます。

一番シンプルなケース（その日1日その仕事をしていた）

```
body: "TBS某案件 開発"
```

* プロジェクト 作業内容@作業場所

作業場所を指定する場合は、作業内容に 半角アットマーク を入れます。

```
body: "TBS某案件 監視@TBS" 
```

* プロジェクト 作業内容(開始時間-終了時間)

時間を指定する場合。

```
body: "TBS某案件 設計(14:30-16:00)" 
```

* プロジェクト 作業内容@作業場所(開始時間-終了時間)

```
body: "TBS某案件 会議@TBS(13:00-14:00)" 
```

このカッコは半角文字です。

* 注意事項

作業内容と作業場所に使えない文字：読点 、 半角アットマーク @ 半角スペース（いずれも区切り文字） 

開始時間-終了時間 のない作業は１〜２つに抑えてください。

通常業務（自社）、（その他）のカッコは全角文字です。

過度な時間チェックはしていないので、JSONをコピペする前に時間軸が破綻していないか確認ください。


sample.json のように日々メモっておく癖を付けるのを推奨。


#### ログインパスワードを変更した場合

お手数ですが手動でlocalStorageを書き換えてください。

勤怠システムのログイン画面を開き、右クリックから検証(Inspect)を押し、右側にデバッグツールを表示。

Applicationタブを開き、Storage -> Local Storage -> https://kmtbsgroup.jp/ を開くと、右側に p という項目が出ます。

Valueに、変更前のパスワードが入力されているので、直接新しいパスワードを入力してください。

## History

### Version 0.7.7

デフォルトの作業内容を指定する機能追加

### Version 0.7.6

処理中ダイアログ回避のため、リクエストの合間に少し待つよう変更

### Version 0.7.5

テレワーク をデフォルトに設定。

### Version 0.7.2

新サイト対応

### Version 0.7.1

作業時間のendと休憩時間restStartが同じ時間の場合おかしくなるのを修正。

### Version 0.7.0

デフォルトの作業場所をJSON側に移動。

### Version 0.6.0

有効サイトを限定。zip生成スクリプト追加。

### Version 0.5.0

beta version.