'use strict'; // 厳格モード。記述ミスに気づくために必ず付ける。

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
// assessmentButton.onclick = function() { // 無名関数という書き方。onClickイベントに関数をセットしている。
assessmentButton.onclick = () => {  // ES6では、上記の書き方をアロー関数として簡略化出来る。
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する(ガード句という)
    return;
  }
  console.log(userName);

  // 診断結果表示エリアの作成
  resultDivided.innerText = ""; // 最初に子要素を削除(結果が残らないように)
  // headerDivided の作成
  const headerDivided = document.createElement('div');
  headerDivided.setAttribute('class', 'card-header');
  headerDivided.innerText = '診断結果';

  // bodyDivided の作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivided.appendChild(paragraph);

  // resultDivided に Bootstrap のスタイルを適用する
  resultDivided.setAttribute('class', 'card');
  resultDivided.setAttribute('style', 'max-width: 700px;')

  // headerDivided と bodyDivided を resultDivided に差し込む
  resultDivided.appendChild(headerDivided);
  resultDivided.appendChild(bodyDivided);

  // TODO ツイートエリアの作成
  tweetDivided.innerText = "";
  const anchor = document.createElement('a');
  const hrefValue = 
    'https://twitter.com/intent/tweet?button_hashtag=' + 
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
  
  anchor.setAttribute('href', hrefValue);
  //anchor.className = 'tweeter-hashtag-button';  // class属性やid属性はsetAttributeを使わなくても専用のプロパティがあるのでそれを使うことが出来る。
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
  // // 練習
  // tweetDivided.innerText = "";
  // const paragraph2 = document.createElement('p');
  // paragraph2.innerText = 'テスト';
  // tweetDivided.appendChild(paragraph2);
}

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

//マルチカーソル(ctrl + alt + ↓)を使うと便利。
//最初はconstを使うことを考える。letはブロック内のみ有効だが、varはブロック外でも参照出来てしまう。
const answer = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) { //↑のコメントはJSDocという書き方で関数の説明が出来る。JSでは変数の型の情報をソースに書かないので、このように明示する必要がある。TypeScriptだと型の情報を書ける。
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i); // 名前の一文字毎のコードを足している
  }

  // 文字のコード番号の合計を回答の数で割って添え字の数値を求める
  const index = sumOfCharCode % answer.length;
  let result = answer[index];

  result = result.replaceAll('{userName}', userName);
  return result;
}

// テストには以下のassert関数が使える。第一引数と結果が一致していれば何も表示されず、間違っていれば第二引数の文字列が警告として出る。
console.assert(
  assessment('太郎') === 
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

// 練習：入力が同じ名前なら、同じ診断結果を出力するテスト
console.assert(
  assessment('太郎') === 
  assessment('太郎'),
  '入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。'
);
