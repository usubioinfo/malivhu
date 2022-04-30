cov1 = true;
cov2 = true;
mers = true;
proteins = {};
layout = "circle";
options = {
    name: layout,
    fit: true,
    animate: true,
    avoidOverlap: true,
}
filter = "";

function load(){
    var dataSet4 = JSON.parse(document.getElementById('phase4-data').text);
    if(dataSet4) { 
        var cov1P = new Set();
        var cov2P = new Set();
        var mersP = new Set();
        var humanP = new Set();
        var ints = new Set();

        if(!cov1){
            dataSet4 = dataSet4.filter(item => item[0] !== "SARS1");
        }
        if(!cov2){
            dataSet4 = dataSet4.filter(item => item[0] !== "SARS2");
        }
        if(!mers){
            dataSet4 = dataSet4.filter(item => item[0] !== "MERS");
        }
        if(filter){
            dataSet4 = dataSet4.filter(item => item[0].includes(filter) || item[1].includes(filter) || item[2].includes(filter));
        }

        for (row of dataSet4) {
            virus = row[0];
            viral = row[1];
            human = row[2];
            interaction = row[3];
            if (virus == "SARS1")
                cov1P.add(viral);
            else if (virus == "SARS2")
                cov2P.add(viral);
            else if (virus == "MERS")
                mersP.add(viral);
            humanP.add(human);
            ints.add([viral, human]);   
        }
        
        window.cy = cytoscape({
            container: document.getElementById("cy"),
            elements: [
            ],
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': 'red',
                        label: 'data(id)',
                    }
                }
            ], 
        });
    
        for (v of cov1P) {
            window.cy.add({
                group: "nodes", 
                data: { id: v },
                style: { "background-color": "rgb(71, 125, 73)" }
            });
        }
        for (v of cov2P) {
            window.cy.add({
                group: "nodes", 
                data: { id: v },
                style: { "background-color": "rgb(50, 108, 170)" }
            });
        }
        for (v of mersP) {
            window.cy.add({
                group: "nodes", 
                data: { id: v },
                style: { "background-color": "rgb(204, 170, 108)" }
            });
        }
        for (h of humanP) {
            window.cy.add({
                group: "nodes", 
                data: { id: h },
                style: { "background-color": "rgb(255, 93, 72)" }
            });
        }
        for (int of ints) {
            window.cy.add({
                group: "edges", 
                data: { id: int[0] + "_" + int[1], source: int[0], target: int[1] }
            });
        }

        var tableNetwork = $('#tabNetwork').DataTable( {
            data: dataSet4,
            destroy: true,
            scrollY: "200px",
            scrollCollapse: true,
            paging: false,
            columns: [
                { title: "Virus" },
                { title: "Viral protein" },
                { title: "Human protein" },
            ], 
            dom: 'lfrt',
            rowCallback: function(row, data, index){
                if(data[0] == "SARS1"){
                    $(row).css('background-color', '#b9e2bc');
                }
                else if(data[0] == "SARS2"){
                    $(row).css('background-color', '#9cc8f7');
                }
                else {
                    $(row).css('background-color', '#dfcdab');
                }
            }
        } );
    }

    var btnFilter = document.createElement("button");
    btnFilter.classList.add("btn");
    btnFilter.classList.add("btn-primary");
    btnFilter.classList.add("networkButton");
    btnFilter.innerText = "Filter graph";
    btnFilter.onclick = function() { applyFilter() };
    document.getElementById("tabNetwork_filter").appendChild(document.createTextNode("\u00A0"));
    document.getElementById("tabNetwork_filter").appendChild(btnFilter);

    proteins = JSON.parse(document.getElementById('proteins-data').text);

    window.cy.on("click", "node", function(evt){
        document.getElementById("proteinInfo").classList.remove("noDisplay");
        protId = evt.target.id();
        document.getElementById("name").innerText = protId;
        document.getElementById("name").classList.remove("noDisplay");
        if (proteins["info"] == "YES") {
            protein = proteins[protId]
            document.getElementById("proteinName").innerText = protein["name"];
            document.getElementById("orgName").innerText = protein["orgName"];
            document.getElementById("orgTaxonId").innerText = protein["orgTaxonId"];
            protein = proteins[protId]
            if (protein["accession"]){
                uniprotUrl = document.getElementById("uniprotUrl");
                uniprotUrl.classList.remove("noDisplay");
                uniprotUrl.href = "https://www.uniprot.org/uniprot/" + protein["accession"];
            } else {
                document.getElementById("uniprotUrl").classList.add("noDisplay");
            }
            if (protein["idProt"]){
                ncbiUrl = document.getElementById("ncbiUrl");
                ncbiUrl.classList.remove("noDisplay");
                ncbiUrl.href = "https://www.ncbi.nlm.nih.gov/protein/" + protein["idProt"];
            } else {
                document.getElementById("ncbiUrl").classList.add("noDisplay");
            }
            if (protein["accession"] && protein["idProt"]) {
                document.getElementById("pipe").classList.remove("noDisplay");
            } else {
                document.getElementById("pipe").classList.add("noDisplay");
            }
            if (protein["name"]) {
                document.getElementById("networkName").classList.remove("noDisplay");
            } else {
                document.getElementById("networkName").classList.add("noDisplay");
            }
            if (protein["orgName"]) {
                document.getElementById("networkOrganism").classList.remove("noDisplay");
            } else {
                document.getElementById("networkOrganism").classList.add("noDisplay");
            }
            if (protein["orgTaxonId"]) {
                document.getElementById("networkTaxon").classList.remove("noDisplay");
            } else {
                document.getElementById("networkTaxon").classList.add("noDisplay");
            }
            tableNetwork.search(protId).draw();
        } else {
            document.getElementById("retrieving").classList.remove("noDisplay");
        }
    });

    window.cy.panzoom({});

    setTimeout(() => { 
        window.cy.layout(options).run();
        window.cy.fit();
        p4Open = true;
    }, 500);

    changeFontSize(document.getElementById("font-size").value);
    changeNodeSize(document.getElementById("node-size").value);
    changeBackgroundColor(document.getElementById("bgColor").value);
    changeLayout(layout);
}

