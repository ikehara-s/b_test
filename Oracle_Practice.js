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
	pushChoice('PDB1のコミットされていないトランザクションはロールバックされる', true);
	pushChoice('CDB1はシャットダウンされる', false);
	pushChoice('CDB1とPDB1のコミットされていないトランザクションはロールバックされる', false);
	pushChoice('PDB1はクローズされる', true);
	sortChoice();
	
	// 02(RMANバックアップの圧縮および暗号化)
	q_list.push(new Question('RMAN暗号化について正しい説明を2つ選択しなさい。',
	'CONFIGURE ENCRYPTIONコマンドで永続設定可能なのは暗号化キーによるバックアップのみ。'
	+ '\nデュアルモード暗号化は通常はOracleウォレットを使用してリストアするが、パスワードでもリストアできる暗号化モードである。'
	+ '\nRMAN暗号化キーはデータベースキーストアに格納される。'
	+ '\nSET ENCRYPTIONコマンドは、CONFIGURE ENCRYPTIONコマンドで指定された暗号化設定をオーバーライドする。'));
	pushChoice('CONFIGURE ENCRYPTIONコマンドを使用して、パスワード暗号化を永続的に構成できる', false);
	pushChoice('デュアルモード暗号化バックアップは、暗号化に使用されたパスワードとキーストアの両方が使用可能な場合にのみリストアできる', false);
	pushChoice('RMAN暗号化キーはデータベースキーストアに格納される', true);
	pushChoice('RMANはOracleデータベースのパスワードファイルを暗号化できる', false);
	pushChoice('SET ENCRYPTIONコマンドは、CONFIGURE ENCRYPTIONコマンドで指定された暗号化設定をオーバーライドする', true);
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
	pushChoice('ORCLデータベースインスタンス、Oracle ASMインスタンス、+DATAおよび+FRAディスクグループ、およびLISTENERが起動される', true);
	sortChoice();
	
	// 04(CDBおよびPDBのバックアップとリカバリの実行、ローカルUNDOモードと共有UNDOモードの比較)
	q_list.push(new Question('次のSQLコマンドを実行します。'
	+ '\n'
	+ '\nSQL> SELECT PDB_NAME, NAME, PDB_RESTORE_POINT, CLEAN_PDB_RESTORE_POINT'
	+ '\n  2  FROM V$RESTORE_POINT NATURAL JOIN DBA_PDBS;'
	+ '\n'
	+ '\nPDB_NAME NAME PDB_RESTORE_POINT CLEAN_PDB_RESTORE_POINT'
	+ '\n-------- ---- ----------------- -----------------------'
	+ '\nPDB1     R1   YES               NO'
	+ '\n'
	+ '\nSQL> SELECT PROPERTY_NAME, PROPERTY_VALUE'
	+ '\n  2  FROM DATABASE_PROPERTIES WHERE PROPERTY_NAME LIKE "%UNDO%";'
	+ '\n'
	+ '\nPROPERTY_NAME      PROPERTY_VALUE'
	+ '\n------------------ --------------'
	+ '\nLOCAL_UNDO_ENABLED FALSE'
	+ '\n'
	+ '\nCDBのオンラインRMANバックアップは、復元ポイントR1が作成される1時間前に行われました。'
	+ '\nPDB1を復元してポイントR1を復元するために、何をすればよいでしょうか。',
	'12c R1では、PDBに対してフラッシュバック・データベースは実行できません。'
	+ '\nそのため、PDBを過去の時点に戻したい場合は、RMANによるPoint-in-Timeリカバリ（不完全リカバリ）を使用します。'
	+ '\nRMANでバックアップセットおよびアーカイブREDOログファイルからUNDO、SYSTEMおよびSYSAUXの各表領域を補助データベース上のCDBにリカバリし、そのデータを用いてターゲットデータベース上のPDBを目標時点にリカバリします。'
	+ '\n'
	+ '\nRMAN> RESTORE PLUGGABLE DATABASE...'
	+ '\nRMAN> RECOVER PLUGGABLE DATABASE...'
	+ '\n'
	+ '\nなお、復旧する目標地点の指定として使用できる「リストアポイント」について、12c R1では対象のPDBのみ参照・使用できるリストアポイントを作成することはできません。'
	+ '\n12c R1では、CDB全体またはCDB内の複数のPDBに対して、特定の時点にリカバリすることができる「CDBリストアポイント」のみ作成できます。'
	+ '\nCDBリストアポイントは、どのPDBからでもリストアポイントの存在を確認することができます。'
	+ '\nこれは、仮に利用者ごとにPDBを割り当てた場合、他の利用者が作成したリストアポイントの内容が見えてしまうことを意味します。'
	+ '\n'
	+ '\n12c R2からマルチテナント環境でのUNDOモード「ローカルUNDOモード」が追加されたことにより、PDBにもフラッシュバック・データベースが実行できるようになりました。'
	+ '\nローカルUNDOモードは、PDBごとにUNDO表領域をもつデータベースの構成です。'
	+ '\n12c R2ではデフォルトでローカルUNDOモードになっています。'
	+ '\n'
	+ '\nSQL> FLASHBACK PLUGGABLE DATABASE...'
	+ '\n'
	+ '\n共有UNDOモードでflashback pluggable databaseコマンドを実行すると、コマンド名に反して、内部的にはPoint-in-Timeリカバリが実行されます。'
	+ '\nこのため、事前にバックアップを取得しておく必要がありますし、補助データベース用の領域を確保しておく必要もあります。'
	+ '\nただし、共有UNDOモードでもインプレースでPDBフラッシュバック・データベースを使用することができる方法があります。'
	+ '\nそれは、リカバリする地点として「クリーンPDBリストアポイント」を指定した場合です。'
	+ '\nクリーンPDBリストアポイントとは、12c R2から追加された機能であり、データの読み取り一貫性がとれた時点のリストアポイントです。'
	+ '\nPDBがクローズされており、未処理のトランザクションが存在しない場合に作成することができます。'
	+ '\n'
	+ '\n共有UNDOモード'
	+ '\nRMAN> FLASHBACK PLUGGABLE DATABASE...'
	+ '\n共有UNDOモード(CLEAN_RESTORE_POINT)'
	+ '\nSQL> FLASHBACK PLUGGABLE DATABASE...'));
	pushChoice('CDB $ ROOTに接続しているときに、SQLを使用してFLASHBACK PLUGGABLE DATABASE PDB1を実行する', false);
	pushChoice('完全な復元ポイントがないため、これは実行できない', false);
	pushChoice('PDB1に接続しているときに、SQLを使用してFLASHBACK PLUGGABLE DATABASE PDB1を実行する', false);
	pushChoice('PDB1に接続した状態でRMANを使用してFLASHBACK PLUGGABLE DATABASE PDB1を実行する', false);
	pushChoice('CDB $ ROOTに接続しているときにRMANを使用して、FLASHBACK PLUGGABLE DATABASE PDB1を実行する', true);
	sortChoice();
	
	// 05(ローカルUNDOモードと共有UNDOモードの比較)
	q_list.push(new Question('ローカルUNDOモードのCDBをどのように構成しますか？',
	'すべてのコンテナでローカルUNDOを使用するか、CDB全体で共有UNDOを使用するようにCDBを構成できます。'
	+ '\nCDBは、ローカルまたは共有UNDOモードで実行できます。UNDOモードはCDB全体に適用されます。'
	+ '\nしたがって、すべてのコンテナは共有UNDOまたはローカルUNDOを使用します。'
	+ '\nCREATE DATABASE文のENABLE PLUGGABLE DATABASE句で、CDB作成時にCDBのUNDOモードを指定します。'
	+ '\nCDBの作成後にALTER DATABASE文を発行し、CDBを再起動することで、CDBのUNDOモードを変更できます。'
	+ '\n'
	+ '\nCDBがローカルUNDOモードである場合、コンテナがオープンされる各インスタンスで、各コンテナに独自のUNDO表領域があります。'
	+ '\nOracle Databaseは、UNDO表領域を持たないCDB内のコンテナにUNDO表領域を自動的に作成します。'
	+ '\nUNDO表領域のないPDBがローカルUNDOモードを使用するように構成されたCDBにクローニング、再配置または接続される場合、Oracle Databaseは初めてオープンされるときにPDBのUNDO表領域を自動的に作成します。'
	+ '\n'
	+ '\nローカルUNDOモードを使用するようにCDBを構成する方法：'
	+ '\nCDBインスタンスがオープンしている場合は、停止します。'
	+ '\nCDBインスタンスをOPEN UPGRADEモードで起動します。'
	+ '\nローカルUNDOを有効にするには、次のSQL文を発行します。'
	+ '\nSQL> ALTER DATABASE LOCAL UNDO ON;'
	+ '\nCDBインスタンスを停止し、再起動します。'
	+ '\n'
	+ '\nオプション: PDBシードにUNDO表領域を手動で作成します。'
	+ '\nOracle DatabaseはローカルUNDOモードでPDBシードにUNDO表領域を自動的に作成しますが、UNDO表領域を手動で作成することによって、UNDO表領域のサイズおよび構成を制御する場合があります。'
	+ '\nPDBシードから作成されるPDBが、自動作成されたUNDO表領域ではなく手動で作成したUNDO表領域を使用するようにするには、UNDO_TABLESPACE初期化パラメータに手動で作成したUNDO表領域を設定するか、自動作成されたUNDO表領域を削除する必要があります。'
	+ '\n'
	+ '\nSQL*Plusで、現在のコンテナがルートであることを確認します。'
	+ '\nPDBシードを読取り/書込みオープン・モードにします。'
	+ '\nSQL> ALTER PLUGGABLE DATABASE PDB$SEED OPEN READ WRITE FORCE;'
	+ '\nコンテナをPDBシードに切り替えます。'
	+ '\nSQL> ALTER SESSION SET CONTAINER=PDB$SEED;'
	+ '\n'
	+ '\nPDBシードにUNDO表領域を作成します。次に例を示します。'
	+ '\nSQL> REATE UNDO TABLESPACE seedundots1'
	+ '\n  2  DATAFILE "seedundotbs_1a.dbf"'
	+ '\n  3  SIZE 10M AUTOEXTEND ON'
	+ '\n  4  RETENTION GUARANTEE;'
	+ '\n'
	+ '\nコンテナをルートに切り替えます。'
	+ '\nSQL> ALTER SESSION SET CONTAINER=CDB$ROOT;'
	+ '\nPDBシードを読取り専用オープン・モードにします。'
	+ '\nSQL> ALTER PLUGGABLE DATABASE PDB$SEED OPEN READ ONLY FORCE;'));
	pushChoice('CDBを読み取り専用モードで開き、cdb $ rootで、alter database local undo onを実行してから、CDBを読み取り/書き込みモードに変更する', false);
	pushChoice('CDBインスタンスをRESTRICTEDモードで開き、 cdb $ rootで、UNDOテーブルスペースを削除する。各PDBでalter database local undo onを実行してから、CDBインスタンスを再起動しする', false);
	pushChoice('CDBインスタンスをアップグレードモードで開き、 cdb $ rootで、alter database local undo onを実行してから、CDBインスタンスを再起動する', true);
	pushChoice('CDBインスタンスをアップグレードモードで開き、各PDBで、alter database local undo onを実行し、undoテーブルスペースを作成してから、CDBインスタンスを再起動する', false);
	pushChoice('CDBインスタンスをRESTRICTEDモードで開き、cdb $ rootで、alter database local undo onを実行する。各PDBにUNDOテーブルスペースを作成してから、CDBインスタンスを再起動する', false);
	sortChoice();
	
	// 06(PDBおよびアプリケーション・コンテナを使用したプラグ操作とアンプラグ操作)
	q_list.push(new Question('アプリケーションコンテナをコンテナデータベースから取り外し、別のコンテナデータベースにつなぎます。'
	+ '\n手順として正しい説明を2つ選択しなさい。',
	'ローカルUNDOモードが必要なケース：'
	+ '\nアプリケーション・コンテナ内のアプリケーションのアップグレード'
	+ '\nアップグレード後に、アップグレードによって発生したアプリケーションの変更は、アプリケーション・ルートと同期されるアプリケーションPDBに伝播されます。'
	+ '\n前提条件：'
	+ '\nCDBはローカルUNDOモードである必要があります。'
	+ '\n現在のユーザーにはALTER PLUGGABLE DATABASEシステム権限が必要で、権限は一般にアプリケーション・ルートで付与されている必要があります。'
	+ '\nアプリケーション・ルートは読取り/書込みオープンである必要があります。'
	+ '\n'
	+ '\nアプリケーション・コンテナからのアプリケーションのアンインストール'
	+ '\nアプリケーション・コンテナからアプリケーションをアンインストールするには、ALTER PLUGGABLE DATABASE APPLICATION BEGIN UNINSTALL文を実行してアンインストールを開始し、ALTER PLUGGABLE DATABASE APPLICATION END UNINSTALL文を実行して終了します。'
	+ '\nアプリケーションは、アプリケーション・ルートのアプリケーションと同期されるアプリケーションPDBからアンインストールされます。'
	+ '\n前提条件：'
	+ '\nCDBはローカルUNDOモードである必要があります。'
	+ '\n現在のユーザーにはALTER PLUGGABLE DATABASEシステム権限が必要で、権限は一般にアプリケーション・ルートで付与されている必要があります。'
	+ '\nアプリケーション・ルートは読取り/書込みオープン・モードである必要があります。'
	+ '\n'
	+ '\nアプリケーション・コンテナの切断について：'
	+ '\nアプリケーション・コンテナを切断すると、アプリケーション・コンテナがCDBから関連付け解除されます。'
	+ '\n通常、アプリケーション・コンテナは、そのアプリケーション・コンテナを別のCDBに移動する場合に切断します。'
	+ '\nアプリケーション・コンテナは、不要になった場合も切断できます。'
	+ '\n'
	+ '\nアプリケーション・コンテナの切断は、PDBの切断と似ています。'
	+ '\nアプリケーション・コンテナを切断するには、CDBルートに接続し、ALTER PLUGGABLE DATABASE文を使用して、XMLファイルまたは.pdbファイルを指定します。'
	+ '\nXMLファイル(拡張子.xml)を指定すると、そのファイルには、切断後にアプリケーション・コンテナに関するメタデータが含まれます。'
	+ '\nこのSQL文によってXMLファイルが作成され、このXMLファイルには、ターゲットCDBでCREATE PLUGGABLE DATABASE文を使用してアプリケーション・コンテナを接続できるようにするのに必要な情報が含められます。'
	+ '\n.pdbファイルを指定すると、そのファイルにはアプリケーション・コンテナについて記述したXMLファイルおよびアプリケーション・コンテナで使用されるファイル(データファイルやウォレット・ファイルなど)の圧縮アーカイブが含まれます。'
	+ '\n.pdbファイルにより、単一の圧縮されたファイル(複数ファイルではない)を新しい場所にコピーしてアプリケーション・コンテナをCDBに接続できます。'
	+ '\n'
	+ '\n切断する前に、アプリケーション・コンテナにアプリケーションPDBが接続されていない必要があり、クローズされている必要があります。'
	+ '\nアプリケーション・コンテナを切断する場合、切断されたアプリケーション・コンテナはマウント・モードになります。'
	+ '\n切断操作により、記録するアプリケーション・コンテナのデータファイルに、たとえばアプリケーション・コンテナが正常に切断されたことなどの変更が加えられることがあります。'
	+ '\n依然としてCDBの一部であるため、切断されたアプリケーション・コンテナはCDB全体のRMANバックアップに含まれています。'
	+ '\nこのような方法によるバックアップは、切断されたアプリケーション・コンテナが将来必要になった場合に備えてアーカイブするのに便利です。'
	+ '\n'
	+ '\nアプリケーション・コンテナをCDBから完全に削除するには、それを削除できます。'
	+ '\n切断されたアプリケーション・コンテナに対してサポートされる操作は、アプリケーション・コンテナの削除のみです。'
	+ '\nアプリケーション・コンテナは、同じCDBに再接続する前に、CDBから削除する必要があります。'
	+ '\nアプリケーション・コンテナは、CDBに接続されているときにのみ使用可能です。'
	+ '\n'
	+ '\n前提条件：'
	+ '\n現在のユーザーにはSYSDBAまたはSYSOPER管理権限が必要であり、その権限は共通で付与されているか、またはPDBでローカルに付与されている必要があります。'
	+ '\nユーザーは、接続時にAS SYSDBAまたはAS SYSOPERを使用して権限を行使する必要があります。'
	+ '\nアプリケーション・コンテナは少なくとも1回オープンされている必要があります。'
	+ '\nアプリケーション・コンテナにアプリケーションPDBが接続されていない必要があります。'
	+ '\nアプリケーション・コンテナにアプリケーション・シードが接続されていない必要があります。'
	+ '\n'
	+ '\nアプリケーション・コンテナを切断する手順：'
	+ '\nSQL*Plusで、現在のコンテナがCDBのルートであることを確認します。'
	+ '\nアプリケーション・コンテナをクローズします。'
	+ '\nOracle Real Application Clusters (Oracle RAC)環境では、アプリケーション・コンテナがすべてのインスタンスでクローズされている必要があります。'
	+ '\nUNPLUG INTO句を指定してALTER PLUGGABLE DATABASE文を実行し、切断するアプリケーション・コンテナおよびアプリケーション・コンテナのXMLメタデータ・ファイルまたは.pdbファイルの名前と場所を指定します。'));
	pushChoice('アプリケーションルートをCDBからアンプラグすると、アプリケーションPDBがすべてアンプラグされる', false);
	pushChoice('アプリケーションコンテナがアンプラグされるデータベースをローカルUNDOモードで構成する必要がある', false);
	pushChoice('アプリケーションコンテナのアプリケーションルートを他のCDBにプラグインしてから、アプリケーションPDBをプラグインする必要がある', true);
	pushChoice('アプリケーションコンテナ内のアプリケーションPDBは、アプリケーションルートがアンプラグされる前にアンプラグされる必要がある', true);
	pushChoice('アプリケーションルートを別のCDBプラグインに接続するすべてのアプリケーションPDBにプラグインする', false);
	pushChoice('両方のコンテナーデータベースをローカルUNDOモードで構成する必要がある', false);
	sortChoice();
	
	// 07(PDBの構造の確認、アプリケーションPDBの作成および管理)
	q_list.push(new Question('CDBの共通オブジェクトについて正しい説明を2つ選択しなさい。',
	'オブジェクト・タイプ'
	+ '\nSHARING値'
	+ '\nメタデータ記憶域'
	+ '\nデータ記憶域'
	+ '\n'
	+ '\nデータリンク'
	+ '\nDATA'
	+ '\nアプリケーション・ルート'
	+ '\nアプリケーション・ルート'
	+ '\n'
	+ '\n拡張データリンク'
	+ '\nEXTENDED DATA'
	+ '\nアプリケーション・ルート'
	+ '\nアプリケーション・ルートおよびアプリケーションPDB'
	+ '\n'
	+ '\nメタデータリンク'
	+ '\nMETADATA'
	+ '\nアプリケーション・ルート'
	+ '\nアプリケーションPDB'
	+ '\n'
	+ '\n2.2.5 CDBの共通オブジェクトおよびローカル・オブジェクトの概要'
	+ '\n共通オブジェクトは、CDBルートまたはアプリケーション・ルートのいずれかで定義されており、メタデータ・リンクまたはオブジェクト・リンクを使用して参照できます。'
	+ '\nローカル・オブジェクトは、共通オブジェクトではないすべてのオブジェクトです。'
	+ '\n'
	+ '\nデータベースによって提供される共通オブジェクトは、CDB$ROOTで定義されており、変更できません。'
	+ '\nOracle Databaseでは、CDB$ROOTでの共通オブジェクトの作成はサポートされていません。'
	+ '\n'
	+ '\nアプリケーション・ルートでは、表、ビュー、PL/SQLおよびJavaプログラム・ユニット、順序などのほとんどのスキーマ・オブジェクトを共通オブジェクトとして作成できます。'
	+ '\nオブジェクトがアプリケーション・ルートに存在する場合、それはアプリケーション共通オブジェクトと呼ばれます。'
	+ '\n'
	+ '\nローカル・ユーザーは共通オブジェクトを所有できます。'
	+ '\nまた、共通ユーザーはローカル・オブジェクトを所有できますが、これはオブジェクトがデータリンクまたはメタデータリンクされてなく、なおかつメタデータ・リンクでもデータ・リンクでもない場合のみです。'
	+ '\n'
	+ '\n17.4 アプリケーション共通オブジェクトの管理'
	+ '\nアプリケーション共通オブジェクトは、アプリケーション・コンテナで共有されている、ユーザーにより作成されたデータベース・オブジェクトです。'
	+ '\nアプリケーション共通オブジェクトは、アプリケーション・ルートに作成されます。'
	+ '\nアプリケーション共通オブジェクトは、アプリケーション・ルートに作成され、アプリケーション・ルートに属するアプリケーションPDBと共有されます。'));
	pushChoice('CDB$ROOTおよびアプリケーションルートに存在することができる', true);
	pushChoice('CDB$ROOTに拡張データリンクを配置することができる', false);
	pushChoice('アプリケーションコンテナ内にのみメタデータリンクを配置することができる', false);
	pushChoice('アプリケーションルートでのみ作成することができる', true);
	pushChoice('CDB$ROOTでのみ作成することができる', false);
	pushChoice('アプリケーションコンテナ内のユーザー定義スキーマにのみ作成することができる', false);
	sortChoice();
	
	// 08(高速ホーム・プロビジョニング)
	q_list.push(new Question('次のコマンドについて確認しなさい。'
	+ '\n'
	+ '\n$ rhpctl move database -sourcehome Oracle_home_path -destinationhome Oracle_home_path'
	+ '\n'
	+ '\nこのコマンドを使用する目的として正しい説明を2つ選択しなさい。',
	'移動元の作業用コピーまたはOracleホームから、1つ以上のデータベースをパッチ適用済作業用コピーに移動するには、rhpctl move databaseコマンドを使用します。'
	+ '\nパッチ適用済作業用コピーは存在していなくてもかまいません。動的に作成できます。'
	+ '\nその場合は、パッチ適用済作業用コピーの作成元のイメージ名を指定する必要があります。'
	+ '\n'
	+ '\n-sourcewc workingcopy_name'
	+ '\nデータベースの移動元の作業用コピーの名前を指定します。'
	+ '\n'
	+ '\n-sourcehome Oracle_home_path'
	+ '\n移動元のOracleホーム・パスを指定します。'
	+ '\n'
	+ '\n-oraclebase Oracle_base_path'
	+ '\nOracleデータベース・ホームをプロビジョニングするORACLE_BASEパスを指定します(ORACLEDBSOFTWAREイメージ・タイプのみで必要)。'
	+ '\n'
	+ '\n-patchedwc workingcopy_name'
	+ '\nデータベースの移動先の作業用コピーの名前を指定します。'
	+ '\n'
	+ '\n-client cluster_name'
	+ '\nクライアント・クラスタの名前を指定します。'
	+ '\n'
	+ '\n-dbname unique_db_name'
	+ '\nプロビジョニングするデータベースの一意の名前(DB_UNIQUE_NAME)を指定します。'
	+ '\n'
	+ '\n使用例：'
	+ '\nある作業用コピーで実行しているすべてのデータベースを別の作業用コピーにローリング・モードで移動するには、次のコマンドを実行します。'
	+ '\nrhpctl move database -sourcewc prodHomeV1 -patchedwc prodHomeV2 -client prodcluster -dbname prod1db'
	+ '\nこの例では、パッチ適用済作業用コピーprodHomeV2が存在する必要があります。'));
	pushChoice('集中型高速ホームプロビジョニングサーバーを使用しているときにOracleデータベースホームを切り替える', false);
	pushChoice('ロールバック操作の一部として前のOracleホームに戻す', true);
	pushChoice('読取り専用のOracleホームに切り替える', false);
	pushChoice('パッチが適用されたOracleデータベースのホームに切り替える', true);
	pushChoice('既存のOracleデータベースのホームを同じサーバー上のOracleソフトウェアの新しいリリースに切り替える', false);
	sortChoice();
	
	// https://www.examtopics.com/exams/oracle/1z0-083/view/5/
	// 09()
	
	
	
