var checkInterval = null;
var checkInterval4 = null;

var href = window.location.href;
var url = href.substring(0, href.lastIndexOf("/"));
var url = url.substring(0, url.lastIndexOf("/"));

function interactionOnly() {    
    inter = document.getElementById("chkInteraction").checked;
    if(inter){
        document.getElementById("chkPhase1").disabled = true;
        document.getElementById("chkPhase2").disabled = true;
        document.getElementById("chkPhase3").disabled = true;
        document.getElementById("chkPhase4").disabled = true;
        document.getElementById("radioCoV1").disabled = false;
        document.getElementById("radioCoV2").disabled = false;
        document.getElementById("radioMERS").disabled = false;
    } else {
        document.getElementById("chkPhase1").disabled = false;
        document.getElementById("chkPhase2").disabled = false;
        document.getElementById("chkPhase3").disabled = false;
        document.getElementById("chkPhase4").disabled = false;
        document.getElementById("radioCoV1").disabled = true;
        document.getElementById("radioCoV2").disabled = true;
        document.getElementById("radioMERS").disabled = true;
        document.getElementById("radioCoV1").checked = false;
        document.getElementById("radioCoV2").checked = false;
        document.getElementById("radioMERS").checked = false;
    }
    phase4 = document.getElementById("chkPhase4").checked;
    if(inter || (!inter && phase4)){
        document.getElementById("fileHumanFasta").disabled = false;
        document.getElementById("txtHumanFasta").disabled = false;
    } else {
        document.getElementById("fileHumanFasta").disabled = true;
        document.getElementById("txtHumanFasta").disabled = true;
    }
}

function phase4Changed(){
    document.getElementById("chkPhase1").checked = true;
    document.getElementById("chkPhase2").checked = true;
    document.getElementById("chkPhase3").checked = true;
    document.getElementById("chkPhase4").checked = true;
    document.getElementById("fileHumanFasta").disabled = false;
    document.getElementById("txtHumanFasta").disabled = false;
}

function phase3Changed(){
    document.getElementById("chkPhase1").checked = true;
    document.getElementById("chkPhase2").checked = true;
    document.getElementById("chkPhase3").checked = true;
    document.getElementById("chkPhase4").checked = false;
    document.getElementById("fileHumanFasta").disabled = true;
    document.getElementById("txtHumanFasta").disabled = true;
}

function phase2Changed(){
    document.getElementById("chkPhase1").checked = true;
    document.getElementById("chkPhase2").checked = true;
    document.getElementById("chkPhase3").checked = false;
    document.getElementById("chkPhase4").checked = false;
    document.getElementById("fileHumanFasta").disabled = true;
    document.getElementById("txtHumanFasta").disabled = true;
}

function phase1Changed(){
    document.getElementById("chkPhase1").checked = true;
    document.getElementById("chkPhase2").checked = false;
    document.getElementById("chkPhase3").checked = false;
    document.getElementById("chkPhase4").checked = false;
    document.getElementById("fileHumanFasta").disabled = true;
    document.getElementById("txtHumanFasta").disabled = true;
}

function fileSelected(type) {
    console.log(type)
    if (type === "virus") {
        document.getElementById("labelVirusNone").style = "display: none";
        document.getElementById("labelVirusChosen").innerText = document.getElementById("fileVirusFasta").files[0].name;
    } else if (type === "human") {
        document.getElementById("labelHumanNone").style = "display: none";
        document.getElementById("labelHumanChosen").innerText = document.getElementById("fileHumanFasta").files[0].name;
    }
}

