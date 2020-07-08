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
let selected_reader = null

var sessionId = null

document.querySelector("#sessionid-input").addEventListener("input", (ev) => {
    this.sessionId = ev.target.value;
});



document.querySelector(".relo-open").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().openSession().then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

document.querySelector(".relo-close").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().closeSession(sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

document.querySelector(".relo-card").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().isPresent(sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

document.querySelector(".relo-atr").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().atr(sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

document.querySelector(".relo-ccidfeatures").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().ccidFeatures(sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

document.querySelector(".relo-ccid").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().ccid("VERIFY_PIN_DIRECT" ,"testCommand", sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

document.querySelector(".relo-command").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().command("testCommand", sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

document.querySelector(".relo-commands").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().commands(["testCommand"], sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})


document.querySelector(".relo-apdu").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().apdu({
            cla: "test",
            ins: "test",
            p1: "test",
            p2: "test"
        }, sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

document.querySelector(".relo-apdus").addEventListener("click", (ev) => {
    if(getRelo()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getRelo().apdus([{
            cla: "test",
            ins: "test",
            p1: "test",
            p2: "test"
        }], sessionId).then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "))
            .catch(err => document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " "));
    }
})

function getReaders() {
    core.readersCardAvailable().then(res => {
        if (res.success) {
            resetReaderList();
            if (res.data.length > 0) {
                for (var i = 0; i < res.data.length > 0; i++) {
                    addReaderValue(res.data[i].name, res.data[i].id)
                }
            }
        }
    }, err => {
        console.log("Cards available error:", err)
        document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
    })
}

/*Readers with card inserted*/
document.querySelector(".readerWithCardsMenu").addEventListener("click", (ev) => {
    core.readersCardAvailable().then(res => {
        if (res.success) {
            // console.log(res.data);
            resetReaderList();
            if (res.data.length > 0) {
                for (var i = 0; i < res.data.length > 0; i++) {
                    addReaderValue(res.data[i].name, res.data[i].id)
                }
            }
        }
    }, err => {
        console.log("Cards available error:", err)
        document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
    })
}, err => {
    console.log(err)
    document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
})


function addReaderValue(name, id) {
    let ddm = document.querySelector(".reader-drop-down");
    let child = document.createElement('a')
    child.classList = 'dropdown-item';
    child.setAttribute("id", id)
    child.innerText = name;
    child.addEventListener("click", () => {
        readerClicked(name, id)
    })
    ddm.appendChild(child)
}

function resetReaderList() {
    let ddm = document.querySelector(".reader-drop-down");
    while (ddm.firstChild) {
        ddm.removeChild(ddm.firstChild);
    }
}

function readerClicked(name, id) {
    selected_reader = {
        name: name,
        id: id
    }
    document.querySelector(".badge").innerHTML = name;
    document.querySelector(".badge").classList = "badge badge-success";
    document.querySelector(".readerWithCardsMenu").innerHTML = "Selected: " + name;
}

function trimObj(obj) {
    if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key.trim()] = typeof obj[key] == 'string' ? obj[key].trim() : trimObj(obj[key]);
        return acc;
    }, Array.isArray(obj) ? [] : {});
}

function getRelo() {
    if(selected_reader === null || selected_reader === undefined) return undefined
    else return client.remoteloading(selected_reader.id);
}

function initRelo() {
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
        core.version().then(versionResult => console.log("Relo running on core "+ versionResult));
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
