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
    q_list.push(new Question('データベースをARCHIVELOGモードで稼働しています。'
    + '\n\nALTER TABLESPACE 表領域名 BEGIN BACKUP;'
    + '\n\nを発行した場合の正しい説明は、次のうちどれか選びなさい。',
    'バックアップのときにロックされるのはファイルヘッダでありブロックヘッダではありません。'
    + '\nオンラインのままバックアップ可能にするモードがバックアップモードです。'
    + '\n一時表領域のファイルはそもそもオンラインでバックアップをする必要がありません。'));
    pushChoice('表領域がバックアップモードの時は追加のREDOログが生成される', true);
    pushChoice('バックアップモードの表領域は各DBブロックヘッダが固定される', false);
    pushChoice('バックアップモードの表領域は、データファイルがオフラインになりコピーに備える', false);
    pushChoice('一時表領域のバックアップには、BEGIN バックアップコマンドは必要ない', false);
    sortChoice();

    // 002
    q_list.push(new Question('SYSAUX表領域がクラッシュしました。'
    + '\nデータベースはARCHIVELOGモードで稼働しており、SYSAUX表領域のデータファイルは、ユーザー管理のバックアップが行われています。'
    + '\n次の（1）～（9）を最も素早く復旧できる手順にしたものを選びなさい。'
    + '\n（1） SYSAUX表領域をオフラインにする'
    + '\n（2） インスタンスを停止する'
    + '\n（3） SYSAUX表領域をリストアする'
    + '\n（4） SYSAUX表領域とSYSTEM表領域をリストアする'
    + '\n（5） インスタンスをマウント状態にする'
    + '\n（6） SYSAUX表領域をリカバリする'
    + '\n（7） SYSAUX表領域とSYSTEM表領域をリカバリする'
    + '\n（8） SYSAUX表領域をオンラインにする'
    + '\n（9） データベースをオープンにする',
    'SYSTEM表領域か、UNDO表領域が壊れた場合は、インスタンスを停止する必要がありますが、今回はその必要がありません。'
    + '\nまた復旧対象の表領域もSYSAUXのみで大丈夫です。'));
    pushChoice('（1） → （3） → （7） → （8） → （9）', false);
    pushChoice('（2） → （3） → （5） → （9） → （8）', false);
    pushChoice('（2） → （4） → （5） → （7） → （9）', false);
    pushChoice('（1） → （3） → （6） → （8）', true);
    sortChoice();

    // 003
    q_list.push(new Question('カレントのREDOログが全滅したため、不完全リカバリを行う必要がある。'
    + '\nどのユーザー管理不完全リカバリを選ぶべきか。',
    'カレントのREDOログ損失の不完全リカバリはREDOログ単位で復旧ポイントを決定する「ログ順序ベース」か「取り消しベース」を選びます。'
    + '\n両者とも同等の作業ですが、問題文中にユーザー管理と指定されていますので「取り消しベース」が正解です。'));
    pushChoice('ログ順序ベース', false);
    pushChoice('時間ベース', false);
    pushChoice('取り消しベース', true);
    pushChoice('変更ベース', false);
    sortChoice();

    // 004
    q_list.push(new Question('※アーカイブ先は次のとおり設定しています。'
    + '\n\nLOG_ARCHIVE_DEST_1="LOCATION=/u02/archive1"'
    + '\nLOG_ARCHIVE_DEST_2="LOCATION=/u02/archive2  MANDATORY"'
    + '\nLOG_ARCHIVE_DEST_3="LOCATION=/u03/archive3"'
    + '\nLOG_ARCHIVE_MIN_SUCCEED_DEST=2'
    + '\n\n正しい説明をすべて選択しなさい。',
    'MANDATORYが指定されているアーカイブ先に対しては、アーカイブは必須です。'
    + '\nよって、「/u02/archive2に対するアーカイブは必須である」は正しいです。'
    + '\nまた、LOG_ARCHIVE_MIN_SUCCEED_DESTが2となっているため、/u02/archive2以外のいずれか1カ所に対してアーカイブが必須となります。 '
    + '\nよって「/u02/archive2以外のいずれか1カ所に対するアーカイブが必須である」は正しいです。'));
    pushChoice('/u02/archive1および/u03/archive3に対するアーカイブは必須である', false);
    pushChoice('/u02/archive2に対するアーカイブは必須である', true);
    pushChoice('いずれか2カ所のアーカイブができればよい', false);
    pushChoice('/u02/archive2以外のいずれか1カ所に対するアーカイブが必須である', true);
    sortChoice();

    // 005
    q_list.push(new Question('フラッシュリカバリ領域の構成をすることになりました。正しいものを2つ選択しなさい',
    'DB_RECOVERY_FILE_DESTはフラッシュリカバリ領域の場所、DB_RECOVERY_FILE_DEST_SIZEはフラッシュリカバリ領域のサイズを指定します。'
    + '\nこの2つのパラメータは動的パラメータであるため、いずれの設定もデータベースの再起動は必要ありません。'
    + '\nもし、停止に時間がかかるのであれば、NORMALやTRANSACTIONALによる停止が原因であると予想できます。'
    + '\nなるべく早く再起動を行いたい場合は、IMMEDIATEを選択すべきでしょう。'
    + '\nただし、終了していないトランザクションは強制的にロールバックされるため、処理途中の変更は取り消されます。'));
    pushChoice('DB_RECOVERY_FILE_DESTでフラッシュリカバリ領域を設定する。この変更はデータベースの再起動が必要である', false);
    pushChoice('DB_RECOVERY_FILE_DESTでフラッシュリカバリ領域を設定する。この変更はデータベースの再起動は必要ない', true);
    pushChoice('DB_RECOVERY_FILE_DEST_SIZEでフラッシュリカバリのサイズを設定する。この変更はデータベースの再起動が必要である', false);
    pushChoice('DB_RECOVERY_FILE_DEST_SIZEでフラッシュリカバリのサイズを設定する。この変更はデータベースの再起動は必要ない', true);
    sortChoice();

    // 006
    q_list.push(new Question('RMAN>CONFIGURE RETENTION POLICY TO REDUNDANCY 3;'
    + '\nRMAN>CONFIGURE BACKUP OPTIMIZATION ON;'
    + '\n\ncontents表領域は、読み取り専用表領域です。'
    + '\n取得されるバックアップの数はいくつでしょうか？',
    '問題では、バックアップ最適化が構成されているため、読み取り専用表領域のバックアップは、すでに取得済みのバックアップがあればスキップされます。'
    + '\nただし、バックアップ最適化のスキップ用件には保存ポリシーも影響します。'
    + '\nこの場合、冗長数＋1のバックアップが保持され、その後スキップ対象となります。'
    + '\nよって、「4つのバックアップが保持される」が正解です。'));
    pushChoice('1', false);
    pushChoice('2', false);
    pushChoice('3', false);
    pushChoice('4', true);
    pushChoice('バックアップを取得した数分', false);
    sortChoice();

    // 007
    q_list.push(new Question('RMAN>CONFIGURE DEVICE TYPE DISK PARALLELISM 2 BACKUP TYPE TO BACKUPSET;'
    + '\nRMAN> RUN{'
    + '\n2> allocate channel c1 device type disk;'
    + '\n3> backup database;'
    + '\n4> }'
    + '\n\n上記を実行した場合、起動するチャネルの数はいくつでしょうか？'
    + '\n正しいものを選びなさい。',
    '問題の構成では、自動チャネル割り当てにて、並列性2が構成されています。'
    + '\nこれは、「PARALLELISM 2」という点で分かります。'
    + '\nそして、手動チャネル割り当てで1つのチャネルを割り当てデータベース全体のバックアップを取得しています。'
    + '\nこの場合、手動チャネル割り当てが優先的に動作するため、1つの手動チャネルが起動します。'
    + '\nよって、「手動チャネルが優先的である。よって、手動チャネルが1つ起動する」が正解です。'
    + '\nなお、手動チャネルと自動チャネルが両方起動することはありません。'
    + '\nまた、エラーになることもありません。'));
    pushChoice('自動チャネルが優先的である。よって、自動チャネルが2つ起動する', false);
    pushChoice('手動チャネルが優先的である。よって、手動チャネルが1つ起動する', true);
    pushChoice('自動チャネルが2つ、手動チャネルが1つ起動される。よって計3つのチャネルが起動する', false);
    pushChoice('自動チャネルが構成されているにもかかわらず、手動チャネル割り当てをしているためエラーになる', false);
    sortChoice();

    // 008
    q_list.push(new Question('制御ファイルの自動バックアップに関する説明として正しいものをすべて選択しなさい。',
    '制御ファイルの自動バックアップを有効化すると、バックアップ時および物理構造変更時にバックアップが自動的に取得されます。'
    + '\nなお、初期化パラメータを変更してもバックアップは取得されません。'
    + '\nまた、バックアップ対象は制御ファイルに加え、SPFILEがバックアップされます。'
    + '\nバックアップ場所を指定していない場合、フラッシュリカバリ領域に取得されます。'
    + '\nただし、フラッシュリカバリ領域の構成がない場合、$ORACLE_HOME/dbsに取得されます。'
    + '\n明示的にバックアップ場所を指定したい場合には、永続設定「CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO "%F";」で設定します。'
    + '\n%Ｆの個所でディレクトリを設定します。なお、%Fは必須です。'
    + '\n例：CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO "/backup/autocontrol/%F";'));
    pushChoice('1日1回決まった時間にバックアップが取得される', false);
    pushChoice('バックアップ取得時およびデータベースの物理構造変更時に、自動バックアップが取得される', true);
    pushChoice('バックアップ取得時および初期化パラメータ変更時、物理構造変更時に、自動バックアップが取得される', false);
    pushChoice('制御ファイルおよびSPFILEがバックアップされる', true);
    pushChoice('制御ファイルのみがバックアップされる', false);
    pushChoice('バックアップ場所を指定しなかった場合、$ORACLE_HOME/dbsにバックアップされる', false);
    pushChoice('バックアップ場所を指定しなかった場合、フラッシュリカバリ領域にバックアップされる', true);
    sortChoice();

    // 009
    q_list.push(new Question('制御ファイルではできない、リカバリ・カタログを使ったバックアップ管理の特徴として、正しいものをすべて選択しなさい。',
    'リカバリ・カタログには次の特徴があります。'
    + '\n\n・長期間のバックアップ保持が可能'
    + '\n・複数データベースのバックアップが一元管理できる'
    + '\n・ストアド・スクリプトを格納できる'
    + '\n\nBACKUPコマンドのKEEP FOR EVERオプションはリカバリ・カタログが必要です。'
    + '\nKEEP FOR EVERオプションを付けると、永続的にバックアップを保持できます。'
    + '\n従って、「永続的にバックアップを保持できる」は正解です。'
    + '\nリカバリ・カタログを構成した際、制御ファイルにはバックアップ情報を記録します。'
    + '\nリカバリ・カタログのリポジトリ情報は、制御ファイルにレプリケーションした情報だからです。'
    + '\nなお、RMANでは、Oracleデータベースファイルのバックアップは可能ですが、ホストファイルのバックアップはできません。'
    + '\nよって、当然リカバリ・カタログでも、ホストファイルのバックアップを保持できません。'));
    pushChoice('ストアド・スクリプトを格納できる', true);
    pushChoice('複数のデータベースおよびホストのバックアップを一元管理できる', false);
    pushChoice('永続的にバックアップを保持できる', true);
    pushChoice('制御ファイルに対してバックアップ情報を記録しなくなる', false);
    sortChoice();

    // 010
    q_list.push(new Question('リカバリ・カタログのバックアップをするための構成として、適切なものを2つ選択しなさい。',
    'リカバリ・カタログでは、障害に備えたバックアップ管理を行ってください。次の構成を推奨しています。'
    + '\n\n・ARCHIVELOGモードで運用する'
    + '\n・保存ポリシーは1より大きいREDUNDANCY値にする'
    + '\n・リカバリ・カタログをディスクとテープにバックアップする'
    + '\n・バックアップを作成するには、BACKUP DATABASE PLUS ARCHIVELOGコマンドを使用する'
    + '\n・RMANリポジトリとして、別のリカバリ・カタログではなく、制御ファイル（NOCATALOG）を使用する'
    + '\n・制御ファイルの自動バックアップをONに設定する'));
    pushChoice('ARCHIVELOGモードにし、障害発生時にはリカバリ・カタログを障害発生直前のものに復旧できるように構成する', true);
    pushChoice('NOARCHIVELOGモードにし、リソースを節約する', false);
    pushChoice('リカバリ・カタログを管理するためのリカバリ・カタログを構成し、より安全性を高くする', false);
    pushChoice('最もバックアップ管理が強化されている既存データベースに、リカバリ・カタログ用の表領域を作成。これにより、リカバリ・カタログのバックアップが簡略化されるうえ、安全性も高くなる', false);
    pushChoice('保存ポリシーをREDUNDANCY2以上に設定する', true);
    sortChoice();

    // 011
    q_list.push(new Question('仮想プライベート・カタログに関する説明として、正しくないものを2つ選択しなさい。',
    '仮想プライベート・カタログは、1つのリカバリ・カタログと複数の仮想プライベート・カタログを作成し、バックアップ管理データベースを複数のDBAで制限します。'
    + '\n複数のリカバリ・カタログを作成してもよいですが、管理負荷が増大するのでお勧めできません。'
    + '\n基本カタログとは、通常のリカバリ・カタログのことです。仮想プライベート・カタログを構成する場合、基本カタログは必須です。'));
    pushChoice('複数のリカバリ・カタログ作成し、バックアップ管理データベースを複数のDBAで制限する', true);
    pushChoice('1つのリカバリ・カタログと複数の仮想プライベート･カタログを作成し、バックアップ管理データベースを複数のDBAで制限する', false);
    pushChoice('基本カタログは必須である', false);
    pushChoice('基本カタログは任意である', true);
    sortChoice();

    // 012
    q_list.push(new Question('バックアップセットおよびイメージコピーの説明として、正しいものをすべて選択しなさい。',
    'バックアップセットの特徴は次のとおりです。'
    + '\n\n・ディスクまたはテープに、バックアップを取得できる'
    + '\n・未使用領域は圧縮される（無効化はできない）'
    + '\n\nバックアップセットの未使用領域は、必ず圧縮されます。'
    + '\nこれを無効化することはできませんし、圧縮のためのコマンドも必要ありません。'
    + '\nただし、バイナリ圧縮は別途コマンドが必要です。'
    + '\nイメージコピーの特徴は次のとおりです。'
    + '\n\n・未使用ブロックを含むすべてのブロックがバックアップ対象となる'
    + '\n・ディスクにのみ、バックアップを取得できる'));
    pushChoice('バックアップセットは、テープにのみバックアップを取得できる', false);
    pushChoice('バックアップセットは、未使用領域をコマンドにより圧縮できる', false);
    pushChoice('バックアップセットは、未使用領域が必ず圧縮される', true);
    pushChoice('イメージコピーは、ディスクまたはテープにバックアップを取得できる', false);
    pushChoice('イメージコピーは、未使用ブロックを含むすべてのブロックがバックアップ対象となる', true);
    sortChoice();

    // 013
    q_list.push(new Question('RMANを使用した圧縮バックアップについて、正しい説明をすべて選択しなさい。',
    'バックアップセットを作るとき、標準設定では圧縮アルゴリズムを使わず、ストレージ上の未使用領域を削減するだけです。'
    + '\nイメージコピーは圧縮アルゴリズムを使って圧縮することはできません。'
    + '\nZLIB圧縮アルゴリズムはBZIP2に比べてプロセッサ時間をあまり消費しませんが、バックアップ速度が常に優れていると保証されているわけではありません。'
    + '\n圧縮アルゴリズムを利用することで、入出力のデータ量が減るため入出力部分の速度が低いときにも効果を期待できます。'));
    pushChoice('BZIP2圧縮アルゴリズムは、ZLIB圧縮アルゴリズムに比べてプロセッサ時間を多く消費する', true);
    pushChoice('バックアップセットは常にBZIP2かZLIBによる圧縮が行われる', false);
    pushChoice('RMANのBACKUPコマンド、AS COMPRESSEDキーワードは、圧縮バックアップセット、ならびに圧縮イメージコピーを作成するときに使う', false);
    pushChoice('ZLIB圧縮アルゴリズムを使用することで、最高のバックアップ速度を得られる', false);
    pushChoice('使用帯域幅を抑えることと、ディスク消費を減らすことができる', true);
    sortChoice();

    // 014
    q_list.push(new Question('増分バックアップについて正しい説明をすべて選択しなさい',
    '増分バックアップでは、まずレベル0としてフラグを付けたバックアップを取る必要があります。'
    + '\nその内容は完全バックアップと同じものですが、「レベル0の増分バックアップ」と呼びます。'
    + '\n障害の復旧に当たって増分バックアップがあれば、RMANは自動的に増分バックアップを使います。'
    + '\nただし、最後の増分バックアップ以降の変更を反映させるにはアーカイブログとREDOログが必要です。'));
    pushChoice('累積増分バックアップは、完全バックアップ以降の増分データをバックアップするものである', false);
    pushChoice('差分増分バックアップは、完全バックアップ以降の増分データをバックアップするものである', false);
    pushChoice('累積増分バックアップは、レベル0バックアップ以降の増分をバックアップするものである', true);
    pushChoice('レベル0バックアップとレベル1バックアップがあっても、障害の復旧にはアーカイブログやREDOログが必要である', true);
    sortChoice();

    // 015
    q_list.push(new Question('高速増分バックアップに関する説明として正しいものをすべて選択しなさい',
    '高速増分バックアップは「ALTER DATABASE ENABLE CHANGE TRACKING」コマンドで有効になりますが、ファイルの生成場所は任意に決められます。'
    + '\n「DB_CREATE_FILE_DEST」パラメータは設定しなくても問題ありません。'
    + '\nその内容は完全バックアップと同じものですが、「レベル0の増分バックアップ」と呼びます。'
    + '\nレベル1バックアップを取得する前に有効としても、レベル0バックアップを取ってから、どのブロックに変更が加わったのかを追跡することはできません。'
    + '\nブロック変更トラッキング機能はいつでも有効にできますが、増分バックアップというものは、レベル0バックアップと比較して変わった部分のデータをバックアップするものです。'
    + '\n「ブロック変更トラッキングを有効にする」→「レベル0バックアップを取る」という手順を踏むことで、正しく前の世代のバックアップデータから変わった点を正しく認識できるということになります。'
    + '\nレベル0以降の変更点を追うのが増分バックアップの基本です。'
    + '\nそう考えると、レベル0バックアップを取ったときに、変更点の情報はリセットしなければなりません。'
    + '\nブロック変更トラッキングファイルを使うことで、バックアップ元のデータファイルへのアクセス量が減るため、処理性能が上がりますが、増分バックアップのファイルサイズは変わりません。'
    + '\nブロック変更トラッキングファイルはREDOログの生成時に更新されます。'
    + '\nただし、REDOログのサイズとの因果関係はありません。'));
    pushChoice('「DB_CREATE_FILE_DEST」パラメータを必要とする', false);
    pushChoice('レベル1バックアップを取得する前に有効にしておけば活用される', false);
    pushChoice('レベル0バックアップを取得すると、ビットがリセットされる', true);
    pushChoice('取得される増分バックアップのサイズを小さくできる可能性がある', false);
    pushChoice('変更トラッキングファイルは、CTRWによりREDOの生成時に更新される', true);
    pushChoice('ブロック変更トラッキングファイルのサイズはREDOログの容量に比例する', false);
    sortChoice();

    // 016
    q_list.push(new Question('「不要なファイル」について正しい説明を選択しなさい',
    '不要なファイルとは保存ポリシーの範囲外となってしまったファイルのことです。'
    + '\nいつでも削除して大丈夫ですが、保存ポリシーの範囲外であっても、バックアップからアーカイブ・ログが継続的に存在していれば、それらのファイルを利用して回復することが可能です。'
    + '\nCROSSCHECKは、実際のファイルとRMANリポジトリ情報の同期をチェックするコマンドです。'
    + '\n「不要なファイル」の判断には使われません。'
    + '\nまた、EXPIERDはCROSSCHECKで判断されるものですが、「不要なファイル」とは無関係です。'));
    pushChoice('不要なファイルとは、すでに回復に使うことができないバックアップやアーカイブログのことである', false);
    pushChoice('不要なファイルは、CROSSCHECKコマンドで発見できる', false);
    pushChoice('不要なファイルはDELETE OBSOLETE コマンドで削除される', true);
    pushChoice('不要なファイルは保存ポリシー期限が切れたため EXPIERD とマークされる', false);
    sortChoice();

    // 017
    q_list.push(new Question('読み取り専用表領域について正しい説明をすべて選択しなさい',
    '読み取り専用表領域と書き込み可能表領域は相互に変更できます。'
    + '\n読み取り専用表領域に変更してバックアップを取得した場合、それ以降バックアップをする必要はありませんが、複数回バックアップを取得すること自体は可能です。'
    + '\n読み取り専用表領域に変更してバックアップを取得の後、データファイルが壊れた場合、ファイルをリストアするのみで復旧できます。'
    + '\nアーカイブ・ログを使用する復旧にはなりません。'
    + '\nただし、読み取り専用表領域にしたのに、その後バックアップを取得していない場合、書き込み可能表領域の時代に獲得したバックアップと、そこからのアーカイブ・ログを使って復旧することになります。'));
    pushChoice('読み取り専用表領域にすると、書き込み可能な表領域に戻すことはできない', false);
    pushChoice('読み取り専用表領域にした後、その表領域に対して、バックアップを複数回実行することはできない', false);
    pushChoice('読み取り専用表領域に変更し、すぐにバックアップを取得した。その読み取り専用表領域が壊れてもアーカイブ・ログが必要になる', false);
    pushChoice('復旧にあたり、読み取り専用表領域に変更する以前に取得したバックアップを使うことも可能である', true);
    sortChoice();

    // 018
    q_list.push(new Question('表を誤って削除したため、RMANで不完全リカバリを実行します。'
    + '\n不完全リカバリについて正しく説明しているものをすべて選びなさい',
    '表の誤削除が原因で不完全リカバリを実行する場合、制御ファイルの再作成は必要ありません。'
    + '\nMOUNTモードでリストアし、RESETLOGSオプションでオープンする必要があります。'
    + '\n不完全リカバリでは、すべてのデータファイルをリストアする必要があります。'
    + '\n特定のファイルのみ過去の状態に戻すことはできません。'));
    pushChoice('データファイルをリストアするために、ターゲットデータベースがMOUNTモードである必要がある', true);
    pushChoice('データベースはRESETLOGSオプションを使用してオープンする必要がある', true);
    pushChoice('制御ファイルを再作成する必要がある', false);
    pushChoice('削除された表がどのデータファイルにあるか関係なく、すべてのデータファイルをリストアする必要がある', true);
    sortChoice();

    // 019
    q_list.push(new Question('下記のRMANコマンドについて正しく説明しているものを選びなさい'
    + '\n\nRUN'
    + '\n{'
    + '\nSET UNTIL SEQUENCE 1076;'
    + '\nRESTORE DATABASE;'
    + '\nRECOVER DATABASE;'
    + '\n}',
    'UNTIL SEQUENCE句は、不完全リカバリにおいてログ順序番号を指定する方法です。'
    + '\n指定した番号の1つ前までのログを適用します。'
    + '\nRMANコマンドで、回復したいポイントを決定するのは、SET UNTILコマンドです。'
    + '\nRECOVERコマンドではありません。'
    + '\nなお、RECOVERコマンドでのUNTIL句はユーザー管理と呼ばれるリカバリ方法の際に用いられます。'));
    pushChoice('SCN 1076以前にバックアップしたデータファイルをリストアして、SCN 1076までのログを適用する', false);
    pushChoice('ログ順序番号1075番までのログを使って回復する', true);
    pushChoice('ログ順序番号1076番をリストアし、リカバリする', false);
    pushChoice('復旧にあたり、読み取り専用表領域に変更する以前に取得したバックアップを使うことも可能である', false);
    sortChoice();

    // 020
    q_list.push(new Question('下記のRMANコマンドについて正しく説明しているものを選びなさい'
    + '\n\nBACKUP DATABASE TAG year2011'
    + '\nKEEP UNTIL TIME "SYSDATE+365" RESTORE POINT year2011;',
    'KEEP UNTIL句により、RMANリポジトリの保存方針に関係なく、指定した期間、保存されます。'
    + '\nSYSDATE+365とありますので、リポジトリに365日間保存されますが、期間を過ぎたとしても、バックアップが自動的に削除されるわけではありません。'
    + '\n削除対象とマークが変わるだけです。'
    + '\nリストアポイントを同時に作成することも可能ですが、リカバリポイント時点のバックアップは作成できません。'
    + '\nリカバリカタログはKEEP FOREVER句を指定するときに必要になります。'));
    pushChoice('バックアップは、構成済みの保存方針にかかわらず最低365日間保存される', true);
    pushChoice('365日後にバックアップは自動的に削除となる', false);
    pushChoice('リストアポイントyear2011が作成された時点のバックアップを取得する', false);
    pushChoice('リカバリカタログ未使用の場合このコマンドは失敗する', false);
    sortChoice();

    // 021
    q_list.push(new Question('REDOログの構成を3グループとし、各グループは二重に冗長化しています。'
    + '\nディスク障害により、1ファイルを損失してしまいました。'
    + '\nこの損失以前の状態に回復するに当たり、最適な方法を選びなさい。',
    'グループ内のメンバーが全損しない限り、バックアップを使ったリカバリは必要ありません。'
    + '\nしかし、Oracle Databaseが自動的に修復するわけでもありません。'
    + '\n回復するのは、正解の「a」を実行します。'
    + '\nインスタンスの再起動で自動的に修復できるのは「一時ファイル」です。'
    + '\nまた、このままでもシステムとしては稼働し続けますが、今回の問題は、回復する方法を尋ねているので、放置するという答えは不適切です。'));
    pushChoice('損失のあったグループにメンバーを追加し、損失のあったファイルは削除する', true);
    pushChoice('最新のバックアップを使い、壊れたログの1つ前までのログ順序リカバリを実行する', false);
    pushChoice('ファイルを自動的に修復させるため、インスタンスを再起動する', false);
    pushChoice('このままの状態でもシステムは動き続けるので、何もしないで良い', false);
    sortChoice();

    // 022
    q_list.push(new Question('オンラインREDOロググループのステータスの説明として、誤っているものを選びなさい',
    'CURRENTは、現在ログライターが書き込んでいるREDOロググループです。'
    + '\nACTIVE、INACTIVEは、アーカイブログの獲得とは無関係という点で共通しています。'
    + '\nACTIVEは、インスタンスリカバリに必要であり、INACTIVEは、その必要がなくなっているグループです。'));
    pushChoice('CURRENTのグループは、ログライターが現在書き込んでいるグループである', false);
    pushChoice('ACTIVEのグループはインスタンスリカバリに必要であり、アーカイブログが獲得されているとは限らない', false);
    pushChoice('チェックポイントが実行されると、ACTIVEのグループのステータスはINACTIVEになる', false);
    pushChoice('INACTIVEのグループはチェックポイントが実行されるまでは、インスタンスリカバリに必要だが、すでに、アーカイブログは獲得されている', true);
    sortChoice();

    // 023
    q_list.push(new Question('オンラインREDOログファイルで、同一グループ内のすべてのメンバーが損失した場合、どのようにリカバリすればよいか、2つ選びなさい',
    'INACTIVEの場合は、ログファイルの消去でリカバリが可能です。'
    + '\nただし、アーカイブされていない場合、アーカイブログの連続性が失われるので、データベース全体のバックアップを取っておく必要があります。'
    + '\nACTIVEの場合は、チェックポイントを実行することで、INACTIVEになります。'
    + '\nここからの作業はINACTIVEと同様です。'
    + '\nCURRENTの場合、ログファイルは消去できません。'
    + '\n不完全リカバリの実行で対処することになります。'));
    pushChoice('INACTIVEなグループの場合は、ログファイルの消去でリカバリできる', true);
    pushChoice('ACTIVEなグループの場合は、すでにアーカイブ・ログが獲得されていれば、チェックポイントの実行のみで対処できる', false);
    pushChoice('ACTIVEなグループの場合、アーカイブ・ログが獲得されていなくても、チェックポイントが成功すればINACTIVEステータスになるため、その後は、INACTIVEと同様の手順でリカバリできる', true);
    pushChoice('CURRENTのグループの場合、いったんインスタンスを停止し、マウント状態で、ログファイルの消去が可能である', false);
    sortChoice();

    // 024
    q_list.push(new Question('RMAN DUPLICATEコマンドでFROM ACTIVE DATABASE句を含めずデータベースを複製した。'
    + '\n結果について正しい説明を選べ。',
    'DUPLICATEコマンドを使用してデータベースを複製すると、複製データベースには新規に一意のDBIDが割り当てられます。'
    + '\n確かにRMANは既存のバックアップを使用しますが、アーカイブREDOログ・ファイルと増分バックアップも使用して不完全リカバリを実行します。'
    + '\nRMANは、複製データベースの制御ファイルも作成します。'
    + '\nオンラインREDOログ・ファイルはコピーできないため、複製先でREDOログファイルを再作成します。'));
    pushChoice('RMANは、既存のバックアップだけを使用して複製データベースを作成', false);
    pushChoice('RMANは、複製データベースの制御ファイルを作成しない', false);
    pushChoice('新規の複製データベースにオンラインREDOログがコピーされる', false);
    pushChoice('複製データベースには、新たに一意のDBIDが割り当てられる', true);
    sortChoice();

    // 025
    q_list.push(new Question('データベース全体を複製したいと考えているが、「READONLY_A」「READONLY_B」という名前の2つが読み取り専用表領域に指定されていた。'
    + '\n以下のコマンドを実行した際の正しい説明はどれか選べ。'
    + '\nなお、ファイルパスの指定は解決済みとする。',
    '読み取り専用表領域だからといって、特別なことはありません。'
    + '\n読み取り専用表領域のデータ転送は行われないが、複製データベースに表領域のMETA情報は登録されるのは、SKIP READONLYオプションを追加したときの挙動です。'));
    pushChoice('データベースのデータファイルがすべて複製される', true);
    pushChoice('READONLY_AとREADONLY_Bは複製されない', false);
    pushChoice('読み取り専用表領域に関する記述がないため、失敗', false);
    pushChoice('読み取り専用表領域のデータ転送は行われないが、複製データベースに表領域のMETA情報は登録される', false);
    sortChoice();
    
    // 026
    q_list.push(new Question('インスタンスの起動時に自動的に修復される障害の種類を選択しなさい。',
    'Oracleインスタンスの異常終了に伴うデータベースの不整合　→　インスタンスリカバリ'
    + '\nデータファイルの誤削除　→　メディアリカバリ'
    + '\nSQLの構文エラー　→　SQLを手動修正'
    + '\nデータの誤更新　→　フラッシュバックテクノロジーや不完全リカバリ'));
    pushChoice('データファイルの誤削除', false);
    pushChoice('SQLの構文エラー', false);
    pushChoice('データの誤更新', false);
    pushChoice('Oracleインスタンスの異常終了に伴うデータベースの不整合', true);
    sortChoice();
    
    // 027
    q_list.push(new Question('自動チェックポイント・チューニング機能とMTTRアドバイザに関する説明として正しいものを2つ選択しなさい。',
    '自動チェックポイント・チューニング機能は、システムの負荷が低い場合に更新済みブロックをデータファイルに書き込む機能です。'
    + '\nFAST_START_MTTR_TARGETが未設定、または0以外に設定されている場合に有効になります。'
    + '\nMTTRアドバイザは、FAST_START_MTTR_TARGETを減少することでI/O量がどの程度増加するかを予測する機能、'
    + '\nまたは、FAST_START_MTTR_TARGETを増加することでI/O量がどの程度減少するかを予測する機能です。'
    + '\nMTTRアドバイザはSTATISTICS_LEVEL初期化パラメータにTYPICALまたはALLを、FAST_START_MTTR_TARGET初期化パラメータに0以外の値を設定すると有効になります。'));
    pushChoice('自動チェックポイント・チューニング機能はFAST_START_MTTR_TARGETが未設定、または0以外に設定されている場合に有効である', true);
    pushChoice('自動チェックポイント・チューニング機能は最適なFAST_START_MTTR_TARGETを自動的に決定する機能である', false);
    pushChoice('MTTRアドバイザは、STATISTICS_LEVEL初期化パラメータにTYPICALまたはALLを、FAST_START_MTTR_TARGET初期化パラメータに0を設定すると使用できる', false);
    pushChoice('MTTRアドバイザを使用すると、FAST_START_MTTR_TARGETを増加することで、I/O量がどの程度減少するかを予測できる', true);
    sortChoice();
    
    // 028
    q_list.push(new Question('メディア障害に分類されるものを2つ選択しなさい',
    'GOLD参考書3Pを参照'));
    pushChoice('誤って表を削除した', false);
    pushChoice('誤ってユーザーを削除した', false);
    pushChoice('誤ってデータファイルを削除した', true);
    pushChoice('誤って表領域を削除した', false);
    pushChoice('誤って制御ファイルを削除した', true);
    sortChoice();
    
    // 029
    q_list.push(new Question('メディア障害からの復旧作業におけるリストアの意味を正しく説明しているものを選択しなさい',
    'バックアップ取得時点から障害発生直前までに実行された更新を適用する　→　メディア障害からの復旧作業におけるリカバリ'
    + '\nバックアップからファイルを復元する　→　メディア障害からの復旧作業におけるリストア'
    + '\nインスタンス起動時にデータベースの不整合を自動的に修復する　→　インスタンスリカバリ'
    + '\nデータベース全体を過去の状態に復元する　→　フラッシュバックデータベースまたは不完全リカバリ'));
    pushChoice('バックアップ取得時点から障害発生直前までに実行された更新を適用する', false);
    pushChoice('バックアップからファイルを復元する', true);
    pushChoice('インスタンス起動時にデータベースの不整合を自動的に修復する', false);
    pushChoice('データベース全体を過去の状態に復元する', false);
    sortChoice();
    
    // 030
    q_list.push(new Question('RMANから実行できるSQL文およびコマンドをすべて選択しなさい',
    '11gまでは制限があったが、12cからはほぼすべてのSQL文が実行できる。'));
    pushChoice('ALTER DATABASE OPEN;', true);
    pushChoice('STARTUP', true)
    pushChoice('SHUTDOWN IMMEDIATE', true);
    pushChoice('SELECT * FROM V$DATABASE;', true);
    pushChoice('SELECT * FROM DBA_TABLESPACES;', true);
    sortChoice();
    
    // 031
    q_list.push(new Question('高速リカバリ領域を構成している場合、一般的に高速リカバリ領域に配置または出力されるファイルの種類を4つ選択しなさい。',
    'アラートログファイルとトレースファイルはADRに格納されます。'
    + '\nデータファイルは、通常高速リカバリ領域とは別のディスク装置の領域に配置されます。'));
    pushChoice('アーカイブログファイル', true);
    pushChoice('アラートログファイル', false);
    pushChoice('トレースファイル', false);
    pushChoice('RMANバックアップピース', true);
    pushChoice('RMANイメージコピー', true);
    pushChoice('制御ファイルの自動バックアップ', true);
    pushChoice('UNDO表領域のデータファイル', false);
    sortChoice();
    
    // 032
    q_list.push(new Question('非CDB環境におけるファイルの自動バックアップに関する説明として正しいものを選択しなさい。',
    '非CDB環境では制御ファイルの自動バックアップはデフォルトで無効です'
    + '\n以下のコマンドを実行して明示的に有効にする必要があります'
    + '\n\nCONFIGURE CONTROLFILE AUTOBACKUP ON;'
    + '\n\n制御ファイルの自動バックアップ対象は、制御ファイルとサーバーパラメータファイル(spfile)です。;'
    + '\n制御ファイルの自動バックアップはデフォルトで高速リカバリ領域に出力されます。'
    + '\n制御ファイルの自動バックアップを無効にしても、BACKUP DATABASEなどの実行時に制御ファイルのバックアップが取得されます。'));
    pushChoice('制御ファイルの自動バックアップはデフォルトで有効である', false);
    pushChoice('制御ファイルの自動バックアップのバックアップ対象は制御ファイルとテキスト形式の初期化パラメータ(pfile)である', false);
    pushChoice('デフォルトでは、制御ファイルの自動バックアップは高速リカバリ領域に出力される', true);
    pushChoice('制御ファイルの自動バックアップを無効にすると、制御ファイルのバックアップはまったく取得されなくなる', false);
    sortChoice();
    
    // 033
    q_list.push(new Question('高速リカバリ領域の場所を指定する方法で正しいものを選択しなさい',
    'GOLD参考書12Pを参照'));
    pushChoice('初期化パラメータDB_RECOVERY_FILE_DESTにディレクトリパスを設定する', true);
    pushChoice('初期化パラメータFAST_RECOVERY_AREAにディレクトリパスを設定する', false);
    pushChoice('RMANの永続設定CONFIGURE RECOVERY AREAにディレクトリパスを設定する', false);
    pushChoice('ALTER DATABASE RECOVERY AREAコマンドでディレクトリパスを設定する', false);
    sortChoice();
    
    // 034
    q_list.push(new Question('保存ポリシーに関する説明で適切なものを選択しなさい。',
    'GOLD参考書13Pを参照'));
    pushChoice('保存ポリシーの設定において、冗長性とリカバリ期間の2つの指定方法を同時に設定できる', false);
    pushChoice('高速リカバリ領域を使用していなくても、保存ポリシーの観点から不要とみなされたファイルは自動的に削除される', false);
    pushChoice('保存ポリシーの観点から不要とみなされた古いファイルには、"OLD"マークが付けられる', false);
    pushChoice('保存ポリシーの保存期間は、初期化パラメータUNDO_RETENTIONに設定する', false);
    pushChoice('冗長性を基準に保存ポリシーを設定するには、CONFIGURE RETENTION POLICY TO REDUNDANCY<冗長性>;を実行する', true);
    sortChoice();

    // 035
    q_list.push(new Question('デフォルトのバックアップ出力先デバイスを指定する方法として適切なものを選択しなさい。',
    'GOLD参考書15Pを参照'));
    pushChoice('RMANのCONFIGURE DEFAULT DEVICE TYPE TOコマンド', true);
    pushChoice('RMANのCONFIGURE CHANNEL DEVICE TYPE DISK FORMATコマンド', false);
    pushChoice('初期化パラメータ DAFAULT_DEVICE_TYPE', false);
    pushChoice('初期化パラメータ DAFAULT_DEVICE', false);
    sortChoice();
    
    // 036
    q_list.push(new Question('リカバリカタログを使用する利点として適切なものを2つ選択しなさい。',
    'GOLD参考書17Pを参照'));
    pushChoice('RMAN関連の管理情報をCONTROL_FILE_RECORD_KEEP_TIME初期化パラメータで設定した日数だけ保存できる', false);
    pushChoice('ターゲットデータベースとは別にデータベースを用意する必要がない', false);
    pushChoice('複数のターゲットデータベースを一元的に管理できる', true);
    pushChoice('同じDBIDを持つ複数のデータベースを登録できる', false);
    pushChoice('ストアドスクリプトを使用できる', true);
    sortChoice();

    // 037
    q_list.push(new Question('リカバリカタログを構成する手順として正しいものを選択しなさい。'
    + '\n\n1.リカバリカタログ所有ユーザーにRECOVERY_CATALOG_OWNERロールを付与する。'
    + '\n2.リカバリカタログ所有ユーザーにDBAロールを付与する。'
    + '\n3.リカバリカタログ用データベースを準備する。'
    + '\n4.リカバリカタログ所有ユーザーを作成する。'
    + '\n5.リカバリカタログ所有ユーザーで、CATALOGオプションを指定して、リカバリカタログ用データベースに接続する。'
    + '\n6.リカバリカタログ所有ユーザーで、SQL*Plusを使ってリカバリカタログ用データベースに接続する。'
    + '\n7.CREATE CATALOGコマンドを実行する。',
    'GOLD参考書18Pを参照'));
    pushChoice('4　→　1　→　5　→　7', false);
    pushChoice('3　→　4　→　1　→　5　→　7', true);
    pushChoice('2　→　4　→　2　→　5　→　6', false);
    pushChoice('4　→　1　→　5　→　6', false);
    sortChoice();
    
    // 038
    q_list.push(new Question('リカバリカタログへの接続に使用するCONNECTコマンドの指定として正しいものを選択しなさい。'
    + '\n\n・リカバリカタログ所有のユーザー名：rcatowner'
    + '\n・リカバリカタログ所有のユーザーのパスワード：Password123'
    + '\n・リカバリカタログ用のデータベース接続用ネットサービス名：rcat',
    'GOLD参考書18Pを参照'));
    pushChoice('CONNECT RECOVERY_CATALOG rcatowner/Password123@rcat', false);
    pushChoice('CONNECT CATALOG rcatowner/Password123@rcat', true);
    pushChoice('CONNECT TARGET rcatowner/Password123@rcat', false);
    pushChoice('CONNECT TARGET rcat/Password123@rcatowner', false);
    sortChoice();
    
    // 039
    q_list.push(new Question('リカバリカタログの運用に関する説明として正しいものを2つ選択しなさい。',
    'GOLD参考書19Pを参照'));
    pushChoice('リカバリカタログが保持するデータは失われても復元可能であるため、リカバリカタログ用データベースのバックアップを取得する必要はない', false);
    pushChoice('リカバリカタログを使用してバックアップを実行すると、RMANの管理情報が自動的に同期される', true);
    pushChoice('ターゲットデータベースとリカバリカタログの両方に接続すると、自動的にターゲットデータベースがリカバリカタログに登録される', false);
    pushChoice('リカバリカタログに登録されているデータベースごとに15MBの領域が必要である', true);
    sortChoice();
    
    // 040
    q_list.push(new Question('ストアドスクリプトに関する説明として正しいものを選択しなさい',
    'GOLD参考書20Pを参照'));
    pushChoice('テキスト形式のファイルに記載された一連のRMANコマンドをRMANクライアントが実行できる機能である', false);
    pushChoice('一連のRMANコマンドをターゲットデータベースにストアドプロシージャとしてまとめ、これをRMANクライアントから実行できる機能である', false);
    pushChoice('リカバリカタログに登録された一連のRMANコマンドをRMANクライアントから実行できる機能である', true);
    pushChoice('過去実行したRMANコマンドを再実行するための機能である', false);
    sortChoice();
    
    // 041
    q_list.push(new Question('/disk1/backupディレクトリ以下にあるバックアップセット形式のバックアップファイルをRMANリポジトリに登録する。'
    + '\nその場合に実行するコマンドとして正しいものを選択しなさい。',
    'GOLD参考書20Pを参照'));
    pushChoice('CATALOG LIKE "/disk1/backup/%";', false);
    pushChoice('CATALOG START WITH "disk1/backup/";', true);
    pushChoice('CATALOG BACKUPPIECE LIKE "disk1/backup/%";', false);
    pushChoice('CATALOG BACKUPPIECE START WITH "disk1/backup/";', false);
    sortChoice();
    
    // 042
    q_list.push(new Question('カタログのインポートに関する説明として正しいものを選択しなさい。',
    'GOLD参考書21Pを参照'));
    pushChoice('異なるバージョンのリカバリカタログ間でカタログをインポートできる', false);
    pushChoice('カタログのインポートを実行したとき、インポート先のデータベースにリカバリカタログが存在しない場合は、自動的にリカバリカタログが作成される', false);
    pushChoice('カタログのインポートにはIMPORT CATALOGコマンドを使用する', true);
    pushChoice('カタログのインポートを実行するとき、ターゲットデータベースに接続しておく必要がある', false);
    sortChoice();
    
    // 043
	q_list.push(new Question('カタログのインポートを行うときに実行するRMANコマンドの組み合わせとして正しいものを選択しなさい。'
	+ '\n'
	+ '\nインポート元のリカバリカタログ所有者：rcat1owner'
	+ '\nインポート元のリカバリカタログ用データベースのネットサービス名：rcat1'
	+ '\nインポート先のリカバリカタログ所有者：rcat2owner'
	+ '\nインポート先のリカバリカタログ用データベースのネットサービス名：rcat2',
	'GOLD参考書22Pを参照'));
	pushChoice('CONNECT CATALOG rcat1owner@rcat1　IMPORT CATALOG rcat2owner@rcat2', false);
	pushChoice('CONNECT CATALOG rcat2owner@rcat2　IMPORT CATALOG rcat1owner@rcat1', true);
	pushChoice('CONNECT TARGET rcat1owner@rcat1　IMPORT CATALOG rcat2owner@rcat2', false);
	pushChoice('CONNECT TARGET rcat2owner@rcat2　IMPORT rcat1owner@rcat1', false);
	sortChoice();
	
	// 044
    q_list.push(new Question('NOARCHIVELOGモードとARCHIVELOGモードに関する説明で、正しいものを2つ選択しなさい。',
    'NOARCHIVELOGモードでは、オフラインバックアップのみをサポートします。'
    + '\nオンラインバックアップはサポートしません。'
    + '\nよって、可用性が重要なシステムでは、NOARCHIVELOGモードの運用は不向きです。'
    + '\nARCHIVELOGモードはオンラインバックアップをサポートするため、データベースを停止せずにバックアップを取得できます。'
    + '\nそのため、可用性は高くなります。'
    + '\nただし、DataPumpなどの論理バックアップの取得により、NOARCHIVELOGモードでもオープン中のバックアップの取得は可能です。'));
    pushChoice('NOARCHIVELOGモードでは、オンラインバックアップのみをサポートする', false);
    pushChoice('ARCHIVELOGモードでは、オンラインバックアップおよびオフラインバックアップをサポートする', true);
    pushChoice('可用性が重要なシステムでは、NOARCHIVELOGモードを選択すべきである', false);
    pushChoice('可用性が重要なシステムでは、ARCHIVELOGモードを選択すべきである', true);
    sortChoice();
    
    // 045
	q_list.push(new Question('仮想プライベートカタログに関する説明として正しいものを選択しなさい。',
	'GOLD参考書22Pを参照'));
	pushChoice('複数のリカバリカタログを仮想的に統合し、一元的に管理できるようにする機能である', false);
	pushChoice('リカバリカタログに登録されたデータベースのうち、管理できるデータベースを限定するための機能である', true);
	pushChoice('リカバリカタログのストアドスクリプトを、リカバリカタログに登録されたすべてのターゲットデータベースに対して実行可能にする機能である', false);
	pushChoice('マルチテナントデータベース上に作成されたリカバリカタログである', false);
	sortChoice();
	
	// 046
	q_list.push(new Question('Oracle Database 12.1.0.1 で仮想プライベートカタログを作成する手順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.仮想プライベートカタログの所有ユーザーを作成する。'
	+ '\n2.仮想プライベートカタログの所有ユーザーに管理対象データベースを管理する権限を付与する。'
	+ '\n3.仮想プライベートカタログの所有ユーザーにRECOVERY_CATALOG_OWNER権限を付与する。'
	+ '\n4.仮想プライベートカタログ専用の表領域を作成する。'
	+ '\n5.通常のリカバリカタログを作成する。'
	+ '\n6.仮想プライベートカタログを作成する。',
	'GOLD参考書23Pを参照'));
	pushChoice('1 → 3 → 2 → 4 → 6', false);
	pushChoice('5 → 1 → 3 → 2 → 4 → 6', false);
	pushChoice('1 → 3 → 2 → 6', false);
	pushChoice('5 → 1 → 3 → 2 → 6', true);
	sortChoice();
	
	// 047
	q_list.push(new Question('以下のデータベースのうち、リカバリカタログに登録できないデータベースをすべて選択しなさい。',
	'GOLD参考書24Pを参照'));
	pushChoice('NOARCHIVELOGモードのデータベース', false);
	pushChoice('ARCHIVELOGモードのデータベース', false);
	pushChoice('リカバリカタログ登録済みのデータベースをDUPLICATEコマンドで複製したデータベース', false);
	pushChoice('リカバリカタログ登録済みのデータベースのバックアップをRESTOREコマンドでリストアして作成したデータベース', true);
	pushChoice('表領域が暗号化されているデータベース', false);
	sortChoice();
	
	// 048
	q_list.push(new Question('BACKUP DATABASEコマンドを実行したときにバックアップされるファイル種別をすべて選択しなさい。',
	'GOLD参考書25Pを参照'));
	pushChoice('SYSTEM表領域のデータファイル', true);
	pushChoice('UNDO表領域のデータファイル', true);
	pushChoice('オンラインログファイル', false);
	pushChoice('制御ファイル', true);
	pushChoice('サーバーパラメータファイル', true);
	pushChoice('テキスト形式の初期化パラメータファイル', false);
	pushChoice('アラートログファイル', false);
	sortChoice();
	
	// 049
	q_list.push(new Question('以下の構成でBACKUP DATABASEを実行したときのバックアップ形式およびバックアップ出力先デバイスを選択しなさい。'
	+ '\n'
	+ '\nRMAN> SHOW ALL;'
	+ '\n'
	+ '\nリカバリカタログの代わりにターゲット・データベース制御ファイルを使用しています'
	+ '\ndb_unique_name ORCLのデータベースにおけるRMAN構成パラメータ:'
	+ '\nCONFIGURE RETENTION POLICY TO REDUNDANCY 1; # default'
	+ '\nCONFIGURE BACKUP OPTIMIZATION OFF; # default'
	+ '\nCONFIGURE DEFAULT DEVICE TYPE TO DISK;'
	+ '\nCONFIGURE CONTROLFILE AUTOBACKUP OFF; # default'
	+ '\nCONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO "%F"; # defualt'
	+ '\nCONFIGURE DEVICE TYPE DISK BACKUP TYPE TO COPY PALALLELISM 1;'
	+ '\nCONFIGURE DATAFILE BACKUP COPIES FOR DEVICE TYPE DISK TO 1; # default'
	+ '\nCONFIGURE ARCHIVELOG BACKUP COPIES FOR DEVICE TYPE DISK TO 1; # default'
	+ '\nCONFIGURE MAXSETSIZE TO UNLIMITED; # default'
	+ '\nCONFIGURE ENCRYPTION FOR DATABASE OFF; # default'
	+ '\nCONFIGURE ENCRYPTION ALGORITHM "AES128"; # default'
	+ '\nCONFIGURE COMPRESSION ALGORITHM "BASIC" AS OF RELEASE "DEFAULT" OPTIMIZE FOR LOAD TRUE; # default'
	+ '\nCONFIGURE RMAN OUTPUT TO KEEP FOR 7 DAYS; # default'
	+ '\nCONFIGURE ARCHIVELOG DELETION POLICY TO NONE; # default'
	+ '\nCONFIGURE SNAPSHOT CONTROLFILE NAME TO "/u01/app/oracle/product/12.1.0/db_1/dbs/snapcf_orcl.f"; # default'
	+ '\n'
	+ '\nRMAN> BACKUP DATABASE;',
	'GOLD参考書26Pを参照'));
	pushChoice('バックアップセット形式', false);
	pushChoice('圧縮バックアップセット形式', false);
	pushChoice('イメージコピー形式', true);
	pushChoice('ディスク形式', true);
	pushChoice('テープ装置', false);
	pushChoice('ディスク領域とテープ装置の両方', false);
	sortChoice();
	
	// 050
	q_list.push(new Question('バックアップ形式を明示的に指定してバックアップを取得するコマンドとして正しいものを2つ選択しなさい。',
	'GOLD参考書27Pを参照'));
	pushChoice('BACKUP AS BACKUPSET DATABASE', true);
	pushChoice('BACKUP AS BACKUPPIECE DATABASE', false);
	pushChoice('BACKUP AS IMAGECOPY TABLESPACE users;', false);
	pushChoice('BACKUP AS COPY TABLESPACE users;', true);
	sortChoice();
	
	// 051
	q_list.push(new Question('データベースとともにアーカイブログファイルをバックアップするコマンドとして正しいものを選択しなさい。',
	'GOLD参考書27Pを参照'));
	pushChoice('BACKUP DATABASE, ARCHIVELOG;', false);
	pushChoice('BACKUP DATABASE AND ARCHIVELOG;', false);
	pushChoice('BACKUP DATABASE PLUS ARCHIVELOG;', true);
	pushChoice('BACKUP DATABASE + ARCHIVELOG;', false);
	sortChoice();
	
	// 052
	q_list.push(new Question('以下のコマンドで実行される処理として正しいものをすべて選択しなさい。'
	+ '\n'
	+ '\nRMAN> BACKUP DATABASE PLUS ARCHIVELOG DELETE INPUT;',
	'GOLD参考書28Pを参照'));
	pushChoice('すべてのデータファイルがバックアップされる', true);
	pushChoice('制御ファイルがバックアップされる', true);
	pushChoice('SPFILEがバックアップされる', true);
	pushChoice('アーカイブログファイルがバックアップされる', true);
	pushChoice('バックアップされたアーカイブログファイルが削除される', true);
	pushChoice('ログスイッチが実行される', true);
	pushChoice('バックアップされた制御ファイルが削除される', false);
	sortChoice();
	
	// 053
	q_list.push(new Question('増分バックアップのメリットとして適切なものを選択しなさい。',
	'GOLD参考書29Pを参照'));
	pushChoice('バックアップ実行時におけるデータファイルの読み取りI/O処理量を減らすことができる', false);
	pushChoice('バックアップファイルのサイズを削減することができる', true);
	pushChoice('障害発生時の復旧時間を短縮することができる', false);
	pushChoice('データベースの起動中にバックアップを取得することができる', false);
	sortChoice();
	
	// 054
	q_list.push(new Question('増分バックアップについてバックアップ処理の内容とコマンドの組み合わせとして正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.更新されていないデータブロックも含めた全体のバックアップを取得する。'
	+ '\n2.直前の増分バックアップ以降で更新されたデータブロックのみのバックアップを取得する。'
	+ '\n3.直前の全体バックアップ以降で更新されたデータブロックのみのバックアップを取得する。'
	+ '\n'
	+ '\ni.BACKUP INCREMENTAL LEVEL 0 DATABASE;'
	+ '\nii.BACKUP INCREMENTAL LEVEL 0 CUMULATIVE DATABASE;'
	+ '\niii.BACKUP INCREMENTAL LEVEL 1 DATABASE;'
	+ '\niv.BACKUP INCREMENTAL LEVEL 1 CUMULATIVE DATABASE;',
	'GOLD参考書30Pを参照'));
	pushChoice('1 → iii、2 → i、3 → ii', false);
	pushChoice('1 → iii、2 → i、3 → i', false);
	pushChoice('1 → i、2 → iii、3 → iv', true);
	pushChoice('1 → i、2 → iv、3 → iii', false);
	sortChoice();
	
	// 055
	q_list.push(new Question('高速増分バックアップを有効にするコマンドとして正しいものを選択しなさい。',
	'GOLD参考書31Pを参照'));
	pushChoice('RMAN> CONFIGURE FAST INCREMENTAL BACKUP ON USING FILE "/disk1/rman_change_track.f";', false);
	pushChoice('RMAN> ALTER DATABASE ENABLE FAST INCREMENTAL BACKUP USING FILE "/disk1/rman_change_track.f";', false);
	pushChoice('RMAN> CONFIGURE BLOCK CHANGE TRACKING ON USING FILE "/disk1/rman_change_track.f";', false);
	pushChoice('RMAN> ALTER DATABASE ENABLE BLOCK CHANGE TRACKING USING FILE "/disk1/rman_change_track.f";', true);
	sortChoice();
	
	// 056
	q_list.push(new Question('RMANを用いた一貫性バックアップに関する説明として正しいものを選択しなさい。',
	'GOLD参考書31Pを参照'));
	pushChoice('インスタンスが完全に停止した状態でバックアップを取得する必要がある', false);
	pushChoice('ARCHIVELOGモードでも、一貫性バックアップを取得できる', true);
	pushChoice('SHUTDOWN ABORTでデータベースを停止しても、その直後にMOUNTモードで起動すれば、一貫性バックアップを取得できる', false);
	pushChoice('データベースの一貫性バックアップを取得するコマンドはBACKUP CONSISTENT DATABASEである', false);
	sortChoice();
	
	// 057
	q_list.push(new Question('RMANコマンドについて、コマンド名とコマンドの説明として正しいものを選択しなさい。',
	'GOLD参考書32Pを参照'));
	pushChoice('LS：バックアップファイル、アーカイブログファイルの確認　RM：バックアップファイル、アーカイブログファイルの削除', false);
	pushChoice('LIST：バックアップファイル、アーカイブログファイルの確認　REMOVE：バックアップファイル、アーカイブログファイルの削除', false);
	pushChoice('LIST：バックアップファイル、アーカイブログファイルの確認　DELETE：バックアップファイル、アーカイブログファイルの削除', true);
	pushChoice('REPORT：バックアップファイル、アーカイブログファイルの確認　DELETE：バックアップファイル、アーカイブログファイルの削除', false);
	sortChoice();
	
	// 058
	q_list.push(new Question('OSコマンドでアーカイブログファイルを削除した状況で、実際のアーカイブログファイルの状態とRMANリポジトリの情報を一致させるために使用するコマンドの組み合わせとして正しいものを選択しなさい。',
	'GOLD参考書33Pを参照'));
	pushChoice('CROSSCHECKコマンドとDELETE EXPIREDコマンド', true);
	pushChoice('RESYNC CATALOGコマンドとDELETE OBSOLETEコマンド', false);
	pushChoice('CROSSCHECKコマンドとDELETE OBSOLETEコマンド', false);
	pushChoice('RESYNC CATALOGコマンドとDELETE EXPIREDコマンド', false);
	sortChoice();
	
	// 059
	q_list.push(new Question('保存ポリシーの観点から不要とみなされるファイルに関する説明について正しいものを2つ選択しなさい。',
	'GOLD参考書34Pを参照'));
	pushChoice('LIST OBSOLETEコマンドで、保存ポリシーの観点から不要なファイルを一覧表示できる', false);
	pushChoice('LIST EXPIREDコマンドで、保存ポリシーの観点から不要なファイルを一覧表示できる', false);
	pushChoice('REPORT OBSOLETEコマンドで、保存ポリシーの観点から不要なファイルを一覧表示できる', true);
	pushChoice('DELETE OBSOLETEコマンドで、保存ポリシーの観点から不要とみなされるファイルを削除できる', true);
	pushChoice('DELETE EXPIREDコマンドで、保存ポリシーの観点から不要とみなされるファイルを削除できる', false);
	sortChoice();
	
	// 060
	q_list.push(new Question('通常の増分バックアップと比較した増分更新バックアップの利点として正しいものを選択しなさい。',
	'GOLD参考書35Pを参照'));
	pushChoice('復旧に要する時間を短縮できる', true);
	pushChoice('バックアップに要する時間を短縮できる', false);
	pushChoice('最後に実行されたレベル0バックアップ以降に更新されたすべてのブロックをバックアップする', false);
	pushChoice('バックアップファイルのサイズを削減できる', false);
	sortChoice();
	
	// 061
	q_list.push(new Question('レベル0の増分バックアップを取得していない状況で以下のコマンドを実行した結果として正しいものを選択しなさい。'
	+ '\n'
	+ '\nBACKUP INCREMENTAL LEVEL 1 DATABASE;',
	'GOLD参考書35Pを参照'));
	pushChoice('エラーが発生し、バックアップ処理が実行されない', false);
	pushChoice('レベル0の増分バックアップが取得される', true);
	pushChoice('レベル1の差分増分バックアップが取得される', false);
	pushChoice('レベル1の累積増分バックアップが取得される', false);
	sortChoice();
	
	// 062
	q_list.push(new Question('バックアップの圧縮に関する説明として正しいものを選択しなさい。',
	'GOLD参考書37Pを参照'));
	pushChoice('バックアップセット形式でデータファイルをバックアップすると、デフォルトでバイナリ圧縮が有効になる', false);
	pushChoice('バックアップセット形式でデータファイルをバックアップすると、デフォルトで未使用ブロックの圧縮が有効となる', true);
	pushChoice('イメージコピー形式でデータファイルをバックアップすると、デフォルトでバイナリ圧縮が有効になる', false);
	pushChoice('イメージコピー形式でデータファイルをバックアップすると、デフォルトで未使用ブロックの圧縮が有効になる', false);
	sortChoice();
	
	// 063
	q_list.push(new Question('バイナリ圧縮のアルゴリズムに関する説明として正しいものを2つ選択しなさい。',
	'GOLD参考書38Pを参照'));
	pushChoice('デフォルトのバイナリ圧縮のアルゴリズムはMEDIUMである', false);
	pushChoice('CPUリソース使用量が大きいバイナリ圧縮のアルゴリズムはHIGHである', true);
	pushChoice('圧縮速度が遅いバイナリ圧縮のアルゴリズムはLOWである', false);
	pushChoice('Oracle Advanced Compressionオプションがない場合に使用できるバイナリ圧縮のアルゴリズムはBASICのみである', true);
	sortChoice();
	
	// 064
	q_list.push(new Question('バイナリ圧縮が適用された圧縮バックアップを取得するため、以下の一連のコマンドを実行します。'
	+ '\n(X)の箇所で実行すべきコマンドを選択しなさい。'
	+ '\n'
	+ '\nRMAN> CONFIGURE DEFAULT DEVICE TYPE TO disk;'
	+ '\nRMAN> (X)'
	+ '\nRMAN> BACKUP DATABASE;',
	'GOLD参考書38Pを参照'));
	pushChoice('CONFIGURE DEVICE TYPE DISK BACKUP TYPE TO COMPRESSED BACKUPSET;', true);
	pushChoice('CONFIGURE COMPRESSED BACKUPSET ON;', false);
	pushChoice('CONFIGURE BACKUPSET COMPRESSION ALGORITHM "MEDIUM";', false);
	pushChoice('CONFIGURE DEFAULT BACKUPSET TO COMPRESSED;', false);
	sortChoice();
	
	// 065
	q_list.push(new Question('パラレルバックアップを取得するため、以下の一連のコマンドを実行します。'
	+ '\n(X)の箇所で実行すべきコマンドを選択しなさい。'
	+ '\n'
	+ '\nRMAN> CONFIGURE DEFAULT DEVICE TYPE TO disk;'
	+ '\nRMAN> (X)'
	+ '\nRMAN> BACKUP DATABASE;',
	'GOLD参考書39Pを参照'));
	pushChoice('CONFIGURE DEVICE TYPE disk PARALLELISM 4;', true);
	pushChoice('CONFIGURE PARALLELISM 4;', false);
	pushChoice('CONFIGURE DEVICE TYPE disk PARALLEL 4;', false);
	pushChoice('CONFIGURE PARALLEL 4;', false);
	sortChoice();
	
	// 066
	q_list.push(new Question('以下のコマンドを実行したときの動作について、正しい説明を選択しなさい。'
	+ '\n'
	+ '\nRMAN> CONFIGURE DEVICE TYPE disk PARALLELISM 4;'
	+ '\nRMAN> RUN {'
	+ '\n2>      ALLOCATE CHANNEL c1 DEVICE TYPE DISK;'
	+ '\n3>      ALLOCATE CHANNEL c2 DEVICE TYPE DISK;'
	+ '\n4>      BACKUP DATABASE;'
	+ '\n5>    }',
	'GOLD参考書40Pを参照'));
	pushChoice('並列度1でバックアップする', false);
	pushChoice('並列度2でバックアップする', true);
	pushChoice('並列度4でバックアップする', false);
	sortChoice();
	
	// 067
	q_list.push(new Question('以下のコマンドを実行したときの動作について、正しい説明を選択しなさい。'
	+ '\n'
	+ '\nRMAN> RUN {'
	+ '\n2>       ALLOCATE CHANNEL c1 DEVICE TYPE DISK;'
	+ '\n3>       ALLOCATE CHANNEL c2 DEVICE TYPE DISK;'
	+ '\n4>       BACKUP'
	+ '\n5>         (DATAFILE 1,2,3 CHANNEL c1)'
	+ '\n6>         (DATAFILE 4,5,6 CHANNEL c2);'
	+ '\n7>    }',
	'GOLD参考書40Pを参照'));
	pushChoice('多重化バックアップでバックアップを取得する', false);
	pushChoice('1つのデータファイルを並列でバックアップする', false);
	pushChoice('並列度2のパラレルバックアップが実行される', true);
	pushChoice('エラーで失敗する', false);
	sortChoice();
	
	// 068
	q_list.push(new Question('Oracle Database 12cのマルチセクションバックアップに関する説明として正しいものを2つ選択しなさい。',
	'GOLD参考書41Pを参照'));
	pushChoice('非常に大きなサイズのデータファイルのバックアップ高速化に有効な場合がある', true);
	pushChoice('小さなサイズのデータファイルが多数ある場合のバックアップ高速化に有効な場合がある', false);
	pushChoice('パラレルバックアップのための複数チャネル設定は不要である', false);
	pushChoice('パラレルバックアップのための複数チャネル設定は必要である', true);
	pushChoice('バックアップ形式はバックアップセットのみが選択可能で、イメージコピーは選択できない', false);
	sortChoice();
	
	// 069
	q_list.push(new Question('データファイルの多重化バックアップセットを取得するため、以下の一連のコマンドを実行します。'
	+ '\n(X)の箇所で実行すべきコマンドを選択しなさい。'
	+ '\n'
	+ '\nRMAN> CONFIGURE DEFAULT DEVICE TYPE TO disk;'
	+ '\nRMAN> CONFIGURE CHANNEL DEVICE TYPE TO DISK FORMAT "/disk1/%U , /disk2/%U";'
	+ '\nRMAN> (X)'
	+ '\nRMAN> BACKUP AS BACKUPSET DATABASE;',
	'GOLD参考書42Pを参照'));
	pushChoice('CONFIGURE MAXCOPYSIZE TO 2', false);
	pushChoice('CONFIGURE DEVICE TYPE DISK COPIES 2 BACKUP TYPE TO BACKUPSET;', false);
	pushChoice('CONFIGURE DEVICE TYPE DISK PARALLELISM 2;', false);
	pushChoice('CONFIGURE DATAFILE BACKUP COPIES FOR DEVICE TYPE DISK TO 2;', true);
	sortChoice();
	
	// 070
	q_list.push(new Question('バックアップを半永久的に保存するため、以下のコマンドを実行しました。'
	+ '\nこのコマンドの説明として正しいものを2つ選択しなさい。'
	+ '\n'
	+ '\nBACKUP KEEP FOREVER DATABASE;',
	'GOLD参考書43Pを参照'));
	pushChoice('リカバリカタログに接続した状態で実行する必要がある', true);
	pushChoice('このコマンドで取得されたバックアップはDELETE OBSOLETEコマンドを実行すると削除される', false);
	pushChoice('デフォルトのバックアップ出力先が高速リカバリ領域に設定されている場合、エラーが発生しバックアップが取得できない', true);
	pushChoice('保存ポリシーが無効化され、以降バックアップしたすべてのバックアップファイルが一切不要とみなされなくなる', false);
	sortChoice();
	
	// 071
	q_list.push(new Question('制御ファイルをバックアップするため、以下のコマンドを実行しました。'
	+ '\nこのコマンドの動作として正しいものを選択しなさい。'
	+ '\n'
	+ '\nSQL> ALTER DATABASE BACKUP CONTROLFILE TO TRACE;',
	'GOLD参考書44Pを参照'));
	pushChoice('高速リカバリ領域に制御ファイルをコピーしたバックアップを作成する', false);
	pushChoice('トレースファイルに制御ファイルを再作成するために実行するCREATE CONTROLFILE文を出力する', true);
	pushChoice('制御ファイルがバックアップされたとき、トレースファイルに詳細情報を出力する', false);
	pushChoice('制御ファイルの自動バックアップを有効化する', false);
	sortChoice();
	
	// 072
	q_list.push(new Question('アーカイブログをバックアップします。'
	+ '\n以下のコマンドで(X)に入るキーワードとして正しいものを選択しなさい。'
	+ '\n'
	+ '\nRMAN> BACKUP ARCHIVELOG (X);',
	'GOLD参考書44Pを参照'));
	pushChoice('ALL', true);
	pushChoice('EXPIRED', false);
	pushChoice('OBSOLETE', false);
	pushChoice('指定不要', false);
	sortChoice();
	
	// 073
	q_list.push(new Question('ASMディスクグループのメタデータをバックアップするため、以下のコマンドを実行しました。'
	+ '\nこのコマンドの動作の説明として正しいものを2つ選択しなさい。'
	+ '\n'
	+ '\nASMCMD> md_backup /disk/ASMDG_metadata.bk -G DG1',
	'GOLD参考書45Pを参照'));
	pushChoice('バックアップしたメタデータは、何らかの理由でASMディスクグループDG1が破損した場合、ASMディスクからASMディスクグループを再度作成するときに使用できる', true);
	pushChoice('データファイルがASMディスクグループDG1に格納されている場合、このデータファイルもあわせてバックアップされる', false);
	pushChoice('バックアップしたメタデータは、/disk1/ASMDG_metadata.bkに出力される', true);
	pushChoice('バックアップしたメタデータは、$ORACLE_HOME/dbs/asmdg.bkに出力される', false);
	sortChoice();
	
	// 074
	q_list.push(new Question('RMANの暗号化バックアップに関する説明として正しいものを3つ選択しなさい。',
	'GOLD参考書46Pを参照'));
	pushChoice('透過モード暗号化バックアップを実行するには、あらかじめキーストアをOPENしておく必要がある', true);
	pushChoice('パスワードモード暗号化バックアップを実行するには、あらかじめキーストアをOPENしておく必要がある', false);
	pushChoice('デュアルモード暗号化バックアップを実行するには、あらかじめキーストアをOPENしておく必要がある', true);
	pushChoice('透過モード暗号化バックアップをリストアするには、あらかじめキーストアをOPENしておく必要がある', true);
	pushChoice('パスワードモード暗号化バックアップをリストアするには、あらかじめキーストアをOPENしておく必要がある', false);
	pushChoice('デュアルモード暗号化バックアップをリストアするには、あらかじめキーストアをOPENしておく必要がある', false);
	sortChoice();
	
	// 075
	q_list.push(new Question('透過モード暗号化バックアップを取得する手段として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.キーストアをOPENします。'
	+ '\n2.SET ENCRYPTION ON IDENTIFIED BY password ONLY;'
	+ '\n3.CONFIGURE ENCRYPTION FOR DATABASE ON;'
	+ '\n4.BACKUP DATABASE;'
	+ '\n5.BACKUP DATABASE ENCRYPTED',
	'GOLD参考書47Pを参照'));
	pushChoice('1 → 2 → 4', false);
	pushChoice('1 → 2 → 5', false);
	pushChoice('1 → 3 → 4', true);
	pushChoice('1 → 3 → 5', false);
	pushChoice('2 → 4', false);
	pushChoice('2 → 5', false);
	sortChoice();
	
	// 076
	q_list.push(new Question('パスワードモード暗号化バックアップを実行化するため、(X)に入るコマンドを選択しなさい。'
	+ '\n'
	+ '\nRMAN> (X)'
	+ '\nRMAN> BACKUP DATABASE;',
	'GOLD参考書48Pを参照'));
	pushChoice('SET ENCRYPTION IDENTIFIED BY password ONLY;', false);
	pushChoice('SET ENCRYPTION ON FOR ALL TABLESPACE IDENTIFIED BY password ONLY;', true);
	pushChoice('SET ENCRYPTION IDENTIFIED BY password;', false);
	pushChoice('SET ENCRYPTION ON FOR ALL TABLESPACE IDENTIFIED BY password;', false);
	sortChoice();
	
	// 077
	q_list.push(new Question('デュアル暗号化バックアップに関する説明として正しいものを3つ選択しなさい。',
	'GOLD参考書49Pを参照'));
	pushChoice('バックアップ時にはキーストアがOPENされている必要がある', true);
	pushChoice('バックアップ時にキーストアを使用するかどうかは状況に応じて選択できる', false);
	pushChoice('リストア先の環境でバックアップ時に使用したキーストアが使用できない場合、バックアップ時に指定したパスワードでバックアップをリストアできる', true);
	pushChoice('リストア先の環境でバックアップ時に使用したキーストアが使用できない場合、バックアップ時に使用したキーストアのパスワードでバックアップをリストアできる', false);
	pushChoice('バックアップ取得時において、パスワードを指定するSET ENCRYPTION ON IDENTIFIED BY コマンドにONLY句を指定する', false);
	pushChoice('バックアップ取得時において、パスワードを指定するSET ENCRYPTION ON IDENTIFIED BY コマンドにONLY句を指定しない', true);
	sortChoice();
	
	// 078
	q_list.push(new Question('OracleインスタンスのADRベースのディレクトリパスを設定する初期化パラメータとして正しいものを選択してください。',
	'GOLD参考書50Pを参照'));
	pushChoice('AUDIT_FILE_DEST', false);
	pushChoice('BACKGROUP_DUMP_DEST', false);
	pushChoice('CORE_DUMP_DEST', false);
	pushChoice('DB_CREATE_FILE_DEST', false);
	pushChoice('DB_RECOVERY_FILE_DEST', false);
	pushChoice('DIAGNOSTIC_DEST', true);
	sortChoice();
	
	// 079
	q_list.push(new Question('以下に示す構成の環境において、OracleインスタンスのADRベースおよびADRホームとなるディレクトリパスの組み合わせとして正しいものを選択しなさい。'
	+ '\n'
	+ '\nDIAGNOSTIC_DEST初期化パラメータは未設定'
	+ '\n環境変数ORACLE_BASE=/u01/app/oracle'
	+ '\n環境変数ORACLE_HOME=/u01/app/oracle/product/12.1.0/db_1'
	+ '\nデータベース名、ORACLE_SIDともにorcl',
	'GOLD参考書51Pを参照'));
	pushChoice('ADRベース：/u01/app/oracle/　ADRホーム：/u01/app/oracle/diag/rdbms/orcl/orcl', true);
	pushChoice('ADRベース：/u01/app/oracle/　ADRホーム：/u01/app/oracle/rdbms/orcl/orcl', false);
	pushChoice('ADRベース：/u01/app/oracle/　ADRホーム：/u01/app/oracle/product/12.1.0/db_1/', false);
	pushChoice('ADRベース：/u01/app/oracle/product/12.1.0/db_1/　ADRホーム：/u01/app/oracle/rdbms/orcl/orcl', false);
	sortChoice();
	
	// 080
	q_list.push(new Question('ADRに格納されるデータを2つ選択しなさい。',
	'GOLD参考書52Pを参照'));
	pushChoice('バックアップファイル', false);
	pushChoice('アーカイブログファイル', false);
	pushChoice('アラートログファイル', true);
	pushChoice('トレースファイル', true);
	pushChoice('AWRスナップショット', false);
    sortChoice();
    
    // 081
    q_list.push(new Question('メディア・リカバリが必要なシナリオはどれですか。',
    'データファイルが破損した場合はメディアリカバリが必要である。'
    + '\n多重化している制御ファイルの一部が失われた場合は、正常な制御ファイルをコピーすればよい。'
    + '\n必要なアーカイブログファイルを誤って削除した場合は、バックアップをすぐに取り直せば問題ない。'
    + '\nインスタンスが異常終了した場合はインスタンスリカバリが自動的に行われる。'
    + '\n必要な表を削除してすぐに気づいた場合にはフラッシュバックドロップで復旧が可能。'
    + '\n一時表領域は再作成が可能である。'));
    pushChoice('多重化している制御ファイルの一部が失われた場合', false);
    pushChoice('必要なアーカイブログファイルを誤って削除した場合', false);
    pushChoice('インスタンスが異常終了した場合', false);
    pushChoice('必要な表を削除してしまい、すぐに気づいた場合', false);
    pushChoice('データファイルが破損した場合', true);
    pushChoice('一時表領域を構成するファイルがすべて破損した場合', false);
    sortChoice();

    // 082
    q_list.push(new Question('NOARCHIVELOGモードで運用しているデータベースで、USER表領域に属するデータファイルの一つが破損しました。'
    + '\nインスタンスは停止しています。'
    + '\nオンラインREDOログは、最新のバックアップ以後にすべて上書きされています。'
    + '\nデータベースを再起動するには、何を行いますか。',
    'NOARCHIVELOGの場合は、すべてのデータファイルと制御ファイルをリストアする必要がある。'));
    pushChoice('最新のバックアップから破損したデータファイルをリストアして、インスタンスを再起動する', false);
    pushChoice('最新のバックアップからUSER表領域に属するすべてのデータファイルをリストアし、インスタンスを再起動する', false);
    pushChoice('最新のバックアップからすべてのデータファイルをリストアし、インスタンスを再起動する', false);
    pushChoice('最新のバックアップからすべてのデータファイルと制御ファイルをリストアし、UNTIL CANCELオプションをつけて不完全リカバリを行う', true);
    sortChoice();

    // 083
    q_list.push(new Question('CONFIGUREコマンドで設定できることはどれですか。'
    + '\n2つ選択してください。',
    'バックアップピースのサイズの制限　→　CONFIGURE MAXPIECESIZE'
    + '\nセクションサイズの制限　→　BACKUPコマンドで設定'
    + '\nブロック変更トラッキングの有効・無効　→　ALTER DATABASE ENABLE BLOCK CHANGE TRACKING;'
    + '\n表領域ごとの暗号化の有効・無効　→　CONFIGURE ENCRYPTION FOR TABLESPACE <表領域名> ON;'));
    pushChoice('バックアップピースのサイズの制限', true);
    pushChoice('セクションサイズの制限', false);
    pushChoice('フロック変更トラッキングの有効・無効', false);
    pushChoice('表領域ごとの暗号化の有効・無効', true);
    sortChoice();

    // 084
    q_list.push(new Question('リカバリカタログが必須となるケースを3つ選択してください。',
    '他にRMANストアドスクリプトを使用する場合、保存先がリカバリカタログとなるため必須である。'));
    pushChoice('KEEP FOREVER句をつけてバックアップを取得する場合', true);
    pushChoice('Data Gurad環境でRMANを使用する場合', true);
    pushChoice('不完全リカバリを行う場合', false);
    pushChoice('AT time句をつけてREPORT SCHEMAコマンドを実行する場合', true);
    pushChoice('制御ファイルの自動バックアップを有効化する場合', false);
    pushChoice('常にオンラインで稼働する必要があるシステム', false);
    sortChoice();

    // 085
    q_list.push(new Question('常に稼働しているシステムがあります。'
    + '\n最低限、満たす必要がある項目はどれですか。',
    'オンラインでバックアップを取得するためにはARCHIVELOGモードである必要がある。'
    + '\nbackupモードで運用するとログの生成量が増加し、パフォーマンスが低下する。'));
    pushChoice('制御ファイルの自動バックアップを設定する', false);
    pushChoice('フラッシュバックログを有効化する', false);
    pushChoice('高速リカバリ領域をASMに格納する', false);
    pushChoice('一時ファイル以外のすべてのデータファイルをbackupモードで運用する', false);
    pushChoice('ARCHIVELOGモードで運用する', true);
    sortChoice();

    // 086
    q_list.push(new Question('毎週土曜日に、使用されているすべてのデータファイルのイメージコピーを取り直す。'
    + '\n他の曜日は、前日取得したバックアップを使用し、イメージコピーを更新し、更に前回のバックアップ以降に変更されたブロックのみバックアップする。'
    + '\n各曜日に実行するコマンドとして、正しい組み合わせはどれですか。'
    + '\n'
    + '\na.BACKUP AS COPY DATABASE;'
    + '\nb.BACKUP AS COPY INCREMENTAL LEVEL 0 DATABASE;'
    + '\nc.RECOVER COPY OF DATABASE WITH TAG "DAILY";'
    + '\nd.BACKUP INCREMENTAL LEVEL 1 FOR RECOVER OF COPY WITH TAG "DAILY" DATABASE;'
    + '\ne.BACKUP INCREMENTAL LEVEL 1 CUMULATIVE DATABASE;',
    ''));
    pushChoice('土曜日：a、他の曜日：c,d', false);
    pushChoice('土曜日：b、他の曜日：c,d', true);
    pushChoice('土曜日：a、他の曜日：c,e', false);
    pushChoice('土曜日：b、他の曜日：c,e', false);
    sortChoice();

    // 087
    q_list.push(new Question('10TBのデータファイルをバックアップしようと考えています。'
    + '\nデータファイルのバックアップが遅く困っています。'
    + '\nどのタイプのバックアップにすればよいですか。',
    ''));
    pushChoice('RMANによる多重化バックアップ', false);
    pushChoice('RMANによるマルチセクションバックアップ', true);
    pushChoice('高速リカバリ領域へのバックアップ', false);
    pushChoice('RMANによる圧縮バックアップ', false);
    pushChoice('コールドバックアップ', false);
    sortChoice();

    // 088
    q_list.push(new Question('次のコマンドを確認してください。'
    + '\n'
    + '\nRMAN> CONFIGURE ENCRYPTION FOR TABLESPACE <表領域名> ON'
    + '\nRMAN> BACKUP DATABASE PLUS ARCHIVELOG'
    + '\n'
    + '\nバックアップを行うにはどの前提条件が満たされている必要がありますか。',
    '暗号化用のパスワードを設定しておく　→　パスワードモードの暗号化'
    + '\nOracleウォレットを設定しておく　→　透過モードの暗号化'));
    pushChoice('暗号化用のパスワードを設定しておく', false);
    pushChoice('Oracleウォレットを設定しておく', true);
    pushChoice('該当の表領域をTDEで暗号化しておく', false);
    pushChoice('統合監査を設定しておく', false);
    sortChoice();

    // 089
    q_list.push(new Question('次の一連のコマンドを実行しました。'
    + '\n'
    + '\nRMAN> BACKUP VALIDATE DATABASE;'
    + '\nRMAN> RECOVER CORRUPTION LIST;'
    + '\n'
    + '\n正しい説明を選択してください。',
    '破損ブロックを含むデータファイルをオフラインにしておく必要がある　→　ブロックメディアリカバリはオンラインでリカバリ可能'
    + '\n一連のコマンドにより、バックアップの破損が修復される　→　このコマンドで行われるのはデータベースの修復でありバックアップの修復ではない'
    + '\nNOARCHIVELOGモードでも修復できる　→　ブロックメディアリカバリはARCHIVELOGモード'));
    pushChoice('V$DATABASE_BLOCK_CORRUPTIONを問い合わせ、破損ブロックを含むデータファイルをオフラインにしておく必要がある', false);
    pushChoice('一連のコマンドにより、バックアップの破損が修復される', false);
    pushChoice('全体バックアップもしくはレベル0のバックアップが必要である', true);
    pushChoice('NOARCHIVELOGモードでも修復できる', false);
    sortChoice();
    
    // 090
	q_list.push(new Question('ADRの実体に関する説明として正しいものを選択しなさい。',
	'GOLD参考書52Pを参照'));
	pushChoice('SYSAUX表領域に格納されたデータの集合体', false);
	pushChoice('あるディレクトリ以下にあるログファイルの集合体', true);
	pushChoice('高速リカバリ領域に出力されるバックアップファイルおよびアーカイブログファイルの集合体', false);
	pushChoice('データベースの管理情報、内部動作情報をSELECT文から問い合わせ可能な特殊なビューの集合体', false);
	sortChoice();
	
	// 091
	q_list.push(new Question('データブロックおよびブロック破損に関する説明として正しいものを選択しなさい。',
	'GOLD参考書53Pを参照'));
	pushChoice('データブロックの中身が破損し、Oracleのブロックとして不正なフォーマットになる種の破損をブロックの論理破損と呼ぶ', false);
	pushChoice('RMANのBACKUPコマンドにCHECK CORRUPT句を指定すると、バックアップ取得時にブロック破損をチェックする', false);
	pushChoice('RMANのBACKUP VALIDATEコマンドを実行すると、バックアップの取得とあわせてブロック破損のチェックを行う', false);
	pushChoice('RMANによる破損ブロックチェックで検出されたブロック破損に関する情報は、V$DATABASE_BLOCK_CORRUPTIONビューに格納される', true);
	pushChoice('ブロック破損を修復するには、データベース管理者によるバックアップのリストアおよびリカバリ作業が必要である', false);
	sortChoice();
	
	// 092
	q_list.push(new Question('RMANのコマンドを用いて、データベース全体のブロック破損をチェックし、検出されたすべてのブロック破損を修復したいと考えます。'
	+ '\n最も少ない手順で目的を達成できる手順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.BACKUP VALIDATE DATABASE;'
	+ '\n2.BACKUP VALIDATE DATAFILE ALL;'
	+ '\n3.RECOVER ALL CORRUPTIONS;'
	+ '\n4.RECOVER CORRUPTION LIST;'
	+ '\n5.検出されたすべての破損ブロックに対して、以下のコマンドを実行'
	+ '\n'
	+ '\nRECOVER DATAFILE <ファイル番号> BLOCK <ブロック番号>;',
	'GOLD参考書53Pを参照'));
	pushChoice('1 → 3', false);
	pushChoice('1 → 4', true);
	pushChoice('1 → 5', false);
	pushChoice('2 → 3', false);
	pushChoice('2 → 4', false);
	pushChoice('2 → 5', false);
	sortChoice();
	
	// 093
	q_list.push(new Question('データリカバリアドバイザに関する説明として正しいものを選択しなさい。',
	'GOLD参考書54Pを参照'));
	pushChoice('通常のメディア障害からの復旧（リストア、リカバリ）とはまったく異なる仕組みを用いて、障害から復旧できる', false);
	pushChoice('利用者の誤操作などに起因する人為的なデータロスを取り消すことができる', false);
	pushChoice('RACデータベースをサポートしていない', true);
	pushChoice('データリカバリアドバイザを使用するには、Oracle Enterprise Managerから操作を行う必要がある', false);
	sortChoice();
	
	// 094
	q_list.push(new Question('データリカバリアドバイザを用いてデータベースメディアのメディア障害から復旧するために、RMANで実行すべき一覧のコマンドの実行順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.CHECK FAILURE'
	+ '\n2.LIST FAILURE'
	+ '\n3.ADVISE FAILURE'
	+ '\n4.ANALYZE FAILURE'
	+ '\n5.REPAIR FAILURE'
	+ '\n6.FIX FAILURE',
	'GOLD参考書55Pを参照'));
	pushChoice('1 → 3 → 5', false);
	pushChoice('1 → 3 → 6', false);
	pushChoice('1 → 4 → 5', false);
	pushChoice('2 → 4 → 6', false);
	pushChoice('2 → 3 → 5', true);
	pushChoice('2 → 3 → 6', false);
	sortChoice();
	
	// 095
	q_list.push(new Question('メディア障害発生時の動作に関する説明として正しいものを3つ選択しなさい。',
	'GOLD参考書56Pを参照'));
	pushChoice('SYSTEM表領域およびUNDO表領域以外の永続表領域を構成するデータファイルに障害が発生した場合、インスタンスは自動的に強制停止する', false);
	pushChoice('SYSTEM表領域を構成するデータファイルに障害が発生した場合、インスタンスは自動的に強制停止する', true);
	pushChoice('UNDO表領域を構成するデータファイルに障害が発生した場合、インスタンスは自動的に強制停止する', true);
	pushChoice('ある1つのデータファイルが破損した場合、そのデータファイルで構成される表領域全体をリストア／リカバリする必要がある', false);
	pushChoice('ある1つのデータファイルが破損した場合、そのデータファイルだけをリストア／リカバリする', true);
	sortChoice();
	
	// 096
	q_list.push(new Question('RMANのRESTOREコマンドとRECOVERコマンドに関する説明として正しいものを選択しなさい。',
	'GOLD参考書57Pを参照'));
	pushChoice('RESTOREコマンドを実行すると、障害が発生したファイルを自動的に特定し、そのファイルについてリストア処理が実行される', false);
	pushChoice('RESTOREコマンドを実行すると、最新のバックアップファイルを自動的に特定し、そのバックアップファイルからファイルをリストアする', true);
	pushChoice('RECOVERコマンドを実行すると、必要なアーカイブログファイルに含まれるREDOを適用する。しかし、オンラインログファイルに含まれるREDO適用は行わない', false);
	pushChoice('差分増分バックアップを取得している場合、RESTOREコマンド実行時にレベル0の増分バックアップに対してレベル1の差分増分バックアップが適用される', false);
	pushChoice('バックアップセットがRMANバイナリ圧縮されている場合は、RESTOREコマンドにUNCOMPRESS句を指定する必要がある', false);
	sortChoice();
	
	// 097
	q_list.push(new Question('表領域EXAMPLEを構成するデータファイル/u01/app/oracle/oradata/orcl/example01.dbfにメディア障害が発生しました。'
	+ '\nデータベースはARCHIVELOGモードで運用されています。'
	+ '\n障害を復旧するために実行すべきリストア／リカバリコマンドを選択しなさい。'
	+ '\nなお、複数の方法が選択可能な場合は、最も処理時間が短いと予想される方法を選択すること。',
	'GOLD参考書57Pを参照'));
	pushChoice('ALTER TABLESPACE example OFFLINE IMMEDIATE; RESTORE DATAFILE <path>; RECOVER DATAFILE <path>; ALTER TABLESPACE example ONLINE;', true);
	pushChoice('ALTER TABLESPACE example OFFLINE IMMEDIATE; RESTORE DATAFILE example; RECOVER DATAFILE example; ALTER TABLESPACE example ONLINE;', false);
	pushChoice('ALTER TABLESPACE example OFFLINE IMMEDIATE; RESTORE TABLESPACE example; RECOVER TABLESPACE example; ALTER TABLESPACE example ONLINE;', false);
	pushChoice('ALTER TABLESPACE example OFFLINE IMMEDIATE; RESTORE TABLESPACE; RECOVER TABLESPACE; ALTER TABLESPACE example ONLINE;', false);
	sortChoice();
	
	// 098
	q_list.push(new Question('NOARCHIVELOGモードのデータベースにおいて、メディア障害が発生した場合の復旧に関する説明として正しいものを選択しなさい。',
	'GOLD参考書59Pを参照'));
	pushChoice('破損したファイルのみをリストアすれば、破損していないファイルはそのまま使用できる', false);
	pushChoice('障害発生直前の状態に復旧できる', false);
	pushChoice('バックアップセット形式、イメージコピー形式の両方バックアップ形式に対応している', true);
	pushChoice('オンラインログファイルが不要な場合にのみ、RESETLOGオプション付きでデータベースをオープンする必要がある。オンラインログファイルが必要な場合は、RESETLOGSオプションを指定する必要はない', false);
	sortChoice();
	
	// 099
	q_list.push(new Question('NOARCHIVELOGモードのデータベースにおいて、表領域EXAMPLEを構成するデータファイル/u01/app/oracle/oradata/orcl/example01.dbfにメディア障害が発生しました。'
	+ '\n復旧作業において、RMANで実行すべき一連のコマンドの実行順として正しいものを選択しなさい。'
	+ '\nなお、制御ファイルは自動バックアップからリストアすることとします。'
	+ '\n'
	+ '\n1.STARTUP NOMOUNT'
	+ '\n2.STARTUP MOUNT'
	+ '\n3.RESTORE CONTROLFILE FROM AUTOBACKUP;'
	+ '\n4.ALTER TABLESPACE example OFFLINE IMMEDIATE;'
	+ '\n5.RESTORE DATAFILE <path>;'
	+ '\n6.RECOVER DATAFILE <path>;'
	+ '\n7.ALTER TABLESPACE example ONLINE;'
	+ '\n8.ALTER DATABASE MOUNT;'
	+ '\n9.RESTORE DATABASE;'
	+ '\n10.RECOVER DATABASE;'
	+ '\n11.ALTER DATABASE OPEN;'
	+ '\n12.ALTER DATABASE OPEN RESETLOGS;',
	'GOLD参考書59Pを参照'));
	pushChoice('1 → 3 → 8 → 9 → 10 → 12', false);
	pushChoice('2 → 3 → 8 → 9 → 10 → 12', false);
	pushChoice('1 → 3 → 8 → 9 → 12', true);
	pushChoice('2 → 3 → 8 → 9 → 11', false);
	pushChoice('1 → 3 → 8 → 4 → 5 → 7 → 12', false);
	pushChoice('2 → 3 → 9 → 12', false);
	sortChoice();
	
	// 100
	q_list.push(new Question('NOARCHIVELOGモードのデータベースで、差分増分バックアップを用いてバックアップを取得しているとします。'
	+ '\nメディア障害が発生時の復旧作業において、RMANで実行すべき一連のコマンドの実行順として正しいものを選択しなさい。'
	+ '\nなお、制御ファイルは自動バックアップからリストアすることとします。'
	+ '\n'
	+ '\n1.STARTUP NOMOUNT'
	+ '\n2.RESTORE CONTROLFILE FROM BACKUP;'
	+ '\n3.ALTER DATABASE MOUNT;'
	+ '\n4.RESTORE DATABASE;'
	+ '\n5.RESTORE DATABASE NOREDO;'
	+ '\n6.RECOVER DATABASE;'
	+ '\n7.RECOVER DATABASE NOREDO;'
	+ '\n8.ALTER DATABASE OPEN RESETLOGS;',
	'GOLD参考書61Pを参照'));
	pushChoice('1 → 2 → 3 → 4 → 7 → 8', true);
	pushChoice('1 → 2 → 3 → 5 → 7 → 8', false);
	pushChoice('1 → 2 → 3 → 5 → 6 → 8', false);
	pushChoice('1 → 2 → 3 → 5 → 8', false);
	sortChoice();
	
	// 101
	q_list.push(new Question('一時ファイルが失われた場合の復旧手順として正しいものを選択しなさい。'
	+ '\nなお、できる限りデータベースの動作に影響を与えず、現行の構成を維持できる方法を選ぶこと。',
	'GOLD参考書62Pを参照'));
	pushChoice('一時表領域をIMMEDIATEモードでオフラインにした後、一時ファイルをリストア／リカバリし、一時表領域をオンラインにする', false);
	pushChoice('失われた一時ファイルを削除した後、同様の構成で一時ファイルを改めて作成する', true);
	pushChoice('インスタンスが強制停止されるため、MOUNTモードでインスタンスを起動した後、一時ファイルをリストア／リカバリし、データベースをOPENする', false);
	pushChoice('新しい一時表領域を作成し、この表領域をデータベースおよびユーザーのデフォルト一時表領域とする', false);
	pushChoice('インスタンスを再起動する', false);
	sortChoice();
	
	// 102
	q_list.push(new Question('索引専用の表領域（索引だけ格納していた表領域）を構成するデータファイルが失われた場合の復旧手順として正しいものを2つ選択しなさい。',
	'GOLD参考書63Pを参照'));
	pushChoice('表領域をIMMEDIATEモードでオフラインにした後、表領域を構成するデータファイルをリストア／リカバリし、表領域をオンラインにする', true);
	pushChoice('失われたデータファイルを削除した後、同様の構成でデータファイルを改めて作成する', false);
	pushChoice('インスタンスが強制停止されるため、MOUNTモードでインスタンスを起動した後、データファイルをリストア／リカバリし、データベースをOPENする', false);
	pushChoice('破損した表領域を再作成してから、破損した表領域に格納されていた索引を再作成する', true);
	pushChoice('インスタンスを再起動する', false);
	sortChoice();
	
	// 103
	q_list.push(new Question('読み取り専用表領域のバックアップと復旧に関する説明として正しいものを2つ選択しなさい。',
	'GOLD参考書63Pを参照'));
	pushChoice('デフォルトのRMAN設定で、読み取り専用表領域のバックアップがスキップされることがある', false);
	pushChoice('RMANでバックアップの最適化設定を有効にすると、読み取り専用表領域のバックアップがスキップされることがある', true);
	pushChoice('読み取り専用表領域を構成するとデータファイルに障害が発生した場合、復旧にはデータファイルのリストアとリカバリが必要である', false);
	pushChoice('読み取り専用表領域を構成するデータファイルに障害が発生した場合、復旧にはデータファイルのリストアのみが必要である', true);
	sortChoice();
	
	// 104
	q_list.push(new Question('SPFILEが失われた場合の復旧手順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.バックアップからSPFILEをリストアする。'
	+ '\n2.バックアップからテキスト形式の初期化パラメータファイル（PFILE）をリストアする。'
	+ '\n3.リストアしたPFILEからSPFILEを作成する。'
	+ '\n4.仮のSPFILEを用いてNOMOUNTモードでインスタンスを起動する。'
	+ '\n5.リストアしたSPFILEを用いてインスタンスを再起動する。'
	+ '\n6.リストアしたPFILEを用いてインスタンスを再起動する。'
	+ '\n7.DBIDを設定する。',
	'GOLD参考書64Pを参照'));
	pushChoice('7 → 1 → 5', false);
	pushChoice('4 → 7 → 1 → 5', true);
	pushChoice('7 → 2 → 6', false);
	pushChoice('4 → 7 → 2 → 6', false);
	pushChoice('7 → 2 → 3 → 6', false);
	pushChoice('4 → 7 → 2 → 3 → 6', false);
	sortChoice();
	
	// 105
	q_list.push(new Question('多重化されたすべての制御ファイルが失われた場合の復旧手順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.NOMOUNTモードでデータベースを起動する。'
	+ '\n2.MOUNTモードでデータベースを起動する。'
	+ '\n3.RESTORE CONTROLFILEを実行して、バックアップ制御ファイルをリストアする。'
	+ '\n4.ALTER DATABASE MOUNTを実行してMOUNTモードに遷移する。'
	+ '\n5.ALTER DATABASE OPENを実行してデータベースをオープンする。'
	+ '\n6.ALTER DATABASE RESETLOGSを実行してデータベースをオープンする。'
	+ '\n7.RECOVER DATABASEを実行してデータベースをリカバリする。',
	'GOLD参考書65Pを参照'));
	pushChoice('1 → 3 → 4 → 7 → 6', true);
	pushChoice('2 → 3 → 4 → 7 → 6', false);
	pushChoice('1 → 3 → 4 → 5', false);
	pushChoice('2 → 3 → 4 → 5', false);
	pushChoice('1 → 3 → 5', false);
	pushChoice('2 → 3 → 6', false);
	sortChoice();
	
	// 106
	q_list.push(new Question('多重化された制御ファイルのうち、1つの制御ファイルが失われた場合の復旧手順として正しいものを選択しなさい。'
	+ '\nなお、複数の方法が存在する場合は、復旧による影響が最も少ないものを選ぶこと。',
	'GOLD参考書66Pを参照'));
	pushChoice('制御ファイルのバックアップをリストアする', false);
	pushChoice('正常な制御ファイルをコピーする', true);
	pushChoice('CREATE CONTROLFILE文を実行する', false);
	pushChoice('CONTROL_FILES初期化パラメータを変更する', false);
	sortChoice();
	
	// 107
	q_list.push(new Question('制御ファイルを新しい場所に移動する手段として正しいものを選択しなさい。'
	+ '\n現時点でインスタンスは起動中とします。'
	+ '\n'
	+ '\n1.OSのファイルコピーコマンドで制御ファイルを新しい場所にコピーする。'
	+ '\n2.NOMOUNTモードでデータベースを起動する。'
	+ '\n3.MOUNTモードでデータベースを起動する。'
	+ '\n4.通常のモードでデータベースを起動する。'
	+ '\n5.ALTER DATABASE MOUNTを実行してMOUNTモードに遷移する。'
	+ '\n6.ALTER DATABASE OPENを実行してデータベースをオープンする。'
	+ '\n7.ALTER SYSTEM SET CONTORL_FILES...SCOPE=SPFILEを実行して、CONTROL_FILES初期化パラメータを変更する。'
	+ '\n8.ALTER SYSTEM SET CONTORL_FILES...SCOPE=BOTHを実行して、CONTROL_FILES初期化パラメータを変更する。'
	+ '\n9.インスタンスを停止する。',
	'GOLD参考書67Pを参照'));
	pushChoice('8 → 9 → 1 → 4', false);
	pushChoice('7 → 9 → 1 → 4', true);
	pushChoice('9 → 1 → 2 → 7 → 5 → 6', false);
	pushChoice('9 → 1 → 2 → 4', false);
	pushChoice('9 → 1 → 3 → 7 → 5 → 6', false);
	pushChoice('9 → 1 → 3 → 4', false);
	sortChoice();
	
	// 107
	q_list.push(new Question('SPFILE、制御ファイルおよびすべてのデータファイルが失われた場合の復旧手順として正しいものを選択しなさい。'
	+ '\nなお、データベースはARCHIVELOGモードで運用されており、リカバリカタログは使用していないものとします。'
	+ '\n'
	+ '\n1.バックアップからSPFILEをリストアする。'
	+ '\n2.バックアップからPFILEをリストアする。'
	+ '\n3.リストアしたPFILEからSPFILEを作成する。'
	+ '\n4.仮のSPFILEを用いてNOMOUNTモードでインスタンスを起動する。'
	+ '\n5.リストアしたSPFILEを用いてインスタンスを再起動する。'
	+ '\n6.リストアしたPFILEを用いてインスタンスを再起動する。'
	+ '\n7.DBIDを設定する。'
	+ '\n8.RESTORE CONTROLFILEを実行して、バックアップ制御ファイルをリストアする。'
	+ '\n9.RECOVER CONTROLFILEを実行して、バックアップ制御ファイルをリカバリする。'
	+ '\n10.ALTER DATABASE MOUNTを実行してMOUNTモードに遷移する。'
	+ '\n11.ALTER DATABASE OPENを実行してデータベースをオープンする。'
	+ '\n12.ALTER DATABASE OPEN RESETLOGSを実行してデータベースをオープンする。'
	+ '\n13.RESTORE DATABASEを実行して、すべてのデータファイルをリストアする。'
	+ '\n14.RECOVER DATABASEを実行して、すべてのデータファイルをリカバリする。',
	'GOLD参考書68Pを参照'));
	pushChoice('4 → 7 → 1 → 5 → 8 → 10 → 13 → 14 → 11', false);
	pushChoice('4 → 7 → 1 → 5 → 8 → 10 → 13 → 14 → 12', true);
	pushChoice('4 → 7 → 1 → 5 → 8 → 10 → 13 → 12', false);
	pushChoice('4 → 7 → 1 → 5 → 8 → 9 → 10 → 13 → 14 → 11', false);
	pushChoice('4 → 7 → 1 → 5 → 8 → 9 → 10 → 13 → 14 → 12', false);
	pushChoice('4 → 7 → 1 → 5 → 8 → 9 → 10 → 13 → 14 ', false);
	sortChoice();
	
	// 108
	q_list.push(new Question('オンラインログファイルにおける破損で、不完全リカバリが必要な状況を2つ選択しなさい。',
	'GOLD参考書69Pを参照'));
	pushChoice('カレントなロググループの全メンバーが破損し、ログのクリアに失敗した場合', true);
	pushChoice('カレントなロググループの全メンバーが破損し、ログのクリアに成功した場合', false);
	pushChoice('アクティブなロググループの全メンバーが破損し、チェックポイントの実行に失敗した場合', true);
	pushChoice('アクティブなロググループの全メンバーが破損し、チェックポイントの実行に成功した場合', false);
	pushChoice('非アクティブなロググループの全メンバーが破損した場合', false);
	sortChoice();
	
	// 109
	q_list.push(new Question('メディアリカバリにおいて、RESETLOGSオプション付きでのデータベースOPENが必要な状況をすべて選択しなさい。',
	'GOLD参考書70Pを参照'));
	pushChoice('不完全リカバリ実行時', true);
	pushChoice('完全リカバリ実行時', false);
	pushChoice('NOARCHIVELOGモードのデータベースでメディアリカバリが必要な障害が発生した場合', true);
	pushChoice('フラッシュバックデータベースを実行した場合', true);
	pushChoice('制御ファイルをリストアした場合', true);
	pushChoice('サーバーパラメータファイルをリストアした場合', false);
	sortChoice();
	
	// 110
	q_list.push(new Question('ディスク障害によりカレントのオンラインログファイルの全メンバーが破損し、インスタンスが強制終了されました。'
	+ '\n障害が発生したディスクは使用できないため、新しい場所にオンラインログファイルを配置する必要があります。'
	+ '\n復旧手順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.RESTORE DATABASEを実行し、すべてのデータファイルをリストアする。'
	+ '\n2.RESTORE LOGFILEを実行し、破損したオンラインログファイルをリストアする。'
	+ '\n3.RECOVER DATABASEを実行し、完全リカバリを行う。'
	+ '\n4.破損していないオンラインログファイルのログ順序番号を復旧ターゲットに指定して、不完全リカバリを行う。'
	+ '\n5.ALTER DATABASE RENAME FILEを実行して、破損したオンラインログファイルを新しい場所に移動する。'
	+ '\n6.ALTER DATABASE OPENを実行して、データベースをOPENする。'
	+ '\n7.ALTER DATABASE OPEN RESETLOGSを実行して、データベースをOPENする。',
	'GOLD参考書70Pを参照'));
	pushChoice('1 → 4 → 5 → 6', false);
	pushChoice('1 → 2 → 4 → 5 → 6', false);
	pushChoice('1 → 4 → 6', false);
	pushChoice('1 → 2 → 4 → 7', false);
	pushChoice('1 → 4 → 5 → 7', true);
	pushChoice('1 → 2 → 4 → 5 → 7', false);
	sortChoice();
	
	// 111
	q_list.push(new Question('不完全リカバリを実行するためのコマンドとして正しいものを選択しなさい。'
	+ '\n復旧ターゲットはログ順序番号10とします。',
	'GOLD参考書71Pを参照'));
	pushChoice('RUN { SET UNTIL SEQUENCE=10; RESTORE DATABASE; RECOVER DATABASE; }', true);
	pushChoice('RUN { UNTIL SEQUENCE=10; RESTORE DATABASE; RECOVER DATABASE; }', false);
	pushChoice('RESTORE DATABASE; RECOVER DATABASE UNTIL SEQUENCE=10;', false);
	pushChoice('RUN { RESTORE DATABASE; RECOVER DATABASE UNTIL SEQUENCE=10; }', false);
	sortChoice();
	
	// 112
	q_list.push(new Question('表のリカバリに関する説明として正しいものをすべて選択しなさい。',
	'GOLD参考書73Pを参照'));
	pushChoice('復旧ターゲットに対応するバックアップが必要である', true);
	pushChoice('ターゲットデータベースはARCHIVELOGモードである必要がある', true);
	pushChoice('ターゲットデータベースはMOUNTモードで起動している必要がある', false);
	pushChoice('SYSスキーマの表に対して表リカバリを実行できない', true);
	pushChoice('SYSTEM表領域およびSYSAUX表領域の表に対して表リカバリを実行できない', true);
	pushChoice('リカバリ対象の表に作成されていた制約と索引は常にインポートされない', false);
	sortChoice();
	
	// 113
	q_list.push(new Question('表のリカバリを実行したときに内部的に使用される構成要素として正しいものをすべて選択しなさい。',
	'GOLD参考書73Pを参照'));
	pushChoice('復旧ターゲット近辺で実行されていた更新処理を特定するための、サプリメンタルロギングで出力されたREDOデータ', false);
	pushChoice('復旧ターゲット時点のデータを得るための、ターゲットデータベースのバックアップ', true);
	pushChoice('AUXILIARY DESTINATIONに作成された補助インスタンス', true);
	pushChoice('リカバリ対象の表が含まれるData Pumpダンプファイル', true);
	pushChoice('補助インスタンスから表領域をトランスポートするためのデータファイル', false);
	sortChoice();
	
	// 114
	q_list.push(new Question('RMANからテープ装置へバックアップを取得する処理についての説明として正しいものを2つ選択しなさい。',
	'GOLD参考書75Pを参照'));
	pushChoice('RMANからテープ装置へバックアップを取得するためには使用するテープ装置に対応したメディア管理ライブラリ（MML）の導入が必要である', true);
	pushChoice('バックアップセット形式およびイメージコピー形式の両方でバックアップを取得できる', false);
	pushChoice('デフォルトのバックアップ出力先をテープ装置にするためには、CONFIGURE DEFAULT DEVICE TYPE TO TAPE; を実行する', false);
	pushChoice('メディア管理ライブラリ（MML)のファイルパスをSBT_LIBRARYに設定する', true);
	sortChoice();
	
	// 115
	q_list.push(new Question('Oracle Secure Backupの特徴に関する説明として正しいものを3つ選択しなさい。',
	'GOLD参考書76Pを参照'));
	pushChoice('データベースの破損状況の確認、破損修復スクリプトの生成、修復作業の実行を自動化できる', false);
	pushChoice('バックアップの暗号化に対応している', true);
	pushChoice('テープ装置へのバックアップに必要なメディア管理ライブラリ（MML）を提供する', true);
	pushChoice('フラッシュバックログを用いてデータベースを過去の状態に戻すことができる', false);
	pushChoice('ファイルシステムをファイル、ディレクトリ、ファイルシステムまたはRAWパーティションといった様々なレベルでバックアップできる', true);
	sortChoice();
	
	// 116
	q_list.push(new Question('デフォルトのバックアップ先としてテープ装置を利用するとします。'
	+ '\nOracle Secure Backupでテープ装置へのバックアップを取得するための構成手順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.Oracle Secure Backupをインストールする。'
	+ '\n2.Oracle社のWebサイトからSBTライブラリをダウンロードして配置する'
	+ '\n3.Oracle Secure Backupを提供するSBTライブラリが導入されていることを確認する'
	+ '\n4.RMANを実行するOSユーザーに対して、Oracle Secure Backupを用いたバックアップに必要な権限を事前認可する。'
	+ '\n5.RMANバックアップ用のメディアファミリを作成する。'
	+ '\n6.テープ装置用のチャネル設定で、SBT_LIBRARYを用いてSBTライブラリの場所を指定する。'
	+ '\n7.テープ装置用のチャネル設定で、OB_IGNORE_NUMA=0を指定し、NUMA対応を無効化する。'
	+ '\n8.テープ装置用のチャネル設定で、OB_MEDIA_FAMILYを用いてメディアファミリ名を指定する。',
	'GOLD参考書76Pを参照'));
	pushChoice('1 → 2 → 4 → 5 → 7 → 8', false);
	pushChoice('1 → 2 → 4 → 5 → 6 → 7 → 8', false);
	pushChoice('1 → 3 → 5 → 7 → 8', false);
	pushChoice('1 → 2 → 5 → 7 → 8', false);
	pushChoice('1 → 3 → 4 → 5 → 7 → 8', true);
	pushChoice('1 → 3 → 4 → 5 → 6 → 7 → 8', false);
	sortChoice();
	
	// 117
	q_list.push(new Question('UNDO表領域の構成に関する説明として正しいものを選択しなさい。',
	'GOLD参考書78Pを参照'));
	pushChoice('初期化パラメータUNDO_RETENTIONにUNDOの保存期間を設定する', true);
	pushChoice('初期化パラメータUNDO_RETENTION_GUARANTEEにUNDO保存を保証するかを設定する', false);
	pushChoice('古いデータを参照するフラッシュバック操作を実行したときに、対応するUNDOデータがないと、アーカイブログファイルから古いデータを取得し結果を返す', false);
	pushChoice('自動UNDO管理を使用する場合、初期化パラメータUNDO_TABLESPACEに"AUTO"を設定する', false);
	sortChoice();
	
	// 118
	q_list.push(new Question('UNDO表領域が固定サイズの場合におけるUNDO保存の動作に関する説明として正しいものを2つ選択しなさい。',
	'GOLD参考書79Pを参照'));
	pushChoice('UNDO保存保証が有効でない場合、UNDO表領域にUNDOデータを保管する空き領域が不足すると、UNDO_RETENTIONで指定された保存期間内であったとしても、古いUNDOデータが上書きされる', true);
	pushChoice('UNDO保存保証が有効でない場合、UNDO表領域にUNDOデータを保管する空き領域が不足すると、UNDO表領域のサイズが拡張することで、UNDO_RETENTIONで指定された保存期間内のUNDOデータが上書きされないようにする', false);
	pushChoice('UNDO保存保証が有効な場合、保存期間内のUNDOデータは保存される。ただし、更新処理がエラーで失敗する場合がある', true);
	pushChoice('UNDO保存保証が有効な場合、UNDO表領域にUNDOデータを保管する空き領域が不足すると、UNDO表領域のサイズが拡張することで、UNDO_RETENTIONで指定された保存期間内のUNDOデータが上書きされないようにする', false);
	sortChoice();
	
	// 119
	q_list.push(new Question('フラッシュバック問い合わせの特徴に関する説明として正しいものを選択しなさい。',
	'GOLD参考書80Pを参照'));
	pushChoice('問い合わせに必要な過去のデータをUNDO表領域のUNDOデータから取得する', true);
	pushChoice('過去実行された更新処理を確認でき、あわせて、その更新処理を打ち消すSQLを取得できる', false);
	pushChoice('表のデータを過去の指定した時点の状態に戻すことができる', false);
	pushChoice('指定した期間内における、行のすべてのバージョン履歴を確認できる', false);
	sortChoice();
	
	// 120
	q_list.push(new Question('テーブルt1の過去のデータを参照したいと考えています。'
	+ '\n(X)に入るキーワードとして適切なものを選択しなさい。'
	+ '\n'
	+ '\nSELECT * FROM t1'
	+ '\n  (X) TIMESTAMP TO_TIMESTAMP("18-01-25 20:46;51")'
	+ '\n  WHERE n=1;',
	'GOLD参考書80Pを参照'));
	pushChoice('WHEN', false);
	pushChoice('AS OF', true);
	pushChoice('TIME OF', false);
	pushChoice('IN TIME OF', false);
	sortChoice();
	
	// 121
	q_list.push(new Question('フラッシュバックバージョン問い合わせの特徴に関する説明として正しいものを2つ選択しなさい。',
	'GOLD参考書81Pを参照'));
	pushChoice('問い合わせ実行に必要な過去のデータをフラッシュバックログから取得する', false);
	pushChoice('VERSIONS BETWEEN句で指定した期間内において、過去実行された更新処理を確認でき、あわせて、その更新処理を打ち消すSQLを取得できる', false);
	pushChoice('VERSIONS BETWEEN句で指定した期間内における、行のすべてのバージョン履歴を確認できる', true);
	pushChoice('FLASHBACK_VERSION_QUERYビューから、VERSIONS BETWEEN句で指定した期間内におけるバージョン履歴を確認できる', false);
	pushChoice('対象の表に、表の構造を変更するDDLを実行すると、DDL実行より前のデータは確認できなくなる', true);
	sortChoice();
	
	// 122
	q_list.push(new Question('フラッシュバックバージョン問い合わせで使用できる疑似列の組み合わせとして正しいものを選択しなさい。',
	'GOLD参考書81Pを参照'));
	pushChoice('VERSIONS_STARTSCN、VERSIONS_ENDSCN、VERSIONS_OPERATION', true);
	pushChoice('VERSIONS_STARTSCN、VERSIONS_ENDSCN、UNDOSQL', false);
	pushChoice('VERSIONS_STARTTIME、VERSIONS_ENDTIME、ORIGINAL_NAME', false);
	pushChoice('VERSIONS_STARTTIME、VERSIONS_ENDTIME、UNDO_SQL', false);
	sortChoice();
	
	// 123
	q_list.push(new Question('フラッシュバックトランザクション問い合わせの特徴に関する説明として正しいものを選択しなさい。',
	'GOLD参考書82Pを参照'));
	pushChoice('VERSIONS BETWEEN句で指定した期間内における、行のすべてのバージョン履歴を確認できる', false);
	pushChoice('FLASHBACK_TRANSACTION_QUERYビューから過去実行された更新処理、および、その更新処理を打ち消すSQLを取得できる', true);
	pushChoice('表のデータを過去の指定した時点に戻すことができる', false);
	pushChoice('トランザクションの依存関係を分析し、指定された方法でトランザクションを取り消すことができる', false);
	sortChoice();
	
	// 124
	q_list.push(new Question('フラッシュバックトランザクション問い合わせを使用するための前提条件として正しいものを2つ選択しなさい。',
	'GOLD参考書83Pを参照'));
	pushChoice('最小サプリメンタル・ロギングの有効化', true);
	pushChoice('アーカイブログモードでの運用', false);
	pushChoice('高速リカバリ領域の構成', false);
	pushChoice('フラッシュバックトランザクション問い合わせを実行するユーザーに対するSELECT ANY TRANSACTIONシステム権限', true);
	pushChoice('フラッシュバックトランザクション問い合わせを実行するユーザーに対するFLASHBACK ANY TABLEシステム権限', false);
	pushChoice('フラッシュバックトランザクション問い合わせを実行するユーザーに対するDBMS_FLASHBACKパッケージのEXECUTE権限', false);
	sortChoice();
	
	// 125
	q_list.push(new Question('フラッシュバックトランザクション問い合わせを使用するための前提条件として正しいものを2つ選択しなさい。',
	'GOLD参考書83Pを参照'));
	pushChoice('最小サプリメンタル・ロギングの有効化', true);
	pushChoice('アーカイブログモードでの運用', false);
	pushChoice('高速リカバリ領域の構成', false);
	pushChoice('フラッシュバックトランザクション問い合わせを実行するユーザーに対するSELECT ANY TRANSACTIONシステム権限', true);
	pushChoice('フラッシュバックトランザクション問い合わせを実行するユーザーに対するFLASHBACK ANY TABLEシステム権限', false);
	pushChoice('フラッシュバックトランザクション問い合わせを実行するユーザーに対するDBMS_FLASHBACKパッケージのEXECUTE権限', false);
	sortChoice();
	
	// 126
	q_list.push(new Question('フラッシュバックデータアーカイブの特徴に関する説明として正しいものを2つ選択しなさい。',
	'GOLD参考書84Pを参照'));
	pushChoice('UNDOデータのアーカイブ機能を有効にして、UNDO表領域に多くのUNDOデータを保管できるようにする', false);
	pushChoice('永続表領域に履歴格納用のフラッシュバックデータアーカイブを構成することで、長期間の履歴データを保持できる', true);
	pushChoice('フラッシュバックデータアーカイブ作成時、履歴データの保持期限を示すRETENTION句の指定は必須である', true);
	pushChoice('フラッシュバックデータアーカイブ作成時、領域割り当て制限を示すQUOTA句の指定は必須である', false);
	pushChoice('フラッシュバックデータアーカイブが有効化されている表の名前を変更することはできない', false);
	pushChoice('フラッシュバックデータアーカイブが有効化されている表の列を削除することはできない', false);
	sortChoice();
	
	// 127
	q_list.push(new Question('フラッシュバックデータアーカイブを構成し、年単位など非常に古いデータをフラッシュバック問い合わせできるようにする手順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.フラッシュバックデータアーカイブ用に自動セグメント領域管理方式の表領域を作成する。'
	+ '\n2.フラッシュバックデータアーカイブ用に手動セグメント領域管理方式の表領域を作成する。'
	+ '\n3.フラッシュバックデータアーカイブ用の表領域にフラッシュバックデータアーカイブを作成する。'
	+ '\n4.データベースのSYSAUX表領域にフラッシュバックデータアーカイブを作成する。'
	+ '\n5.履歴を保存したい表に対してフラッシュバックデータアーカイブを有効化する。'
	+ '\n6.フラッシュバック問い合わせを実行するユーザーに対して、フラッシュバックデータアーカイブへの参照権限を付与する。',
	'GOLD参考書85Pを参照'));
	pushChoice('2 → 3 → 5', false);
	pushChoice('2 → 3 → 6', false);
	pushChoice('1 → 3 → 5', true);
	pushChoice('1 → 3 → 6', false);
	pushChoice('4 → 5', false);
	pushChoice('4 → 6', false);
	sortChoice();
	
	// 128
	q_list.push(new Question('フラッシュバック表を用いて表を過去の状態に戻す場合に、復旧ターゲットから現在までの間で実行することが許されないSQLをすべて選択しなさい。',
	'GOLD参考書86Pを参照'));
	pushChoice('DML(UPDATE、INSERT、DELETE)', false);
	pushChoice('TRUNCATE TABLE文', true);
	pushChoice('DROP TABLE文', true);
	pushChoice('ALTER TABLE文', true);
	sortChoice();
	
	// 129
	q_list.push(new Question('フラッシュバックトランザクションを使用するための前提条件として正しいものをすべて選択しなさい。',
	'GOLD参考書86Pを参照'));
	pushChoice('ARCHIVELOGモードであること', true);
	pushChoice('UNDO保存保証が有効なこと', false);
	pushChoice('高速リカバリ領域が構成されていること', false);
	pushChoice('最小および主キーサプリメンタルロギングが有効になっていること', true);
	pushChoice('フラッシュバックトランザクションの実行ユーザーにDBMS_FLASHBACKパッケージの実行権限があること', true);
	pushChoice('フラッシュバックトランザクションの実行ユーザーにSELECT ANY TRANSACTIONシステム権限があること', true);
	sortChoice();
	
	// 130
	q_list.push(new Question('フラッシュバックトランザクションでバックアウト処理を行うDBMS_FLASHBACK.TRANSACTION_BACKOUTにおいて、デフォルトでの依存トランザクションの取り扱いとして正しいものを選択しなさい。',
	'GOLD参考書87Pを参照'));
	pushChoice('依存トランザクションを無視して、取り消し対象のトランザクションだけをバックアウトする', false);
	pushChoice('依存トランザクションが更新していない行についてのみ、バックアウトする', false);
	pushChoice('依存トランザクションを含めたすべてのトランザクションを、実際に実行された順序とは逆の順序でバックアウトする', false);
	pushChoice('依存トランザクションが存在する場合、バックアウト処理がエラーで失敗する', true);
	sortChoice();
	
	// 131
	q_list.push(new Question('RECYCLEBINに同じ表について削除済み表が2つ存在します。'
	+ '\nこれらの削除済み表が作成される原因となった操作について、適切に説明しなさい。'
	+ '\n'
	+ '\nSQL> SHOW RECYCLEBIN;'
	+ '\n'
	+ '\nORIGINAL NAME    RECYCLEBIN NAME                OBJECT TYPE DROP TIME'
	+ '\n---------------- ------------------------------ ----------- -------------------'
	+ '\nTAB0             BIN$IORgDWPvRSfgUwEPH6xG6Q==$0 TABLE       2018-01-29:23:13:37'
	+ '\nTAB0             BIN$IORgDWPvRSfgUwEPH6xG6Q==$0 TABLE       2018-01-29:23:13:33',
	'GOLD参考書88Pを参照'));
	pushChoice('異なるユーザーが所有する同じ名前の表の削除済み表が表示されている', false);
	pushChoice('1つの削除済み表の実体は表であり、もう1つの削除済み表の実体は表の索引である', false);
	pushChoice('2つのパーティションから構成されるパーティション表を削除した', false);
	pushChoice('同じ名前の表を2回削除した', true);
	sortChoice();
	
	// 132
	q_list.push(new Question('フラッシュバックドロップを用いて、索引、トリガー、制約が付けられた表を復元しました。'
	+ '\n表と一緒に復元されるものをすべて選択しなさい。',
	'GOLD参考書89Pを参照'));
	pushChoice('表定義', true);
	pushChoice('表に格納されたデータ', true);
	pushChoice('索引', true);
	pushChoice('トリガー', true);
	pushChoice('制約', true);
	sortChoice();
	
	// 133
	q_list.push(new Question('フラッシュバックロギングを有効化（フラッシュバックデータベースを有効化）する前に必要な設定を2つ選択しなさい。',
	'GOLD参考書90Pを参照'));
	pushChoice('サプリメンタルロギングの有効化', false);
	pushChoice('ARCHIVELOGモード運用の設定', true);
	pushChoice('高速リカバリ領域の構成', true);
	pushChoice('UNDO保証の構成', false);
	pushChoice('RMAN保存ポリシーの指定', false);
	sortChoice();
	
	// 134
	q_list.push(new Question('フラッシュバックデータベースの実行手順として正しいものを選択しなさい。'
	+ '\n'
	+ '\n1.補助インスタンスを起動する。'
	+ '\n2.復旧ターゲットを指定したFLASHBACK DATABASE文を実行する。'
	+ '\n3.復旧ターゲットの指定とデータベース全体のリストアおよびリカバリを実行するRMAN RUNブロックを実行する。'
	+ '\n4.データベースをMOUNT状態にする。'
	+ '\n5.RESETLOGSオプションを指定してデータベースをOPENする。'
	+ '\n6.RESETLOGSオプションを指定せずデータベースをOPENする。',
	'GOLD参考書90Pを参照'));
	pushChoice('1 → 4 → 2 → 5', false);
	pushChoice('1 → 4 → 2 → 6', false);
	pushChoice('4 → 2 → 5', true);
	pushChoice('4 → 2 → 6', false);
	pushChoice('3 → 2 → 5', false);
	pushChoice('3 → 2 → 6', false);
	sortChoice();
	
	// 135
	q_list.push(new Question('フラッシュバックデータベースの復旧ターゲットに関する説明として正しいものを選択しなさい。',
	'GOLD参考書91Pを参照'));
	pushChoice('DB_FLASHBACK_RETENTION_TARGET初期化パラメータに設定したフラッシュバックログ保存期間内であれば、フラッシュバックデータベースは必ず成功する', false);
	pushChoice('UNDO保存保証をONに設定していれば、UNDO_RETENTION初期化パラメータの設定時間内へのフラッシュバックデータベースは必ず成功する', false);
	pushChoice('保証付きリストアポイントに対応する時点へのフラッシュバックデータベースは必ず成功する', true);
	pushChoice('保証付きリストアポイントに対応する時点以降へのフラッシュバックデータベースは必ず成功する', false);
	sortChoice();
	
	// 136
	q_list.push(new Question('フラッシュバックデータベースに失敗する状況をすべて選択しなさい。',
	'GOLD参考書92Pを参照'));
	pushChoice('データファイルが破損している場合', true);
	pushChoice('データファイルのサイズが縮小されている場合', true);
	pushChoice('制御ファイルがリストアされている場合', true);
	pushChoice('データベースがRESETLOGSオプションでOPENされている場合', false);
	pushChoice('復旧ターゲットに対応するバックアップが存在しない場合', false);
	sortChoice();
	
	// 137
	q_list.push(new Question('保証付きリストアポイントを作成する前に必要な設定を3つ選択しなさい。',
	'GOLD参考書93Pを参照'));
	pushChoice('サプリメンタルロギングの有効化', false);
	pushChoice('ARCHIVELOGモード運用の設定', true);
	pushChoice('高速リカバリ領域の構成', true);
	pushChoice('UNDO保証の構成', false);
	pushChoice('RMAN保存ポリシーの指定', false);
	pushChoice('COMPATIBLE初期化パラメータを10.2以上に設定', true);
	sortChoice();
	
	// 138
	q_list.push(new Question('Data Pumpを用いたトランスポータブル表領域の手順として正しいものを選択しなさい。'
	+ '\n移行元のデータベースと移行先のデータベースのプラットフォームおよびキャラクタセットは同一であるとします。'
	+ '\n'
	+ '\n1.RMANでDUPLICATE TABLESPACEコマンドを実行し、トランスポータブル用の複製データベースを作成する。'
	+ '\n2.RMANでTRANSPORT TABLESPACEコマンドを実行し、データファイルとメタデータのダンプファイルを作成する。'
	+ '\n3.移行元データベースで、転送対象の表領域を読み取り専用に変更する。'
	+ '\n4.転送対象の表領域を構成するデータファイルを移行先にコピーする。'
	+ '\n5.移行先のデータベースのプラットフォームに合わせてデータファイルをRMANで変換する。'
	+ '\n6.移行元のデータベースで、Data Pumpをを用いてメタデータをエクスポートする。'
	+ '\n7.メタデータを移行先にコピーする。'
	+ '\n8.移行先データベースで、Data Pumpを用いてメタデータをインポートする。'
	+ '\n9.移行先データベースで、転送した表領域を読み取り／書き込みモードにする。',
	'GOLD参考書94Pを参照'));
	pushChoice('2 → 6 → 7 → 8 → 9', false);
	pushChoice('3 → 6 → 4 → 7 → 8 → 9', true);
	pushChoice('1 → 6 → 4 → 7 → 8 → 9', false);
	pushChoice('2 → 6 → 7 → 5 → 8 → 9', false);
	pushChoice('3 → 6 → 4 → 7 → 5 → 8 → 9', false);
	pushChoice('1 → 6 → 4 → 7 → 5 → 8 → 9', false);
	sortChoice();
	
	// 139
	q_list.push(new Question('RMANを用いたトランスポータブル表領域の手順として正しいものを選択しなさい。'
	+ '\n移行元のデータベースと移行先のデータベースのプラットフォームおよびキャラクタセットは同一であるとします。'
	+ '\n'
	+ '\n1.RMANでDUPLICATE TABLESPACEコマンドを実行し、トランスポータブル用の複製データベースを作成する。'
	+ '\n2.RMANでTRANSPORT TABLESPACEコマンドを実行し、データファイルとメタデータのダンプファイルを作成する。'
	+ '\n3.移行元データベースで、転送対象の表領域を読み取り専用に変更する。'
	+ '\n4.転送対象の表領域を構成するデータファイルを移行先にコピーする。'
	+ '\n5.移行元データベースで、Data Pumpを用いてメタデータをエクスポートする。'
	+ '\n6.メタデータを移行先にコピーする。'
	+ '\n7.移行先で補助インスタンスを作成し、データファイル一貫性のある状態に変換する。'
	+ '\n8.移行先データベースで、Data Pumpを用いてメタデータをインポートする。'
	+ '\n9.移行先データベースで、転送した表領域を読み取り／書き込みモードにする。',
	'GOLD参考書95Pを参照'));
	pushChoice('3 → 2 → 4 → 6 → 8 → 9', false);
	pushChoice('3 → 1 → 4 → 6 → 8 → 9', false);
	pushChoice('2 → 4 → 6 → 7 → 8 → 9', false);
	pushChoice('1 → 4 → 6 → 7 → 8 → 9', false);
	pushChoice('2 → 4 → 6 → 8 → 9', true);
	pushChoice('1 → 4 → 6 → 8 → 9', false);
	sortChoice();
	
	// 140
	q_list.push(new Question('トランスポータブル表領域の前提条件や制限のうち、正しいものをすべて選択しなさい。',
	'GOLD参考書97Pを参照'));
	pushChoice('ソースデータベースとターゲットデータベースは同じまたは上位互換の関係にあるキャラクタセットである必要がある', true);
	pushChoice('転送対象の表領域は自動セグメント領域管理方式（ASSM）を使用している必要がある', false);
	pushChoice('表とその表の索引が別の表領域に格納されている場合、それらの表領域は1回のトランスポータブル表領域の実行で一緒に転送できず、表領域ごとに複数回トランスポータブル表領域を実行する必要がある', false);
	pushChoice('SYSTEM表領域はトランスポータブル表領域で転送できない', true);
	pushChoice('SYSAUX表領域はトランスポータブル表領域で転送できない', true);
	pushChoice('BIGFILE表領域はトランスポータブル表領域で転送できない', false);
	pushChoice('暗号化された表領域はトランスポータブル表領域で転送できない', true);
	sortChoice();
	
	// 141
	q_list.push(new Question('イメージコピーを用いたトランスポータブル表領域の手順として正しいものを選択しなさい。'
	+ '\nなお、環境などの条件は以下の通りです。'
	+ '\n'
	+ '\n移行元のデータベースのプラットフォーム："Solaros[tm]OE(64-bit)"'
	+ '\n移行先のデータベースのプラットフォーム："Linux x86 64-bit"'
	+ '\n移行元のデータベースと移行先のデータベースのキャラクタセット：同一'
	+ '\nデータファイルのエンディアン変換：移行先のデータベースで実行'
	+ '\n'
	+ '\n1.RMANでCROSS TRANSPORT TABLESPACEコマンドを実行し、データファイルとメタデータのダンプファイルを作成する。'
	+ '\n2.移行元データベースで、転送対象の表領域を読み取り専用に変更する。'
	+ '\n3.転送対象の表領域を構成するデータファイルを移行先にコピーする。'
	+ '\n4.移行元データベースで、Data Pumpを用いてメタデータをエクスポートする。'
	+ '\n5.メタデータを移行先にコピーする。'
	+ '\n6.RMANでCONVERT TABLESPACEコマンドを実行し、データファイルを移行先データベースのプラットフォームに合わせて変換する。'
	+ '\n7.RMANでCONVERT DATAFILEコマンドを実行し、データファイルを移行先データベースのプラットフォームに合わせて変換する。'
	+ '\n8.メタデータを移行先データベースのプラットフォームに合わせて変換する。'
	+ '\n9.移行先データベースで、Data Pumpを用いてメタデータをインポートする。'
	+ '\n10.移行先データベースで、転送した表領域を読み取り／書き込みモードにする。',
	'GOLD参考書98Pを参照'));
	pushChoice('2 → 4 → 3 → 5 → 7 → 9 → 10', true);
	pushChoice('1 → 4 → 3 → 5 → 7 → 9 → 10', false);
	pushChoice('2 → 4 → 3 → 5 → 6 → 9 → 10', false);
	pushChoice('1 → 4 → 3 → 5 → 6 → 9 → 10', false);
	pushChoice('2 → 4 → 3 → 5 → 6 → 8 → 9 → 10', false);
	pushChoice('1 → 4 → 3 → 5 → 6 → 8 → 9 → 10', false);
	sortChoice();
	
	// 142
	q_list.push(new Question('バックアップセットを用いたトランスポータブル表領域の手順として正しいものを選択しなさい。'
	+ '\nなお、環境などの条件は以下の通りです。'
	+ '\n'
	+ '\n移行元のデータベースのプラットフォーム："Solaros[tm]OE(64-bit)"'
	+ '\n移行先のデータベースのプラットフォーム："Linux x86 64-bit"'
	+ '\n移行元のデータベースと移行先のデータベースのキャラクタセット：同一'
	+ '\nデータファイルのエンディアン変換：移行元のデータベースで実行'
	+ '\n'
	+ '\n1.移行元データベースで、転送対象の表領域を読み取り専用に変更する。'
	+ '\n2.RMANでCONVERT TABLESPACEコマンドを実行し、データファイルを移行先データベースのプラットフォームに合わせて変換する。'
	+ '\n3.RMANでBACKUP TO PLATFORMコマンドを実行し、バックアップセットの作成を行う。'
	+ '\n4.RMANでBACKUP TO PLATFORMコマンドを実行し、バックアップセットの作成とメタデータのエクスポートを行う。'
	+ '\n5.転送対象のバックアップセットを移行先にコピーする。'
	+ '\n6.移行元データベースで、Data Pumpを用いてメタデータをエクスポートする。'
	+ '\n7.メタデータを移行先にコピーする。'
	+ '\n8.移行先データベースで、Data Pumpを用いてメタデータをインポートする。'
	+ '\n9.移行先データベースで、転送した表領域を読み取り／書き込みモードにする。'
	+ '\n10.RMANでRESTORE FOREIGN TABLESPACEコマンドを実行して、データファイルのリストアとメタデータのインポートを行う。'
	+ '\n11.RMANでRESTORE FOREIGN TABLESPACEコマンドを実行して、データファイルのリストアを行う。',
	'GOLD参考書99Pを参照'));
	pushChoice('1 → 3 → 5 → 6 → 7 → 10 → 9', false);
	pushChoice('1 → 4 → 5 → 7 → 10 → 9', true);
	pushChoice('1 → 3 → 5 → 6 → 7 → 11 → 8 → 9', false);
	pushChoice('1 → 4 → 5 → 7 → 11 → 8 → 9', false);
	pushChoice('1 → 2 → 3 → 5 → 6 → 7 → 10 → 9', false);
	pushChoice('1 → 2 → 4 → 5 → 7 → 10 → 9', false);
	sortChoice();
	
	// 143
	q_list.push(new Question('エンディアンが異なるプラットフォーム間でのトランスポータブル表領域の前提条件や制限として正しいものをすべて選択しなさい。',
	'GOLD参考書101Pを参照'));
	pushChoice('ソースデータベースとターゲットデータベースは同じまたは上位互換の関係にあるキャラクタセットである必要がある', true);
	pushChoice('SYSAUX表領域はトランスポータブル表領域では転送できない', true);
	pushChoice('暗号化された表領域はトランスポータブル表領域では転送できない', true);
	pushChoice('COMPATIBLE初期化パラメータは10.0.0以上である必要がある', true);
	pushChoice('バックアップセットによるクロスプラットフォーム表領域の場合、エンディアン変換は移行元のデータベースで実現する必要がある', false);
	sortChoice();
	
	// 144
	q_list.push(new Question('バックアップベースのデータベース複製を行う手順として正しいものを選択しなさい。'
	+ '\nなお、手順が複数存在する場合は、可用性や手順の簡単さの点で最も優れた手順を選ぶこと。'
	+ '\n'
	+ '\n1.RMANクライアントからソースデータベースにはTARGETとして、補助インスタンスにはCATALOGとして接続する。'
	+ '\n2.RMANクライアントからソースデータベースにはTARGETとして、補助インスタンスにはAUXILIARYとして接続する。'
	+ '\n3.RMANのDUPLICATE TARGET DATABASEコマンドを実行し、データベースを複製する。'
	+ '\n4.複製元データベースでバックアップを取得する。'
	+ '\n5.複製元データベースをSHUTDOWNし、一貫性バックアップを取得する。'
	+ '\n6.複製先ホストに複製元データベースのSPFILEをコピーする。'
	+ '\n7.複製先ホストで補助インスタンスを起動する。'
	+ '\n8.補助インスタンスにリモート接続できるように構成する。'
	+ '\n9.複製先ホストにバックアップファイルやアーカイブログファイルをコピーする。',
	'GOLD参考書102Pを参照'));
	pushChoice('4 → 7 → 6 → 8 → 9 → 1 → 3', false);
	pushChoice('5 → 7 → 6 → 8 → 9 → 2 → 3', false);
	pushChoice('4 → 7 → 8 → 9 → 2 → 3', true);
	pushChoice('5 → 7 → 8 → 9 → 2 → 3', false);
	pushChoice('4 → 7 → 8 → 9 → 1 → 3', false);
	pushChoice('5 → 7 → 8 → 9 → 1 → 3', false);
	sortChoice();
	
	// 145
	q_list.push(new Question('DUPLICATE TARGET DATABASEコマンドに関する説明として正しいものを2つ選択しなさい。',
	'GOLD参考書103Pを参照'));
	pushChoice('複製元データベースと複製先データベースのファイル構成を同一にしたい場合、NOFILENAMECHECK句を必ず指定する必要がある', true);
	pushChoice('サーバーパラメータファイルの複製が可能だが、複製元データベースと複製データベースの設定値が同一となる制限がある', false);
	pushChoice('PARAMETER_VALUE_CONVERT句を指定すると、複製元データベースの初期化パラメータ設定と複製先の環境に応じてOracleが自動的に変換してくれる', false);
	pushChoice('SET UNTIL句を指定すると、複製元のデータベースを過去のある時点の状態として作成する', true);
	sortChoice();
	
	// 146
	q_list.push(new Question('アクティブなデータベース複製を行う手順として正しいものを選択しなさい。'
	+ '\nなお、手順が複数存在する場合は、可用性や手順の簡単さの点で最も優れた手順を選ぶこと。'
	+ '\n'
	+ '\n1.RMANクライアントからソースデータベースにはTARGETとして、補助インスタンスにはAUXILIARYとして接続する。'
	+ '\n2.RMANのDUPLICATE TARGET ACTIVE DATABASEコマンドを実行し、データベースを複製する。'
	+ '\n3.RMANのDUPLICATE TARGET ACTIVE DATABASE...FROM ACTIVE DATABASEコマンドを実行し、データベースを複製する。'
	+ '\n4.複製元データベースでバックアップを取得する。'
	+ '\n5.複製先ホストで補助インスタンスを起動する。'
	+ '\n6.補助インスタンスにリモート接続できるように構成する。'
	+ '\n7.複製先ホストにバックアップファイルやアーカイブログファイルをコピーする。',
	'GOLD参考書104Pを参照'));
	pushChoice('4 → 5 → 6 → 7 → 1 → 3', false);
	pushChoice('4 → 5 → 6 → 1 → 3', false);
	pushChoice('5 → 6 → 1 → 3', true);
	pushChoice('4 → 5 → 6 → 7 → 1 → 2', false);
	pushChoice('4 → 5 → 6 → 1 → 2', false);
	pushChoice('5 → 6 → 1 → 2', false);
	sortChoice();
	
	// 147
	q_list.push(new Question('Oracle Database 12cの新機能のバックアップセットを使用したアクティブデータベースの複製が実行される条件を3つ選択しなさい。',
	'GOLD参考書105Pを参照'));
	pushChoice('DUPLICATE...FROM ACTIVE DATABASEコマンドにUSING BACKUPSET句が指定されている場合', true);
	pushChoice('DUPLICATE...FROM ACTIVE DATABASEコマンドの前にSET ENCRYPTIONが指定されている場合', true);
	pushChoice('複製元データベースを停止してからアクティブなデータベースの複製を実行した場合', false);
	pushChoice('割り当てられた補助チャネルの数がターゲットチャネルの数と同じか、大きい場合', true);
	pushChoice('複製元のデータベースであらかじめバックアップセット形式でバックアップを取得してある状態でアクティブなデータベースの複製を実行した場合', false);
	sortChoice();
	
	// 148
	q_list.push(new Question('複製データベース（複製して作成されたデータベース）とバックアップをリストアしたデータベース（バックアップを新しいホストへリストア／リカバリして作成されたデータベース）のDBIDについて正しいものを選択しなさい。',
	'GOLD参考書106Pを参照'));
	pushChoice('複製データベース：元のデータベースと同じ、バックアップをリストアしたデータベース：元のデータベースと同じ', false);
	pushChoice('複製データベース：元のデータベースと異なる、バックアップをリストアしたデータベース：元のデータベースと同じ', true);
	pushChoice('複製データベース：元のデータベースと同じ、バックアップをリストアしたデータベース：元のデータベースと異なる', false);
	pushChoice('複製データベース：元のデータベースと異なる、バックアップをリストアしたデータベース：元のデータベースと異なる', false);
	sortChoice();
	
	// 149
	q_list.push(new Question('チャネルによって実行されるRMANのバックアップやリカバリ処理状況を監視するため有用な動的パフォーマンスビューを選択しなさい。',
	'GOLD参考書107Pを参照'));
	pushChoice('V$CHANNEL', false);
	pushChoice('V$SESSION_LOMGOPS', true);
	pushChoice('V$SESSION_CHANNEL', false);
	pushChoice('V$RMAN_CHANNEL', false);
	sortChoice();
	
	// 150
	q_list.push(new Question('以下のRMANバックアップ機能のうち、ストレージI/O量削減に役立つ機能をすべて選択しなさい。',
	'GOLD参考書107Pを参照'));
	pushChoice('高速増分バックアップ', true);
	pushChoice('増分バックアップ', true);
	pushChoice('パラレルバックアップ', false);
	pushChoice('圧縮バックアップ', true);
	pushChoice('イメージコピー形式でのバックアップ', false);
	pushChoice('バックアップセット形式でのバックアップ', true);
	sortChoice();
	
	// 151
	q_list.push(new Question('RMANによるバックアップやリストアが、非同期I/Oで実行されているかを確認するために役立つ動的パフォーマンスビューを選択しなさい。',
	'GOLD参考書108Pを参照'));
	pushChoice('V$BACKUP_SYNC_IO', false);
	pushChoice('V$BACKUP_ASYNC_IO', true);
	pushChoice('V$DISK_SYNCH_IO', false);
	pushChoice('V$DISK_ASYNCH_IO', false);
	sortChoice();
	
	// 152
	q_list.push(new Question('ストリーミングテープドライブの特性を生かす目的で、書き込み対象のデータを常にテープに供給し続けることに有効な設定を2つ選択しなさい。',
	'GOLD参考書109Pを参照'));
	pushChoice('増分バックアップ形式でバックアップを取得する', false);
	pushChoice('リカバリカタログを使用する', false);
	pushChoice('MAXOPENFILESパラメータを大きな値に設定する', true);
	pushChoice('RATEパラメータを小さな値に設定する', false);
	pushChoice('BLKSIZEパラメータを大きな値に設定する', true);
	sortChoice();
	
	// 153
	q_list.push(new Question('テープ装置への非同期I/Oを用いたパフォーマンスの改善に関係する項目を2つ選択しなさい。',
	'GOLD参考書109Pを参照'));
	pushChoice('初期化パラメータBACKUP_TAPE_IO_SLAVESをtrueに設定する', true);
	pushChoice('初期化パラメータDISK_ASYNCH_IOをtrueに設定する', false);
	pushChoice('ラージプールに十分大きなサイズを割り当てる', true);
	pushChoice('REDOログバッファに十分大きなサイズを割り当てる', false);
	sortChoice();
	
	// 154
	q_list.push(new Question('アラートログに含まれる情報を3つ選択してください。',
	'SILVER参考書25Pを参照'));
	pushChoice('破損ブロックに関するエラー情報', true);
	pushChoice('メトリックしきい値を超えた場合の統計情報', false);
	pushChoice('チェックポイントの開始時間と終了時間', true);
	pushChoice('表に対するDROPやTRUNCATE情報', false);
	pushChoice('最後のベースライン作成後に行われた初期化パラメータの変更', true);
	sortChoice();
	
	// 155
	q_list.push(new Question('Oracle Database 12cのDDLログに関する説明として正しいものを2つ選択しなさい。',
	'SILVER参考書29Pを参照'));
	pushChoice('テキスト形式とXML形式のファイルが存在する', true);
	pushChoice('デフォルトで生成される', false);
	pushChoice('DDL文と実行タイムスタンプが記録される', true);
	pushChoice('SYSユーザーによる実行は除外される', false);
	sortChoice();
	
	// 156
	q_list.push(new Question('MTTRアドバイザに関する説明として正しいものを2つ選択しなさい。',
	'SILVER参考書103Pを参照'));
	pushChoice('現在のデータファイルサイズからかかるMTTR時間が計算される', false);
	pushChoice('FAST_START_MTTR_TARGET初期化パラメータが0の場合、使用することができない', true);
	pushChoice('V$INSTANCE_RECOVERビューで結果を確認することができる', false);
	pushChoice('MTTR時間に対するI/O量を見積もることができる', true);
	sortChoice();
	
	// 157
	q_list.push(new Question('次のコマンドに関する説明として正しいものを2つ選択しなさい。'
	+ '\n'
	+ '\nSQL> ALTER DATABASE BACKUP CONTROLFILE TO TRACE;',
	'SILVER参考書116Pを参照'));
	pushChoice('制御ファイルのバイナリバックアップが作成される', false);
	pushChoice('制御ファイルを再作成するスクリプトが作成される', true);
	pushChoice('$ORACLE_HOME/dbsにファイルが作成される', false);
	pushChoice('ユーザートレースファイルとして作成される', true);
	sortChoice();
	
	// 158
	q_list.push(new Question('2つの制御ファイルを構成しているデータベースで、1つの制御ファイルに障害が発生し、データベースがマウントできません。'
	+ '\n制御ファイルの格納にはASMを使用しています。'
	+ '\n適切なリカバリ方法を選択しなさい。',
	'SILVER参考書119Pを参照'));
	pushChoice('RMANを使用して、正常な制御ファイルからリストアする', true);
	pushChoice('OSコマンドを使用して、正常な制御ファイルのコピーで損失した制御ファイルを置き換える', false);
	pushChoice('正常な制御ファイルから制御ファイルの再作成スクリプトを生成し、スクリプトを実行して制御ファイルを再作成する', false);
	pushChoice('データベース全体のバックアップをリストアする必要がある', false);
	sortChoice();
}());

(function(){
    sortQuestion();
}());