//=============================================================================
// 1
//=============================================================================

Which three are true about thresholds, metrics, and server-generated alerts? (Choose three.)
A. All metrics are instance related.
B. Cleared stateful alerts are displayed by querying DBA_ALERT_HISTORY.
C. A space usage management alert is automatically cleared after the underlying problem is resolved.
D. They are generated by SMON when a tablespace is 97% full.
E. Metrics are statistical counts for a specific unit.
F. STATISTICS_LEVEL must be set to ALL to generate alerts.

[janw]
D incorrect ==> MMON

[janw]
B correct
DBA_ALERT_HISTORY describes a time-limited history of alerts which are no longer outstanding.

[janw]
C correct
Most alerts, such as the Out of Space alert, are cleared automatically when the cause of the problem disappears.

[janw]
F incorrect ==> typical is sufficient

[janw]
correct: BCE

[Jatindra]
Reference Student guide:
Threshold alerts are also referred to as stateful alerts which are automatically cleared when an alert condition clears.
Stateful alerts appear in DBA_OUTSTANDING_ALERTS and when cleared go to DBA_ALERT_HISTORY.


//=============================================================================
// 2
//=============================================================================

While backing up to an SBT channel, you determine that the read phase of your compressed Recovery Manager (RMAN) incremental level 0 backup is a bottleneck.
FORCE LOGGING is enabled for the database.
Which two could improve read performance? (Choose two.)
A. Increase the size of tape I/O buffers.
B. Disable FORCE LOGGING for the database.
C. Increase the size of the database buffer cache.
D. Enable asynchronous disk I/O.
E. Increase the level of RMAN multiplexing.

[janw]
CE correct

[janw]
You can improve performance by increasing the degree of multiplexing used for backing up.
This increases the rate at which RMAN fills tape buffers, which makes it more likely that buffers are sent to the media manager fast enough to maintain streaming.

[janw]
When a channel reads from or writes to disk, the I/O is either synchronous I/O or asynchronous I/O.
When the disk I/O is synchronous, a server process can perform only one task at a time.
When the disk I/O is asynchronous, a server process can begin an I/O operation and then perform other work while waiting for the I/O to complete.
RMAN can also begin multiple I/O operations before waiting for the first to complete.
When reading from an ASM disk group, you should use asynchronous disk I/O if possible.
Also, if a channel reads from a raw device managed with a volume manager, then asynchronous disk I/O also works well.
Some operating systems support native asynchronous disk I/O.
The database takes advantage of this feature if it is available.

[janw]
DE correct
C = incorrect, rman does not use database buffer cache


//=============================================================================
// 3
//=============================================================================

For which two requirements can you use the USER_TABLESPACE clause with the CREATE PLUGGABLE DATABASE command? (Choose two.)
A. to specify a default tablespace in a PDB cloned from another PDB in the same CDB.
B. to exclude all tablespaces except SYSTEM, SYSAUX, and TEMP when plugging in a PDB
C. to include specific user tablespaces only when relocating a PDB
D. to specify the list of user tablespaces to include when moving a non-CDB to a PDB
E. to exclude a temp tablespace when plugging in a PDB
F. to specify the list of tablespaces to include when creating a PDB from the CDB seed

[janw]
B. to exclude all tablespaces except SYSTEM, SYSAUX, and TEMP when plugging in a PDB
D. to specify the list of user tablespaces to include when moving a non-CDB to a PDB

[pedro0986]
It's correct BD?

[git17]
I am also not sure about B,D option. Are you sure about same JANW?|

[klever35]
D. to specify the list of user tablespaces to include when moving a non-CDB to a PDB
C. to include specific user tablespaces only when relocating a PDB


//=============================================================================
// 4
//=============================================================================

Which three are true about requirements for various FLASHBACK operations? (Choose three.)
A. FLASHBACK transaction query requires undo to retrieve all versions of a row that existed between two points in time.
B. FLASHBACK drop requires that the RECYCLEBIN parameter be set to ON.
C. FLASHBACK version query requires that the RECYCLEBIN parameter be set to ON.
D. FLASHBACK DATA ARCHIVE requires undo to store all versions of all rows of a table being tracked.
E. FLASHBACK drop requires undo to retrieve all versions of a row that existed between two points in time.
F. FLASHBACK version query requires undo to retrieve all versions of a row that existed between two points in time.

[janw]
A
B
F
C incorrect, recycle bin not used for flashback version

[pedro0986]
Janw, did you passed in test 083? I fault today. Do you study for here?

[veginha]
what was your score? i was also studying from this, but i have noticed so many wrong answers

[git17]
Are you sure JANW? Because as per my thinking it should be AEF

[asefa]
A, B n F

[klever35]
for me it is DEF

[GraceYu]
ABF
B instead of E.
When you drop a table, the database does not immediately remove the space associated with the table.
The database renames the table and places it and any associated objects in a recycle bin, where, in case the table was dropped in error, it can be recovered at a later time.
This feature is called Flashback Drop, and the FLASHBACK TABLE statement is used to restore the table


//=============================================================================
// 5
//=============================================================================

Which three actions are performed by the Oracle Preinstallation RPM, oracle-database-server-xxxx-preinstall, for Oracle Grid Infrastructure, where xxxx is the Oracle version and release? (Choose three.)
A. performing checks to ensure minimum configuration requirements for Oracle Grid Infrastructure are met
B. creating the oracle OS user
C. creating the OSDBA (dba) group
D. creating thte oraInventory (oinstall) group
E. creating the grid OS user
F. configuring the OS for Oracle Automatic Storage Management shared storage access

[janw]
When installed, the Oracle Preinstallation RPM does the following:
Automatically downloads and installs any additional RPM packages needed for installing Oracle Grid Infrastructure and Oracle Database, and resolves any dependencies
Creates an oracle user, and creates the oraInventory (oinstall) and OSDBA (dba) groups for that user
As needed, sets sysctl.conf settings, system startup parameters, and driver parameters to values based on recommendations from the Oracle Preinstallation RPM program
Sets hard and soft resource limits
Sets other recommended parameters, depending on your kernel version
Sets numa=off in the kernel for Linux x86_64 machines.

[janw]
correct = BCD

[asefa]
janW You are right the answer is BCD.

[IOracle]
B,C,D - from here
https://docs.oracle.com/cd/E11882_01/install.112/e41961/prelinux.htm#CWLIN172


//=============================================================================
// 6
//=============================================================================

Which two are true about common objects? (Choose two.)
A. They can be created only in CDB$ROOT.
B. They can be only metadata-linked in an application container.
C. They can exist in user-defined schemas only in application containers.
D. They can exist in CDB$ROOT and an application root.
E. They can be extended data-linked in CDB$ROOT.
F. They can be created only in an application root.

[janw]
With Oracle 12c Oracle introduced the concept of common objects which avoids redundancy of metadata and data.
Which makes CDB maintenance and up-gradation easy.
Common objects exist in Oracle-supplied schemas and therefore cannot be user-defined.
In the Application container, we can create metadata-linked or data-linked common objects.

[janw]
correct = cf

[Jatindra]
EF is correct .

[Jatindra]
sorry E is not correct..
Got below from student guide:
D. is correct:
Reference: Student Guide:
Common objects exist in oracle supplied schemas in the CDB root.
Users can create application common objects in application root.
The common object is visible to all application PDBs within the application container when the application PDBs have been synchronized with the application root.
Below are from documentation:
A common object is defined in either the CDB root or an application root, and can be referenced using metadata links or object links.
A local object is every object that is not a common object.
Database-supplied common objects are defined in CDB$ROOT and cannot be changed.
Oracle Database does not support creation of common objects in CDB$ROOT.

[Jatindra]
Correct answer is C,D

[IOracle]
A - is false - they cannot be created in cdbroot
"Oracle Database does not support creation of common objects in CDB$ROOT. "
https://docs.oracle.com/en/database/oracle/oracle-database/18/multi/overview-of-the-multitenant-architecture.html#GUID-8B4B4F8B-1C2B-42C3-BE77-E9AA25CA397A
B - not correct, they can only be metadata linked nd data linked
C - they do not exist only in "application container"
D - is correct there are common objects ( CDB$ROOT) and application common objects (application root)
E - is false, the extended data linkd common objects are only located in application root
F - is correct . They can be created in application containers

[taotsumiau]
F is not correct, because not ONLY in application containers.
It can create in application root and cdb$root.

[samm]
E and F is correct .
E. To create common objects, connect to an application root, and then execute a CREATE
statement that specifies a sharing attribute.
F. A metadata link is a dictionary object that supports referring to, and granting
privileges on, common metadata shared by all PDBs in the application container

[samm]
E is correct. extended data linked in both CDB$root and application root, Just meta data would be in application root for all common object.
F is correct. An application common object is a common object created within an application in an application root.
B is wrong. Common objects are either data-linked or metadata-linked.
A is wrong. as mention F is correct.
C is wrong. Common object can be shared across multiple PDB in application container


//=============================================================================
// 7
//=============================================================================

Which two are true about the Automatic Database Diasnostic Monitor (ADDM)? (Choose two.)
A. It analyzes a period of time corresponding to the 12 hours of activity.
B. It runs automatically after each AWR snapshot.
C. A DBA can run it manually.
D. Results are written to the alert log.
E. It analyzes a period of time corresponding to the last day of activity.

[janw]
An ADDM analysis task is performed and its findings and recommendations stored in the database every time an AWR snapshot is taken provided the STATISTICS_LEVEL parameter is set to TYPICAL or ALL

[janw]
correct = bc

[janw]
The time period analyzed by ADDM is defined by the last two snapshots (the last hour by default).

[Jatindra]
BC is correct.
Results are written to the alert log. -Incorrect .. stores in AWR not in alert logfile.

[asefa]
ill go with BC


//=============================================================================
// 8
//=============================================================================

Which two are true about server-generated alerts? (Choose two.)
A. Stateful alerts must be created by a DBA after resolving the problem.
B. Stateless alerts can be purged manually from the alert history.
C. Stateless alerts can be cleared manually.
D. Stateless alerts are automatically cleared.
E. Stateful alerts are purged automatically from the alert history.

[janw]
For metric alert event types, an event (metric alert) is raised based on the metric threshold values.
These metric alert events are called stateful alerts.
For those metric alert events that are not tied to the state of a monitored system (for example, snapshot too old, or resumable session suspended ), these alerts are called stateless alerts.
Because stateless alerts are not cleared automatically, they need to be cleared manually.

[janw]
correct: BC

[Jatindra]
Correct Ans: B,C
Student Guide:
Except for the tablespace space usage metric, which is database related, the other metrics are instance related.
Threshold alerts are also referred to as stateful alerts which are automatically cleared when an alert condition clears.
Stateful alert appears in DBA_OUTSTANDING_ALERTS and when cleared go to DBA_ALERT_HISTORY.
Other server-generated alerts correspond to specific database events such as ORA-* errors,
"Snapshot too old" errors, Recovery Area Low on Free Space, Resumable Session Suspended. These are non threshold based alerts, also referred to as stateless alerts.
Stateless alerts go directly to the History table.
Most alerts (such as "Out of Space") are cleared automatically when the cause of the problem disappears.
However, other alerts (such as generic alert log errors) are sent to you for notification and must be acknowledged by you.
After taking the corrective measures, you acknowledge an alert by clearing or purging it.
Clearing an alert sends the alert to the Alert History which is accessible from Monitoring sub menu.
Purging an alert removes it from the Alert History.


//=============================================================================
// 9
//=============================================================================

Which three are located by using environment variables? (Choose three.)
A. the Optimal Flexible Architecture (OFA) compliant path to store Oracle software and configuration files.
B. the location of Oracle Net Services configuration files
C. the list of a disk group names to be mounted by an Oracle Automatic Storage Management (ASM) instance at startup
D. default directories for temporary files used by temporary tablespaces
E. the temporary disk space used by Oracle Installer during installation
F. the maximum number of database files that can be opened by a database instance

[janw]
B = TNS_ADMIN env variable
E = TMP env variable
CF = spfile
D = control file
A = $ORACLE_BASE
correct= A, B, E

[logica]
I agree with janw ABE

[nyanyanyao0826]
corrent = A, B, D

[taotsumiau]
I agree with janw ABE

[IOracle]
Correct B - TNS_ADMIN,
C - The ASM_DISKGROUPS initialization parameter specifies a list of disk group names that an Oracle
ASM instance mounts at startup when the SQL ALTER DISKGROUP ALL MOUNT statement is issued.
D- DB_CREATE_FILE_DEST ->
DB_CREATE_FILE_DEST initialization parameter in your initialization parameter file to identify the default location for the database server to create:
Data files
Temp files
Redo log files
Control files
Block change tracking files


//=============================================================================
// 10
//=============================================================================

Which three are true about opatchauto? (Choose three.)
A. It performs a shutdown and then a restart of all processes in both Oracle Grid Infrastructure and Oracle Database home during the patching process.
B. It must be invoked by a user with root user privileges.
C. Patches are applied via opatchauto.
D. Users must always input patch plans to opatchauto.
E. It requires the Oracle Grid Infrastructure and Oracle Database instances to be shut down before being invoked.
F. It applies patches in nonrolling mode by default.
G. It is used to apply interim patches to Oracle Grid Infrastructure and Oracle Database home combinations.

[Jatindra]
A. It performs a shutdown and then a restart of all processes in both Oracle Grid Infrastructure and Oracle Database home during the patching process. ==> correct
B. It must be invoked by a user with root user privileges. ==> it must be invoked by root..
C. Patches are applied via opatchauto. This is Correct but E is more accurate
D. Users must always input patch plans to opatchauto.
E. It requires the Oracle Grid Infrastructure and Oracle Database instances to be shut down before being invoked. incorrect
F. It applies patches in nonrolling mode by default.
G. It is used to apply interim patches to Oracle Grid Infrastructure and Oracle Database home combinations. Correct
Correct: A, B, C, G (seems four correct options)

[Jatindra]
Student Guide:
opatchauto:
Is a utility for applying interim patches to Oracle Grid Infrastructure and Database Home combinations.
Usually found in the directory $ORACLE_HOME/OPatch
Updated with Patch 6880880 for all product along with opatch
Invoke with the command opatchauto after adding $ORACLE_HOME/OPatch to the PATH
Invoked as the root user
Will shutdown, patch and restart all processes in both the Oracle Grid Infrastructure and Database Home.
Allow a single command to patch a Real Application Cluster (RAC) system or a Single Instance High Availability (SIHA) configuration.

[julica]
correct: ABG

[IOracle]
OPatchAuto must be run from the GI Home as a root user
OPatchAuto apply command applies the patch
Rolling Mode (Default Mode): When performing patching in Rolling mode, the ORACLE_HOME processes on a particular node are shut down, the patch is applied, then the node is brought back up again. This process is repeated for each node in the GI or RAC environment until all nodes are patched.
Opatchauto is used also to apply interim patches
A,B,C,G


//=============================================================================
// 11
//=============================================================================

Which two are true about the character sets used in an Oracle database? (Choose two.)
A. Single-byte character sets provide better performance than multibyte character sets.
B. Unicode enables information from any language to be stored using a single character set.
C. Unicode is the only supported character set for Oracle databases created using Database Configuration Assistant (DBCA).
D. Single-byte character sets always use 7-bit encoding schemes.
E. Multibyte character sets allow more efficient space utilization than single byte character sets.
F. Single-byte character sets always use 8-bit encoding schemes.

[janw]
Single-byte encoding schemes are classified as one of the following types:
7-bit encoding schemes
8-bit encoding schemes
DF: incorrect

[janw]
B: incorrect
You should generally select the Unicode character set AL32UTF8, because it
supports most languages of the world.
C: incorrect
Starting from Oracle Database 12c Release 2, if you use Oracle Universal Installer or Database Configuration Assistant (DBCA) to create the database, then the default database character set is AL32UTF8.
A: correct
Single-byte character sets result in better performance than multibyte character sets, and they also are the most efficient in terms of space requirements.
E: incorrect
Single-byte character sets result in better performance than multibyte character sets, and they also are the most efficient in terms of space requirements.

[git17]
A is correct then what is the another option is correct JANW?

[veginha]
i think B is the other one, Unicode is intended to include every character that will ever be required.


//=============================================================================
// 12
//=============================================================================

Which three are true about monitoring waits for sessions and services? (Choose three.)
A. V$SESSION_EVENT displays all waits for all past and existing sessions if the wait has occurred at least once for a session.
B. V$SERVICE_EVENT displays all waits for all services if the wait has occurred at least once for a service.
C. V$SESSION_WAIT_CLASS displays waits broken down by wait class only for waiting sessions.
D. V$SESSION_WAIT and V$SESSION both contain details of the event on which a non-waiting session last waited.
E. V$SESSION_EVENT displays all waits for all past sessions if the wait has occurred at least once for a session.
F. V$SESSION_WAIT and V$SESSION both contain details of the event on which a session is currently waiting.

[tamagogo]
i believe it is
B,D,E

[IOracle]
B,C,F
V$SESSION_WAIT displays the current or last wait for each session, also the V$SESSION contain the current wats for the session
V$session - only the curent wait for a ession
V$SESSION_EVENT - Total number of waits for the event by the current session


//=============================================================================
// 13
//=============================================================================

You must transport the UNIVERSITY tablespace from one database to another.
The UNIVERSITY tablespace is currently open read/write.
The source and destination platforms have different endian formats.
Examine this list of actions:
1. Make the UNIVERSITY tablespace read-only on the source system.
2. Export the UNIVERSITY tablespace metadata using EXPDP.
3. Convert the UNIVERSITY tablespace data fies to the destination platform format using RMAN on the source system.
4. Copy the UNIVERSITY tablespace data files to the destination system.
5. Copy the Data Pump dump set to the destination system.
6. Convert the UNIVERSITY tablespace data files to the destination platform format using RMAN on the destination system.
7. Import the UNIVERSITY tablespace metadata using IMPDP.
8. Make the UNIVERSITY tablespace read/write on the destination system.
Which is the minimum number of actions required, in the correct order, to transport the UNIVERSITY tablespace?
A. 1, 2, 4, 5, 7, 8
B. 1, 2, 4, 6, 7, 8
C. 1, 2, 3, 4, 5, 7, 8
D. 1, 2, 3, 4, 5, 6, 7, 8
E. 2, 4, 5, 6, 7

