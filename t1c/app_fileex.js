var environment = {
    t1cApiUrl: 'https://t1c.t1t.io',
    t1cApiPort: '51983',
    t1cRpcPort: '50051',
    dsContextPath: '/trust1team/gclds/v3',
    dsContextPathTestMode: '/gcl-ds-web/v3',
    lang: 'en',
    implicitDownload: false,
    localTestMode: false,
    forceHardwarePinpad: false,
    sessionTimeout: 5,
    consentDuration: 1,
    consentTimeout: 10,
    osPinDialog: false,
    containerDownloadTimeout: 30,
    gclVersion: '3.0.0',
    apikey: '1b01afc0-761e-4a88-9c90-f1fdbd2ff653'
};

var client = null;
var core = null
var config = new T1CSdk.T1CConfig();
var pkcs11 = null;

var entity = 'test';
var type = 'test';

document.querySelector("#entity-input").addEventListener("input", (ev) => {
    this.entity = ev.target.value;
});


document.querySelector("#type-input").addEventListener("input", (ev) => {
    this.type = ev.target.value;
});



document.querySelector(".fileex-download").addEventListener("click", (ev) => {

    getFileex().download(entity, type, [115,
        121,
        110,
        116,
        97,
        120,
        32,
        61,
        32,
        34,
        112,
        114,
        111,
        116,
        111,
        51,
        34,
        59,
        10,
        10,
        111,
        112,
        116,
        105,
        111,
        110,
        32,
        106,
        97,
        118,
        97,
        95,
        109,
        117,
        108,
        116,
        105,
        112,
        108,
        101,
        95,
        102,
        105,
        108,
        101,
        115,
        32,
        61,
        32,
        116,
        114,
        117,
        101,
        59,
        10,
        111,
        112,
        116,
        105,
        111,
        110,
        32,
        106,
        97,
        118,
        97,
        95,
        112,
        97,
        99,
        107,
        97,
        103,
        101,
        32,
        61,
        32,
        34,
        116,
        49,
        99,
        46,
        109,
        111,
        100,
        46,
        114,
        101,
        97,
        100,
        101,
        114,
        34,
        59,
        10,
        111,
        112,
        116,
        105,
        111,
        110,
        32,
        106,
        97,
        118,
        97,
        95,
        111,
        117,
        116,
        101,
        114,
        95,
        99,
        108,
        97,
        115,
        115,
        110,
        97,
        109,
        101,
        32],"proto2.proto", null, true, true ).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-upload").addEventListener("click", (ev) => {
    getFileex().upload( entity, type, "proto2.proto", [], true).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-listTypes").addEventListener("click", (ev) => {
    getFileex().listTypes(entity).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-listType").addEventListener("click", (ev) => {
    getFileex().listType(entity, type).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-listTypeContent").addEventListener("click", (ev) => {
    getFileex().listTypeContent(entity, type, []).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-listContent").addEventListener("click", (ev) => {
    getFileex().listContent(entity).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-existsType").addEventListener("click", (ev) => {
    getFileex().existsType(entity, type).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-existsFile").addEventListener("click", (ev) => {
    getFileex().existsFile(entity, type, ["proto2.proto"]).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-getAccessMode").addEventListener("click", (ev) => {
    getFileex().getAccessMode(entity, type, "proto2.proto").then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-createDir").addEventListener("click", (ev) => {
    getFileex().createDir(entity, type, ["testfolder", "test2"], true).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-copyFile").addEventListener("click", (ev) => {
    getFileex().copyFile(entity, type, type, "proto2.proto", "proto3.proto").then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})
document.querySelector(".fileex-moveFile").addEventListener("click", (ev) => {
    getFileex().moveFile(entity, type, type, "proto2.proto", [], ["test"]).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-renameFile").addEventListener("click", (ev) => {
    getFileex().renameFile(entity, type, "proto2.proto", "proto4.proto").then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-getFileInfo").addEventListener("click", (ev) => {
    getFileex().getFileInfo(entity, type, "proto2.proto").then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-createType").addEventListener("click", (ev) => {
    getFileex().createType(entity, type, [], true).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-createTypeDirs").addEventListener("click", (ev) => {
    getFileex().createTypeDirs(entity, type, [], true).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-updateType").addEventListener("click", (ev) => {
    getFileex().updateType(entity, type).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

document.querySelector(".fileex-deleteType").addEventListener("click", (ev) => {
    getFileex().deleteType(entity, type).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
        .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
})

function resetText() {
    document.querySelector(".output-data").innerHTML = "";
}

function trimObj(obj) {
    if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key.trim()] = typeof obj[key] == 'string' ? obj[key].trim() : trimObj(obj[key]);
        return acc;
    }, Array.isArray(obj) ? [] : {});
}

function getFileex() {
    return client.fileex();
}

function initFileex() {
    console.log("Start initializing T1C")

    var configoptions = new T1CSdk.T1CConfigOptions(
        environment.t1cApiUrl,
        environment.t1cApiPort,
        environment.t1cRpcPort,
        undefined,
        undefined,
        pkcs11,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true,
        undefined,
        undefined,
        undefined,
        undefined,
        "3.0.0",
        undefined,
    );
    config = new T1CSdk.T1CConfig(configoptions);
    T1CSdk.T1CClient.initialize(config).then(res => {
        client = res;
        console.log("Client config: ", client.localConfig)
        core = client.core();
        core.version().then(versionResult => console.log("fileexchange running on core " + versionResult));
        getReaders();
    }, err => {
        console.log("T1C error:", err)
        if (err.code == 301 || err.code == 302) {
            err.client.download("v3.0.1").then(res => {
                let download = "Download the T1C here";
                document.querySelector(".download").classList.remove("hidden")
                document.querySelector(".download").innerHTML = download.link(res.url);
            });
        }
    });
}
