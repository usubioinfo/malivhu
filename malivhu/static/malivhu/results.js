var href = window.location.href;
var url = href.substring(0, href.lastIndexOf("/"));
var url = url.substring(0, url.lastIndexOf("/"));
var jobIds = window.location.href.split("/");
var checkInterval = null;
var intervalSet = false;
var valueStructures = null;
var valueStructures3 = null;

var p4Open = false;

for (let i = jobIds.length - 1; i >= 0; i--) {
    var jobId = jobIds[i].trim();
    if(jobId !== ""){
        break;
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function checkHumanFasta() {
    var textareaText = $('#txtHumanFasta').val();
    var data = new FormData();
    jQuery.each(jQuery('#fileHumanFasta')[0].files, function(i, file) {
        data.append("file", file);
    });
    data.append("text", textareaText);
    var email = $('#txtEmail').val();
    data.append("email", email);
    $.ajax({
        method: 'POST',
        url: window.location.href + "/submitPhase4/",
        headers: {'X-CSRFToken': csrftoken},
        contentType: false,
        processData: false,
        cache: false,
        data: data,
        success: function(data) {
            if(data.includes("There was an error")) {
                document.getElementById("submitted").style.display = "none";
                document.getElementById("submitError").style.display = "";
                document.getElementById("submitError").textContent = data;
                setTimeout(() => { $('#modalSubmission').modal('toggle');}, 300);
            }
            if(data !== "Your interactions are being predicted."){
                alert(data);
                setTimeout(() => { $('#modalHuman').modal('toggle');}, 300);
            } else {
                document.getElementById("btnRunPhase4").style.display = "none";
                document.getElementById("imgRunPhase4").style.display = "none";
                document.getElementById("submitError").style.display = "none";
                document.getElementById("submitted").style.display = "";
                var checkIntervalPhase4 = setInterval(isJobDone, 10000); 
                setTimeout(() => { $('#modalSubmission').modal('toggle');}, 300);
            }
        }, 
        error: function(data) {
            document.getElementById("phase4Info").innerText = "There was an error submitting your job. " + data;
        }
    });
}

function isJobDone() {
    href = window.location.href;
    var jobIds = href.split("/");
    for (let i = jobIds.length - 1; i >= 0; i--) {
        var jobid = jobIds[i].trim();
        if(jobid !== ""){
            break;
        }
    }
    $.ajax({
        headers: { "X-CSRFToken": getCookie("csrftoken") },
        url: url + "/checkJob4/",
        type: 'POST',
        data: {
            jobid,
        },
        dataType: 'text',
        success: function (data) {
            if (data === "DONE") {
                window.open(window.location.href, "_self");
                $("#modalSubmission").modal("toggle");
            }
        }, 
        error: function(data) {
            console.log("ERROR " + JSON.stringify(data));
        }
    });
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


function checkPendingSecondaryStructures() {
   valueStructuresJSON = JSON.parse(valueStructures);
   for (structure of valueStructuresJSON) {
	  if (structure.split(" ")[1] !== "NO" && structure.split(" ")[1] !== "DONE") {
	  	 if (!intervalSet) {
	  	 	intervalSet = true;
    	          checkInterval = setInterval(isFileUpdated, 10000); //10000 is 10 seconds
	      }
	      return;
       }
   }
   intervalSet = false;
   clearInterval(checkInterval);
}

function checkPendingTertiaryStructures() {
    valueStructures3JSON = JSON.parse(valueStructures3);
    for (structure of valueStructures3JSON) {
       if (structure.split(" ")[1] !== "NO" && structure.split(" ")[1] !== "DONE") {
            if (!intervalSet) {
                intervalSet = true;
                   checkInterval3 = setInterval(isFileUpdated3, 60000); //60000 is 60 seconds
           }
           return;
        }
    }
    intervalSet = false;
    clearInterval(checkInterval3);
}
    
function isFileUpdated() {
   $.ajax({
       url: window.location.href + "/checkProgress",
       type: 'GET',
       data: {
       },
       cache: false,
       contentType: false,
       processData: false,
       success: function (data) {
       	 dataStructures = '["' + data.replaceAll("\n", '", "') + '"]'
           if (data !== valueStructures){
               valueStructures = dataStructures;
               structures = {}
               splits = data.split("\n");
               for(line of splits){
                   splits = line.split(" ");
                   structures[splits[0]] = splits[1]
               };
               $('#tabPhase1').DataTable()
                   .rows()
                   .invalidate()
                   .draw();
               $('#tabPhase2').DataTable()
                   .rows()
                   .invalidate()
                   .draw();
               $('#tabPhase3').DataTable()
                   .rows()
                   .invalidate()
                   .draw();
               $('#tabPhase4').DataTable()
                   .rows()
                   .invalidate()
                   .draw();
               checkPendingSecondaryStructures();
               checkPendingTertiaryStructures();
           }
       }
   });
}

function isFileUpdated3() {
    $.ajax({
        url: window.location.href + "/checkProgress3",
        type: 'GET',
        data: {
        },
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
             dataStructures = '["' + data.replaceAll("\n", '", "') + '"]'
            if (data !== valueStructures3){
                valueStructures3 = dataStructures;
                structures3 = {}
                splits = data.split("\n");
                for(line of splits){
                    splits = line.split(" ");
                    structures3[splits[0]] = splits[1]
                };
                $('#tabPhase1').DataTable()
                    .rows()
                    .invalidate()
                    .draw();
                $('#tabPhase2').DataTable()
                    .rows()
                    .invalidate()
                    .draw();
                $('#tabPhase3').DataTable()
                    .rows()
                    .invalidate()
                    .draw();
                $('#tabPhase4').DataTable()
                    .rows()
                    .invalidate()
                    .draw();
               checkPendingSecondaryStructures();
               checkPendingTertiaryStructures();
            }
        }
    });
 }

function predictSecondary(protein){
    $.ajax({
        method: 'POST',
        url: url + "/" + jobId + "/predict/2/",
        headers: {'X-CSRFToken': csrftoken},
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        cache: false,
        data: protein,
        success: function(data) {
            console.log(protein);
        }, 
        error: function(data) {
            if(data.status !== 200){
                console.log("Secondary structure submission not sent." + JSON.stringify(data));
            }
            else {
                proteinName = protein.split("_")[1];
                valueStructures = valueStructures.replace(proteinName + " NO", proteinName + " YES");
		        checkPendingSecondaryStructures();
            }
        }
    }).done(function() {
        $( this ).addClass( "done" );
    });
}

function predictTertiary(protein){
    $.ajax({
        method: 'POST',
        url: url + "/" + jobId + "/predict/3/",
        headers: {'X-CSRFToken': csrftoken},
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        cache: false,
        data: protein,
        success: function(data) {
            console.log(protein);
        }, 
        error: function(data) {
            if(data.status !== 200){
                console.log("Tertiary structure submission not sent." + JSON.stringify(data));
            }
            else {
                proteinName = protein.split("_")[1];
	            valueStructures3 = valueStructures3.replace(proteinName + " NO", proteinName + " YES");
		        checkPendingTertiaryStructures();
            }
        }
    }).done(function() {
        $( this ).addClass( "done" );
    });
}

$(document).ready(function() {
    document.getElementById('myTabContent').style.display = "";
    while(document.getElementById('phase1-data') === null && document.getElementById('info1-data') === null){
        //DO NOTHING
    }
    
    var dataSet1 = JSON.parse(document.getElementById('phase1-data').text);
    if (dataSet1){
        total = dataSet1.length;
        positive = 0;
        for (row of dataSet1){
            if(row[1] == "ssRNA(-)") {
                positive++;
            }
        }
        document.getElementById('phase1-tab').style.display = "";
        document.getElementById("summaryP1").style.display = "";
        document.getElementById("p1tooltip").style.display = "";
        document.getElementById('tabPhase1').style.display = "";
        document.getElementById("summaryP1").innerText = positive + " ssRNA(-) sequences found out of " + total + " total sequences.";
    } else if (JSON.parse(document.getElementById('info1-data').text) === "Please, try reloading the page in a minute. Your results will be available soon.") {
        document.getElementById('phase1-tab').style.display = "";
        document.getElementById('tabPhase1').style.display = "";
        document.getElementById('formRunP2').style.display = "none";
    }

    while(document.getElementById('phase2-data') === null && document.getElementById('info2-data') === null){
        //DO NOTHING
    }
    var dataSet2 = JSON.parse(document.getElementById('phase2-data').text);
    if (dataSet2){
        total = dataSet2.length;
        positive = 0;
        for (row of dataSet2){
            if(row[1] == "Coronaviridae") {
                positive++;
            }
        }
        document.getElementById('phase2-tab').style.display = "";
        document.getElementById("summaryP2").style.display = "";
        document.getElementById('tabPhase2').style.display = "";
        document.getElementById("summaryP2").innerText = positive + " Coronaviridae sequences found out of " + total + " total sequences.";
    } else if (dataSet1) {
        if (JSON.parse(document.getElementById('info2-data').text) === "Please, try reloading the page in a minute. Your results will be available soon.") {
            document.getElementById('phase2-tab').style.display = "";
            document.getElementById('tabPhase2').style.display = "";
        } else { 
            document.getElementById("formRunP2").style.display = "";
        }
    }

    while(document.getElementById('phase3-data') === null && document.getElementById('info3-data') === null){
        //DO NOTHING
    }
    var dataSet3 = JSON.parse(document.getElementById('phase3-data').text);
    if (dataSet3){
        total = dataSet3.length;
        sars = 0;
        mers = 0
        for (row of dataSet3){
            if(row[1] == "SARS") {
                sars++;
            } else if (row[1] == "MERS") { 
                mers++;
            }
        }
        document.getElementById('phase3-tab').style.display = "";
        document.getElementById("summaryP3").style.display = "";
        document.getElementById('tabPhase3').style.display = "";
        document.getElementById("summaryP3").innerText = sars + " SARS sequences and " + mers + " MERS sequences found out of " + total + " total sequences.";
    } else if (dataSet1 && dataSet2) {
        if (JSON.parse(document.getElementById('info3-data').text) === "Please, try reloading the page in a minute. Your results will be available soon.") {
            document.getElementById('phase3-tab').style.display = "";
            document.getElementById('tabPhase3').style.display = "";
        } else { 
            document.getElementById("formRunP3").style.display = "";
        }
    }

    while(document.getElementById('phase4-data') === null && document.getElementById('info4-data') === null){
        //DO NOTHING
    }
    var dataSet4 = JSON.parse(document.getElementById('phase4-data').text);
    if (dataSet4){
        total = dataSet4.length;
        positive = 0;
        for (row of dataSet4){
            if(row[3] == "Yes") {
                positive++;
            }
        }
        document.getElementById('phase4-tab').style.display = "";
        document.getElementById("summaryP4").style.display = "";
        document.getElementById('tabPhase4').style.display = "";
        document.getElementById("p4tooltip").style.display = "";
        document.getElementById("summaryP4").innerText = positive + " positive interactions found out of " + total + " total possible interactions.";
    } else if (dataSet1 && dataSet2 && dataSet3) {
        if (JSON.parse(document.getElementById('info4-data').text) === "Please, try reloading the page in a minute. Your results will be available soon.") {
            document.getElementById('phase4-tab').style.display = "";
            document.getElementById('tabPhase4').style.display = "";
        } else { 
            document.getElementById("btnRunPhase4").style.display = "";
            document.getElementById("imgRunPhase4").style.display = "";
        }
    } 

    while(document.getElementById('structures-data') === null){
        //DO NOTHING
    }
    valueStructures = document.getElementById('structures-data').text;
    valueStructuresJSON = JSON.parse(valueStructures);
    structures = {}
    for(line of valueStructuresJSON){
        splits = line.split(" ");
        structures[splits[0]] = splits[1]
    }

    while(document.getElementById('structures3-data') === null){
        //DO NOTHING
    }
    valueStructures3 = document.getElementById('structures3-data').text;
    valueStructures3JSON = JSON.parse(valueStructures3);
    structures3 = {}
    for(line of valueStructures3JSON){
        splits = line.split(" ");
        structures3[splits[0]] = splits[1]
    }

    $('#tabPhase1').DataTable( {
        data: dataSet1,
        columns: [
            { title: "Protein name" },
            { title: "Prediction" },
            { title: "ssRNA(-)" },
            { title: "Non-ssRNA(-)" },
            { title: "Secondary structure" },
            { title: "Tertiary structure" },
        ], 
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ],
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "className": 'dt-body-center',
            "render": function(data, type, row){
                csrf = document.getElementById('formRunP2').children[0].outerHTML;
                protein = row[0].replace(/[^0-9a-z]/gi, '');
                predicting = structures3[protein];
                if(predicting === "NO"){
                    return "<button class='btn btn-primary' onClick='this.disabled=true; this.innerText=\"Predicting...\"; predictTertiary(\"VIRUS_" + protein + "\");'>Predict</button>"
                } else if (predicting === "YES"){
                    return "<button class='btn btn-primary' disabled>Predicting...</button>"
                } else if (predicting === "DONE"){
                    return "<form target=\"_blank\" action=\"" + url + "/" + jobId + "/3/VIRUS_" + protein + "/\" method=\"post\">" + csrf + "<button name=\"protein_" + protein + "\" type=\"submit\" class='btn btn-primary'>View</button></form>"
                }
            },
        }, {
            "targets": -2,
            "data": null,
            "className": 'dt-body-center',
            "render": function(data, type, row){
                csrf = document.getElementById('formRunP2').children[0].outerHTML;
                var protein = row[0].replace(/[^0-9a-z]/gi, '');
                predicting = structures[protein];
                if(predicting === "NO"){
                    return "<button class='btn btn-primary' onClick='this.disabled=true; this.innerText=\"Predicting...\"; predictSecondary(\"VIRUS_" + protein + "\");'>Predict</button>"
                } else if (predicting === "YES"){
                    return "<button class='btn btn-primary' disabled>Predicting...</button>"
                } else if (predicting === "DONE"){
                    return "<form target=\"_blank\" action=\"" + url + "/" + jobId + "/2/VIRUS_" + protein + "/\" method=\"post\">" + csrf + "<button name=\"protein_" + protein + "\" type=\"submit\" class='btn btn-primary'>View</button></form>"
                }
            },
        }],
        rowCallback: function(row, data, index){
            if(data[1] == "ssRNA(-)"){
                $(row).css('background-color', '#b9e2bc');
            }
            else {
                $(row).css('background-color', '#e2b9b9');
            }
            let scorePos = parseFloat(data[2].slice(0, -1));
            let scoreNeg = parseFloat(data[3].slice(0, -1));
            if(scorePos > scoreNeg) {
                $(row).find('td:eq(2)').css('font-weight', 'bold');
            } else {
                $(row).find('td:eq(3)').css('font-weight', 'bold');
            }
        }
    } );
    $('#tabPhase2').DataTable( {
        data: dataSet2,
        columns: [
            { title: "Protein name" },
            { title: "Prediction" },
            { title: "Coronaviridae" },
            { title: "Non-Coronaviridae" },
            { title: "Secondary structure" },
            { title: "Tertiary structure" },
        ], 
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ],
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "className": 'dt-body-center',
            "render": function(data, type, row){
                csrf = document.getElementById('formRunP2').children[0].outerHTML;
                protein = row[0].replace(/[^0-9a-z]/gi, '');
                predicting = structures3[protein];
                if(predicting === "NO"){
                    return "<button class='btn btn-primary' onClick='this.disabled=true; this.innerText=\"Predicting...\"; predictTertiary(\"VIRUS_" + protein + "\");'>Predict</button>"
                } else if (predicting === "YES"){
                    return "<button class='btn btn-primary' disabled>Predicting...</button>"
                } else if (predicting === "DONE"){
                    return "<form target=\"_blank\" action=\"" + url + "/" + jobId + "/3/VIRUS_" + protein + "/\" method=\"post\">" + csrf + "<button name=\"protein_" + protein + "\" type=\"submit\" class='btn btn-primary'>View</button></form>"
                }
            },
        }, {
            "targets": -2,
            "data": null,
            "className": 'dt-body-center',
            "render": function(data, type, row){
                csrf = document.getElementById('formRunP2').children[0].outerHTML;
                protein = row[0].replace(/[^0-9a-z]/gi, '');
                predicting = structures[protein];
                if(predicting === "NO"){
                    return "<button class='btn btn-primary' onClick='this.disabled=true; this.innerText=\"Predicting...\"; predictSecondary(\"VIRUS_" + protein + "\");'>Predict</button>"
                } else if (predicting === "YES"){
                    return "<button class='btn btn-primary' disabled>Predicting...</button>"
                } else if (predicting === "DONE"){
                    return "<form target=\"_blank\" action=\"" + url + "/" + jobId + "/2/VIRUS_" + protein + "/\" method=\"post\">" + csrf + "<button name=\"protein_" + protein + "\" type=\"submit\" class='btn btn-primary'>View</button></form>"
                }
            },
        }],
        rowCallback: function(row, data, index){
            if(data[1] == "Coronaviridae"){
                $(row).css('background-color', '#b9e2bc');
            }
            else {
                $(row).css('background-color', '#e2b9b9');
            }
            let scorePos = parseFloat(data[2].slice(0, -1));
            let scoreNeg = parseFloat(data[3].slice(0, -1));
            if(scorePos > scoreNeg) {
                $(row).find('td:eq(2)').css('font-weight', 'bold');
            } else {
                $(row).find('td:eq(3)').css('font-weight', 'bold');
            }
        }
    } );
    $('#tabPhase3').DataTable( {
        data: dataSet3,
        columns: [
            { title: "Protein name" },
            { title: "Prediction" },
            { title: "SARS" },
            { title: "MERS" },
            { title: "Other Coronaviridae" },
            { title: "Secondary structure" },
            { title: "Tertiary structure" },
        ], 
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ],
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "className": 'dt-body-center',
            "render": function(data, type, row){
                csrf = document.getElementById('formRunP2').children[0].outerHTML;
                protein = row[0].replace(/[^0-9a-z]/gi, '');
                predicting = structures3[protein];
                if(predicting === "NO"){
                    return "<button class='btn btn-primary' onClick='this.disabled=true; this.innerText=\"Predicting...\"; predictTertiary(\"VIRUS_" + protein + "\");'>Predict</button>"
                } else if (predicting === "YES"){
                    return "<button class='btn btn-primary' disabled>Predicting...</button>"
                } else if (predicting === "DONE"){
                    return "<form target=\"_blank\" action=\"" + url + "/" + jobId + "/3/VIRUS_" + protein + "/\" method=\"post\">" + csrf + "<button name=\"protein_" + protein + "\" type=\"submit\" class='btn btn-primary'>View</button></form>"
                }
            },
        }, {
            "targets": -2,
            "data": null,
            "className": 'dt-body-center',
            "render": function(data, type, row){
                csrf = document.getElementById('formRunP2').children[0].outerHTML;
                protein = row[0].replace(/[^0-9a-z]/gi, '');
                predicting = structures[protein];
                if(predicting === "NO"){
                    return "<button class='btn btn-primary' onClick='this.disabled=true; this.innerText=\"Predicting...\"; predictSecondary(\"VIRUS_" + protein + "\");'>Predict</button>"
                } else if (predicting === "YES"){
                    return "<button class='btn btn-primary' disabled>Predicting...</button>"
                } else if (predicting === "DONE"){
                    return "<form target=\"_blank\" action=\"" + url + "/" + jobId + "/2/VIRUS_" + protein + "/\" method=\"post\">" + csrf + "<button name=\"protein_" + protein + "\" type=\"submit\" class='btn btn-primary'>View</button></form>"
                }
            },
        }],
        rowCallback: function(row, data, index){
            if(data[1] === "Other Coronaviridae"){
                $(row).css('background-color', '#e2b9b9');
            }
            else if(data[1] === "SARS"){
                $(row).css('background-color', '#b9e2bc');
            }
            else{
                $(row).css('background-color', 'rgb(129 202 134)');
            }
            let scoreSARS = parseFloat(data[2].slice(0, -1));
            let scoreMERS = parseFloat(data[3].slice(0, -1));
            let scoreNeg = parseFloat(data[4].slice(0, -1));
            if(scoreSARS > scoreMERS && scoreSARS > scoreNeg) {
                $(row).find('td:eq(2)').css('font-weight', 'bold');
            } else if (scoreMERS > scoreSARS && scoreMERS > scoreNeg) {
                $(row).find('td:eq(3)').css('font-weight', 'bold');
            } else {
                $(row).find('td:eq(4)').css('font-weight', 'bold');
            } 
        }
    } );
    $('#tabPhase4').DataTable( {
        data: dataSet4,
        columns: [
            { title: "Viral protein" },
            { title: "Virus type" },
            { title: "Human protein" },
            { title: "Interaction" },
            { title: "Positive score" },
            { title: "Negative score" },
            { title: "Virus secondary structure" },
            { title: "Human secondary structure" },
        ], 
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print'
        ],
        "columnDefs": [{
            "targets": -2,
            "data": null,
            "className": 'dt-body-center',
            "render": function(data, type, row){
                csrf = document.getElementById('formRunP2').children[0].outerHTML;
                protein = row[0].replace(/[^0-9a-z]/gi, '');
                predicting = structures[protein];
                if(predicting === "NO"){
                    return "<button class='btn btn-primary' onClick='this.disabled=true; this.innerText=\"Predicting...\"; predictSecondary(\"VIRUS_" + protein + "\");'>Predict</button>"
                } else if (predicting === "YES"){
                    return "<button class='btn btn-primary' disabled>Predicting...</button>"
                } else if (predicting === "DONE"){
                    return "<form target=\"_blank\" action=\"" + url + "/" + jobId + "/2/VIRUS_" + protein + "/\" method=\"post\">" + csrf + "<button name=\"protein_" + protein + "\" type=\"submit\" class='btn btn-primary'>View</button></form>"
                }
            },
        }, {
            "targets": -1,
            "data": null,
            "className": 'dt-body-center',
            "render": function(data, type, row){
                csrf = document.getElementById('formRunP2').children[0].outerHTML;
                protein = row[2].replace(/[^0-9a-z]/gi, '');
                predicting = structures[protein];
                if(predicting === "NO"){
                    return "<button class='btn btn-primary' onClick='this.disabled=true; this.innerText=\"Predicting...\"; predictSecondary(\"HUMAN_" + protein + "\");'>Predict</button>"
                } else if (predicting === "YES"){
                    return "<button class='btn btn-primary' disabled>Predicting...</button>"
                } else if (predicting === "DONE"){
                    return "<form target=\"_blank\" action=\"" + url + "/" + jobId + "/2/VIRUS_" + protein + "/\" method=\"post\">" + csrf + "<button name=\"protein_" + protein + "\" type=\"submit\" class='btn btn-primary'>View</button></form>"
                }
            },
        }],
        rowCallback: function(row, data, index){
            if(data[3] === "Yes"){
                $(row).css('background-color', '#b9e2bc');
            }
            else {
                $(row).css('background-color', '#e2b9b9');
            }
            let scorePos = parseFloat(data[4].slice(0, -1));
            let scoreNeg = parseFloat(data[5].slice(0, -1));
            if(scorePos > scoreNeg) {
                $(row).find('td:eq(4)').css('font-weight', 'bold');
            } else {
                $(row).find('td:eq(5)').css('font-weight', 'bold');
            }
        }
    } );

    value = JSON.parse(document.getElementById('info1-data').text);
    if (value !== ""){
        document.getElementById('tabPhase1_wrapper').style.display = "none";
    }

    value = JSON.parse(document.getElementById('info2-data').text);
    if (value === "ACTIVE") {
        document.getElementById('phase1-tab').classList.remove("active");
        document.getElementById('phase2-tab').classList.add("active");
        document.getElementById('phase1').classList.remove("show");
        document.getElementById('phase2').classList.add("show");
        document.getElementById('phase1').classList.remove("active");
        document.getElementById('phase2').classList.add("active");
    } else if (value !== ""){
        document.getElementById('tabPhase2_wrapper').style.display = "none";
    }

    value = JSON.parse(document.getElementById('info3-data').text);
    if (value === "ACTIVE") {
        document.getElementById('phase1-tab').classList.remove("active");
        document.getElementById('phase3-tab').classList.add("active");
        document.getElementById('phase1').classList.remove("show");
        document.getElementById('phase3').classList.add("show");
        document.getElementById('phase1').classList.remove("active");
        document.getElementById('phase3').classList.add("active");
    } else if (value !== ""){
        document.getElementById('tabPhase3_wrapper').style.display = "none";
    }

    value = JSON.parse(document.getElementById('info4-data').text);
    if (value === "ACTIVE") {
        document.getElementById('phase1-tab').classList.remove("active");
        document.getElementById('phase4-tab').classList.add("active");
        document.getElementById('phase1').classList.remove("show");
        document.getElementById('phase4').classList.add("show");
        document.getElementById('phase1').classList.remove("active");
        document.getElementById('phase4').classList.add("active");
    } else if (value !== "" && JSON.parse(document.getElementById('info1-data').text) === "Phase 1 was not selected for execution.") {
        document.getElementById('tabPhase4_wrapper').style.display = "none";
        document.getElementById('phase4-tab').style.display = "";
        document.getElementById('phase1-tab').classList.remove("active");
        document.getElementById('phase4-tab').classList.add("active");
        document.getElementById('phase1').classList.remove("show");
        document.getElementById('phase4').classList.add("show");
        document.getElementById('phase1').classList.remove("active");
        document.getElementById('phase4').classList.add("active");
    } else if (value !== "") {
        document.getElementById('tabPhase4_wrapper').style.display = "none";
    }

    checkPendingSecondaryStructures();
    
    if (dataSet4) {
        var localHref = window.location.href;
        var localUrl = localHref.substring(0, localHref.lastIndexOf("/"));
        var btns4 = document.querySelector("#tabPhase4_wrapper > .dt-buttons");
        var formNetwork = document.createElement("form");
        formNetwork.action = localUrl + "/viewNetwork/";
        formNetwork.target = "_blank";
        formNetwork.classList.add("inline");
        var btnNetwork = btns4.children[0].cloneNode(true);
        btnNetwork.classList.add("networkButton");
        btnNetwork.children[0].textContent = "View network";
        btnNetwork.type = "submit";
        formNetwork.append(btnNetwork);
        btns4.append(formNetwork);
    }
} );