function fillVirus(){
    $("#txtVirusFasta").val(">P0DTC4\n" +
        "MYSFVSEETGTLIVNSVLLFLAFVVFLLVTLAILTALRLCAYCCNIVNVSLVKPSFYVYSRVKNLNSSRVPDLLV\n" +
        ">P0DTC5\n" +
        "MADSNGTITVEELKKLLEQWNLVIGFLFLTWICLLQFAYANRNRFLYIIKLIFLWLLWPVTLACFVLAAVYRINWITGGIAIAMACLVGLMWLSYFIASFRLFARTRSMWSFNPETNILLNVPLHGTILTRPLLESELVIGAVILRGHLRIAGHHLGRCDIKDLPKEITVATSRTLSYYKLGASQRVAGDSGFAAYSRYRIGNYKLNTDHSSSSDNIALLVQ\n" +
        ">NP_777549.1 NADH dehydrogenase [ubiquinone] 1 alpha subcomplex assembly factor 2 [Homo sapiens]\n" +
        "MGWSQDLFRALWRSLSREVKEHVGTDQFGNKYYYIPQYKNWRGQTIREKRIVEAANKKEVDYEAGDIPTE\n" +
        "WEAWIRRTRKTPPTMEEILKNEKHREEIKIKSQDFYEKEKLLSKETSEELLPPPVQTQIKGHASAPYFGK\n" +
        "EEPSVAPSSTGKTFQPGSWMPRDGKSHNQ\n" +
        ">NP_001003277.2 ras-related protein Rab-10 [Canis lupus familiaris]\n" +
        "MAKKTYDLLFKLLLIGDSGVGKTCVLFRFSDDAFNTTFISTIGIDFKIKTVELQGKKIKLQIWDTAGQERFHTITTSYYR\n" +
        "GAMGIMLVYDITNGKSFENISKWLRNIDEHANEDVERMLLGNKCDMDDKRVVPKGKGEQIAREHGIRFFETSAKANINIE\n" +
        "KAFLTLAEDILRKTPVKEPNSENVDISSGGGVTGWKSKCC\n" +
        ">5SZJ_A Chain A, Ras-related Protein Rab-10 [Homo sapiens]\n" +
        "GHMAKKTYDLLFKLLLIGDSGVGKTCVLFRFSDDAFNTTFISTIGIDFKIKTVELQGKKIKLQIWDTAGQERFHTITTSY\n" +
        "YRGAMGIMLVYDITNGKSFENISKWLRNIDEHANEDVERMLLGNKCDMDDKRVVPKGKGEQIAREHGIRFFETSAKANIN\n" +
        "IEKAFLTLAEDILRKTPVKEPNSENVDISSGGGVTGWKSKCC\n" +
        ">XP_032980279.1 ras-related protein Rab-10 [Rhinolophus ferrumequinum]\n" +
        "MAKKTYDLLFKLLLIGDSGVGKTCVLFRFSDDAFNTTFISTIGIDFKIKTVELQGKKIKLQIWDTAGQERFHTITTSYYR\n" +
        "GAMGIMLVYDITNGKSFENISKWLRNIDEHANEDVERMLLGNKCDMDDKRVVPRGKGEQIAREHGIRFFETSAKANINIE\n" +
        "KAFLTLAEDILRKTPVKEPNSENVDISSGGGVTGWKSKCC\n" +
        ">ALM88293.1 |ORF4b [Middle East respiratory syndrome-related coronavirus]\n" +
        "MEESLTDVPSTSGTQVYSRKARKRSHSPTKKLRYVKRRFSLLRPEDLSVIVQPTHYVRVT\n" +
        "FSDPNMWYLRSGHHLHSVHNWLKPYGGQPVSEYHITLALLNLTDEDLARDFSPIALFLRN\n" +
        "VRFELHEFALLRKTLVLNASEIYCANIHRFKPVYRVNTAIPTIKDWLLVQGFSLYHSGLP\n" +
        "LHMSISKLHALDDVTRNYIITMPCFRTYPQQMFVTPLAVDVVSIRSSNQGNKQIVHSYPI\n" +
        "LHHPGF");
        var textareaText = $('#txtVirusFasta').val();
        textareaText = textareaText.replace(/\r?\n/g, '<br />');
        $('#txtVirusFasta').html(textareaText);

}