[git17]
Correct answer is D

[tamagogo]
correct answer is B
conversion is done only once at source or at destination
Data Pump dump set is metadata only, can be imported remotely

[Jatindra]
Correct answer is B

[asefa]
https://www.oracle.com/assets/full-transportable-wp-12c-1973971.pdf
y not C based on this white paper.

[Sha7]
C is the correct answer

[IOracle]
A - is not correct because the endinaess are different so either 3 or 6 is needed
B - is not correct because step 5 is missing but the trasport of the dump on the target is mandatory accoridng to :
https://docs.oracle.com/en/database/oracle/oracle-database/12.2/admin/transporting-data.html#GUID-CEDFBF9B-3A3B-43D4-9FF2-84EA2537BA8C
C - is the correct answer
D- not correct because it containes both 3 and 6
E - is not correct beacuse they missed step 1 of setting the tbs read-only


//=============================================================================
// 14
//=============================================================================

Which two are true about OS groups and users for Oracle Grid Infrastructure and the Oracle Relational Database Management System (RDBMS)? (Choose two.)
A. By default, members of the OSASM group can access Automatic Storage Management and RDBMS instances.
B. The primary group for the Oracle Grid Infrastructure and Oracle Database owners must be the Oracle Inventory group.
C. The Oracle Grid Infrastructure installation must be owned by the grid user.
D. The Oracle Grid Infrastructure owner owns Oracle Restart and Oracle Automatic Storage Management binaries.
E. The Oracle Grid Infrastructure owner must have OSOPER, OSBACKUPDBA, and OSKMDBA as secondary groups.
F. The same OSDBA group must be used for Automatic Storage Management and the Oracle Database.

[ald85]
I think B D

[Sha7]
Answer is B D

[IOracle]
A - false - Members of this group are granted the SYSASM system privilege to administer Oracle ASM.SYSASM system privileges do not grant access privileges on an Oracle Database instance.
B- Correct -
C - false Only if you wish to define role separation but is not a must
D - correct
E- false OSOPER is optional is not a must
F - the same OSDBA could be used but is not a must ( usually SYSDBA and SYSASM are used for separation us duties )


//=============================================================================
// 15
//=============================================================================

Which four are true about duplicating a database using Recovery Manager (RMAN)? (Choose four.)
A. Duplication can be done by having the auxiliary database instance pull backup sets from the target database instance.
B. A connection to an auxiliary instance is always required.
C. A subset of the target database can be duplicated.
D. A new DBID is always created for the duplicated database.
E. A connection to the recovery catalog instance is always required.
F. A backup of the target database is always required.
G. Duplication can be done by having the target database instance push copies to the auxiliary database instance.
H. A connection to the target database instance is always required.

[janw]
D: incorrect (duplicate standby keeps dbid)

[janw]
correct = ABCG

[Jatindra]
Student Guide:
A duplicate database is a copy of your target database.
With the FOR STANDBY clause, it keeps the same unique database identifier(DBID); If FOR STANDBY not specified it creates a new DBID.
The duplicate database can include the same content or only a subset from the source database. It can be in the same host or a separate host.
The principal work of the duplication is performed by the auxiliary channels.These channels correspond to a server session on the auxiliary instance on the destination host for backup based duplication.
For active database duplication the target channels perform the work of pushing data file copies to the auxiliary instance (if number of allocated target channels is greater than the number of allocated auxiliary channels).

[asefa]
my answer ABCG


//=============================================================================
// 16
//=============================================================================

A container database called CDB1 is OMF-enabled.
PDB_FILE_NAME_CONVERT is not configured in CDB1.
PDB1 was unplugged from CDB1 earlier in the week.
Examine this command, which will be executed in CDB1:

CREATE PLUGGABLE DATABASE pdb1 -
USING "˜/u01/app/oracle/oradata/pdb1.xml'
SOURCE_FILE_NAME_CONVERT =
("˜/u01/app/oracle/oradata/', "˜/u02/app/oracle/oradata/');
Which two are true? (Choose two.)
A. PDB1 data files already exist in the correct location.
B. DBMS_PDB.CHECK_PLUG_COMPATIBILITY must be run in CDB1 before executing the command.
C. PDB_FILE_NAME_CONVERT must be set before executing the command.
D. /u01/app/oracle/oradata/pdb1.xml does not contain the current locations of data files for PDB1.
E. PDB1 must be dropped from CDB1.

[asefa]
B X B. DBMS_PDB.CHECK_PLUG_COMPATIBILITY is optional
C X you dont need to set PDB_FILE_NAME_CONVERT when you set OMF
D X if XML file not describe current locations of FILES
source_file_name_convert claues is required obviously there is no this claue
so the answer must b A and E.

[IOracle]
A - false because when the files exist in the xml specified location you don t have to specifi SOURCE_FILE_NAME_CONVERT
Ref : https://docs.oracle.com/en/database/oracle/oracle-database/18/multi/plugging-in-a-pdb.html#GUID-1691A7A2-372E-4E51-8A4F-15DAC6AB0FC3
B - Check is optional
C - false because OMF and PDB_FILE_NAME_DEST are mutually exclusive
D , E - correct


//=============================================================================
// 17
//=============================================================================

Which three are true about transporting databases across platforms using Recovery Manager (RMAN) image copies? (Choose three.)
A. By default, the transported database will use Oracle Managed Files (OMF)
B. Data files can be converted on the destination system.
C. Data files can be converted on the source system.
D. A new DBID is automatically created for the transported database.
E. Databases can be transported between systems with different endian formats.
F. The password file is automatically converted by RMAN.

[tamagogo]
Correct Answer is BCE

[GraceYu]
E seems incorrect. Transport database needs same endian format.
https://docs.oracle.com/en/database/oracle/oracle-database/18/bradv/rman-transporting-data-across-platforms.html#GUID-65AADCB6-CC9A-4229-9AB8-805C37E4471F
You can use RMAN to transport tablespaces across platforms with different endian formats.
You can also use RMAN to transport an entire database to a different platform so long as the two platforms have the same endian format.

[asefa]
my answer is also BCE

[AMT31]
E is incorrect,
I think answer should B, C, F

[dacoben415lywenw]
DEF do not seem to be correct. so ABC.
Regarding A it is used by default as the doc says:
If you do not provide a destination, then the DB_FILE_CREATE_DEST initialization parameter must be set in the target platform.
RMAN restores the data files to the location specified by this parameter using new Oracle Managed File (OMF) names.
correct me if im wrong

[marcinb32]
ABC - E is incorrect.

[IOracle]
A, B , C as per https:
//docs.oracle.com/en/database/oracle/oracle-database/18/multi/plugging-in-a-pdb.html#GUID-1691A7A2-372E-4E51-8A4F-15DAC6AB0FC3


//=============================================================================
// 18
//=============================================================================

Examine this command:
$ rhpctl move database ""sourcehome Oracle_home_path ""destinationhome Oracle_home_path
For which two purposes can you use this command? (Choose two.)
A. to switch an existing Oracle Database home to a newer release of Oracle software on the same server
B. to switch to a read-only Oracle home
C. to switch back to the previous Oracle home as part of a rollback operation
D. to switch the Oracle Database home when using a centralized Rapid Home Provisioning server
E. to switch to a patched Oracle Database home

[tamagogo]
Answer is CE

[Jatindra]
Three options are correct..
ACE

[Jatindra]
Student Guide:
You can use rhpctl move gihome command with the same syntax to switch from the current Oracle Grid Infrastructure home to a patched home.
The rhpctl command enables you to switch from your current Oracle Grid Infrastructure or Oracle Database home to patched Oracle home so that you can provision the new Oracle home as gold image.
You can also use the rhpctl command to switch back to the old Oracle home, if you want to roll back the operation.
Correct Answer: CE
option A is incorrect and confusing..

[Michael_14]
Why B is incorrect?
C is not completely correct since rolling back patches requires the -ignorewcpatches parameter which is not mentioned in the question


//=============================================================================
// 19
//=============================================================================

Which two are true about changing the LOCAL_UNDO_ENABLED property to false in a CDB? (Choose two.)
A. After the change, only a common user with the required privilege can create an undo tablespace in CDB&ROOT.
B. Any new PDB and existing PDBs are automatically configured to use the default undo tablespace in CDB$ROOT.
C. After the change, only one undo tablespace can exist in CDB$ROOT.
D. After the change, any user with the required privilege can create an undo tablespace in the PDBs.
E. Undo tablespaces existing in PDBs must be dropped before the change.
F. After the change, each existing PDB has to be reopened for the new undo mode to take effect.

[monad2006]
I think -> BF

[Jatindra]
C is correct.
Student guide:
You can set a CDB in local UNDO mode either at CDB creation or by altering the CDB property.
When the database property LOCAL_UNDO_ENABLE is FALSE, which is the default, there is only one UNDO tablespace that is created in the CDB root, and that is shared by all containers.
When LOCAL_UNDO_ENABLE is TRUE, every container in the CDB uses local undo and each PDB must have its own local UNDO tablespace. To maintain ease of management and provisioning, UNDO tablespace creation happens automatically and does not require any action from the user. When a PDB is opened and an UNDO tablespace is not available, its automatically created.

[Jatindra]
Correct Answer B,C

[dacoben415lywenw]
i think AB
C is not true, tried on 19c, with shared undo you can create additional undo tbs in CDB$ROOT as common user
A, true, however create undo tbs will work on PDB but no undo will be created (bug?)
F, not sure, for the new undo mode to take effect whole CDB is restarted


//=============================================================================
// 20
//=============================================================================

Which two are true about SQL Performance Analyzer (SPA)? (Choose two.)
A. It is integrated with the SQL Access Advisor.
B. It predicts the impact of system changes on SQL workload response time.
C. It provides before and after execution statistics for each SQL statement in the analysis task
D. It offers fine-grained analysis of all the SQL statements in the analysis task as a group.
E. SQL statements that were originally run concurrently are run concurrently by SPA.

[veginha]
B is correct.
i'm not pretty sure if D is correct, as i understand that fine-grained analsys is offered by individual SQL not as group.
Anyone?
https://www.oracle.com/a/otn/docs/enterprise-manager/ds-19c-oracle-real-application-testing.pdf

[dacoben415lywenw]
I think BC
B:
Oracle Real Application Testing ... enables businesses to fully assess the outcome of a system changes in test or production.
Oracle Real Application Testing is comprised of the following features: Performance Analyzer (SPA), SPA ...
C:
SQL Performance Analyzer executes the SQL statements captured in the SQL Tuning Set and generates execution plans and execution statistics for each statement
For D , though group (summary) view is shown during analysis, i dont think that what they mean
by fine grained


//=============================================================================
// 21
//=============================================================================

A user complains about poor database performance.
You want to verify if the user's session has waited for certain types of I/O activity.
Which view displays all waits waited on by a session at least once?
A. V$SESSION_EVENT
B. V$SESSTAT
C. V$SESSION_WAIT
D. V$SESSION_WAIT_CLASS
E. V$SESSION

[janw]
V$SESSION_EVENT
This view lists information on waits for an event by a session.

[janw]
correct: A


//=============================================================================
// 22
//=============================================================================

Which two are true about gathering optimizer statistics? (Choose two.)
A. Executing DBMS_STATS.GATHER_DATABASE_STATS while connected to CDB$ROOT gathers object statistics in all open PDBs except PDB$SEED.
B. Executing DBMS_STATS.GATHER_DATABASE_STATS while connected to a PDB opened in read/write mode gathers object statistics for that PDB.
C. Executing DBMS_STATS.GATHER_DATABASE_STATS while connected to CDB$ROOT gathers object statistics only in CDB$ROOT.
D. System statistics can be gathered only while connected to CDB$ROOT.
E. Executing DBMS_STATS.GATHER_DATABASE_STATS while connected to CDB$ROOT gathers object statistics in all open pluggable databases (PDBs)

[veginha]
these responses are contradictory, how could both be correct ?

[Jatindra]
Correct Answer: B,E (not 100% sure)
Below link may clear this confusion :
https://mikedietrichde.com/2016/10/21/gather-fixed-objects-stats-in-pdbs-as-well/#:~:text=Yes%2C%20you'll%20have%20to,independently%20from%20the%20CDB%24ROOT.&text=Oracle%20Database%20automatically%20gathers%20fixed,Automatic%20Optimizer%20Statistics%20Collection%E2%80%9C).
Conclusion
Yes, you’ll have to gather fixed objects stats in PDBs independently from the CDB$ROOT.
But generally in Oracle Database 12c the Automatic Statistics Gathering job will take care on Fixed Objects Stats as well (see here). In a Multitenant environment you just may have to take care to unfold your default maintenance windows as otherwise this will happen in all PDBs at the same time generating plenty of noise on your system.
Oracle Database automatically gathers fixed object statistics as part of automated statistics gathering if they have not been previously collected (see “Controlling Automatic Optimizer Statistics Collection“).

[veginha]
B and C seems to be correct

[klever35]
B and C
https://docs.oracle.com/en/database/oracle/oracle-database/20/arpls/DBMS_STATS.html#GUID-B930CE9B-7461-4691-8AA9-7E424C3C2C8C

[ald85]
Testing Correct are BE
SQL> show con_name;
CON_NAME
------------------------------
CDB$ROOT
SQL> select count(*) from sys.dba_tab_statistics where last_analyzed is not null;
2274
SQL> ALTER SESSION SET CONTAINER =XEPDB1;
Sesión modificada.
SQL> select count(*) from sys.dba_tab_statistics where last_analyzed is not null;
2641
SQL> ALTER SESSION SET CONTAINER =CDB$ROOT;
Session altered.
SQL> EXEC DBMS_STATS.GATHER_DATABASE_STATS;
PL/SQL procedure successfully completed.
SQL> select count(*) from sys.dba_tab_statistics where last_analyzed is not null;
3727
SQL> ALTER SESSION SET CONTAINER =XEPDB1;
Session altered.
SQL> select count(*) from sys.dba_tab_statistics where last_analyzed is not null;
3725

[dacoben415lywenw]
corect BC
tested on 19c and 12.2
test provided by ald85 is not accurate, E is not corect
try creating simple tales in ROOT and PDB than gather db stats from
ROOT, and you will see that PDB tables stats will not be gathered.


//=============================================================================
// 23
//=============================================================================

Examine this output:

SQL> select pluggable_database, shares, parallel_server_limit
  2  from dba_cdb_rsrc_plan_directives where plan = 'MY_PLAN'
  3  order by pluggable_database;

PLUGGABLE_DATABASE         SHARES    PARALLEL_SERVER_LIMIT
-------------------------- --------- -------------------------
ORA$AUTOTASK                                              100
ORA$DEFAULT_PDB_DIRECTIVE         1                         0
PDB1                              2                       100
PDB2                              2                        25
PDB3                              1

SQL> select name, value from v$parameter
  2  where name = 'resource_manager_plan';

NAME                   VALUE
---------------------- --------
resource_manager_plan  MY_PLAN

Which two are true? (Choose two.)
A. Any PDB not specified in the plan will be unable to execute statements in parallel.
B. PDB3 can use all available parallel execution processes at times.
C. PDB1 is always limited to 40% of the available system resources regardless of demand.
D. Any PDB not specified in the plan will be able to use a maximum of 16.5% of the available system resources.
E. PDB3 is guaranteed to receive at least 20% of the available system resources if there is enough demand.
F. PDB2 is guaranteed at least 25% of the available parallel execution processes if there is enough demand.

[logica]
answer: A and F

[veginha]
I'm not sure about it. Yes pdb2 can get 25% of the parallel execution process, but that is the upper limit, not the lower, so i think that it's not correct to said that "at least 25%"
I was thinking in A, and E since the question don't mention any limit for system resources (utilization_limit)

[ald85]
I think D and F.

[marcinb32]
BE
https://docs.oracle.com/database/121/ADMIN/cdb_dbrm.htm#ADMIN13786
+
https://docs.oracle.com/database/121/ADMIN/dbrm.htm#ADMIN14008:
The number of active parallel execution servers across all consumer groups exceeds the PARALLEL_SERVERS_TARGET initialization parameter setting.
This condition applies regardless of whether you specify PARALLEL_SERVER_LIMIT.
If PARALLEL_SERVER_LIMIT is not specified, then it defaults to 100%.


//=============================================================================
// 24
//=============================================================================

Which two are true about the execution of operating system scripts starting from Oracle Database 19c? (Choose two.)
A. orainstRoot.sh can be executed automatically by the Database installer by using sudo or root credentials.
B. root.sh can be executed automatically by the Database Installer only if it is provided with root credentials.
C. The sudo password can be specified in a response file.
D. root.sh can be executed automatically by the Database installer only by using sudo credentials.
E. The sudo password must be specified in a response file.
F. The root password cannot be specified in a response file.

[Jatindra]
Correct Answer :A,F


//=============================================================================
// 25
//=============================================================================

Automatic Shared Memory Management is disabled for one of your database instances.
Some SQL statements perform poorly due to excessive hard parse activity, thereby degrading performance.
What would be your next step?
A. Run the SQL Access Advisor.
B. Run the Memory Advisor for the shared pool.
C. Run the SQL Tunning Advisor.
D. Run the Memory Advisor for the Program Global Area.
E. Run the Memory Advisor for the System Global Area.

[Jatindra]
B is correct

[klever35]
I still have the doubt. Run the Memory Advisor for the Program Global Area


//=============================================================================
// 26
//=============================================================================

Which two are true about flashback features in Oracle Database 19c and later releases? (Choose two.)
A. Flashback logs are automatically purged when DB_FLASHBACK_RETENTION_TARGET is set lower than the time they have already been retained.
B. Flashback logs are monitored and proactively deleted when beyond the retention period defined in DB_FLASHBACK_RETENTION_TARGET only after there is space pressure.
C. Flashback logs are monitored and proactively deleted when beyond the retention period defined in DB_FLASHBACK_RETENTION_TARGET before there is space pressure.
D. Flashback logs are monitored for being older than the retention period defined in DB_FLASHBACK_RETENTION_TARGET and can be deleted by an administrator written event trigger.
E. Flashback logs are automatically purged whenever the value of DB_FLASHBACK_RETENTION_TARGET is changed.

[Jatindra]
Correct answer B,E

[ald85]
I think, A, B https://blogs.oracle.com/maa/flashback-database-and-flashback-logs

[klever35]
reviewing the indicated by ald85
A, B

[julica]
correct A,B

[nyanyanyao0826]
Correct answer A,C

[marcinb32]
correct AB


//=============================================================================
// 27
//=============================================================================

Examine these queries and their output:

SQL> select log_mode from v$database;

LOG_MODE
-----------
ARCHIVELOG

SQL> select property_name, property_value
  2  from database_properties where property_name like '%UNDO%';

PROPERTY_NAME       PROPERTY_NAME
------------------- --------------
LOCAL_UNDO_ENABLED  FALSE

SQL> select p.name, f.file#, t.name
  2  from v$containers p, v$datafile f, v$tablespace t
  3  where p.con_if=f.con_id
  4  and p.con_id=t.con_id
  5  and t.ts#=f.ts#
  6  order by 1, 2;

NAME      FILE#   NAME
--------- ------- -------------
CDB$ROOT       1  SYSTEM
...
PDB1          24  SYSTEM
...
PDB2          16  SYSTEM

After a system crash, an instance restart and an attempted opening of the PDBs result in:

SQL> startup quiet
ORACLE instance started.
Database mounted.
Database opened.
SQL> alter pluggable database all open;
alter pluggable database all open;
*
ERROR at line 1:
ORA-01157: cannot identify/lock data file 24 - see DBWR trace file
ORA-01110: data file 24:
'/u01/oradata/V122CDB1/516000726D464D04E054000C29704164/datafile/o1_mf_system_dmj30kld_.dbf'

Which two are true? (Choose two.)
A. Data file 24 can be recovered while PDB2 is opened.
B. Data file 24 must be recovered while the CDB is opened.
C. Data file 24 can be recovered while CDB$ROOT and PDB$SEED are opened.
D. Data file 24 cannot be recovered while the CDB is opened.
E. Data file 24 must be recovered while PDB2 is closed.

[veginha]
how could b and d be the correct answers if both are contradictory

[janw]
correct: BE

[pedro0986]
This is answer is wrong. I think that be B and E.

[Jatindra]
Correct Answer: A,B

[Jatindra]
Correct AnCorrect Answer: A,B
Student Guide:
19c:
PDB SYSTEM or UNDO Tablespace Recovery:
The CDB and all other PDBs can be left opened.
1. Connect to PDB
2. Shutdown abort the PDB, if its not automatically done.
sqlplus sys@sales_pdb as sysdba
sql> SHUTDOWN ABORT;
OR
ALTER PLUGGABLE DATABASE CLOSE ABORT;
rman target sys@slaes_pdb
rman> restore database;
rman> recover database;
rman> alter pluggable database sales_pdb open;

[Jatindra]
Closing a PDB with the ABORT mode forcefully closes it without bringing down the entire CDB instance.
It is successful regardless of the states of the actual PDB datafiles.
The operation requires you to be connected to the PDB, have the ALTER PLUGGABLE DATABASE system privilege and have the CDB in ARCHIVELOG mode.
If the datafile that is missing or corrupted belogs to PDB and more specifically to the SYSTEM or UNDO tablespace, the PDB must shutdown in ABORT mode.
The health checker can automatically detects there is a severe failure and aborts the PDB.
A PDB, tablespace or datafile media recovery is required before the PDB can be reopened.
In case the PDB is the application root of an application container, other datafiles in the application PDBs may have to be restored and recovered as well.

[taotsumiau]
AB is right

[veginha]
I think the word "must" in B makes it wrong, is it posible to restore from cdb while in mount state?
It sems to me that C is a little more accuracy

[logica]
anwer C and E

[you1234]
Datafile recoveries can be done while connected to the container or directly to the PDB.
$ rman target=/
# Or
$ rman target=sys@pdb2
RUN {
ALTER DATABASE DATAFILE 24 OFFLINE;
RESTORE DATAFILE 24;
RECOVER DATAFILE 24;
ALTER DATABASE DATAFILE 24 ONLINE;
}
Correct answer is AB

[ald85]
The must clause in the B answers, is excluyent.
But Oracle specifies that The CBD and all other PDBs can be left opened. Correct Answers AC


//=============================================================================
// 28
//=============================================================================

Which two are true about RMAN duplexed backup sets? (Choose two.)
A. A duplexed backup set uses the same number of SBT channels as a non-duplexed backup set for the same number of files.
B. A non-duplexed backup set written to disk can be duplexed to disk by backing up the backup set that is already on disk.
C. A non-duplexed backup set written to SBT can be duplexed to tape by backing up the backup set that is already on tape.
D. A non-duplexed backup set written to disk can be duplexed to tape by backing up the backup set that is already on disk.
E. A non-duplexed backup set written to SBT can be duplexed to disk by backing up the backup set that is already on tape.
F. A duplexed backup set always uses twice as many SBT channels as a non-duplexed backup set for the same number of files.

[Jatindra]
F option is not there in actual exam.

[veginha]
D seems to be right, which is the other one that is right?

[ald85]
I think B D -> https://docs.oracle.com/cd/E18283_01/backup.112/e10642/rcmbckad.htm#i1006180


//=============================================================================
// 29
//=============================================================================

Which three are true about RMAN persistent configuration settings, administration, and their effects? (Choose three.)
A. A target database's persistent RMAN configuration settings are always stored in the target's control file
B. Backup older than the recovery window retention policy are always deleted automatically if the backup location has insufficient space.
C. Backups written to the fast recovery area (FRA) that are oboslete based on the redundancy retention policy can be deleted automatically to free space.
D. The RMAN SHOW ALL command displays only settings with nondefault values.
E. A target database's persistent RMAN configuration settings are always synchronized automatically with the RMAN catalog.
F. The V$RMAN_CONFIGURATION view displays only settings with values that have been modified.
G. A DBA must specify either a redundancy retention policy or a recovery window retention policy.

[ald85]
I think CFG

[veginha]
ACF Why does the dba need to specify the retention policy? it's not necessary, you can use the default values also.


//=============================================================================
// 30
//=============================================================================

Which three are true about Optimizer Statistics Advisor? (Choose three.)
A. It can be run only manually.
B. It is part of the DBMS_ADVISOR package.
C. It can recommend changes to improve the statistics gathering process.
D. It always analyzes all schemas in the database.
E. It runs automatically every night by default.
F. It is part of the DBMS_STATS package.

[monad2006]
I think: CEF

[Jatindra]
Correct Answer: ACF
https://mikedietrichde.com/2017/08/22/oracle-optimizer-statistics-advisor-in-oracle-database-12-2-0-1/
https://www.oracle.com/technetwork/database/bi-datawarehousing/twp-bp-for-stats-gather-19c-5324205.pdf

[julica]
CEF
The advisor task (‘Statistics Advisor‘) runs automatically in the maintenance window. And of course you can also run it on demand

[dacoben415lywenw]
CEF, is the only right answer. A is not correct, daily maintenance window starts at 10pm and spans the whole night.


//=============================================================================
// 31
//=============================================================================

You issued this command:
RMAN> BACKUP RECOVERY FILES;
Which two are true? (Choose two.)
A. All Oracle recovery files not in the current FRA that have not been backed up already, are backed up.
B. All non-Oracle files in the current FRA that have not been backed up already, are backed up.
C. All Oracle recovery files in the current FRA that have not been backed up already, are backed up.
D. All Oracle recovery files in the current fast recovery area (FRA) are backed up.
E. These backups can be written to disk or SBT.

[monad2006]
I think: AC

[Jatindra]
Correct Answer: D,E
The RMAN command backup recovery area allows you to back up all files required to restore the database via RMAN from a recovery area to an sbt (tape) device.

[Jatindra]
File Type Notes
Control file One copy of the control file is created in the flash recovery area when the database is created.
Archived redo logs When you configure the flash recovery area, the parameter log_archive_dest_10 is automatically configured, and archived redo logs are archived to that destination, as well as any other archive log destinations.
Flashback logs Flashback logs are stored in the flash recovery area, if it is defined.
Control file autobackups The default location for the RMAN control file autobackups is the flash recovery area, if it is defined.

[Jatindra]
RMAN datafile copies The default location for the RMAN datafile copies is the flash recovery area, if it is defined.
RMAN backup and other related files The default location for the RMAN files in general (backup-set pieces, etc.) is the flash recovery area, if it is defined.
Databases should be in Archive log mode for flashback recovery.
If a flash recovery area is configured, archival is enabled automatically and LOG_ARCHIVE_DEST_10 is configured to flash recovery area.
If no default location for LOG_ARCHIVE_DEST is provided, then flash recovery area is used to store the archive logs.
A single flash recovery area can be shared between more than one databases.

[Jatindra]
https://blog.toadworld.com/rman_-_using_the_flash_recovery_area

[ald85]
I think AC. The BACKUP RECOVERY FILES command backs up all recovery files, even if the are not in the FRA.
https://books.google.es/books?id=xxx0KAwY_ZMC&pg=PA646&lpg=PA646&dq=backup+recovery+file+command+backs+up&source=bl&ots=4GrlyMuV5t&sig=ACfU3U2qKounHnR6d0JXumNacg2jLhXW-A&hl=es&sa=X&ved=2ahUKEwiXk8aitY7qAhULkhQKHftzDEcQ6AEwDXoECAcQAQ#v=onepage&q=backup%20recovery%20file%20command%20backs%20up&f=false

[you1234]
https://blog.toadworld.com/rman_-_using_the_flash_recovery_area
The backup recovery files command must also go to an sbt device and cannot go to disk.
Hence E is wrong.
There is a second command, backup recovery files, that backs up all recovery files that are on the disk, wherever they may be (in flash recovery areas or otherwise).
Hence D is wrong.
Correct looks like AC.

[dacoben415lywenw]
ACE possible
see RMAN reference guide:
https://docs.oracle.com/database/121/RCMRF/rcmsynta006.htm#RCMRF107
Backs up all recovery files on disk, whether they are stored in the fast recovery area or other locations on disk.
The backups can go to SBT or disk. To backup to disk, you must use the TO DESTINATION syntax outlined in toDestSpec.


//=============================================================================
// 32
//=============================================================================

Which two are true about the Oracle dataabse methodology? (Choose two.)
A. The Oracle Database time model should be used to find the database and instance areas most in need of tuning.
B. Tuning activities should stop once the user is satisfied with performance.
C. Tuning activities should stop once agreed service levels for performance have been met.
D. The database instance memory should always be tuned before tuning any file systems.
E. SQL statements should always be tuned before tuning any file systems.
F. The alert log should be used to find the database and instance areas most in need of tuning.


//=============================================================================
// 33
//=============================================================================

While backing up to the Oracle Fast Recovery Area (FRA), you determined the backup is taking too long and suspect a performance bottleneck.
Which three are true about diagnosing and tuning these problems? (Choose three.)
A. If an RMAN BACKUP VALIDATE command takes roughly the same time as an actual backup, then both read and write I/O are likely bottlenecks.
B. Setting DBWR_IO_SLAVES to a non zero value can improve backup performance when using synchronous I/O.
C. If an RMAN BACKUP VALIDATE command takes noticeably less than an actual backup, then write I/O is a likely bottleneck.
D. If an RMAN BACKUP VALIDATE command takes roughly the same time as an actual backup, then read I/O is a likely bottleneck.
E. Data files with a high value in V$BACKUP_SYNC_IO.DISCRETE_BYTES_PER_SECOND are a potential performance bottleneck when synchronous I/O is used.
F. Setting DBWR_IO_SLAVES to a non zero value can improve backup performance when using asynchronous I/O/
G. Data files with a high value in V$BACKUP_ASYNC_IO.SHORT_WAITS are a potential performance bottleneck when asynchronous I/O is used.


//=============================================================================
// 34
//=============================================================================

You are managing this configuration:
1. CDB1 is a container database.
2. PDB1 and PDB2 are two pluggable databases in CDB1.
3. USER1.EMP is a table in PDB1 and USER2.DEPT is a table in PDB2.
CDB1 user SYS executes these commands after connecting successfully to PDB2:

SQL> ALTER SESSION SET CONTAINER=pdb1;
Session altered.

SQL> INSERT INTO user1.emp VALUES(100, 'Alan', 1);
1 row created.

SQL> INSERT INTO user1.emp VALUES(101, 'Ben', 1);
1 row created.

SQL> ALTER SESSION SET CONTAINER=pdb2;
Session altered.

SQL> INSERT INTO user2.dept VALUES(1, 'IT');

Which two are true? (Choose two.)
A. The inserts on USER1.EMP remain uncommitted when the session connected to PDB2.
B. The inserts on USER1.EMP were committed when the session inserted a row into USER2.DEPT.
C. The insert on USER2.DEPT fails because of the active transaction in the parent container.
D. The insert on USER2.DEPT is a recursive autonomous transaction by the child session and is committed.
E. The inserts on USER1.EMP were rolled back when the session connected to PDB2.
F. The insert on USER2.DEPT is uncommitted.
G. The inserts on USER1.EMP were committed when the session connected to PDB2.

[Jatindra]
Option D is not there in actual exam :)

