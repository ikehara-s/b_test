var scene = 'question';
var q_index = 0;
var q_list = [];

function Question(content, explain = ""){
    this.content = content;
    this.explain = explain;
    this.choice = [];
    this.answer = 0;
    this.order = Math.random();
};

function Choice(content, answer){
    this.content = content;
    this.answer = answer;
    this.order = Math.random();
};

Question.prototype.setChoice = function(choice, answer){
    this.choice.push(new Choice(choice, answer));
};

Question.prototype.setAnswer = function(answer){
    this.answer = answer;
};

function nextScene(){
    if(q_index >= q_list.length){
        alert('すべての問題が終了しました。\n再度テストを行う場合は、ブラウザを再読み込みしてください。');
        return;
    }
    if(scene == 'question'){
	    document.getElementById('pos').textContent = (q_index + 1) + '/' + q_list.length + ' 問';
        showQuestion();
    } else {
        showAnswer();
    }
};

function showQuestion(){
    scene = 'answer';
    document.getElementById('question').value = q_list[q_index].content;
    for(var i = 0; i < 7; i ++){
        if(i < q_list[q_index].choice.length){
            document.getElementById('answer_' + i).value = q_list[q_index].choice[i].content;
            document.getElementById('answer_' + i).style.background = '#ffffff';
        } else {
            document.getElementById('answer_' + i).value = '';
            document.getElementById('answer_' + i).style.background = '#ffffff';
        }
    }
    document.getElementById('explain').textContent = '';
};

function showAnswer(){
    scene = 'question';
    for(var i = 0; i < 7; i ++){
        if(i < q_list[q_index].choice.length){
            if(q_list[q_index].choice[i].answer){
                document.getElementById('answer_' + i).style.background = '#ccffcc';
            } else {
                document.getElementById('answer_' + i).style.background = '#ffcccc';
            }
            textContent = '・' + q_list[q_index].choice[i].content;
        }
    }
    document.getElementById('explain').textContent = q_list[q_index].explain;
    q_index ++;
};

function pushChoice(choice, answer){
    q_list[q_list.length - 1].setChoice(choice, answer);
};

function sortChoice(){
    q_list[q_list.length - 1].choice.sort(function(a, b){
        return a.order - b.order;
    });
};

function sortQuestion(){
    q_list.sort(function(a, b){
        return a.order - b.order;
    });
};

//問題作成
(function(){
    // 001
	q_list.push(new Question('以下の通りにデータベースが構成されています。'
	+ '\n'
	+ '\n* CDB1はコンテナデータベースです。'
	+ '\n* PDB1およびPDB2は、CDB1のプラガブルデータベースです。'
	+ '\n* PDB1およびPDB2は、READ WRITEモードでOPENしています。'
	+ '\n'
	+ '\n次のコマンドを正常に実行します。'
	+ '\n'
	+ '\n$ export ORACLE SID=CDB1'
	+ '\n$ sqlplus / as sysdba'
	+ '\n'
	+ '\nSQL> ALTER SESSION SET CONTAINER = PDB1;'
	+ '\nSession altered.'
	+ '\n'
	+ '\nSQL> SHUTDOWN IMMEDIATE'
	+ '\n'
	+ '\nコマンドの結果として正しい説明を2つ選択してください。',
	''));
	pushChoice('CDB1はマウント状態となる。', false);
	pushChoice('PBD1のコミットされていないトランザクションはロールバックされる。', true);
	pushChoice('CDB1がシャットダウンされる。', false);
	pushChoice('CDB1とPDB1のコミットされていないトランザクションはロールバックされる。', false);
	pushChoice('PDB1がクローズされる。', true);
	sortChoice();
	
	リカバリアドバイザを用いて障害を修復します。
リカバリアドバイザについて正しい説明を2つ選択しなさい。

1.リカバリアドバイザでLIST FAILUREコマンドを使用するときはMOUNT状態である必要がある。
正.NOMOUNT状態である必要がある。

2.リカバリアドバイザでCHANGE FAILUREコマンドは障害の優先度を変更することができる。

3.リカバリアドバイザはデータベースがクローズされているときに使用できる。
正.NOMOUNT以上の状態のときに使用できる。

4.リカバリアドバイザは能動的に障害をチェックできる。

5.障害は修復された場合のみクローズすることができる。
正.手動で障害を修復してCHANGE FAILUREコマンドでもクローズできる。


RMANを用いた暗号化について正しい説明を2つ選択しなさい。

1.RMANはパスワードファイルを暗号化できる。

2.SET ENCRYPTIONコマンドはCONFIGURE ENCRYPTIONコマンドの設定をオーバーライドする。

3.CONFIGURE ENCRYPTIONコマンドでパスワード暗号化を永続設定できる。

4.デュアルモード暗号化はパスワードとキーストアの両方が使用可能な場合のみリストアが可能である。

5.RMANの暗号下キーはデータベースキーストアに保存される。



SQL> SELECT PLUGGABLE_DATABASE, SHARES, PARALLEL_SERVER_LIMIT
  2  FROM DBA_CDB_RSRC_PLAN_DIRECTIVES WHERE PLAN = 'MY_PLAN'
  3  ORDER BY PLUGGABLE_DATABASE;

PLUGABBLE_DATABASE         SHARES   PARALLEL_SERVER_LIMIT
-------------------------- -------- ---------------------
ORA$AUTOTASK                                          100
ORA$DEFAULT_PDB_DIRECTIVE         1                     0
PDB1                              2                   100
PDB2                              2                    25
PDB3                              1                    

SQL> SELECT NAME, VALUE FROM V$PARAMETER
  2  WHERE NAME = 'RESOURCE_MANAGER_PLAN';

NAME                   VALUE
---------------------- -------------
RESOURCE_MANAGER_PLAN  MY_PLAN

PDB1 40% * 100% = 40%
PDB2 40% * 25% = 10%
PDB3 20% * 100% = 20%
が接続している場合は、それぞれ上記の値が最低保証となる。
PDB1のみが接続している場合は100%リソースを使用できる。



RMANを使用せずに実行されるバックアップ、リストア、およびリカバリについて正しい説明を3つ選択しなさい。
バックアップモードでバックアップを実行するためにはARCHIVELOGモードで実行する必要がある。

}());

(function(){
    sortQuestion();
}());