function fillHuman(){
    $("#txtHumanFasta").val(">Q00266\n" +
    "MNGPVDGLCDHSLSEGVFMFTSESVGEGHPDKICDQISDAVLDAHLKQDPNAKVACETVCKTGMVLLCGEITSMAMVDYQRVVRDTIKHIGYDDSAKGFDFKTCNVLVALEQQSPDIAQCVHLDRNEEDVGAGDQGLMFGYATDETEECMPLTIILAHKLNARMADLRRSGLLPWLRPDSKTQVTVQYMQDNGAVIPVRIHTIVISVQHNEDITLEEMRRALKEQVIRAVVPAKYLDEDTVYHLQPSGRFVIGGPQGDAGVTGRKIIVDTYGGWGAHGGGAFSGKDYTKVDRSAAYAARWVAKSLVKAGLCRRVLVQVSYAIGVAEPLSISIFTYGTSQKTERELLDVVHKNFDLRPGVIVRDLDLKKPIYQKTACYGHFGRSEFPWEVPRKLVF\n" +
    ">Q8NB16\n" +
    "MENLKHIITLGQVIHKRCEEMKYCKKQCRRLGHRVLGLIKPLEMLQDQGKRSVPSEKLTTAMNRFKAALEEANGEIEKFSNRSNICRFLTASQDKILFKDVNRKLSDVWKELSLLLQVEQRMPVSPISQGASWAQEDQQDADEDRRAFQMLRRDNEKIEASLRRLEINMKEIKETLRQYLPPKCMQEIPQEQIKEIKKEQLSGSPWILLRENEVSTLYKGEYHRAPVAIKVFKKLQAGSIAIVRQTFNKEIKTMKKFESPNILRIFGICIDETVTPPQFSIVMEYCELGTLRELLDREKDLTLGKRMVLVLGAARGLYRLHHSEAPELHGKIRSSNFLVTQGYQVKLAGFELRKTQTSMSLGTTREKTDRVKSTAYLSPQELEDVFYQYDVKSEIYSFGIVLWEIATGDIPFQGCNSEKIRKLVAVKRQQEPLGEDCPSELREIIDECRAHDPSVRPSVDEILKKLSTFSK\n" +
    ">O94851\n" +
    "MGENEDEKQAQAGQVFENFVQASTCKGTLQAFNILTRHLDLDPLDHRNFYSKLKSKVTTWKAKALWYKLDKRGSHKEYKRGKSCTNTKCLIVGGGPCGLRTAIELAYLGAKVVVVEKRDSFSRNNVLHLWPFTIHDLRGLGAKKFYGKFCAGSIDHISIRQLQLILFKVALMLGVEIHVNVEFVKVLEPPEDQENQKIGWRAEFLPTDHSLSEFEFDVIIGADGRRNTLEGFRRKEFRGKLAIAITANFINRNSTAEAKVEEISGVAFIFNQKFFQDLKEETGIDLENIVYYKDCTHYFVMTAKKQSLLDKGVIINDYIDTEMLLCAENVNQDNLLSYAREAADFATNYQLPSLDFAMNHYGQPDVAMFDFTCMYASENAALVRERQAHQLLVALVGDSLLEPFWPMGTGCARGFLAAFDTAWMVKSWNQGTPPLELLAERESLYRLLPQTTPENINKNFEQYTLDPGTRYPNLNSHCVRPHQVKHLYITKELEHYPLERLGSVRRSVNLSRKESDIRPSKLLTWCQQQTEGYQHVNVTDLTTSWRSGLALCAIIHRFRPELINFDSLNEDDAVENNQLAFDVAEREFGIPPVTTGKEMASAQEPDKLSMVMYLSKFYELFRGTPLRPVDSWRKNYGENADLSLAKSSISNNYLNLTFPRKRTPRVDGQTGENDMNKRRRKGFTNLDEPSNFSSRSLGSNQECGSSKEGGNQNKVKSMANQLLAKFEESTRNPSLMKQERRVSGIGKPVLCSSSGPPVHSCCPKPEEATPSPSPPLKRQFPSVVVTGHVLRELKQVSAGSECLSRPWRARAKSDLQLGGTENFATLPSTRPRAQALSGVLWRLQQVEEKILQKRAQNLANREFHTKNIKEKAAHLASMFGHGDFPQNKLLSKGLSHTHPPSPPSRLPSPDPAASSSPSTVDSASPARKEKKSPSGFHFHPSHLRTVHPQLTVGKVSSGIGAAAEVLVNLYMNDHRPKAQATSPDLESMRKSFPLNLGGSDTCYFCKKRVYVMERLSAEGHFFHRECFRCSICATTLRLAAYTFDCDEGKFYCKPHFIHCKTNSKQRKRRAELKQQREEEATWQEQEAPRRDTPTESSCAVAAIGTLEGSPPVHFSLPVLHPLLG\n" +
    ">Q8TDZ2\n" +
    "MASPTSTNPAHAHFESFLQAQLCQDVLSSFQELCGALGLEPGGGLPQYHKIKDQLNYWSAKSLWTKLDKRAGQPVYQQGRACTSTKCLVVGAGPCGLRVAVELALLGARVVLVEKRTKFSRHNVLHLWPFTIHDLRALGAKKFYGRFCTGTLDHISIRQLQLLLLKVALLLGVEIHWGVTFTGLQPPPRKGSGWRAQLQPNPPAQLANYEFDVLISAAGGKFVPEGFKVREMRGKLAIGITANFVNGRTVEETQVPEISGVARIYNQSFFQSLLKATGIDLENIVYYKDDTHYFVMTAKKQCLLRLGVLRQDWPDTNRLLGSANVVPEALQRFTRAAADFATHGKLGKLEFAQDAHGQPDVSAFDFTSMMRAESSARVQEKHGARLLLGLVGDCLVEPFWPLGTGVARGFLAAFDAAWMVKRWAEGAESLEVLAERESLYQLLSQTSPENMHRNVAQYGLDPATRYPNLNLRAVTPNQVRDLYDVLAKEPVQRNNDKTDTGMPATGSAGTQEELLRWCQEQTAGYPGVHVSDLSSSWADGLALCALVYRLQPGLLEPSELQGLGALEATAWALKVAENELGITPVVSAQAVVAGSDPLGLIAYLSHFHSAFKSMAHSPGPVSQASPGTSSAVLFLSKLQRTLQRSRAKENAEDAGGKKLRLEMEAETPSTEVPPDPEPGVPLTPPSQHQEAGAGDLCALCGEHLYVLERLCVNGHFFHRSCFRCHTCEATLWPGGYEQHPGDGHFYCLQHLPQTDHKAEGSDRGPESPELPTPSENSMPPGLSTPTASQEGAGPVPDPSQPTRRQIRLSSPERQRLSSLNLTPDPEMEPPPKPPRSCSALARHALESSFVGWGLPVQSPQALVAMEKEEKESPFSSEEEEEDVPLDSDVEQALQTFAKTSGTMNNYPTWRRTLLRRAKEEEMKRFCKAQTIQRRLNEIEAALRELEAEGVKLELALRRQSSSPEQQKKLWVGQLLQLVDKKNSLVAEEAELMITVQELNLEEKQWQLDQELRGYMNREENLKTAADRQAEDQVLRKLVDLVNQRDALIRFQEERRLSELALGTGAQG\n" +
    ">Q9NPJ6\n" +
    "MAASSSGEKEKERLGGGLGVAGGNSTRERLLSALEDLEVLSRELIEMLAISRNQKLLQAGEENQVLELLIHRDGEFQELMKLALNQGKIHHEMQVLEKEVEKRDSDIQQLQKQLKEAEQILATAVYQAKEKLKSIEKARKGAISSEEIIKYAHRISASNAVCAPLTWVPGDPRRPYPTDLEMRSGLLGQMNNPSTNGVNGHLPGDALAAGRLPDVLAPQYPWQSNDMSMNMLPPNHSSDFLLEPPGHNKENEDDVEIMSTDSSSSSSESD\n" +
    ">Q8N635\n" +
    "MANSFAARIFTTLSDLQTNMANLKVIGIVIGKTDVKGFPDRKNIGSERYTFSFTIRDSPAHFVNAASWGNEDYIKSLSDSFRVGDCVIIENPLIQRKEIEREEKFSPATPSNCKLLLSENHSTVKVCSSYEVDTKLLSLIHLPVKESHDYYSLGDIVANGHSLNGRIINVLAAVKSVGEPKYFTTSDRRKGQRCEVRLYDETESSFAMTCWDNESILLAQSWMPRETVIFASDVRINFDKFRNCMTATVISKTIITTNPDIPEANILLNFIRENKETNVLDDEIDSYFKESINLSTIVDVYTVEQLKGKALKNEGKADPSYGILYAYISTLNIDDETTKVVRNRCSSCGYIVNEASNMCTTCNKNSLDFKSVFLSFHVLIDLTDHTGTLHSCSLTGSVAEETLGCTFVLSHRARSGLKISVLSCKLADPTEASRNLSGQKHV\n" +
    ">O15553\n" +
    "MAKTPSDHLLSTLEELVPYDFEKFKFKLQNTSVQKEHSRIPRSQIQRARPVKMATLLVTYYGEEYAVQLTLQVLRAINQRLLAEELHRAAIQEYSTQENGTDDSAASSSLGENKPRSLKTPDHPEGNEGNGPRPYGGGAASLRCSQPEAGRGLSRKPLSKRREKASEGLDAQGKPRTRSPALPGGRSPGPCRALEGGQAEVRLRRNASSAGRLQGLAGGAPGQKECRPFEVYLPSGKMRPRSLEVTISTGEKAPANPEILLTLEEKTAANLDSATEPRARPTPDGGASADLKEGPGNPEHSVTGRPPDTAASPRCHAQEGDPVDGTCVRDSCSFPEAVSGHPQASGSRSPGCPRCQDSHERKSPGSLSPQPLPQCKRHLKQVQLLFCEDHDEPICLICSLSQEHQGHRVRPIEEVALEHKKKIQKQLEHLKKLRKSGEEQRSYGEEKAVSFLKQTEALKQRVQRKLEQVYYFLEQQEHFFVASLEDVGQMVGQIRKAYDTRVSQDIALLDALIGELEAKECQSEWELLQDIGDILHRAKTVPVPEKWTTPQEIKQKIQLLHQKSEFVEKSTKYFSETLRSEMEMFNVPELIGAQAHAVNVILDAETAYPNLIFSDDLKSVRLGNKWERLPDGPQRFDSCIIVLGSPSFLSGRRYWEVEVGDKTAWILGACKTSISRKGNMTLSPENGYWVVIMMKENEYQASSVPPTRLLIKEPPKRVGIFVDYRVGSISFYNVTARSHIYTFASCSFSGPLQPIFSPGTRDGGKNTAPLTICPVGGQGPD\n" +
    ">Q8NCK7\n" +
    "MPAPQRKHRRGGFSHRCFPTPQTAMTPQPAGPPDGGWGWVVAAAAFAINGLSYGLLRSLGLAFPDLAEHFDRSAQDTAWISALALAVQQAASPVGSALSTRWGARPVVMVGGVLASLGFVFSAFASDLLHLYLGLGLLAGFGWALVFAPALGTLSRYFSRRRVLAVGLALTGNGASSLLLAPALQLLLDTFGWRGALLLLGAITLHLTPCGALLLPLVLPGDPPAPPRSPLAALGLSLFTRRAFSIFALGTALVGGGYFVPYVHLAPHALDRGLGGYGAALVVAVAAMGDAGARLVCGWLADQGWVPLPRLLAVFGALTGLGLWVVGLVPVVGGEESWGGPLLAAAVAYGLSAGSYAPLVFGVLPGLVGVGGVVQATGLVMMLMSLGGLLGPPLSGFLRDETGDFTASFLLSGSLILSGSFIYIGLPRALPSCGPASPPATPPPETGELLPAPQAVLLSPGGPGSTLDTTC\n" +
    ">Q9HD23\n" +
    "MECLRSLPCLLPRAMRLPRRTLCALALDVTSVGPPVAACGRRANLIGRSRAAQLCGPDRLRVAGEVHRFRTSDVSQATLASVAPVFTVTKFDKQGNVTSFERKKTELYQELGLQARDLRFQHVMSITVRNNRIIMRMEYLKAVITPECLLILDYRNLNLEQWLFRELPSQLSGEGQLVTYPLPFEFRAIEALLQYWINTLQGKLSILQPLILETLDALVDPKHSSVDRSKLHILLQNGKSLSELETDIKIFKESILEILDEEELLEELCVSKWSDPQVFEKSSAGIDHAEEMELLLENYYRLADDLSNAARELRVLIDDSQSIIFINLDSHRNVMMRLNLQLTMGTFSLSLFGLMGVAFGMNLESSLEEDHRIFWLITGIMFMGSGLIWRRLLSFLGRQLEAPLPPMMASLPKKTLLADRSMELKNSLRLDGLGSGRSILTNR");
    var textareaText = $('#txtHumanFasta').val();
    textareaText = textareaText.replace(/\r?\n/g, '<br />');
    $('#txtHumanFasta').html(textareaText);
}