[veginha]
A and C are correct, i have tried myself in a development environment

[taotsumiau]
G is correct....

[taotsumiau]
GF are correct

[veginha]
how do you get this answers? i got different result in a test environment

[taotsumiau]
I setup the same environment setting in my VM. And follow the question's step to test.
When I insert USER1.EMP at PDB1 without commit. Then connect to PDB2, and open another new session to select the data that I didn't commit. It shows the data.
Then, I inserted data into PDB2 without commit. And select the PDB2's insert data from new session, that didn't show out the data from my query.
That is all I did on my testing VM.
How about you?

[veginha]
strange, i did exactly the same, and got different results:
No commit in user1.emp after changing the session container, and got this error while doing the insert in pdb2:
ERROR at line 1:
ORA-65023: active transaction exists in container PDB1.
Did you use sqlplus as client? do you think that the client configuration could be the reason to get different results?

[you1234]
tested in 19c.
correct answer is A & C

[you1234]
SQL> alter session set container=ELC20MIG;
Session altered.
SQL> select * from user1.emp;
no rows selected
SQL> insert into user1.emp values(100);
1 row created.
SQL> insert into user1.emp values(200);
1 row created.
SQL> alter session set container=PDB2;
Session altered.
SQL> insert into user2.emp values(100);
insert into user2.emp values(100)
*
ERROR at line 1:
ORA-65023: active transaction exists in container ELC20MIG

[you1234]
other session to check any transaction
Version 19.5.0.0.0
SQL>
SQL> alter session set container=ELC20MIG;
Session altered.
SQL> select * from user1.emp;
no rows selected
correct answer is A & C


//=============================================================================
// 35
//=============================================================================

Examine this configuration:
1. CDB1 is an Oracle Database 12c Release 2 database containing pluggable databases PDB$SEED, PDB1, and PDB2.
2. PDB$SEED is open READ ONLY
3. PDB1 is open READ WRITE
4. PDB2 is MOUNTED.
5. ORACLE_HOME is /u01/app/oracle/product/18.1.0/dbhome_1.
You execute these commands before upgrading the database to the current release:

$ . oraenv
ORACLE_SID = [cdb1] ? cdb1
The Oracle base remains unchanged with value /u01/app/oracle

$ $ORACLE_HOME/jdk/bin/java -jar preupgrade.jar TERMINAL TEXT

For which databases will fixup scripts be created?
A. CDB1, PDB$SEED, PDB1, and PDB2
B. PDB$SEED, PDB1, and PDB2 only
C. CDB1 and PDB$SEED only
D. CDB1, PDB1, and PDB2 only
E. CDB1, PDB$SEED, and PDB1 only

[veginha]
i think E is correct, right?

[marcinb32]
E is correct
https://docs.oracle.com/en/database/oracle/oracle-database/18/spmsu/running-pre-upgrade-information-tool-for-non-cdb-checks.html#GUID-B04CDE73-45F1-4717-98BB-9FCC209DEC01


//=============================================================================
// 36
//=============================================================================

Which two are true about Oracle Flashback features? (Choose two.)
A. FLASHBACK QUERY can retrieve REDO records from ONLINE and ARCHIVED REDO LOG files.
B. FLASHBACK VERSION QUERY can retrieve REDO records from ONLINE and ARCHIVED REDO LOG files.
C. FLASHBACK TABLE can undrop a column.
D. FLASHBACK DROP can undrop an index when undropping a table.
E. After a database is restored from flashback logs using the FLASHBACK DATABASE command, it is sometimes rolled forward using redo logs.

[veginha]
This response is wrong, flashback query use UNDO, not archivelogs, i think right answer must be D and E

[monad2006]
not a-b because flashback use undo not redo/archive.
not c because flashback table cannot rever ddl
d-e -> as of before drop retrieve from the recycle bin also the related index, and after using flashback database command, sometimes you could go forward with redo.


//=============================================================================
// 37
//=============================================================================

Which three are true about an application seed pluggable database (PDB)? (Choose three.)
A. It is automatically synchronized with its application root PDB when an application is upgraded.
B. It cannot be added to an application container after the application container has already been created.
C. A new application PDB created by cloning an application seed PDB can have an old version of the application installed after cloning completes.
D. It is automatically synchronized with its application root PDB when an application is installed.
E. It cannot be dropped from its application container.
F. A new application PDB created by cloning an application seed PDB can have an up-to-date version of the application installed after cloning completes.
G. It is not required in an application container.

[marcinb32]
CFG ??

[taotsumiau]
Agree CFG
https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/creating-removing-application-containers-seeds-with-sql-plus.html#GUID-065649AC-18ED-4858-ACC5-36F011362A83


//=============================================================================
// 38
//=============================================================================

Examine this configuration:
1. CDB1 is a container database.
2. PDB1 and PDB2 are pluggable databases in CDB1.
3. PDB1 and PDB2 are OPEN in READ WRITE mode.
You execute these commands successfully:

$ export ORACLE_SID=CDB1
$ sqlplus / as sysdba

SQL> ALTER SESSION SET CONTAINER = PDB1;
Session altered.

SQL> SHUTDOWN IMMEDIATE

Which two are true? (Choose two.)
A. Uncommitted transactions in PDB1 have been rolled back.
B. PDB1 is closed.
C. Uncommitted transactions in CDB1 and PDB1 have been rolled back.
D. CDB1 is shut down.
E. CDB1 is in MOUNT state

[taotsumiau]
I had test this on my lab. the Answer should be AB

[you1234]
A & B is correct


//=============================================================================
// 39
//=============================================================================

Which three are true about Automatic Workload Repository (AWR), Automatic Database Diagnostic Monitor (ADDM), and the Manageability Monitor (MMON) background process? (Choose three.)
A. ADDM can recommend shrinking the buffer cache.
B. ADDM can recommend extending the buffer cache.
C. By default, MMON creates an AWR snapshot every 30 minutes.
D. ADDM performs its analysis only when a DBA requests it.
E. By default, AWR snapshots are automatically purged after eight days.
F. AWR snapshots must be deleted when no longer required by ADDM.

[taotsumiau]
BEF ??

[ald85]
ABE
F incorrect because AWR snapshots are deleted automatically.


//=============================================================================
// 40
//=============================================================================

Examine the command for creating pluggable database PDB2 in container database CDB2.

CREATE PLUGGABLE DATABASE pdb2
    ADMIN USER pdb2_adm
    IDENTIFIED BY 123pdb
    ROLES=(CONNECT);

Select three options, any one of which is required for it to execute successfully. (Choose three.)
A. Add the FILE_NAME_CONVERT clause to the statement and set the PDB_FILE_NAME_CONVERT parameter.
B. Add only the CREATE_FILE_DEST clause to the statement.
C. Set only the PDB_FILE_NAME_CONVERT parameter.
D. Set the PDB_FILE_NAME_CONVERT parameter and enable OMF.
E. Enable only OMF.
F. Add the FILE_NAME_CONVERT clause to the statement and enable Oracle Managed Files (OMF)

[veginha]
All are valid, but i think BCE is correct because you don't require the file_name_convert in option "A" just pdb_file_name_convert, don't need pdb_file_name_convert in "D" just omf, also don't require file_name_convert in option "F" just omf.
Any comment?

[julica]
I think only E is right:
Version 19.6.0.0.0
SQL> show parameter CREATE_FILE
NAME TYPE VALUE
------------------------------------ ----------- ------------------------------
db_create_file_dest string +DATA
SQL> show parameter file_name_convert
NAME TYPE VALUE
------------------------------------ ----------- ------------------------------
db_file_name_convert string
log_file_name_convert string
pdb_file_name_convert string
SQL>
SQL> create pluggable database pdb3 admin user pdb3_adm identified by welcome1 roles=(connect);
Pluggable database created.
SQL>
SQL> show pdbs
CON_ID CON_NAME OPEN MODE RESTRICTED
---------- ------------------------------ ---------- ----------
2 PDB$SEED READ ONLY YES
3 PDB1 READ WRITE YES
4 PDB2 READ WRITE YES
5 PDB3 MOUNTED
SQL>

[nyanyanyao0826]
Correct = ACE
B = CREATE~ must enable OMF
D,F = OMFdon't enable


//=============================================================================
// 41
//=============================================================================

Which two are true about Recovery Manager (RMAN) diagnostic message output? (Choose two.)
A. Media Management messages for SBT devices are always written to sbtio.log.
B. RMAN error stacks should be read from the bottom up as that is the order in which errors are generated.
C. RMAN error stacks should be read from the top down as that is the order in which errors are generated.
D. The RMAN LOG command line clause causes output issued during RMAN command compilation to be written to a log file and to standard output.
E. The RMAN LOG command line clause causes output issued during RMAN command compilation to be written to a log file only.
F. Media Management messages for SBT devices are written to an Oracle trace file.

[ald85]
I think BD. B sure that is correct, the other i doubt between D or F, any suggestion?

[logica]
D is incorrect, Rman's LOG parameter cause the output to be written to a log only

[ald85]
Finally BE. https://logic.edchen.org/3-ways-to-set-rman-log-location/

[logica]
I think B, D and F are correct

[you1234]
B & D is correct

[julica]
Correct are B and E:
[oracle@rac1 admin]$ rman target / log '/tmp/log.txt'
RMAN> list backup summary;
RMAN> exit
[oracle@rac1 admin]$ cat /tmp/log.txt
Recovery Manager: Release 19.0.0.0.0 - Production on Mon Jun 22 15:48:39 2020
Version 19.6.0.0.0
Copyright (c) 1982, 2019, Oracle and/or its affiliates. All rights reserved.
connected to target database: TST193 (DBID=1785824688)
RMAN>
using target database control file instead of recovery catalog
List of Backups
===============
Key TY LV S Device Type Completion Time #Pieces #Copies Compressed Tag
------- -- -- - ----------- --------------- ------- ------- ---------- ---
1 B F A DISK 15-JUN-20 1 1 NO TAG20200615T165352
2 B F A DISK 15-JUN-20 1 1 NO TAG20200615T174406
3 B F A DISK 22-JUN-20 1 1 NO TAG20200622T095655
4 B F A DISK 22-JUN-20 1 1 NO TAG20200622T095942
5 B F A DISK 22-JUN-20 1 1 NO TAG20200622T154703
RMAN>
Recovery Manager complete.


//=============================================================================
// 42
//=============================================================================

Which three are true about managing memory components in an Oracle database instance? (Choose three.)
A. With Automatic Shared Memory Management, the database instance can increase the Large Pool size by reducing the Shared Pool size.
B. With Automatic Memory Management, the database instance can increase the System Global Area size by reducing the Program Global Area size.
C. Automatically tuned and resized System Global Area components will always revert to their initial sizes after an instance restart.
D. Automatic Memory Management must be used together with locking the System Global Area into physical memory.
E. With Automatic Shared Memory Management, the database instance can increase the Program Global Area size by reducing the System Global Area size.
F. On Line Transaction Processing systems often use less Program Global Area than Decision Support Systems.

