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
}());

(function(){
    sortQuestion();
}());