function reset() {
    document.getElementById('txtVirusFasta').value = "";
    document.getElementById('txtHumanFasta').value = "";
    document.getElementById('txtEmail').value = "";
    document.getElementById('chkPhase1').checked = true;
    document.getElementById('chkPhase2').checked = true;
    document.getElementById('chkPhase3').checked = true;
    document.getElementById('chkPhase4').checked = true;
    document.getElementById('chkInteraction').checked = false;
    document.getElementById("radioCoV1").checked = false;
    document.getElementById("radioCoV2").checked = false;
    document.getElementById("radioMERS").checked = false;
    document.getElementById('chkPhase1').removeAttribute("disabled");
    document.getElementById('chkPhase2').removeAttribute("disabled");
    document.getElementById('chkPhase3').removeAttribute("disabled");
    document.getElementById('chkPhase4').removeAttribute("disabled");
    document.getElementById('txtHumanFasta').removeAttribute("disabled");
    document.getElementById('fileHumanFasta').removeAttribute("disabled");

    f = document.getElementById('fileVirusFasta');
    if(f.value){
        try{
            f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
        }catch(err){ }
        if(f.value){ //for IE5 ~ IE10
            var form = document.createElement('form'),
                parentNode = f.parentNode, ref = f.nextSibling;
            form.appendChild(f);
            form.reset();
            parentNode.insertBefore(f,ref);
        }
    }

    f = document.getElementById('fileHumanFasta');
    if(f.value){
        try{
            f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
        }catch(err){ }
        if(f.value){ //for IE5 ~ IE10
            var form = document.createElement('form'),
                parentNode = f.parentNode, ref = f.nextSibling;
            form.appendChild(f);
            form.reset();
            parentNode.insertBefore(f,ref);
        }
    }
}

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str)) 
}