[veginha]
ABF
in AMM the instance exchanges memory between the SGA and the instance PGA as needed (B is correct)
In ASMM the instance automatically distributes this memory among the various SGA components (JUST SGA) (A is correct, E incorrect)
After a restart the instance return to the SGA values before the shutdown (not the initial values) (C incorrect)
https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-memory.html#GUID-8F54391B-D42A-4FDA-9D12-E1F81FD113EA
F is also correct:
For OLTP systems, the PGA memory typically makes up a small fraction of the available memory, leaving most of the remaining memory for the SGA.
For DSS systems running large, memory-intensive queries, PGA memory can typically use up to 70% of the available memory.
https://docs.oracle.com/database/121/TGDBA/tune_pga.htm#TGDBA472

[julica]
ABF is correct


//=============================================================================
// 43
//=============================================================================

A database is configured in ARCHIVELOG mode.
Full RMAN backups are taken and no backup to trace has been taken of the control file.
A media failure has occurred.
In which two scenarios is complete recovery possible? (Choose two.)
A. when any archived log from, before, or after the most recent backup is corrupt.
B. after losing all copies of the control file
C. after losing an archived log from after the most recent backup
D. after losing an archived log from before the most recent backup
E. after losing the SYSTEM tablespace

[veginha]
i think D and E are correct.
If you lose any archive from after the backup, you can't do a complete recovery, so A and C are discarted, also you can't mount the database if you don't have a valid control file. (not B)

[taotsumiau]
what if the questions is incomplete recovery, what do you think the answer?
I think C,D are correct, what's your idea?

[veginha]
well if the question was "incomplete recovery" then i think that you only need the control file and the backup, so it could be possible to do the incomplete recovery in A,C,D, and also E, fortunately they ask for the complete recovery scenario, so i'm going with D, E :)

[dacoben415lywenw]
DE, also B is correct.
Full backup includes controlfile even without CF copy so it can be restored from there...


//=============================================================================
// 44
//=============================================================================

Which three are true about Database Point-in-Time Recovery? (Choose three.)
A. The database must have FLASHBACK DATABASE ON to perform Database Point-in-Time Recovery.
B. The database must be in MOUNT state when performing Database Point-in-Time Recovery.
C. Database Point-in-Time Recovery is performed by the Managed Recovery Process (MRP)
D. The Database must be in ARCHIVELOG mode.
E. The target point for the recovery must be specified as a stime or System Change Number (SCN).
F. The database must be open RESETLOGS after Database Point-in-Time Recovery.

[veginha]
Response: B,D,F
Archivelog mode and mount state are needed (B, and D)
After the restore you need to open with reset logs (F)
E is discarted because sequence number also is valid
https://docs.oracle.com/cd/B19306_01/backup.102/b14192/flashptr006.htm#:~:text=Database%20point%2Din%2Dtime%20recovery%20(DBPITR)%20restores%20the,forward%20to%20the%20target%20time.

[taotsumiau]
Agree, BDF

[samm]
BDEF all 4 points are necessary to perform point in time recovery.
Tricky one :)
B. DB should be in mount mode
D. Must be archive log mode.
E. we need to specify SCN or Time to perform incomplete recovery
F. need to be open in resetlogs.


//=============================================================================
// 45
//=============================================================================

Which three are true about the SQL Tuning Advisor? (Choose three.)
A. It checks each query being analyzed for stale statistics.
B. It checks each query being analyzed for missing statistics.
C. It only recommends syntactic changes to SQL statements.
D. It can recommend semantic changes to SQL statements.
E. It considers all SQL statements being analyzed by the advisor task as a group.
F. It builds SQL profiles for each poorly performing SQL statement to prevent regressions.

[ald85]
I think ABD

[markwu01]
Agree with ABD

[veginha]
i think this is well answered, ABF

[klever35]
B and D

[marcinb32]
ABF
https://docs.oracle.com/en/database/oracle/oracle-database/18/tgsql/sql-tuning-advisor.html#GUID-6677340C-7DB3-4F0E-9921-46687E5EDC78


//=============================================================================
// 46
//=============================================================================

Which two are true about duplicating pluggable databases (PDBs) with RMAN? (Choose two.)
A. Two or more PDBs can be duplicated with the same RMAN DUPLICATE command.
B. All tablespaces belonging to a PDB must be duplicated when duplicating the PDB.
C. The auxiliary instance is automatically created with ENABLE_PLUGGABLE_DATABASE = TRUE.
D. A user with SYSDBA or SYSBACKUP must be logged in with RMAN to the PDB to duplicate it.
E. CDB$ROOT and PDB$SEED are automatically duplicated.

[ald85]
I think AF
B -> You can duplicate whole tablespaces
C -> To create the auxiliary instance you must start the instance with ENABLE_PLUGGABLE_DATABASE = TRUE. (not automatically)
D -> You must be logged in the CDB$ROOT not to the PDB.
C->

[veginha]
A and E are correct

[logica]
for me D E are correct

[klever35]
for me A B are correct

[marcinb32]
from me AE
https://docs.oracle.com/database/121/BRADV/rcmdupdb.htm#BRADV760

[taotsumiau]
Correct is AE
https://docs.oracle.com/en/database/oracle/oracle-database/19/bradv/rman-duplicating-databases.html#GUID-68742310-3B60-4246-9431-6671697AB516


//=============================================================================
// 47
//=============================================================================

Which two are true about Rapid Home Provisioning (RHP), which has been available since Orcale 18c? (Choose two.)
A. It is an Oracle Database service
B. It cannot be used to upgrade Oracle Database homes.
C. It can be used to provision applications.
D. It can be used to patch Grid Infrastructure homes containing Oracle Restart.
E. It can be used to provision middleware.


//=============================================================================
// 48
//=============================================================================

Examine this configuration:
1. CDB1 is a container database.
2. COMMON_USER_PREFIX is C##.
3. PDB1 is a pluggable database contained in CDB1.
4. APP1_ROOT is an application container contained in CDB1.
5. APP1_PDB1 is an application PDB contained in APP1_ROOT.
You execute these commands successfully:

$ sqlplus sys/oracle_4U@localhost:1521/cdb1 as sysdba

SQL> CREATE USER c##user1 identified by oracle_4U container=all;
User created.

SQL> ALTER SESSION SET CONTAINER=pdb1;
Session altered.

SQL> CREATE USER p1_user1 identified by pracle_4U;
User Created.

SQL> ALTER SESSION SET CONTAINER=app1_root;
Session altered.

SQL> ALTER PLUGGABLE DATABASE APPLICATION app1_cdb1_app BEGIN INSTALL '1.0';
Session altered.

SQL> CREATE USER app1_user1 IDENTIFIED BY oracle_4U;
User Created.

SQL> ALTER PLUGGABLE DATABASE APPLICATION app1_cdb1_app end INSTALL '1.0';
Pluggable database altered.

Which two are true? (Choose two.)
A. APP1_USER1 can be created in PDB1.
B. APP1_USER1 can be created in CDB1.
C. APP1_USER1 can have different privileges in each Application PDB contained in APP1_ROOT.
D. C##_APP_USER1 can be created in CDB1.
E. P1_USER1 can be created in CDB1.
F. C##_USER1 will have the same privileges and roles granted in all PDBs in CDB1.

[klever35]
for me E F are correct

[you1234]
its possible to create normal user in CDB? i think always we need create user like in CDB user C## prefix

[dacoben415lywenw]
ACD all should work.
E is not true, because of the prefix issue
others also are not true, which is checked on 19c

[marcinb32]
for me AD is correct.


//=============================================================================
// 49
//=============================================================================

Which two are facets of performance planning that should always be considered or implemented for an Oracle Database environment? (Choose two.)
A. defining primary keys for all tables to speed up all queries
B. using check constraints to speed up updates
C. defining foreign keys for all tables to speed up joins
D. the physical data model
E. the configuration of storage arrays

[klever35]
for sure C D is
correct

[julica]
What does it mean more exactly "the physical data model"? DB Block?
Better sounds the answer with "the configuration of storage arrays " than "the physical data model " :)


//=============================================================================
// 50
//=============================================================================

Which three actions are performed by Database Upgrade Assistant (DBUA)? (Choose three.)
A. It recompiles all stored PL/SQL code by using utlrp.sql.
B. It empties the RECYCLE BIN.
C. It performs prerequisite checks to verify if the Oracle database is ready for upgrade.
D. It sets all user tablespaces to "read-only" before starting the upgrade.
E. It removes the AUDSYS schema and the AUDIT_ADMIN and AUDIT_VIEWER roles
F. It increases tablespace size, if required, to meet upgrade requirements.

[taotsumiau]
I think the answer is ACF.... any comment?

[you1234]
F is correct
https://docs.oracle.com/database/121/UPGRD/upgrade.htm#UPGRD52728
3.2.2.1 Upgrade Scripts Invoked by DBUA
During the upgrade, DBUA automatically modifies or creates new required tablespaces and invokes the appropriate upgrade scripts.
ACF is correct.

[dacoben415lywenw]
F doesn't seem to be correct. i
In the same doc:
If there is not enough disk space to grow, then DBUA prompts you to create space (by adding more datafiles).
DBUA does not automatically add new datafiles because DBUA cannot determine where to create the files.

[GraceYu]
ABC
https://docs.oracle.com/en/database/oracle/oracle-database/12.2/upgrd/upgrading-oracle-database-upgrade-assistant-dbua.html#GUID-307DACD9-ECEE-4079-B767-B22620B99900
The Prerequisite Checks window opens.
DBUA analyzes the databases, performing pre-upgrade checks and displaying warnings as necessary.
The following is a list of examples of DBUA checks and actions DBUA performs on the database:
Empty database recycle bin.
Identify invalid objects.
Identify deprecated and desupported initialization parameters.
Identify time zone data file version.

[marcinb32]
ABC is correct
https://docs.oracle.com/en/database/oracle/oracle-database/12.2/upgrd/upgrading-oracle-database-upgrade-assistant-dbua.html#GUID-307DACD9-ECEE-4079-B767-B22620B99900


//=============================================================================
// 51
//=============================================================================

Which two are true about RMAN backups when using a media manager to write backups to tape when there are only two tape drives? (Choose two.)
A. SBT tape compression can be used even if no RMAN compression is configured.
B. Any backup set written to the SBT device in this configuration can contain a maximum of two backup pieces.
C. Any backup written to the SBT device in this configuration can contain a maximum of two backup sets.
D. SBT tape compression and RMAN backup compression should be used in parallel.
E. The SBT device should be configured to use PARALLELISM 2 to allow both tape drive to be used simultaneously.

[ald85]
I think BE

[ald85]
rectify... AE

[klever35]
I think A D

[mik8440p]
I think not D - "You should not use both tape compression provided by the media manager and binary compression provided by RMAN. If the media manager compression is efficient, then it is usually the better choice"
https://docs.oracle.com/cd/E11882_01/backup.112/e10642/rcmtunin.htm#BRADV90075


//=============================================================================
// 52
//=============================================================================

You plan to install Oracle Grid Infrastructure for a Standalone Server and Oracle Database for the first time on a server.
Examine this command and its outcome:

# id oracle
uid=54321 (oracle) gid=54321(oinstall) group=54321(oinstall), 54322(dba)

Which two are true? (Choose two.)
A. oracle will be an owner of the Oracle Inventory.
B. oracle must be the owner of every Oracle Database installation.
C. oracle can own an Oracle Database installation but not an Oracle Grid Infrastructure installation.
D. oracle will be granted the SYSASM privilege when installing the Oracle Database software.
E. The user account, oracle, and group, oinstall, can be used for all Oracle software installations.

[ald85]
I think A,D

[veginha]
I was thinking in A, C

[ald85]
c is incorrect -> oracle can own database and grid in an single-user installation, and this output oracle has dba and oinstall group.

[logica]
for sure C is incorrect and E is correct

[ald85]
You are right, SYSASM is in Grid installation not in Database Software. AE are correct.

[martinalexand]
A, E
D not:
The SYSASM Privilege for Administering Oracle ASM
SYSASM is a system privilege that enables the separation of the SYSDBA database administration privilege from the Oracle ASM storage administration privilege.
Access to the SYSASM privilege is granted by membership in an operating system group that is designated as the OSASM group.
This is similar to SYSDBA and SYSOPER privileges, which are system privileges granted through membership in the groups designated as the OSDBA and OSOPER operating system groups.
You can designate one group for all of these system privileges, or you can designate separate groups for each operating system privilege.


//=============================================================================
// 53
//=============================================================================

Examine this configuration:

1. CDB1 is container database running in ARCHIVELOG mode.
2. Controlfiles of CDB1 are multiplexed in
  '/u01/app/oracle/oradata/CDB1/controlfile/controlfile01.ctl' and
  '/u02/app/oracle/fast_recover_area/cdb1/CDB1/controlfile02.ctl'
3. The only backup of CDB1 was taken when CONTROLFILE AUTOBACKUP was OFF
4. SNAPSHOT CONTROLFILE NAME is
  '/u01/app/oracle/product/12.2.0.1/db_1/dbs/snapcf_cdb1.f'

While CDB1 is open, "˜/u02/app/oracle/fast_recover_area/cdb1/CDB1/controlfile02.ctl' is accidentally deleted.
To recover from this critical failure, you execute these commands:

$ rman target sys/oracle_4U@localhost:1521/cdb1

RMAN> SHUTDOWN ABORT
...
Oracle instance shut down

RMAN> STARTUP NOMOUNT

RMAN> RMAN RESTORE CONTROLFILE FROM
  '/u01/app/oracle/oradata/CDB1/controlfile/controlfile01.ctl';

What will be the outcome?
A. It will create "˜$ORACLE_HOME/dbs/cdb1/CDB1/controlfile02.ctl'
B. It will create "˜/u01/app/oralce/oradata/CDB1/controlfile/controlfile02.ctl'.
C. It will re-create "˜/u02/app/oracle/fast_recover_area/cdb1/CDB1/controlfile02.ctl'
D. It will create "˜/u01/app/oracle/product/12.2.0.1/db_1/dbs/snapcf_cdb1control02.ctl'.
E. It will fail because there is no autobackup of the controlfiles.

[klever35]
I think D

[dacoben415lywenw]
give it a try, and C will work for you

[taotsumiau]
Yes. C is working


//=============================================================================
// 54
//=============================================================================

Examine these actions:
1. Create a new database for a recovery catalog.
2. Create a tablespace with sufficient space in the catalog database for the recovery catalog.
3. Configure ARCHIVELOG mode for the catalog database.
4. Create a user to own the recovery catalog schema with quota on the tablespace that will contain the catalog.
5. Grant the RECOVERY_CATALOG_OWNER role to the recovery catalog schema owner.
6. Grant the SYSBACKUP privilege to the recovery catalog schema owner.
Which are the minimum actions that must be performed before executing the CREATE CATALOG command?
A. 2, 4, 5, 6
B. 1, 2, 3, 4, 5, 6
C. 1, 2, 4, 5
D. 2, 4, 5
E. 1, 3, 4, 5

[klever35]
Correct Answer E


//=============================================================================
// 55
//=============================================================================

Which two are true about creating pluggable databases (PDBs) using snapshots in Oracle 19c and later releases? (Choose two.)
A. A PDB snapshot is always a full copy of the source PDB.
B. A PDB snapshot is always a sparse copy of the source PDB.
C. A snapshot copy PDB depends on a storage snapshot which can only be stored on specific file systems.
D. A PDB snapshot depends on a storage snapshot which can be stored on any file system.
E. A PDB snapshot depends on a storage snapshot which can only be stored on specific file systems.
F. A snapshot copy PDB depends on a storage snapshot which can be stored on any file system.
G. A snapshot copy PDB can be created from a stand-alone clone PDB.

[veginha]
C, E? Anyone?

[taotsumiau]
I think A, E

[ald85]
I think CG http://ora-srv.wlv.ac.uk/oracle19c_doc/multi/introduction-to-the-multitenant-architecture.html#GUID-47847140-8DE4-4C4E-8C93-4E9C197D1402
A, B incorrects -> http://ora-srv.wlv.ac.uk/oracle19c_doc/multi/introduction-to-the-multitenant-architecture.html#GUID-47847140-8DE4-4C4E-8C93-4E9C197D1402
C correct, D,E,F incorrect -> https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/cloning-a-pdb.html#GUID-B00A0E48-C892-4DC8-8455-C6F2ABC8EF91
G -> correct -> A clone from a PDB snapshot is a full, standalone PDB. -> https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/cloning-a-pdb.html#GUID-22118625-3157-4C38-8A88-79A561A3E6ED

[klever35]
I think
B, E


//=============================================================================
// 56
//=============================================================================

Which two are true about Oracle Database Configuration Assistant (DBCA) templates? (Choose two.)
A. The General Purpose of Transaction Processing templates are most suitable when concurrency and recoverability are key criteria.
B. Oracle DBCA templates can store only logical structure and not database files.
C. New templates can only be created by modifying an existing user-created template.
D. The Data Warehouse template is most suitable when transaction response time is the key criterion.
E. Oracle DBCA templates can be used to create new databases and duplicate existing databases.

[klever35]
I think B E

[taotsumiau]
A&E are correct.
The new features are in Oracle 19c
https://docs.oracle.com/en/database/oracle/oracle-database/19/admqs/installing-oracle-database-creating-database.html#GUID-418CDFD6-340C-40B4-AC08-5005560ED9DC

[you1234]
Klever35,
have you attended the exam 1z0-083? Please suggest


//=============================================================================
// 57
//=============================================================================

Your SALES_ROOT application container has two application PDBs.
The SALES_APP application has a common table, FIN.REVENUE, in the two PDBs.
Examine this query and its output:

SELECT containers_default, container_map, table_name
  FROM dba_tables WHERE owner='FIN';

CONTAINERS_DEFAULT  CONTAINER_MAP  CONTAINER_MAO_OBJECT  TABLE_NAME 
------------------- -------------- --------------------- -----------
NO                  YES            NO                    REVENUE
NO                  NO             YES                   MAPTABLE

Which two are true? (Choose two.)
A. The CONTAINERS clause cannot be used in queries on the REVENUE table.
B. The REVENUE table must be a list-partitioned table.
C. The MAPTABLE tables defines a logical partition key on a commonly used column for the REVENUE table.
D. The MAPTABLE table is a metadata-linked table.
E. A container map exists for the REVENUE table, but is not enabled.
F. The REVENUE table partitions are not pruned across the PDBs automatically.

[veginha]
C and E
-Use a container map to partition the data in metadata-linked objects. Container maps partition data in application PDBs based on a commonly-used column.
-The map object is the partitioned table. The names of the partitions in the map table match the names of the application PDBs in the application container.
The metadata-linked object is not physically partitioned at the table level, but it can be queried using the partitioning strategy used by the container map.
-In addition, you can enable the CONTAINERS_DEFAULT attribute for a table or view in an application root. When this attribute is enabled, the CONTAINERS clause is used for queries and DML statements on the database object by default, and the CONTAINERS clause does not need to be specified in the SQL statements.
To enable the CONTAINERS_DEFAULT attribute for a table or view in an application root, run the an ALTER TABLE or ALTER VIEW statement with the ENABLE CONTAINERS_DEFAULT clause.
https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/administering-application-containers-with-sql-plus.html#GUID-AAF93A02-7C70-4024-8758-E351C213543E

[veginha]
i mean C and F

[dacoben415lywenw]
Seems D is also correct
SQL> select containers_default, container_map, container_map_object, table_name from DBA_TABLES where table_name='CONTAINERMAP';
CON CON CON
--- --- ---
TABLE_NAME
--------------------------------------------------------------------------------
NO NO YES
CONTAINERMAP
SQL> select SHARING from dba_objects where OBJECT_NAME='CONTAINERMAP' and OBJECT_TYPE='TABLE';
SHARING
------------------
METADATA LINK


//=============================================================================
// 58
//=============================================================================

Your container database, CDB1, has an application container, HR_ROOT, with an application PDB, HR_PDB1.
You have the required privilege to clone HR_PDB1 to container database CDB2, which does not contain HR_ROOT.
Which two are always true? (Choose two.)
A. CDB1 and CDB2 must be in shared undo mode.
B. A common user must exist in CDB2 with the CREATE PLUGGABLE DATABASE privilege.
C. All transactions in HR_PDB1 of CDB1 must commit before the cloning process starts.
D. Cloning HR_ROOT automatically clones HR_PDB1.
E. The HR_PDB1 clone created in CDB2 will be in mount state when cloning ends.

[veginha]
BE, but I'm not sure. Anyone know this?


//=============================================================================
// 59
//=============================================================================

Which three are true about backup, restore, and recovery operations done without using Recovery Manager (RMAN)? (Choose three.)
A. Backing up a database in NOARCHIVELOG mode using O/S utilities requires that the database instance be started and the dataabse be in the MOUNT state.
B. Backing up a database in ARCHIVELOG mode using O/S utilities requires that the database instance be started and the database be in MOUNT state.
C. An Oracle database can be restored from backup files copied using O/S utilities.
D. Oracle data file backups, copied using an O/S utility, can be added to the RMAN catalog as IMAGE COPIES.
E. Backing up a database in NOARCHIVELOG mode using O/S utilities requires that the database instance be shut down.
F. Oracle archive log backups, copied using an O/S utility, can be added to the RMAN catalog as a backup set.
G. Backing up a database in ARCHIVELOG mode using O/S utilities requires that the database instance be started and the database be in OPEN state.

