var dataSet1 = [
    [ "PROTEIN_1", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_2", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_3", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_4", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_5", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_6", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_7", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_8", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_9", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_10", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_11", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_12", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_13", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_14", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_15", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_16", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_17", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_18", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_19", "ssRNA(-)", "96.2%", "3.8%" ],
    [ "PROTEIN_20", "ssRNA(-)", "96.2%", "3.8%" ],
];

var dataSet2 = [
    [ "PROTEIN_1", "Coronaviridae", "96.2%", "3.8%" ],
    [ "PROTEIN_5", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_7", "Coronaviridae", "96.2%", "3.8%" ],
    [ "PROTEIN_9", "Coronaviridae", "96.2%", "3.8%" ],
    [ "PROTEIN_10", "Coronaviridae", "96.2%", "3.8%" ],
    [ "PROTEIN_11", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_15", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_17", "Coronaviridae", "96.2%", "3.8%" ],
    [ "PROTEIN_19", "Other", "3.8%", "96.2%" ],
    [ "PROTEIN_20", "Other", "3.8%", "96.2%" ],
];

var dataSet3 = [
    [ "PROTEIN_1", "MERS", "24.0%", "72.2%", "3.8%" ],
    [ "PROTEIN_7", "SARS", "72.2%", "24.0%", "3.8%" ],
    [ "PROTEIN_9", "Other", "1.8%", "2.0%", "96.2%" ],
    [ "PROTEIN_10", "Other", "2.0%", "1.8%", "96.2%" ],
    [ "PROTEIN_17", "Other", "2.0%", "3.8%", "96.2%" ],
];

var dataSet4 = [
    [ "PROTEIN_1", "SARS", "HUMAN_1", "Yes", "96.2%", "3.8%" ],
    [ "PROTEIN_1", "SARS", "HUMAN_2", "Yes", "96.2%", "3.8%" ],
    [ "PROTEIN_7", "MERS", "HUMAN_1", "Yes", "96.2%", "3.8%" ],
    [ "PROTEIN_7", "MERS", "HUMAN_2", "No", "3.8%", "96.2%" ],
];
 
$(document).ready(function() {
    $('#tabPhase1').DataTable( {
        data: dataSet1,
        columns: [
            { title: "Protein name" },
            { title: "Prediction" },
            { title: "ssRNA(-) score" },
            { title: "Other score" },
            { title: "Tertiary structure" },
        ], 
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "className": 'dt-body-center',
            "defaultContent": "<button class='btn btn-primary'>View</button>"
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
            { title: "Coronaviridae score" },
            { title: "Other score" },
            { title: "Tertiary structure" },
        ], 
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "className": 'dt-body-center',
            "defaultContent": "<button class='btn btn-primary'>View</button>"
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
            { title: "SARS score" },
            { title: "MERS score" },
            { title: "Other score" },
            { title: "Tertiary structure" },
        ], 
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "className": 'dt-body-center',
            "defaultContent": "<button class='btn btn-primary'>View</button>"
        }],
        rowCallback: function(row, data, index){
            if(data[1] == "Other"){
                $(row).css('background-color', '#e2b9b9');
            }
            else {
                $(row).css('background-color', '#b9e2bc');
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
            { title: "Secondary structure" },
        ], 
        dom: 'Blfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "className": 'dt-body-center',
            "defaultContent": "<button class='btn btn-primary'>View</button>"
        }],
        rowCallback: function(row, data, index){
            if(data[3] == "Yes"){
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
} );

function phase4Changed() {
    phase3 = document.getElementById("chkPhase3").checked;
    console.log(phase3);
    phase4 = document.getElementById("chkPhase4").checked;
    console.log(phase4);
}