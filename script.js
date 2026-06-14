let allCommentCount = 0;
let requestCount = 0;

async function request(channelHandle) {
    requestCount++;
    document.getElementById("loadingMessage").style.display = "block";

    await fetch(["https://script.google.com/macros/s/AKfycbw8IhEymo2HBsd1CwVRTlDu7rO6rzRACIk-pUhjvpodyf7pqgZeK2JKmKgsDW83E9Cv/exec"], {
        "method": "POST",
        "body": channelHandle,
        "Content-Type": "application/json"
    })
        .then(responce => {
            return responce.json();
        })
        .then(json => {
            //console.warn(json);

            if (json !== "error") {
                const wrapper = document.getElementById("channelDataWrapper");
                const container = document.createElement("div");
                container.classList.add("channelDataContainer");
                const icon = document.createElement("img");
                icon.src = json.icon;
                icon.classList.add("icon");
                const text = document.createElement("p");
                text.innerText = channelHandle + "・" + json.commentCount + " コメント";
                container.appendChild(icon);
                container.appendChild(text);
                wrapper.appendChild(container);

                allCommentCount += json.commentCount;
                document.getElementById("allCommentCount").innerText = "合計 " + allCommentCount + " コメント";
            } else {
                alert(channelHandle + " が見つかりませんでした");
                document.getElementById("channelHandleInput").value = channelHandle;
            }

            requestCount--;
            if (requestCount === 0) {
                document.getElementById("loadingMessage").style.display = "none";
            }
        })
}

document.getElementById("submitButton").addEventListener("click", async function (e) {
    const input = document.getElementById("channelHandleInput").value;
    if (input !== "") {
        document.getElementById("channelHandleInput").value = "";
        await request(input);
    }
})