[veginha]
CDE ?
C doesn't specified if the backup files where copied with the database closed.
i think A and B are incorrect, the database must be closed in order to do a backup with o/s utilities

[ald85]
ADG
A is correct, and E incorrect -> with NOARCHIVELOG must be in MOUNT state 
https://orahow.com/backup-oracle-database-in-noarchivelog-mode/
however with ARCHIVELOG must be OPEN, so that G is correct and B and is incorrect and D is correct too
https://docs.oracle.com/html/E10643_07/rcmsynta008.htm, I think C is incorrect.

[logica]
I think A B D are correct, in mount state the datafiles are closed, so you can take offline backups

[ald85]
ARCHIVELOG mode must be OPEN -> B is incorrect and G correct.

[julica]
A,B,G are not right because the question is telling us 'without RMAN'.
To put it in mount/open or so, are necessary only in case of using RMAN.
Otherwise, using OS Utils, DB must be closed or maximum in NOMOUNT state.

[mik8440p]
I think C,E,G is correct -
E - before mount you must shutdown
https://docs.oracle.com/en/database/oracle/oracle-database/19/bradv/user-managed-database-backups.html#GUID-65C5E03A-E906-47EB-92AF-6DC273DBD0A8
You can make a whole database backup if a database is operating in either ARCHIVELOG or NOARCHIVELOG mode.
If you run the database in NOARCHIVELOG mode, however, then the backup must be consistent; that is, you must shut down the database cleanly before the backup. "


//=============================================================================
// 60
//=============================================================================

Examine this configuration:
1. CDB1 is a container database.
2. PDB1 and PDB2 are pluggable databases in CDB1.
You execute these commands successfully:

$ export ORACLE_SID=cdb1

$sqlplus / as sysdba

SQL> SHUTDOWN IMMEDIATE
...
Oracle instance shut down.

SQL> STARTUP MOUNT
...
Database mounted.

Which two are true? (Choose two.)
A. PDB1 and PDB2 are in MOUNT state.
B. Redo logs are opened.
C. PDB1 and PDB2 are in READ ONLY state.
D. CDB$ROOT is in MOUNT state.
E. PDB$SEED is in READ ONLY state.

[ald85]
I think A, D are correct. When a CDB is mounted, the CBD root is mounted, which means that the control files are opened, as well as the PDBs.

[julica]
sure is A,D:
Version 19.6.0.0.0
SQL> show pdbs
CON_ID CON_NAME OPEN MODE RESTRICTED
---------- ------------------------------ ---------- ----------
2 PDB$SEED READ ONLY YES
3 PDB1 READ WRITE YES
4 PDB2 READ WRITE YES
5 PDB3 MOUNTED
SQL> shutdown immediate;
Database closed.
Database dismounted.
ORACLE instance shut down.
SQL> startup mount;
ORACLE instance started.
.
Database mounted.
SQL> show pdbs
CON_ID CON_NAME OPEN MODE RESTRICTED
---------- ------------------------------ ---------- ----------
2 PDB$SEED MOUNTED
3 PDB1 MOUNTED
4 PDB2 MOUNTED
5 PDB3 MOUNTED
SQL>

[marcinb32]
AD for sure


//=============================================================================
// 61
//=============================================================================

Which three are true about upgrading Oracle Grid Infrastructure? (Choose three.)
A. A direct upgrade can be performed only from the immediately preceding Oracle Grid Infrastructure version.
B. The newer version is installed in a separate Oracle Grid Infrastructure home on the same server as the existing version.
C. An existing Oracle base can be used.
D. The upgrade process will automatically install all mandatory patches for the current version of Oracle Grid Infrastructure.
E. Existing Oracle Database instances must be shut down before starting the upgrade.
F. Only the grid user can perform the upgrade.

[ald85]
I Think BCE
F is incorrect, grid OS system can be named anyway.
D patches won't be apply automatically
A Oracle Grid only supports out-of-place upgrades

[julica]
F is incorrect because in case of 'opatchauto', root is the user that can run the command.
So, I think B is right because is about new version, that means OutOfPlace Upgrade.
Upgrade can reuse an existing Oracle Base (C).
And E for sure, because (at the moment) GI needs DBs from that node to be down. (E).
So, most probably are B,C,E


//=============================================================================
// 62
//=============================================================================

A database is configured in ARCHIVELOG mode.
A full RMAN backup exists but no control file backup to trace has been taken.
A media failure has occurred.
In which two scenarios is incomplete recovery required? (Choose two.)
A. after losing a SYSAUX tablespace data file
B. after losing all members of an INACTIVE online redo log group
C. after losing all members of the CURRENT online redo log group
D. after losing all copies of the control file
E. after losing an UNDO tablespace that is in use

[veginha]
I think C and E

[you1234]
C & D is correct.
C &
D is correct because if you lose all control the required incomplete recovery. if incomplete recovery then db must be open in resetlog option.
E: undo tablespace. >> (Incorrect)
http://oracle-help.com/backup-and-recovery/recovery-recover-loss-system-critical-undo-tablespace-original-location/
D: (correct see the details)
http://oracle-help.com/backup-and-recovery/recovery-restore-loss-current-control-files-default-location/

[veginha]
You are right about the undo, and also the resetlog after restore the control file, but even in that case, you can do a complete recovery while you have all the redo and archives (check link)
..., I don't know which other option could be correct, so I suppose that "D" its the more accuracy.
https://web.stanford.edu/dept/itss/docs/oracle/10gR2/backup.102/b14191/rcmrecov003.htm

[taotsumiau]
I agreed C&D too!

[julica]
(E) Undo is used for rolling BW DB. And that is useful when you want to do PITR.
But in this case, UNDO does not have any role.
Incomplete recovery uses a backup to produce a noncurrent version of the database. In other words, you do not apply all of the redo records generated after the most recent backup.
You usually perform incomplete recovery of the whole database in the following situations:
Media failure destroys some or all of the online redo logs.
A user error causes data loss, for example, a user inadvertently drops a table.
You cannot perform complete recovery because an archived redo log is missing.
You lose your current control file and must use a backup control file to open the database.
In our case the qestion said there is not backup to trace for control file. So, exist a backup of CF included.
My opinion is C and D.


//=============================================================================
// 63
//=============================================================================

Which two are true about instance recovery? (Choose two.)
A. It is not possible if an archived log is missing.
B. It is performed automatically after the database is opened; however, blocks requiring recovery are not available until they are recovered.
C. Setting FAST_START_MTTR_TARGET to a lower value reduces instance recovery time by causing dirty buffers to be written to disk more frequently, thereby reducing the number of I/Os needed during instance recovery.
D. It is performed by the Recovery Writer (RVWR) background process.
E. Setting FAST_START_MTTR_TARGET to a higher value reduces instance recovery time by causing the log writer to write more frquently, thereby reducing the number of I/Os needed during instance recovery.
F. It is performed automatically while the database remains in MOUNT state. Then the database is opened.

[veginha]
CF are my choices

[ald85]
BC Instance recovey occurs when ALTER DATABASE OPEN not before.

[veginha]
well i'm not so sure about it:
You are right about the instance recovery begins after "alter database open" is executed but that doesn't mean that the database is already open when the recovery starts.
The instance recovery is executed in 2 steps, rollforward and rollback and the database is open just after the rollforward is completed.
So i think that is not accuracy to tell that the instance recovery is performed after the database is open.
What do you thik?
Here is a good diagram to understand it.
https://www.orskl.com/how-oracle-database-does-instance-recovery-after-failures/

[ald85]
Thanks you are correct ;)


//=============================================================================
// 64
//=============================================================================

Which two are true about Oracle Optimizer Statistics, their use, and their collection? (Choose two.)
A. The number of table rows is considered when evaluating the cost of accessing a table using an index.
B. Index balanced B*Tree height is considered when evaluating the cost of using an index.
C. The Statistics Advisor can help recommend the best way to gather statistics.
D. Statistics collected using DBMS_STATS always yield the best optimizer result.
E. The Statistics Advisor generates actions for all recommendations.

[veginha]
i believe this answer is right, CD, anyone thinks different?

[klever35]
answer A D

[dacoben415lywenw]
AC
obviously DBMS_STATS not always produce good statistics, especially with default options/prefs.
A is not quite accurate, since cost does depend on selectivity for predicates/filters, which in turn depends on row num

[veginha]
option A is not in the exam. There is another response, something about the space of the table ;)


//=============================================================================
// 65
//=============================================================================

A container database (CDB) contains two pluggable databases PDB1 and PDB2.
The LOCAL_UNDO_ENABLED database property is set to FALSE in the CDB.
Data file 24 of PDB2 was deleted and you need to restore and recover it.
The only RMAN backup that exists was created with the BACKUP DATABASE command while connected to CDB$ROOT.
Which three are true? (Choose three.)
A. Data file 24 can be recovered only while connected to PDB2.
B. Data file 24 can be restored and recovered while connected to CDB$ROOT.
C. Data file 24 can be restored only while connected to CDB$ROOT.
D. Data file 24 can be restored only while connected to PDB2.
E. Data file 24 can be recovered while connected to PDB2.
F. Data file 24 can be recovered while connected to CDB$ROOT.

[taotsumiau]
I had tested this one on my lab. The answer should be BCF..
Any comment?

[ald85]
BEF. The 'Only' word makes invalid the similar sentence.


//=============================================================================
// 66
//=============================================================================

Which two are true about data movement between a non-CDB and a PDB using Data Pump? (Choose two.)
A. Tablespaces are automatically created as neeed while importing full exports in either a non-CDB or a PDB.
B. Oracle attempts to convert conventional database users to local users when moving schemas from a non-CDB to a PDB.
C. A new PDB is automatically created when importing a non-CDB into a CDB.
D. Oracle attempts to convert common users to conventional users when moving schemas from a PDB to a non-CDB.
E. Moving data from a PDB to a non-CDB is only possible by using transportable tablespace export and import.
F. Moving data from a non-CDB to a PDB is only possible by using conventional export and import.

[ald85]
BD
E,F ->Incorrect -> tablespace export/import can be conventional or transportable
A,C -> Nothing is created automatically you must create what you need.

[veginha]
actually tablespaces can be created automatically with full exports, that's why parameters like REMAP_DATAFILE and REUSE_DATAFILES exist in impdp. (A)
https://docs.oracle.com/cd/B28359_01/server.111/b28319/dp_import.htm#i1010424
I think that B is incorrect since a database user and a local user is like the same, so no conversion is necessary.
And D seems to be correct since a common user must be converted, but it seems like always fails because of the "##" characters in the "create user c##common" command, so the REMAP_SCHEMA is needed.
https://docs.oracle.com/en/database/oracle/oracle-database/19/multi/using-database-utilities-in-a-cdb.html#GUID-C1578FB6-216F-473E-A6D5-18453D4F9021
What do you think?

[you1234]
ald85,
looks like question is from non-CDB to pdb? i doubt on D answer ?

[ald85]
The question says "a non-CDB and a PDB" not sense is specified.
it can be non-CBD to PDB or PDB to non-CBD. Which are the cases B and D.


//=============================================================================
// 67
//=============================================================================

Which three methods can be used for heap table data migration after upgrading a database? (Choose three.)
A. using Database Replay
B. using SQL Developer
C. using Oracle Data Pump
D. using operating system file copy utilities
E. using Database Upgrade Assistant
F. using the CREATE TABLE AS SELECT SQL statement

[veginha]
C,E and F are correct
Oracle provides features and products to automate the upgrade process and ensure the most efficient use of time.
Oracle Database supports the following methods for upgrading a database to the new release:
Database Upgrade Assistant (DBUA)
Manual upgrade using SQL scripts and utilities
Oracle Data Pump
CREATE TABLE AS SQL statement
https://docs.oracle.com/database/121/UPGRD/intro.htm#UPGRD60026

[dacoben415lywenw]
looks like table migration methods are asked here, not upgrade methods, should be BCF


//=============================================================================
// 68
//=============================================================================

Which two are true about Oracle instance recovery? (Choose three.)
A. Recovery begins from the beginning of the CURRENT redo log group.
B. Recovery begins from the last checkpoint position that was calculated by the Database Writer before instance failure.
C. Recovery begins from the start of any ACTIVE redo log group or the start of the CURRENT log group if no other group is ACTIVE.
D. Recovery reads redo until the end of the redo thread. SMON rolls back any dead transactions, and then the datanase is opened.
E. Recovery begins from the last checkpoint position that was recorded in the control file by the checkpoint process (CKPT).
F. Recovery reads redo until the end of the redo thread, and then opens the database. SMON then rolls back any dead transactions.

[ald85]
I think DE, any suggest?

[logica]
for me D E F are correct

[veginha]
.. AEF ? (D is incorrect, the database is opened before the rollback occurs)

[julica]
F is wrong. first SMON and after that open DB.
DE

[julica]
also wrong question: Which two ... (Choose three)... :) two or three?

[mik8440p]
C,D,E
C - look https://cutt.ly/6oHrBEH


//=============================================================================
// 69
//=============================================================================

Examine this configuration:
1. The ORCL database data files are in Automatic Storage Management (Oracle ASM) disk group +DATA.
2. ORCL uses disk group +FRA for the Fast Recovery Area.
3. LISTENER is the listener for ORCL.
4. The database, listener, ASM instance, and ASM disk groups are managed by Oracle Restart.
5. All components are currently shut down.
You execute this command:

$ srvctl start database -d ORCL

What is the outcome?
A. The ORCL database, the Oracle ASM instances, the +DATA and +FRA disk groups, and the LISTENER are started.
B. Only the ORCL database instance is started.
C. Only the ORCL database and the ASM instances are started.
D. Only the ORCL database instance, the Oracle ASM instance, and the +DATA and +FRA disk groups are started.
E. Only the ORCL database instance and the +DATA and +FRA disk groups are started.

[ald85]
A is correct -> The database, listener, ASM instance, and ASM disk groups are managed by Oracle Restart.

[julica]
it depends by dependencies.
but in this case is the default LISTENER and is necessary also for ASM.
in a default configuration also LISTENER is started.
So, the right answer is A.

[marcinb32]
A for sure


//=============================================================================
// 70
//=============================================================================

Which four are true about a Recovery Manager (RMAN) duplication without a TARGET connection? (Choose four.)
A. The NOREDO clause must be used if the backups of the database being duplicated were taken when the database was in NOARCHIVELOG mode.
B. The UNDO TABLESPACE clause is always required when no connection exists to the TARGET instance.
C. RMAN "pushes" the backups of the database to be duplicated over the network to the auxiliary instance.
D. The NOREDO clause can be used if the backups of the database being duplicated were taken when the database was in ARCHIVELOG mode.
E. RMAN SBT-based backups of the database to be duplicated can be used by the auxiliary instance.
F. The UNDO TABLESPACE clause is always required when no connection exists to the recovery catalog and the TARGET database is closed.
G. The UNDO TABLESPACE clause is always required when no connection exists to the recovery catalog and the TARGET database is opened.
H. RMAN disk-based backups of the database to be duplicated can be used by the auxiliary instance.

[ald85]
I Think ABCF
Reference: http://oradb-srv.wlv.ac.uk/ora12c/RCMRF/rcmsynta020.htm
Therefore, you must use the NOREDO option when the source database was in NOARCHIVELOG mode when the backups were taken.
UNDO TABLESPACE tablespace_name -> Specifies the names of the tablespaces with undo segments.
This option is only required when a subset of tablespaces are being duplicated with the SKIP TABLESPACE and TABLESPACE clauses.
You must provide the list of tablespaces with undo segments in the following cases:
No connection to the target database or the recovery catalog
No connection to a recovery catalog, a connection to the target but the target database is not open.
Active database duplication with image copies uses the auxiliary net service name to copy the source database over the network to the auxiliary instance on the destination host.
Conversely, in active database duplication with backup sets, the auxiliary instance uses the target instance net service name to retrieve the source database files over the network.
Backup-based duplication uses pre-existing RMAN backups and copies.

[dacoben415lywenw]
C is not accurate.
RMAN cannot push backups without a TARGET connection, if we are talkin about active duplicate

[GraceYu]
ABFH

H.
https://docs.oracle.com/en/database/oracle/oracle-database/19/rcmrf/DUPLICATE.html#GUID-E13D8A02-80F9-49A2-9C31-92DD3A795CE4
If you are using backup-based duplication, and if the source database and auxiliary instances reside on different hosts, then you must decide how to make the backups of the source database available to the auxiliary instance.
For more information on how to do this with BACKUP LOCATION, review the options described in "Oracle Database Backup and Recovery User’s Guide" .


//=============================================================================
// 71
//=============================================================================

Which three are true? (Choose three.)
A. Virtual Private Database (VPD) policies on objects in an application root are automatically synchronized with all application PDBs contained in the application container.
B. Application-common TSDP policies are always container specific.
C. Application-common Transparent Security Data Protection (TSDP) policies can be created only within an application install/patch BEGIN-END block.
D. Application-common Oracle Label Security (OLS) policies cannot be created in an application root outside an install/patch BEGIN-END block.
E. Fine-grained auditing (FGA) policies in an application root are automatically synchronized to all application PDBs contained in the application container.
F. Application-common OLS policies can be created in an application root inside an install/patch BEGIN-END block.
G. Unified auditing can be automatically synchronized to all application PDBs in an application container.

[taotsumiau]
Does this answer correct? I would thinking about ADG...
Any comment?

[ald85]
I think BDG -> A is incorrect because (VPD) policies on objects in an application root not are automatically synchronized
B -> correct because TSPD operations are container-specific


//=============================================================================
// 72
//=============================================================================

Which three are true about Automatic Workload Repository (AWR)? (Choose three.)
A. By default, AWR snapshots are taken every 60 minutes.
B. Its collection level is determined by the value of the STATISTICS_LEVEL database parameter.
C. By default, AWR snapshots are retained for 7 days.
D. The taking of AWR snapshots can be disabled.
E. AWR data is stored in the SYSTEM tablespace.

[klever35]
I have no observations.

[marcinb32]
I think ACD

[ald85]
C is incorrect -> By default, the Automatic Workload Repository (AWR) generates snapshots of performance data once every hour, and retains the statistics in the workload repository for 8 days.
https://docs.oracle.com/en/database/oracle/oracle-database/19/tdppt/automatic-database-performance-monitoring.html#GUID-8FFE01C9-57C9-4A5B-A410-108E99319DA0
The question is good corrected. -> ABD


//=============================================================================
// 73
//=============================================================================

Which two are true about automatic block repair? (Choose two.)
A. Automatic block repair can repair blocks with no standby database if DB_BLOCK_CHECKING = TRUE.
B. Real-Time Query must be enabled on a physical standby database for automatic block repair to be done on that physical standby database.
C. Real-Time Query must be enabled on a primary database for automatic block repair to be done on any of its physical standby databases.
D. It is not possible for media corrupt blocks.
E. Real-Time Query must be enabled on a physical standby database for automatic block repair to be done on its primary database.

[ald85]
BE -> In both cases to repair (Primary or Physical Databases) you must enable RTQ on the Physical Database.

[klever35]
I think
B D

[julica]
B,E....
Not D: Block media recovery is a technique for restoring and recovering corrupt data blocks while data files are online.
If only a few blocks are corrupt, then block media recovery may be preferable to data file media recovery.
For automatic block media recovery to work, a physical standby database must be in real-time query mode, which requires an Oracle Active Data Guard license


//=============================================================================
// 74
//=============================================================================

Oracle Managed Files (OMF) is enabled in a CDB and this command is successfully executed:

CREATE PLUGGALBE DATABASE app1
  AS APPLICATION CONTAINER
  ADMIN USER admin1 IDINTIFIED BY app_123 ROLES=(CONNECT);

Which three are true? (Choose three.)
A. Application PDBs that are subsequently created in the APP1 application container will be cloned from APP1$SEED.
B. An application seed PDB is created for APP1.
C. An application root PDB is created for APP1.
D. A default service is created for the application root APP1.
E. Application PDBs that are subsequently created in the APP1 application container will be cloned from PDB$SEED.
F. APP1 can never be unplugged.

[ald85]
CDE are correct
AB not APP1$SEED created because not uses AS SEED
F is incorrect -> If not have any PDBs plug to the APP container, you can unplug an APP container.


//=============================================================================
// 75
//=============================================================================

Which two are true about RMAN encryption? (Choose two.)
A. RMAN encryption keys are stored in a database keystore.
B. RMAN can encrypt the Oracle Database password file.
C. Dual-mode encrypted backups can be restored only if both the password and the keystore used for encryption are available.
D. The SET ENCRYPTION command overrides encryption settings specified by the CONFIGURE ENCRYPTION command.
E. Password encryption can be persistently configured using the CONFIGURE ENCRYPTION command.