function toggle(virus) {
    if (virus === "CoV1"){
        cov1 = !cov1;
        if(!cov1)
            document.getElementById("btnCoV1").classList.add("toggledOff");
        else
            document.getElementById("btnCoV1").classList.remove("toggledOff");
    } else if (virus === "CoV2"){
        cov2 = !cov2;
        if(!cov2)
            document.getElementById("btnCoV2").classList.add("toggledOff");
        else
            document.getElementById("btnCoV2").classList.remove("toggledOff");
     }else if (virus == "MERS"){
        mers = !mers;
        if(!mers)
            document.getElementById("btnMERS").classList.add("toggledOff");
        else
            document.getElementById("btnMERS").classList.remove("toggledOff");
    }
    load();
}

function applyFilter() {
    filter = document.querySelectorAll("input[type=search]")[0].value;
    load();
}

function changeFontSize(val) {
    window.cy.nodes().style({"font-size": val});
}

function changeNodeSize(val) {
    window.cy.nodes().style({"width": val, "height": val});
}
function changeBackgroundColor(val) {
    document.getElementById("cy").style.backgroundColor = val;
    document.getElementById("proteinsRow").style.backgroundColor = val;
}

function changeLayout(val) { 
    window.cy.layout({"name": val, "animate": true}).run();
    layout = val;
}

function downloadJSON(){
    jsonData = window.cy.json();
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "network.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function downloadImage(){
    svgData = window.cy.svg({bg: document.getElementById("cy").style.backgroundColor});
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData));
    downloadAnchorNode.setAttribute("download", "network.svg");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

$(document).ready(function() {
    while(document.getElementById('phase4-data') === null){
        //DO NOTHING
    }
    
    load();
});