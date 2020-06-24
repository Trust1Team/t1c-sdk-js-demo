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

document.querySelector(".beid-all-data").addEventListener("click", (ev) => {
    if(getBeid()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getBeid().allData().then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "));
    }
})

document.querySelector(".beid-data-rn").addEventListener("click", (ev) => {
    if(getBeid()  === undefined) {
        document.querySelector(".output-data").innerHTML = JSON.stringify("Select a reader", null, " ");
    }else {
        getBeid().rnData().then(res => document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " "));
    }
})
/*document.querySelector(".infoT1C").addEventListener("click", (ev) => {
    console.log("Get T1C info")
    core.info().then(res => {
        document.querySelector(".output-data").innerHTML = JSON.stringify(res, undefined, 2);
    });

});

document.querySelector(".initT1c").addEventListener("click", (ev) => {
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
    //console.log(config);
    //resetText();
    T1CSdk.T1CClient.initialize(config).then(res => {
        client = res;
        console.log("Client config: ", client.localConfig)
        core = client.core();

        //show content pane
        document.querySelector(".content").classList = "content"
        document.querySelector(".infoT1C").classList.remove("hidden")
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
    //client.core().info.then(res => console.log(res))
}, err => {
    console.log(err)
    document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
})

//event listeners
document.querySelector(".beid").addEventListener("click", (ev) => {
    resetText();
    var beid = client.beid(selected_reader.id);
    var filter = [];
    beid.allData({ filters: filter, parseCerts: false }).then(res => {
        if (res.success) {
            document.querySelector(".output-data").innerHTML = JSON.stringify(res.data, null, " ")
        }
    }, err => {
        console.log("BEID error:", err)
        document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
    })
}, err => {
    console.log(err)
    document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
})

document.querySelector(".beid-verify-pin").addEventListener("click", (ev) => {
    resetText();
    var beid = client.beid(selected_reader.id);
    const pincode = getPin();
    const dialog = pincode != null ? false : true
    var data = {
        pin: pincode,
        os_dialog: dialog
    }
    beid.verifyPin(data).then(pinRes => {
        document.querySelector(".output-data").innerHTML = JSON.stringify(pinRes, null, " ")
    }, err => {
        console.error("pin error", err)
        document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
    });
}, err => {
    document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
})


document.querySelector(".beid-sign-data").addEventListener("click", (ev) => {
    resetText();
    var beid = client.beid(selected_reader.id);
    const pin = getPin();
    signData(client, selected_reader, pin);

}, err => {
    document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
})*/

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
            console.log(res.data);
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
/*    document.querySelector(".beid").classList = "btn btn-primary beid";
    document.querySelector(".beid-verify-pin").classList = "btn btn-primary beid-verify-pin";
    document.querySelector(".beid-sign-data").classList = "btn btn-primary beid-sign-data";*/
    document.querySelector(".readerWithCardsMenu").innerHTML = "Selected: " + name;
}
/*function signData(client, selected_reader, pin) {
    var beid = client.beid(selected_reader.id);
    const filter = ['root_certificate', 'citizen_certificate', 'non_repudiaton_certificate'];
    // beid.allCerts({ filters: filter, parseCerts: false });
    var data = {
        "pin": pin,
        "algorithm_reference": "sha1",
        "data": "I2e+u/sgy7fYgh+DWA0p2jzXQ7E="
    }
    beid.signData(data).then(res => {
        document.querySelector(".output-data").innerHTML = JSON.stringify(res, null, " ")
    }, err => {
        console.error("sign data error: ", err)
        document.querySelector(".output-data").innerHTML = JSON.stringify(err, null, " ")
    });
}*/

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getPin() {
    const pin = document.querySelector(".pin-code").value;
    if (pin != null && pin != undefined && pin != "") {
        return pin;
    } else {
        return null;
    }
}

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

function getBeid() {
    if(selected_reader === null || selected_reader === undefined) return undefined
    else return client.beid(selected_reader.id);
}

function initBeid() {
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
        core.version().then(versionResult => console.log("Beid running on core "+ versionResult));
        getReaders();
        var beid = client.beid("1354a0441b185201");
        beid.allData().then(result => console.log(result.data));
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