[veginha]
AD (not sure about A)
-Password encryption cannot be persistently configured. (E is incorrect)
-Although the database depends on other types of files for operation, such as network configuration files, password files, and the contents of the Oracle home, these files cannot be backed up with RMAN (you can't even backup a password file, B incorrect)
-You can also use the SET ENCRYPTION command to perform the following actions:
Override the encryption settings specified by the CONFIGURE ENCRYPTION command. (D is correct)

[veginha]
-Dual-mode encrypted backups can be restored either transparently or by specifying a password. (C incorrect, you just need either password or wallet)
-Encrypted backups are decrypted automatically during restore and recovery, if the required decryption keys are available. Each backup set gets a separate key.
The key is stored in encrypted form in the backup piece. The backup is decrypted with keys obtained by a user-supplied password or the Oracle software keystore ( A is correct for TDE but not for password encryption, so I'm not sure about A)
Does anyone could clarify??
https://docs.oracle.com/en/database/oracle/oracle-database/19/bradv/configuring-rman-client-advanced.html#GUID-2210B194-FDA8-4BB4-BC1E-DBE7DBEACB4A
https://docs.oracle.com/cd/B19306_01/backup.102/b14192/bkup001.htm

[you1234]
C & D
c : (below description)
https://docs.oracle.com/database/121/BRADV/rcmconfa.htm#BRADV89457
If you forget or lose the password that you used to encrypt a dual-mode encrypted backup and you also lose your Oracle keystore, then you are unable to restore the backup.

[marcinb32]
c is incorrect
Dual mode encryption - This mode requires either the keystore or a password.
https://docs.oracle.com/en/database/oracle/oracle-database/18/bradv/configuring-rman-client-advanced.html#GUID-6ED708C7-1092-45FC-80C6-236F062D0DAC

[klever35]
I think A D

[mik8440p]
A,D
Not C, "When restoring a dual-mode encrypted backup, you can use either the Oracle keystore or a password for decryption."


//=============================================================================
// 76
//=============================================================================

Which three are true about performing an Oracle Database install on Linux? (Choose three.)
A. The runfixup.sh script can install missing RPMs.
B. The Oracle Preinstallation RPM must be used to configure the Oracle database installation owner, the Oracle Inventory group, and an Oracle administrative privileges group.
C. It allows you to select the languages supported by the Oracle database server.
D. It can be done before installing Grid Infrastructure for a Standalone Server.
E. The Oracle Preinstallation RPM can be used to configure the Oracle database installation owner, the Oracle Inventory group, and an Oracle administrative privileges group.
F. It can be done after installing Grid Infrastructure for a Standalone Server.
G. The Oracle database administrator must be granted access to the root operating system account to tun root privileged scripts.

[taotsumiau]
My answer is CEG.. any comments?

[ald85]
G is not correct, you can run scripts by passing credentials or directly in the OS by a root user, I think corrects are CEF

[monad2006]
i think .. DEF -- you can install grid and the the oracle software, otherwise you can also install oracle software before the gird and then register database with oracle restart.

[ald85]
Correct, C is incorrect, in 19c you can't select languages at installation.


//=============================================================================
// 77
//=============================================================================

Which three are true about Recovery Manager (RMAN) in Oracle Database 19c and later releases? (Choose three.)
A. It is only possible for RMAN to connect to a pluggable database as a target if an RMAN Virtual Private Catalog is used.
B. It is always possible for RMAN to connect to a pluggable database as a target if any RMAN Catalog is used.
C. A Virtual Private Catalog used to register a container database must be created in a pluggable database.
D. A Virtual Private Catalog used to register a container database can be created in a pluggable database.
E. It is always possible for RMAN to connect to a pluggable database as a target.
F. A Virtual Private Catalog used to register a container database can be created in a non-container database.

[veginha]
B is new feature of 19c so i think this is correct, even its says "always possible" that sounds tricky
Connections to a recovery catalog are supported when the target database is a pluggable database (PDB)
https://docs.oracle.com/en/database/oracle/oracle-database/19/newft/new-features.html#GUID-E2F2E0EE-D58B-4F9C-A7F8-301D9AEA34D8
And i don't know which others, i'm thinking in two of this (D, E, F)
Anyone could help?

[ald85]
I think DEF too

[klever35]
I have no other observations.


//=============================================================================
// 78
//=============================================================================

Which three are true in Oracle 19c and later releases? (Choose three.)
A. If the password file location changes, then the new location is used automatically by the Oracle Server.
B. Schema Only accounts can be granted administrator privileges.
C. All the Oracle-supplied accounts are Schema Only accounts.
D. Privilege Analysis is included in Oracle Enterprise Edition and no longer requires Database Vault.
E. Unified Auditing can be configured to audit only events that are issued indirectly by an audited user.
F. Unified Auditing can be configured to audit only events that are issued directly by an audited user.

[veginha]
BDF
You can grant administrative privileges, such as SYSOPER and SYSBACKUP, to schema-only (passwordless) accounts. (B correct)
-Privilege analysis is now available as part of Oracle Database Enterprise Edition. (D correct)
-The unified auditing top-level statements feature enables you to audit top-level user (direct user) activities in the database without collecting indirect user activity audit data. (F correct)
https://docs.oracle.com/en/database/oracle/oracle-database/19/newft/new-features.html

[marcinb32]
BDF is correct


//=============================================================================
// 79
//=============================================================================

You have configured RMAN SBT channels to write backups to media.
You then take an RMAN backup by using this command:

RMAN> BACKUP AS COMPRESSED BACKUPSET DATABASE
  KEEP UNTIL TIME 'SYSDATA + 730'
  RESTORE POINT 'OLD_CONFIGURATION';

Which three are true? (Choose three.)
A. The restore point is a label for the system change number (SCN) that will be saved two years after the archival backup was taken.
B. The data file backups in the self-contained archive backup are not considered obsolete for two years regardless of the retention policy.
C. All archive logs created after this backup are kept for two years.
D. The SPFILE is included in the self-contaied archival backup.
E. The control file is included in the self-contained archival backup.
F. The restore point is a label for the system change number (SCN) before the archival backup was taken.

[veginha]
B,D,E are correct
The restore point is a label for the SCN to which this archival backup can be restored and recovered , and is captured just after the data file backups complete. (F is wrong)
Normal restore points are retained in the database for at least the number of days specified for the CONTROL_FILE_RECORD_KEEP_TIME initialization parameter (A incorrect)
-The control file autobackup that RMAN automatically makes when you use the backup .. keep command has a copy of the restore point (and also the spfile D and E are correct)
KEEP - Specifies the backup as an archival backup, which is a self-contained backup that is exempt from the configured retention policy.
UNTIL TIME - Specifies the time until which the backup or copy must be kept (B correct)
https://docs.oracle.com/cd/E18283_01/server.112/e17118/statements_6011.htm
http://devel.hotpilot.cz/ora11gR2u2-full/backup.112/e10643/rcmsubcl011.htm
An example:
http://www.online-database.eu/recovery-manager-rman/143-rman-backupsets-with-restore-point


//=============================================================================
// 80
//=============================================================================

The USERS tablespace consists of data files 3 and 4 and must always be online in read/write mode.
Which two are true about using RMAN to perform an open database back up of this tablespace? (Choose two.)
A. Backups must be done incrementally.
B. Backups must be contained in backup sets.
C. Backups can be taken only if the database is in ARCHIVELOG mode.
D. Backups can be done incrementally.
E. The database must be registered in an RMAN catalog.
F. Only consistent backups can be created.

[AMT31]
C, D ?

[ald85]
I Think CD

[marcinb32]
must be CD


//=============================================================================
// 81
//=============================================================================

Which four are true about RMAN backup sets? (Choose four.)
A. A backup piece can belong to only one backup set.
B. A data file can be split into multiple sections stored in different backup sets.
C. A data file can be split into multiple sections stored in different backup pieces in the same backup set.
D. Blocks from multiple data files can be contained in one backup piece,
E. A backup set can contain only one backup piece.
F. A backup set must be written to media.
G. A backup set must be written to disk.
H. Blocks from multiple data files can be contained in one backup set,

[veginha]
ADEH seems correct to me

[ald85]
I Think ACEH (i think D and H are incompatible, I don't know)

[ald85]
You are correct. https://docs.oracle.com/cd/B28359_01/backup.111/b28270/rcmcncpt.htm#BRADV89486

[julica]
If you specify the SECTION SIZE parameter on the BACKUP command, then RMAN produces a multisection backup.
This is a backup of a single large file, produced by multiple channels in parallel, each of which produces one backup piece.
Each backup piece contains one file section of the file being backed up. (not C).
ADEH

[martinalexand]
A C D E (H not)


//=============================================================================
// 82
//=============================================================================

Which two are true about creating RMAN backups for an Oracle container database? (Choose two.)
A. Tablespaces from different PDBs with identical names must be backed up by connecting RMAN separately to each PDB to back up the tablespaces.
B. The BACKUP DATABASE command will create a pluggable database (PDB) backup when RMAN is connected to a PDB.
C. SPFILE backups can be created while connected to an application root PDB.
D. The BACKUP DATABASE PLUS ARCHIVELOG command will back up archive logs when RMAN is connected to a PDB.
E. The BACKUP PLUGGABLE DATABASE command can be used to back up CDB$ROOT.

[julica]
correct A,B

[klever35]
I thinnk B D

[taotsumiau]
correct A,B


//=============================================================================
// 83
//=============================================================================

Which three can be done using Oracle Database Configuration Assistant (DBCA) starting from Oracle Database 19c? (Choose three.)
A. cloning a remote container database in interactive mode
B. cloning a remote pluggable database in silent mode
C. relocating a remote pluggable database in interactive mode
D. relocating a remote container database in silent mode
E. cloning a remote container database in silent mode
F. relocating a remote pluggable database in silent mode
G. relocating a remote container database in interactive mode

[taotsumiau]
My answer is BEF.. any comment?

[veginha]
i agree, B is correct

[julica]
B,E,F are correct
$ORACLE_HOME/bin/dbca -silent \
-createDuplicateDB -gdbName CDB1 -sid CDB1B \
-createAsStandby -dbUniqueName CDB1B -sysPassword oracle \
-primaryDBConnectionString $(hostname):1521/CDB1A \
-datafileDestination /u01/oradata -useOMF true -storageType FS \
-recoveryAreaDestination /u01/fast_recovery_area \
-recoveryAreaSize 10240 -enableArchive true \
-createListener LISTENER1B:1522


//=============================================================================
// 84
//=============================================================================

Examine these queries and their output:

SQL> select pdb_nama, name, pdb_restore_point, clean_pdb_restore_point
  2  from v$restore_point natural join dba_rdbs;

PDB_NAME  NAME  PDB_RESTORE_POINT  CLEAN_PDB_RESTORE_POINT
--------- ----- ------------------ ------------------------
PDB1      R1    YES                NO

SQL> select propeyty_name, propeyty_value
  2  from database_properties where property_name like '%UNDO&';

PROPERTY_NAME       PROPERTY_VALUE
------------------- ---------------
LOCAL_UNDO_ENABLED  FALSE

An online RMAN backup of the CDB was taken an hour before Restore Point R1 was created.
You want to recover PDB1 to Restore Point R1.
How do you achieve this?
A. Execute FLASHBACK PLUGGABLE DATABASE PDB1 TO RESTORE POINT R1 by using RMAN while connected to PDB1.
B. Execute FLASHBACK PLUGGABLE DATABASE PDB1 TO RESTORE POINT R1 by using SQL while connected to PDB1.
C. Execute FLASHBACK PLUGGABLE DATABASE PDB1 TO RESTORE POINT R1 by using SQL while connected to CDB$ROOT.
D. Execute FLASHBACK PLUGGABLE DATABASE PDB1 TO RESTORE POINT R1 by using RMAN while connected to CDB$ROOT.
E. This cannot be done due to the lack of a clean restore point.

[ald85]
I think E
https://docs.oracle.com/en/database/oracle/oracle-database/12.2/sqlrf/FLASHBACK-DATABASE.html#GUID-BE0ACF9A-BC13-4810-B08B-33326440258B
PLUGGABLE
Specify PLUGGABLE to flash back a PDB. You must specify this clause whether the current container is the root or the PDB you want to flash back.
Restrictions on Flashing Back a PDB
You cannot flash back a proxy PDB.
If the CDB is in shared undo mode, then you can only flash back a PDB to a clean PDB restore point. Refer to the CLEAN clause of CREATE RESTOREPOINT for more information.


//=============================================================================
// 85
//=============================================================================

Which two are true about diagnosing Oracle Database failure situations using Data Recovery Advisor? (Choose two.)
A. Using the Data Recovery Advisor LIST FAILURE command always requires that the database for which failures are to be listed is in MOUNT state.
B. A failure can be closed only when it has been repaired.
C. Data Recovery Advisor can be used if a database is closed.
D. The Data Recovery Advisor CHANGE FAILURE command can be used only to change failure priorities.
E. Data Recovery Advisor can proactively check for failures.

[veginha]
change failure can be used to close a failure, does it count as a priority cahnge? or option D can be discarted?
option B i think is incorrect because you can close a failure even if you haven't solved it

[ald85]
I think CE

[monad2006]
I think CE also.

[taotsumiau]
Correct DE,
C- Data Recovery Advisor can be used if a database is closed. Not correct, DB should be no mount.


//=============================================================================
// 1
//=============================================================================

しきい値、メトリック、サーバー生成アラートについて正しい説明を3つ選択しなさい。

A. すべてのメトリックはインスタンスに関連付けられている。
B. クリアされたステートフルアラートは、DBA_ALERT_HISTORYコマンドを実行することで表示されます。
C. 空き領域のアラートは、根本的な問題が解決されると自動的にクリアされます。
D. テーブルスペースが97％満たされると、SMONによって生成されます。
E. メトリックは、特定のユニットの統計カウントです。
F. アラートを生成するには、STATISTICS_LEVELをALLに設定する必要があります。

ANSWER B, C, E


//=============================================================================
// 2
//=============================================================================

SBTチャネルへのバックアップ中に、圧縮されたRMAN増分レベル0バックアップの読み取りフェーズがボトルネックであると判断しました。
データベースでFORCE LOGGINGが有効になっています。
読み取りパフォーマンスを改善できるものとして正しい説明を2つ選択しなさい。

A. テープI/Oバッファーのサイズを増やします。
B. データベースのFORCE LOGGINGを無効にします。
C. データベースバッファキャッシュのサイズを増やします。
D. 非同期ディスクI/Oを有効にします。
E. RMAN多重化のレベルを上げます。

ANSWER D, E


//=============================================================================
// 3
//=============================================================================

CREATE PLUGGABLE DATABASEコマンドでUSER_TABLESPACE句を使用する要件として正しい説明を2つ選択しなさい。

A. 同じCDB内の別のPDBから複製されたPDB内のデフォルト表領域を指定します。
B. PDBに接続するときに、SYSTEM、SYSAUX、TEMP以外のすべての表領域を除外します。
C. PDBの再配置時にのみ特定のユーザー表領域を含めます。
D. 非CDBをPDBに移動するときに含めるユーザー表領域のリストを指定します。
E. PDBに接続するときに一時表領域を除外します。
F. CDBシードからPDBを作成するときに含める表領域のリストを指定します。

ANSEWR B, D?


//=============================================================================
// 4
//=============================================================================

さまざまなFLASHBACK操作の要件について正しい説明を3つ選択しなさい。

A. FLASHBACKトランザクションコマンドでは、2つの時点の間に存在していた行のすべてのバージョンを取得するために、UNDO情報が必要です。
B. FLASHBACKドロップでは、RECYCLEBINパラメータをONに設定する必要があります。
C. FLASHBACKバージョンコマンドでは、RECYCLEBINパラメータをONに設定する必要があります。
D. FLASHBACK DATA ARCHIVEは、追跡されているテーブルのすべての行のすべてのバージョンを保存するために、UNDO情報が必要です。
E. FLASHBACKドロップでは、2つの時点の間に存在していた行のすべてのバージョンを取得するために、UNDO情報が必要です。
F. FLASHBACKバージョンクエリでは、2つの時点の間に存在していた行のすべてのバージョンを取得するために、UNDO情報が必要です。

ANSWER A, B, F


//=============================================================================
// 5
//=============================================================================

Oracle Grid Infrastructure用のOracle Preinstallaiont RPM oracle-database-server-xxxx-preinstallによって実行される3つのアクションはどれですか。

A. Oracle Grid Infrastructureの最小構成要件が満たされていることを確認するためのチェックの実行。
B. Oracle OSユーザーの作成。
C. OSDBA（dba）グループの作成。
D. oraInventory（oinstall）グループの作成。
E. Grid OSユーザーの作成。
F. Oracle自動ストレージ管理共有ストレージ・アクセス用のOSの構成。

ANSWER B, C, D


//=============================================================================
// 6
//=============================================================================

共有オブジェクトについて正しい説明を2つ選択しなさい。

A. CDB$ROOTでのみ作成できます。
B. これらは、アプリケーションコンテナ内でのみメタデータにリンクできます。
C. これらは、アプリケーションコンテナ内のユーザー定義スキーマにのみ存在できます。
D. これらは、CDB$ROOTおよびアプリケーションルートに存在できます。
E. これらは、CDB$ROOTで拡張データリンクできます。
F. これらは、アプリケーションルートでのみ作成できます。

ANSWER D, F


//=============================================================================
// 7
//=============================================================================

自動データベース診断モニター（ADDM）について正しい説明を2つ選択しなさい。

A. 12時間のアクティビティに対応する期間を分析します。
B. 各AWRスナップショットの後に自動的に実行されます。
C. DBAは手動で実行できます。
D. 結果はアラートログに書き込まれます。
E. 前日の活動に対応する期間を分析します。

ANSWER B, C


//=============================================================================
// 8
//=============================================================================

サーバー生成アラートについて正しい説明を2つ選択しなさい。

A. 問題を解決した後、DBAがステートフルアラートを作成する必要があります。
B. ステートレスアラートは、アラート履歴から手動で削除できます。
C. ステートレスアラートは手動でクリアできます。
D. ステートレスアラートは自動的にクリアされます。
E. ステートフルアラートは、アラート履歴から自動的に削除されます。

ANSWER B, C


//=============================================================================
// 9
//=============================================================================

環境変数を使用して配置されているものとして正しい説明を3つ選択しなさい。

A. Oracleソフトウェアおよび構成ファイルを格納するためのOptimal Flexible Architecture（OFA）準拠のパス。
B. Oracle Net Services構成ファイルの場所。
C. 起動時にOracle自動ストレージ管理（ASM）インスタンスによってマウントされるディスク・グループ名のリスト。
D. 一時テーブルスペースで使用される一時ファイルのデフォルトディレクトリ。
E. インストール中にOracle Installerによって使用される一時ディスク領域。
F. データベースインスタンスで開くことができるデータベースファイルの最大数。

ANSWER A, B, E


//=============================================================================
// 10
//=============================================================================

OPatchAutoについて正しい説明を3つ選択しなさい。

A. パッチ適用プロセス中に、Oracle Grid InfrastructureとOracle Databaseホームの両方のすべてのプロセスのシャットダウンおよび再起動が実行されます。
B. rootユーザー権限を持つユーザーが呼び出す必要があります。
C. パッチはopatchautoを介して適用されます。
D. ユーザーは常にパッチプランをopatchautoに入力する必要があります。
E. Oracle Grid InfrastructureおよびOracle Databaseインスタンスを起動する前に停止する必要があります。
F. デフォルトでは、非ローリングモードでパッチを適用します。
G. これは、Oracle Grid InfrastructureとOracle Databaseホームの組合せに個別パッチを適用するために使用されます。

ANSWER A, B, G, C?


//=============================================================================
// 11
//=============================================================================

Oracleデータベースで使用される文字セットについて正しい説明を2つ選択しなさい。

A. シングルバイト文字セットは、マルチバイト文字セットよりも優れたパフォーマンスを提供します。
B. Unicodeでは、任意の言語の情報を単一の文字セットを使用して格納できます。
C. Unicodeは、Database Configuration Assistant（DBCA）を使用して作成されたOracleデータベースでサポートされる唯一の文字セットです。
D. シングルバイト文字セットは常に7ビットのコード化スキームを使用します。
E. マルチバイト文字セットを使用すると、シングルバイト文字セットよりもスペースを効率的に使用できます。
F. シングルバイト文字セットは常に8ビットのコード化スキームを使用します。

ANSWER A, B


//=============================================================================
// 12
//=============================================================================

セッションとサービスのモニタリング待機について正しい説明を3つ選択しなさい。

A. V$SESSION_EVENTは、セッションで少なくとも1回待機が発生した場合、過去および既存のすべてのセッションの待機をすべて表示する
B. V$SERVICE_EVENTは、サービスに対して少なくとも1回待機が発生した場合、すべてのサービスのすべての待機を表示する
C. V$SESSION_WAIT_CLASSは、待機中のセッションについてのみ、待機クラスごとに分類された待機を表示する
D. V$SESSION_WAITとV$SESSIONの両方に、待機していないセッションが最後に待機したイベントの詳細が含まれている
E. V$SESSION_EVENTは、セッションで少なくとも1回待機が発生した場合、過去のすべてのセッションの待機をすべて表示する
F. V$SESSION_WAITとV$SESSIONの両方に、セッションが現在待機しているイベントの詳細が含まれている

ANSWER B, C, F


//=============================================================================
// 13
//=============================================================================

UNIVERSITYテーブルスペースを1つのデータベースから別のデータベースに転送する必要があります。
UNIVERSITYテーブルスペースは現在読み取り/書き込みで開いています。
ソースと宛先のプラットフォームでは、エンディアン形式が異なります。
このアクションのリストを調べます。

1. ソースシステムでUNIVERSITYテーブルスペースを読み取り専用にします。
2. EXPDPを使用してUNIVERSITYテーブルスペースメタデータをエクスポートします。
3. ソースシステムでRMANを使用して、UNIVERSITYテーブルスペースデータファイルを宛先プラットフォームフォーマットに変換します。
4. UNIVERSITYテーブルスペースデータファイルを宛先システムにコピーします。
5. Data Pumpダンプ・セットを宛先システムにコピーします。
6. 宛先システムでRMANを使用して、UNIVERSITYテーブルスペースデータファイルを宛先プラットフォーム形式に変換します。
7. IMPDPを使用してUNIVERSITYテーブルスペースメタデータをインポートします。
8. 宛先システムでUNIVERSITYテーブルスペースを読み取り/書き込み可能にします。

UNIVERSITYテーブルスペースをトランスポートするために必要なアクションの最小数は、正しい順序でどれですか。

A. 1, 2, 4, 5, 7, 8
B. 1, 2, 4, 6, 7, 8
C. 1, 2, 3, 4, 5, 7, 8
D. 1, 2, 3, 4, 5, 6, 7, 8
E. 2, 4, 5, 6, 7

ANSWER C


//=============================================================================
// 14
//=============================================================================

Oracle Grid InfrastructureとOracle Relational Database Management System（RDBMS）のOSグループとユーザーについて正しい説明を2つ選択しなさい。

A. デフォルトでは、OSASMグループのメンバーは自動ストレージ管理およびRDBMSインスタンスにアクセスできます。
B. Oracle Grid InfrastructureおよびOracle Databaseの所有者のプライマリ・グループは、Oracle Inventoryグループである必要があります。
C. Oracle Grid Infrastructureインストールは、グリッド・ユーザーが所有する必要があります。
D. Oracle Grid Infrastructureの所有者は、Oracle RestartおよびOracle自動ストレージ管理バイナリを所有しています。
E. Oracle Grid Infrastructureの所有者は、セカンダリグループとしてOSOPER、OSBACKUPDBA、およびOSKMDBAを持っている必要があります。
F. 自動ストレージ管理とOracleデータベースには同じOSDBAグループを使用する必要があります。

ANSWER B, D


//=============================================================================
// 15
//=============================================================================

Recovery Manager（RMAN）を使用したデータベースの複製について正しい説明を4つ選択しなさい。

A. 複製は、補助データベースインスタンスがターゲットデータベースインスタンスからバックアップセットをプルすることで実行できます。
B. 補助インスタンスへの接続は常に必要です。
C. ターゲットデータベースのサブセットを複製できます。
D. 複製されたデータベースには、常に新しいDBIDが作成されます。
E. リカバリカタログインスタンスへの接続は常に必要です。
F. ターゲットデータベースのバックアップは常に必要です。
G. 複製は、ターゲットデータベースインスタンスがコピーを補助データベースインスタンスにプッシュさせることで実行できます。
H. ターゲットデータベースインスタンスへの接続は常に必要です。

ANSWER A, B, C, G


//=============================================================================
// 16
//=============================================================================

CDB1と呼ばれるコンテナーデータベースはOMF対応です。
PDB_FILE_NAME_CONVERTパラメータはCDB1で構成されていません。
PDB1は、週の初めにCDB1から切り離されました。
CDB1で実行されるこのコマンドを調べます。

SQL> CREATE PLUGGABLE DATABASE pdb1 USING "/u01/app/oracle/oradata/pdb1.xml"
  2  SOURCE_FILE_NAME_CONVERT = ("/u01/app/oracle/oradata/", "/u02/app/oracle/oradata/");

正しい説明を2つ選択しなさい。

A. PDB1データファイルはすでに正しい場所に存在しています。
B. コマンドを実行する前に、DBMS_PDB.CHECK_PLUG_COMPATIBILITYをCDB1で実行する必要があります。
C. コマンドを実行する前に、PDB_FILE_NAME_CONVERTを設定する必要があります。
D. "/u01/app/oracle/oradata/pdb1.xml"には、PDB1のデータファイルの現在の場所が含まれていません。
E. PDB1はCDB1から削除する必要があります。

ANSWER D, E


//=============================================================================
// 17
//=============================================================================

Recovery Manager（RMAN）のイメージコピーを使用してプラットフォーム間でデータベースを転送することについて正しい説明を3つ選択しなさい。

A. デフォルトでは、転送されたデータベースはOracle Managed Files（OMF）を使用します。
B. データファイルは宛先システムで変換できます。
C. データファイルはソースシステムで変換できます。
D. 転送されたデータベース用に新しいDBIDが自動的に作成されます。
E. データベースは、エンディアン形式が異なるシステム間で転送できます。
F. パスワードファイルはRMANによって自動的に変換されます。

ANSWER B, C, E


//=============================================================================
// 18
//=============================================================================

このコマンドについて調べます。

$ rhpctl move database -sourcehome Oracle_home_path -destinationhome Oracle_home_path

このコマンドを使用する目的として正しい説明を2つ選択しなさい。

A. 既存のOracle Databaseホームを同じサーバー上のOracleソフトウェアの新しいリリースに切り替える。
B. 読み取り専用のOracleホームに切り替える。
C. ロールバック操作の一部として前のOracleホームに戻る。
D. 集中型Rapid Home Provisioningサーバーを使用しているときにOracle Databaseホームを切り替える。
E. パッチが適用されたOracle Databaseホームに切り替える。

ANSWER C, E


//=============================================================================
// 19
//=============================================================================

CDBでLOCAL_UNDO_ENABLEDプロパティをfalseに変更することについて正しい説明を2つ選択しなさい。

A. 変更後、必要な権限を持つ共通ユーザーのみが、CDB＆ROOTにUNDO表領域を作成できます。
B. 新しいPDBと既存のPDBは、CDB$ROOTのデフォルトのUNDO表領域を使用するように自動的に構成されます。
C. 変更後、CDB$ROOTに存在できるUNDO表領域は1つだけです。
D. 変更後、必要な権限を持つすべてのユーザーがPDBにUNDO表領域を作成できます。
E. PDBに存在するUNDO表領域は、変更前に削除する必要があります。
F. 変更後、新しいUNDOモードを有効にするには、既存の各PDBを再度開く必要があります。

ANSWER A, B


//=============================================================================
// 20
//=============================================================================

SQL Performance Analyzerについて正しい説明を2つ選択しなさい。

A. SQL Access Advisorと統合されています。
B. SQLワークロードの応答時間に対するシステム変更の影響を予測します。
C. 分析タスクの各SQLステートメントの実行前後の統計を提供します。
D. 分析タスク内のすべてのSQLステートメントをグループとして詳細に分析できます。
E. 最初に同時に実行されたSQLステートメントは、SPAによって同時に実行されます。

ANSWER B, C


//=============================================================================
// 21
//=============================================================================

ユーザーがデータベースのパフォーマンスの低下について不満を言っています。
ユーザーのセッションが特定のタイプのI/Oアクティビティを待機しているかどうかを確認したいとします。
セッションで少なくとも1回待機したすべての待機を表示するビューはどれですか？

A. V$SESSION_EVENT
B. V$SESSTAT
C. V$SESSION_WAIT
D. V$SESSION_WAIT_CLASS
E. V$SESSION

ANSWER A


//=============================================================================
// 22
//=============================================================================

オプティマイザ統計の収集に関して正しい説明を2つ選択しなさい。

A. CDB$ROOTに接続しているときにDBMS_STATS.GATHER_DATABASE_STATSを実行すると、PDB$SEEDを除くすべての開いているPDBのオブジェクト統計が収集されます。
B. 読み取り/書き込みモードで開かれたPDBに接続されている間にDBMS_STATS.GATHER_DATABASE_STATSを実行すると、そのPDBのオブジェクト統計が収集されます。
C. CDB$ROOTに接続している間にDBMS_STATS.GATHER_DATABASE_STATSを実行すると、CDB$ROOT内のオブジェクト統計のみが収集されます。
D. システム統計は、CDB$ROOTに接続している間のみ収集できます。
E. CDB$ROOTに接続しているときにDBMS_STATS.GATHER_DATABASE_STATSを実行すると、開いているすべてのプラガブルデータベース（PDB）のオブジェクト統計が収集されます。

ANSWER B, C


//=============================================================================
// 23
//=============================================================================

このコマンドについて調べます。

SQL> select pluggable_database, shares, parallel_server_limit
  2  from dba_cdb_rsrc_plan_directives where plan = 'MY_PLAN'
  3  order by pluggable_database;

PLUGGABLE_DATABASE         SHARES    PARALLEL_SERVER_LIMIT
-------------------------- --------- -------------------------
ORA$AUTOTASK                                              100
ORA$DEFAULT_PDB_DIRECTIVE         1                         0
PDB1                              2                       100
PDB2                              2                        25
PDB3                              1

SQL> select name, value from v$parameter
  2  where name = 'resource_manager_plan';

NAME                   VALUE
---------------------- --------
resource_manager_plan  MY_PLAN

正しい説明を2つ選択しなさい。

A. プランで指定されていないPDBは、ステートメントを並行して実行できません。
B. PDB3は、利用可能なすべての並列実行プロセスを時々使用できます。
C. PDB1は、需要に関係なく、常に利用可能なシステムリソースの40％に制限されています。
D. プランで指定されていないPDBは、使用可能なシステムリソースの最大16.5％を使用できます。
E. PDB3は、十分な需要がある場合、利用可能なシステムリソースの少なくとも20％を受け取ることが保証されています。
F. PDB2は、十分な需要がある場合、使用可能な並列実行プロセスの少なくとも25％が保証されています。

ANSWER B, E


//=============================================================================
// 24
//=============================================================================

Oracle Database 19c以降のオペレーティングシステムスクリプトの実行について正しい説明を2つ選択しなさい。

A. orainstRoot.shは、sudoまたはroot資格情報を使用して、データベースインストーラーによって自動的に実行できます。
B. root.shは、root資格情報が提供されている場合にのみ、データベースインストーラーによって自動的に実行できます。
C. sudoパスワードは、レスポンスファイルで指定できます。
D. root.shは、sudo資格情報を使用することによってのみ、データベースインストーラーによって自動的に実行できます。
E. sudoパスワードは、レスポンスファイルで指定する必要があります。
F. rootパスワードをレスポンスファイルで指定することはできません。

ANSWER A, F


//=============================================================================
// 25
//=============================================================================

自動共有メモリ管理は、データベースインスタンスの1つに対して無効になっています。
一部のSQLステートメントは、過度のハード解析アクティビティが原因でパフォーマンスが低下し、パフォーマンスが低下します。
次のすべき行動として正しいものを選択しなさい。

A. SQLアクセスアドバイザを実行します。
B. 共有プールのメモリアドバイザを実行します。
C. SQLチューニングアドバイザを実行します。
D. PGAのメモリアドバイザーを実行します。
E. SGAのメモリアドバイザーを実行します。

ANSWER B



//=============================================================================
// 26
//=============================================================================

Oracle Database 19c以降のリリースのフラッシュバック機能について正しい説明を2つ選択しなさい。

A. フラッシュバックログは、DB_FLASHBACK_RETENTION_TARGETがすでに保持されている時間よりも低く設定されると、自動的にパージされます。
B. フラッシュバックログは監視され、DB_FLASHBACK_RETENTION_TARGETで定義された保持期間を過ぎると、領域の圧迫があった場合にのみ、事前に削除されます。
C. フラッシュバックログは監視され、DB_FLASHBACK_RETENTION_TARGETで定義された保存期間を過ぎると、領域の圧迫が発生する前に事前に削除されます。
D. フラッシュバックログは、DB_FLASHBACK_RETENTION_TARGETで定義された保持期間よりも古いものとして監視され、管理者が作成したイベントトリガーによって削除できます。
E. フラッシュバックログは、DB_FLASHBACK_RETENTION_TARGETの値が変更されるたびに自動的にパージされます。

ANSWER A, B


//=============================================================================
// 27
//=============================================================================

これらのクエリとその出力を調べます。

SQL> select log_mode from v$database;

LOG_MODE
-----------
ARCHIVELOG

SQL> select property_name, property_value
  2  from database_properties where property_name like '%UNDO%';

PROPERTY_NAME       PROPERTY_NAME
------------------- --------------
LOCAL_UNDO_ENABLED  FALSE

SQL> select p.name, f.file#, t.name
  2  from v$containers p, v$datafile f, v$tablespace t
  3  where p.con_if=f.con_id
  4  and p.con_id=t.con_id
  5  and t.ts#=f.ts#
  6  order by 1, 2;

NAME      FILE#   NAME
--------- ------- -------------
CDB$ROOT       1  SYSTEM
...
PDB1          24  SYSTEM
...
PDB2          16  SYSTEM

システムがクラッシュした後、インスタンスが再起動し、PDBを開こうとした結果、次のようになりました。

SQL> startup quiet
ORACLE instance started.
Database mounted.
Database opened.
SQL> alter pluggable database all open;
alter pluggable database all open;
*
ERROR at line 1:
ORA-01157: cannot identify/lock data file 24 - see DBWR trace file
ORA-01110: data file 24:
'/u01/oradata/V122CDB1/516000726D464D04E054000C29704164/datafile/o1_mf_system_dmj30kld_.dbf'

正しい説明を2つ選択しなさい。
A. データファイル24は、PDB2が開いている間に回復できます。
B. データファイル24は、CDBが開いている間に回復する必要があります。
C. データファイル24は、CDB$ROOTおよびPDB$SEEDが開いている間に回復できます。
D. CDBが開いている間は、データファイル24を復元できません。
E. データファイル24は、PDB2が閉じている間に回復する必要があります。

ANSWER A, B

	
//=============================================================================
// 28
//=============================================================================

RMANの二重化バックアップセットについて正しい説明を2つ選択しなさい。

A. 二重化されたバックアップセットは、同じ数のファイルに対して、二重化されていないバックアップセットと同じ数のSBTチャネルを使用します。
B. ディスクに書き込まれた非二重化バックアップセットは、すでにディスク上にあるバックアップセットをバックアップすることにより、ディスクに二重化できます。
C. SBTに書き込まれた二重化されていないバックアップセットは、すでにテープ上にあるバックアップセットをバックアップすることにより、テープに二重化できます。
D. ディスクに書き込まれた非二重化バックアップセットは、すでにディスク上にあるバックアップセットをバックアップすることにより、テープに二重化できます。
E. SBTに書き込まれた非二重化バックアップセットは、すでにテープ上にあるバックアップセットをバックアップすることにより、ディスクに二重化できます。
F. 二重化されたバックアップセットは、同じ数のファイルに対して、常に二重化されていないバックアップセットの2倍のSBTチャネルを使用します。

ANSWER B, D


//=============================================================================
// 29
//=============================================================================

RMANの永続的な構成設定、管理、およびそれらの影響について正しい説明を3つ選択しなさい。

A. ターゲットデータベースの永続的なRMAN構成設定は常にターゲットの制御ファイルに格納されます。
B. バックアップ場所に十分なスペースがない場合、リカバリ期間の保存ポリシーより古いバックアップは常に自動的に削除されます。
C. 冗長性保持ポリシーに基づいたobosleteである高速リカバリ領域（FRA）に書き込まれたバックアップは、自動的に削除してスペースを解放できます。
D. RMAN SHOW ALLコマンドは、デフォルト値以外の設定のみを表示します。
E. ターゲットデータベースの永続的なRMAN構成設定は、常にRMANカタログと自動的に同期されます。
F. V$RMAN_CONFIGURATIONビューには、値が変更された設定のみが表示されます。
G. DBAは、冗長性保持ポリシーまたはリカバリウィンドウ保持ポリシーを指定する必要があります。

ANSWER A, C, F


//=============================================================================
// 30
//=============================================================================

オプティマイザ統計アドバイザーについて正しい説明を3つ選択しなさい。

A. 手動でのみ実行できます。
B. これは、DBMS_ADVISORパッケージの一部です。
C. 統計収集プロセスを改善するために変更を推奨できます。
D. 常にデータベース内のすべてのスキーマを分析します。
E. デフォルトでは毎晩自動的に実行されます。
F. これは、DBMS_STATSパッケージの一部です。
 
ANSWER C, E, F


//=============================================================================
// 31
//=============================================================================

このコマンドについて調べます。

RMAN> BACKUP RECOVERY FILES;

正しい説明を2つ選択しなさい。

A. 現在のFRAに含まれておらず、まだバックアップされていないすべてのOracleリカバリファイルがバックアップされます。
B. まだバックアップされていない、現在のFRA内のすべてのOracle以外のファイルがバックアップされます。
C. まだバックアップされていない、現在のFRA内のすべてのOracleリカバリファイルがバックアップされます。
D. 現在の高速リカバリ領域（FRA）内のすべてのOracleリカバリファイルがバックアップされます。
E. これらのバックアップは、ディスクまたはSBTに書き込むことができます。

ANSWER A, C


//=============================================================================
// 32
//=============================================================================

Which two are true about the Oracle dataabse methodology? (Choose two.)

racle dataabse方法論について正しい説明を2つ選択しなさい。

A. Oracle Databaseの時間モデルを使用して、チューニングが最も必要なデータベースとインスタンスの領域を見つける必要があります。
B. ユーザーがパフォーマンスに満足したら、チューニングアクティビティを停止する必要があります。
C. パフォーマンスに関する合意されたサービスレベルに達したら、チューニングアクティビティを停止する必要があります。
D. ファイルシステムを調整する前に、データベースインスタンスのメモリを常に調整する必要があります。
E. ファイルシステムを調整する前に、SQLステートメントを常に調整する必要があります。
F. アラートログは、チューニングが最も必要なデータベースとインスタンスの領域を見つけるために使用する必要があります。

ANSWER A, F


//=============================================================================
// 33
//=============================================================================

Oracle Fast Recovery Area（FRA）にバックアップしているときに、バックアップに時間がかかりすぎてパフォーマンスのボトルネックが疑われます。
これらの問題の診断と調整について正しい説明を3つ選択しなさい。

A. RMAN BACKUP VALIDATEコマンドに実際のバックアップとほぼ同じ時間がかかる場合は、読み取りと書き込みの両方のI/Oがボトルネックになっている可能性があります。
B. DBWR_IO_SLAVESをゼロ以外の値に設定すると、同期I/Oを使用するときのバックアップパフォーマンスが向上します。
C. RMAN BACKUP VALIDATEコマンドの実行時間が実際のバックアップよりも著しく少ない場合は、書き込みI/Oがボトルネックになっている可能性があります。
D. RMAN BACKUP VALIDATEコマンドに実際のバックアップとほぼ同じ時間がかかる場合は、読み取りI/Oがボトルネックになっている可能性があります。
E. V$BACKUP_SYNC_IO.DISCRETE_BYTES_PER_SECONDの値が高いデータファイルは、同期I/Oを使用するときにパフォーマンスのボトルネックになる可能性があります。
F. DBWR_IO_SLAVESをゼロ以外の値に設定すると、非同期I/Oを使用するときのバックアップパフォーマンスが向上します。
G. V$BACKUP_ASYNC_IO.SHORT_WAITSの値が高いデータファイルは、非同期I/Oを使用するときにパフォーマンスのボトルネックになる可能性があります。

ANSWER B, C, G


//=============================================================================
// 34
//=============================================================================

あなたはこの構成を管理しています。

1. CDB1はコンテナーデータベースです。
2. PDB1とPDB2は、CDB1内のプラガブルデータベースです。
3. USER1.EMPはPDB1のテーブルで、USER2.DEPTはPDB2のテーブルです。

CDB1ユーザーSYSは、PDB2に正常に接続した後で、次のコマンドを実行しました。

SQL> ALTER SESSION SET CONTAINER=pdb1;
Session altered.

SQL> INSERT INTO user1.emp VALUES(100, 'Alan', 1);
1 row created.

SQL> INSERT INTO user1.emp VALUES(101, 'Ben', 1);
1 row created.

SQL> ALTER SESSION SET CONTAINER=pdb2;
Session altered.

SQL> INSERT INTO user2.dept VALUES(1, 'IT');

正しい説明を2つ選択しなさい。

A. セッションがPDB2に接続したとき、USER1.EMPへの挿入はコミットされないままです。
B. USER1.EMPへの挿入は、セッションがUSER2.DEPTに行を挿入したときにコミットされました。
C. 親コンテナー内のアクティブなトランザクションのため、USER2.DEPTへの挿入は失敗します。
D. USER2.DEPTの挿入は、子セッションによる再帰的な自律型トランザクションであり、コミットされます。
E. USER1.EMPの挿入は、セッションがPDB2に接続したときにロールバックされました。
F. USER2.DEPTへの挿入はコミットされていません。
G. USER1.EMPへの挿入は、セッションがPDB2に接続したときにコミットされました。

ANSWER A, C

}());

(function(){
    sortQuestion();
}());
