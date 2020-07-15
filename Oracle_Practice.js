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
	// 01(CDBとPDBの起動、停止および可用性の管理)
	q_list.push(new Question('次の構成のデータベースがある。'
	+ '\n'
	+ '\nCDB1はコンテナデータベースである。'
	+ '\nPDB1、PDB2はプラガブルデータベースである。'
	+ '\nPDB1、PDB2は読み取り／書き込みモードでオープンしています。'
	+ '\n'
	+ '\n次のコマンドを実行しました。'
	+ '\n'
	+ '\n$ export ORACLE_SID=CDB1'
	+ '\n$ sqlplus / as sysdba'
	+ '\n'
	+ '\nSQL> ALTER SESSION SET CONTAINER = PDB1;'
	+ '\nSession altere.'
	+ '\n'
	+ '\nSQL> SHUTDOWN IMMEDIATE'
	+ '\n'
	+ '\n結果として正しい説明を2つ選択しなさい。',
	'PDBをSHUTDOWNコマンドで停止するための前提条件：現在のユーザーにSYSDBA、SYSOPER、SYSBACKUPまたはSYSDGシステム権限がある。'
	+ '\nPDBに接続してSHUTDOWN IMMEDIATEコマンドを実行すると、コミットされていないトランザクションはロールバックされる。'
	+ '\nPDBはMOUNT状態となる。'
	+ '\nCDBはOPEN状態のままである。'));
	pushChoice('CDB1はマウント状態である', false);
	pushChoice('PDB1のコミットされていないトランザクションはロールバックされる', false);
	pushChoice('CDB1はシャットダウンされる', false);
	pushChoice('CDB1とPDB1のコミットされていないトランザクションはロールバックされる', false);
	pushChoice('PDB1はクローズされる', false);
	sortChoice();
	
	// 02(RMANバックアップの圧縮および暗号化)
	q_list.push(new Question('RMAN暗号化について正しい説明を2つ選択しなさい。',
	'CONFIGURE ENCRYPTIONコマンドで永続設定可能なのは暗号化キーによるバックアップのみ。'
	+ '\nデュアルモード暗号化は通常はOracleウォレットを使用してリストアするが、パスワードでもリストアできる暗号化モードである。'
	+ '\nRMAN暗号化キーはデータベースキーストアに格納される。'
	+ '\nSET ENCRYPTIONコマンドは、CONFIGURE ENCRYPTIONコマンドで指定された暗号化設定をオーバーライドする。'));
	pushChoice('CONFIGURE ENCRYPTIONコマンドを使用して、パスワード暗号化を永続的に構成できる', false);
	pushChoice('デュアルモード暗号化バックアップは、暗号化に使用されたパスワードとキーストアの両方が使用可能な場合にのみリストアできる', false);
	pushChoice('RMAN暗号化キーはデータベースキーストアに格納される', false);
	pushChoice('RMANはOracleデータベースのパスワードファイルを暗号化できる', false);
	pushChoice('SET ENCRYPTIONコマンドは、CONFIGURE ENCRYPTIONコマンドで指定された暗号化設定をオーバーライドする', false);
	sortChoice();
	
	// 03(コンポーネントを管理するためのOracle Restartの設定および使用)
	q_list.push(new Question('次の構成のデータベースがある。'
	+ '\n'
	+ '\nORCLデータベースのデータファイルは、ASMディスクグループ +DATA にあります。'
	+ '\nORCLは高速リカバリ領域にディスクグループ +FRA を使用します。'
	+ '\nLISTENERはORCLのリスナーです。'
	+ '\nデータベース、リスナー、ASMインスタンス、およびASMディスクグループは、Oracle Restartによって管理されます。'
	+ '\nすべてのコンポーネントは現在シャットダウンされています。'
	+ '\n次のコマンドを実行します。'
	+ '\n'
	+ '\n$ srvctl start database -d ORCL'
	+ '\n'
	+ '\nコマンドの結果として正しいものを説明しなさい。',
	'クラスタ・データベースとその有効化されたインスタンスおよびデータベース・インスタンスが存在するノードのすべてのリスナーを起動します。'
	+ '\nOracle Restartで自動的に再起動されるOracleコンポーネント：'
	+ '\n・データベース・インスタンス'
	+ '\nOracle Restartは1台のホスト・コンピュータで複数のデータベースに対応できます。'
	+ '\n・Oracle Netリスナー'
	+ '\n・データベース・サービス'
	+ '\nインストール時に作成されたデフォルトのサービスは、Oracle Databaseによって自動的に管理されるため、含まれません。また、データベースの作成時に作成されるデフォルトのサービスも含まれません。'
	+ '\n・Oracle Automatic Storage Management(Oracle ASM)インスタンス'
	+ '\n・Oracle ASMディスク・グループ'
	+ '\nディスク・グループの再起動はディスク・グループのマウントを指します。'
	+ '\n・Oracle Notification Services(ONS)'
	+ '\nスタンドアロン・サーバー環境では、高速アプリケーション通知(FAN)を介したプライマリ・データベースとスタンバイ・データベース間の接続のフェイルオーバーを自動化するために、Oracle Data GuardのインストールでONSを使用できます。ONSは、フェイルオーバーの際にFANイベントを統合されているクライアントに送信するサービスです。'
	+ '\n'));
	pushChoice('ORCLデータベースインスタンス、Oracle ASMインスタンス、および+DATAおよび+FRAディスクグループが起動される', false);
	pushChoice('ORCLデータベースインスタンスとASMインスタンスが起動される', false);
	pushChoice('ORCLデータベースインスタンスが起動される', false);
	pushChoice('ORCLデータベースインスタンスと+DATAおよび+FRAディスクグループが起動される', false);
	pushChoice('ORCLデータベースインスタンス、Oracle ASMインスタンス、+DATAおよび+FRAディスクグループ、およびLISTENERが起動される', false);
	sortChoice();
}());

(function(){
    sortQuestion();
}());
