let history_div = document.getElementById("history")
let selectedUser = document.getElementById("user");
let selectedAction = document.getElementById("action");
const Keys = [["date", "successful", "fail", "location", "userID"], ["date", "action", "location", "userID", "image"]]

let loaded = false
let fetchedHistory = []
document.getElementById("myBtn").onclick = function () { loadHistory() };

async function loadHistory() {
    if (!loaded) {
        loaded = true
        const history = await fetch("https://dev1.scan-ez.com/history").then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            // *** Read the body, parse it as JSON
            return response.json();
        }).then((res) => {
            return res
        }).catch((error) => {
            console.log(error);
        });
        fetchedHistory = history

    } else {
        console.log("already loaded")
    }
    if (selectedAction.value == "login") {
        processHistory(0)

    } else {
        processHistory(1)

    }

}

function processHistory(e) {
    history_div.innerHTML = '';
    const pDiv = document.createElement('div');

    var cDiv = document.createElement('div');
    for (let j = 0; j < Keys[e].length; j++) {
        var bDiv = document.createElement('div');
        bDiv.innerHTML = Keys[e][j]
        bDiv.classList.add('historyHeader')
        cDiv.appendChild(bDiv);
    }
    cDiv.classList.add('row')

    pDiv.appendChild(cDiv);


    for (let i = 0; i < fetchedHistory.length; i++) {
        if (fetchedHistory[i].location == undefined || fetchedHistory[i].location == null || fetchedHistory[i].location == "uk" || fetchedHistory[i].location.includes("United Kingdom")){
            continue
        }
        if (selectedUser.value == "1" || fetchedHistory[i].userID == selectedUser.value) {
            if ((e == 0 && fetchedHistory[i].action == "login") || (e == 1 && fetchedHistory[i].action != "login")) {
                var cDiv = document.createElement('div');
                for (let j = 0; j < Keys[e].length; j++) {
                    var bDiv = document.createElement('div');
                    if (Keys[e][j] == "image" && fetchedHistory[i][Keys[e][j]] != "no img") {
                        var image = document.createElement('img');
                        image.id = fetchedHistory[i][Keys[e][j]]
                        bDiv.appendChild(image);

                        var imageButton = document.createElement('button');
                        imageButton.innerHTML = "show Image"
                        imageButton.id = fetchedHistory[i][Keys[e][j]] + "_button"
                        imageButton.onclick = function () { 
                            document.getElementById(fetchedHistory[i][Keys[e][j]] + "_button").disabled = true
                            document.getElementById(fetchedHistory[i][Keys[e][j]]).src = "https://dev1.scan-ez.com/" + fetchedHistory[i][Keys[e][j]]
                        };
                        bDiv.appendChild(imageButton);

                    } else {
                        bDiv.innerHTML = fetchedHistory[i][Keys[e][j]]
                    }
                    bDiv.classList.add('historyLog')
                    cDiv.appendChild(bDiv);
                }
                cDiv.classList.add('row')

                pDiv.appendChild(cDiv);

            }
        }
    }
    history_div.appendChild(pDiv)

}