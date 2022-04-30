var structure = "";
var stage = null;
var polyParams = null;
var ligandParams = null;
var colorScheme = "";
var colorReverse = true;

function downloadFile() {
    var structure = document.getElementById('structure-data').text.replaceAll("\\n", "\n");
    structure = structure.substring(1, structure.length - 1);
    var href = window.location.href;
    var protein = href.substring(href.lastIndexOf("/") + 1, href.length - 1)
    var filename = protein + ".pdb";
    var blob = new Blob([structure], {type: 'text/plain'});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else{
        var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    }
}

function makeImage(){
    proteinName = JSON.parse(document.getElementById('name-data').text);
    stage.makeImage({factor: 4, trim: false, transparent: true, antialias: true}).then(function (viewer) {
        NGL.download(viewer, proteinName + ".png");
    });
}

function changeRepresentation(representation, sele) {
    repName = representation.replace("ligand", "")
    el = document.getElementById(representation);
    repsList = stage.getRepresentationsByName(repName).list
    for(rep of repsList) {
        if(rep.getParameters().sele === sele){
            if(rep) {
                stage.compList[0].removeRepresentation(rep)
                el.classList.remove("nav-link-selected");
            }
            stage.autoView();
            return;
        }
    }
    el.classList.add("nav-link-selected");
    if(sele === "ligand") { 
        stage.compList[0].addRepresentation(repName, ligandParams);
    } else {
        stage.compList[0].addRepresentation(repName, polyParams);
    }
    stage.autoView();
}

function changeColorScheme(color, sele){
    colorName = color.replace("ligand", "")
    if(colorName !== colorScheme)
    {
        listColor = null;
        if (sele === "ligand"){
            listColor = document.getElementById("listColorSchemesLigand").children;
            ligandParams.colorScheme = colorName;
        }
        else{
            listColor = document.getElementById("listColorSchemes").children;
            polyParams.colorScheme = colorName;
        }
        for(rep of stage.compList[0].reprList) {
            if(rep.getParameters().sele === sele) {
                rep.setColor(colorName);
            }
        }
        for(item of listColor) {
            item.children[0].classList.remove("nav-link-selected");
        }
        document.getElementById(color).classList.add("nav-link-selected");
        stage.autoView();
    }
}

$(document).ready(function() {
    while(document.getElementById('structure-data') === null){
        //DO NOTHING
    }
    stage = new NGL.Stage("ngl", {backgroundColor: "#f5f4ed"});
    stage.handleResize();
    stage.signals.hovered.add(function (pickingProxy) {
        if (pickingProxy && (pickingProxy.atom || pickingProxy.bond)) {
            var atom = pickingProxy.atom || pickingProxy.closestBondAtom;
            var cp = pickingProxy.canvasPosition;
        }
    });
    var orientationMatrix = stage.viewerControls.getOrientation();
    stage.viewerControls.orient(orientationMatrix);
    structure = JSON.parse(document.getElementById('structure-data').text);
    var stringBlob = new Blob( [ structure ], { type: 'text/plain'} );
    var reader = new FileReader();
    reader.readAsText(stringBlob);
    stage.loadFile(stringBlob, { ext: "pdb", defaultRepresentation: true }).then(function(o){
        repsList = stage.compList[0].reprList;
        for(rep of repsList) {
            if(rep.getParameters().sele === "")
                polyParams = rep.getParameters();
            else if(rep.getParameters().sele === "ligand")
                ligandParams = rep.getParameters();
        }
        if(!polyParams) { 
            polyParams = {
                "colorScheme": "residueindex", 
                "colorScale": "spectral", 
                "colorReverse": true, 
                "surfaceType": "sas"
            }
        }
        if(!ligandParams) { 
            ligandParams = {
                "colorScheme": "element", 
                "colorScale": "", 
                "colorReverse": false, 
                "surfaceType": "sas"
            }
        }
        for(i = repsList.length - 1; i >= 0; i--) {
            rep = repsList[i]
            if(rep.getParameters().sele !== "")
                stage.compList[0].removeRepresentation(rep);
        }
    });
});