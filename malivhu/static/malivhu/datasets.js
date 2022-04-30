function downloadFile(filename) {
    var link = document.createElement("a");
    link.download = "datasets/" + filename;
    link.href = uri;
    link.click();

    var structure = document.getElementById('structure-data').text.replaceAll("\\n", "\n");
    structure = structure.substring(1, structure.length - 1);
    var blob = new Blob([structure], {type: 'text/plain'});
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, "datasets/" + filename);
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