$(document).ready(function() {
    while(document.getElementById('jobid-data') === null){
        //DO NOTHING
    }
    jobid = JSON.parse(document.getElementById('jobid-data').text);
    if (jobid !== ""){
        if (isNumeric(jobid)) {
            document.getElementById("submitError").style.display = "none";
            document.getElementById("submitted").style.display = "";
            $("#modalSubmission").modal("toggle");
            chkInteraction = document.getElementById('chkInteraction-data');
            if(chkInteraction !== null)
                chkInteraction = JSON.parse(chkInteraction.text);
            if(!chkInteraction)
            {
                checkInterval = setInterval(isJobDone, 10000); 
            }
            else
            {
                checkInterval4 = setInterval(isJobDone4, 10000); 
            }
        } else {
            document.getElementById("submitted").style.display = "none";
            document.getElementById("submitError").textContent = jobid;
            document.getElementById("submitError").style.display = "";
            $("#modalSubmission").modal("toggle");
        }
    }

    function getCookie(c_name)
    {
        if (document.cookie.length > 0)
        {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1)
            {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return "";
    }

    function isJobDone() {
        jobid = JSON.parse(document.getElementById('jobid-data').text);
        $.ajax({
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            url: url + "/checkJob/",
            type: 'POST',
            data: {
                jobid,
            },
            dataType: 'text',
            success: function (data) {
                if (data === "DONE") {
                    $("#modalSubmission").modal("toggle");
                    clearInterval(checkInterval);
                    window.location.replace(url + "/" + jobid);
                }
            }, 
            error: function(data) {
                console.log("ERROR " + JSON.stringify(data));
            }
        });
    }

    function isJobDone4() {
        href = window.location.href;
        jobid = JSON.parse(document.getElementById('jobid-data').text);
        $.ajax({
            headers: { "X-CSRFToken": getCookie("csrftoken") },
            url: url + "/checkJob4/",
            type: 'POST',
            data: {
                jobid,
            },
            dataType: 'text',
            success: function (data) {
                console.log(data);
                if (data === "DONE") {
                    $("#modalSubmission").modal("toggle");
                    clearInterval(checkInterval4);
                    window.location.replace(url + "/" + jobid);
                }
            }, 
            error: function(data) {
                console.log("ERROR " + JSON.stringify(data));
            }
        });
    }

    
});