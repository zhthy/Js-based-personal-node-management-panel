function generateQR(container, data) {
    var qrCanvas = document.createElement("canvas");
    var ctx = qrCanvas.getContext("2d");
    container.appendChild(qrCanvas);
    
    // Generate QR Code
    var qr = new QRious({
        element: qrCanvas,
        value: data,
        size: 300
    });
}

function addQRCode() {
    var container = document.getElementById("qrcodeContainer");
    var qrcodeDiv = document.createElement("div");
    qrcodeDiv.classList.add("qrcode-container");
    qrcodeDiv.innerHTML = `
        <input type="text" class="urlInput" placeholder="输入节点数据">
        <button onclick="generateQR(this.parentElement, this.previousElementSibling.value)">点击生成二维码</button>
    `;
    container.appendChild(qrcodeDiv);
}

function removeQRCode() {
    var container = document.getElementById("qrcodeContainer");
    var qrcodeContainers = container.querySelectorAll(".qrcode-container");
    if (qrcodeContainers.length > 0) {
        container.removeChild(qrcodeContainers[qrcodeContainers.length - 1]);
    } else {
        alert("No QR code to remove.");
    }
}

function saveQRData() {
    var container = document.getElementById("qrcodeContainer");
    var qrcodeContainers = container.querySelectorAll(".qrcode-container");
    var qrData = [];
    qrcodeContainers.forEach(function(container) {
        var urlInput = container.querySelector(".urlInput").value;
        qrData.push(urlInput);
    });
    var data = qrData.join('\n');
    var blob = new Blob([data], {type: 'text/plain'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'qrcodes.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function loadQRData(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var data = event.target.result;
        var qrData = data.split('\n');
        var container = document.getElementById("qrcodeContainer");
        qrData.forEach(function(url) {
            if (url.trim() !== "") {
                addQRCode();
                var qrcodeContainers = container.querySelectorAll(".qrcode-container");
                var lastContainer = qrcodeContainers[qrcodeContainers.length - 1];
                var urlInput = lastContainer.querySelector(".urlInput");
                urlInput.value = url.trim();
            }
        });
    };
    reader.readAsText(file);
}

function subscribeAllNodes() {
    var container = document.getElementById("qrcodeContainer");
    var qrcodeContainers = container.querySelectorAll(".qrcode-container");
    var qrData = [];
    qrcodeContainers.forEach(function(container) {
        var urlInput = container.querySelector(".urlInput").value;
        qrData.push(urlInput);
    });
    var data = qrData.join('\n'); // 使用换行符替换分号
    generateQR(container, data);
}