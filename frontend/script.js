/* ================== CONFIG ================== */
const CONTRACT_ADDRESS = "0x0c3E40428487B1992B82f066957Fc1062DD26eb3";

const ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_code", "type": "string" },
      { "internalType": "bytes32", "name": "_dataHash", "type": "bytes32" }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_code", "type": "string" },
      { "internalType": "string", "name": "_action", "type": "string" },
      { "internalType": "string", "name": "_description", "type": "string" }
    ],
    "name": "addHistory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllProducts",
    "outputs": [{ "internalType": "string[]", "type": "string[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_code", "type": "string" }],
    "name": "getProduct",
    "outputs": [
      { "internalType": "string", "type": "string" },
      { "internalType": "bytes32", "type": "bytes32" },
      { "internalType": "uint256", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_code", "type": "string" }],
    "name": "getHistories",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "action", "type": "string" },
          { "internalType": "string", "name": "description", "type": "string" },
          { "internalType": "uint256", "name": "time", "type": "uint256" },
          { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }
        ],
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

/* ================== GLOBAL ================== */
let provider, signer, contract, currentAccount = null;
let qrScanner = null;

/* ================== INIT ================== */
async function init() {
  if (!window.ethereum) {
    alert("❌ Vui lòng cài MetaMask");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);

  const accounts = await provider.send("eth_accounts", []);
  if (accounts.length > 0) {
    currentAccount = accounts[0];
    signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    updateWalletUI();
    loadProducts();
  }

  window.ethereum.on("accountsChanged", () => location.reload());
  window.ethereum.on("chainChanged", () => location.reload());
}
init();

/* ================== CONNECT ================== */
async function connectWallet() {
  const accounts = await provider.send("eth_requestAccounts", []);
  currentAccount = accounts[0];
  signer = await provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  updateWalletUI();
  loadProducts();
}

/* ================== UI ================== */
function updateWalletUI() {
  document.getElementById("connectBtn")?.classList.add("d-none");
  const w = document.getElementById("walletAddress");
  if (w) {
    w.classList.remove("d-none");
    w.innerText = `🟢 ${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}`;
  }
}

/* ================== ADD PRODUCT ================== */
async function addProduct() {
  const productCode = document.getElementById("productCode").value;
  const productName = document.getElementById("productName").value;
  const batchCode = document.getElementById("batchCode").value;
  const manufacturer = document.getElementById("manufacturer").value;
  const info = document.getElementById("info").value;

  // giả lập hash blockchain
  const hash = ethers.keccak256(
    ethers.toUtf8Bytes(productCode + batchCode + info)
  );

  await fetch("http://localhost:3000/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productCode,
      productName,
      batchCode,
      manufacturer,
      blockchainHash: hash
    })
  });

  alert("✅ Thêm sản phẩm thành công");
}


/* ================== LOAD PRODUCTS ================== */
async function loadProducts() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  const table = document.getElementById("productTable");
  table.innerHTML = "";

  data.forEach((p, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.productCode}</td>
        <td>${p.productName}</td>
        <td>${p.batchCode}</td>
        <td>${p.manufacturer}</td>
        <td>${new Date(p.createdAt).toLocaleDateString()}</td>
        <td style="font-size:12px">${p.blockchainHash || ""}</td>
        <td>
          <button onclick="viewHistory('${p.batchCode}')">Xem</button>
        </td>
        <td>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=http://localhost:5500/frontend/verify.html?batch=${p.batchCode}">
        </td>
      </tr>
    `;
  });
}

loadProducts();


/* ================== VERIFY ================== */
async function verifyProduct() {
  if (!contract) return alert("⚠️ Kết nối MetaMask");

  const code = verifyCode.value.trim();
  const data = verifyData.value.trim();
  const qrHash = hashFromQR.value.trim();

  if (!code || !data || !qrHash) return alert("⚠️ Nhập đủ");

  const inputHash = ethers.keccak256(ethers.toUtf8Bytes(data));
  const p = await contract.getProduct(code);
  const chainHash = p[1];

  verifyResult.innerHTML =
    inputHash === chainHash && qrHash === chainHash
      ? "✅ HỢP LỆ – KHÔNG BỊ GIẢ MẠO"
      : "❌ KHÔNG KHỚP – CÓ THỂ BỊ GIẢ MẠO";
}

/* ================== TIMELINE ================== */
async function loadTimeline() {
  const code = document.getElementById("codeInput").value;
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  try {
    const histories = await contract.getHistories(code);

    if (histories.length === 0) {
      timeline.innerHTML = "<li>Không có dữ liệu</li>";
      return;
    }

    histories.forEach(h => {
      const li = document.createElement("li");
      const date = new Date(Number(h.time) * 1000);
      li.className = "timeline-item";
      li.innerHTML = `
        <strong>${h.action}</strong>
        <p>${h.description}</p>
        <small>⏱ ${date.toLocaleString()} | ⛓ Block ${h.blockNumber}</small>
      `;
      timeline.appendChild(li);
    });
  } catch {
    alert("❌ Không tìm thấy lịch sử");
  }
}

/* ================== QR SCAN ================== */
function startQR() {
  if (qrScanner) qrScanner.stop();
  qrScanner = new Html5Qrcode("reader");
  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    text => {
      hashFromQR.value = text;
      qrScanner.stop();
      alert("📷 Quét QR thành công");
    }
  );
}
async function fetchHistory() {
  const batchCode = document.getElementById("batchCode").value.trim();
  const result = document.getElementById("result");

  result.innerHTML = "⏳ Đang tải dữ liệu...";

  try {
    const response = await fetch(
      `http://localhost:3000/api/history/${batchCode}`
    );

    if (!response.ok) {
      result.innerHTML = "❌ Không có dữ liệu";
      return;
    }

    const data = await response.json();

    // 🔥 CHỖ QUAN TRỌNG
    if (!data.timeline || data.timeline.length === 0) {
      result.innerHTML = "❌ Không có dữ liệu";
      return;
    }

    let html = "<ul>";

    data.timeline.forEach(item => {
      html += `
        <li>
          <b>${item.date}</b> – ${item.action}<br>
          ${item.detail}<br>
          <i>${item.actor}</i>
        </li>
        <hr>
      `;
    });

    html += "</ul>";
    result.innerHTML = html;

  } catch (err) {
    console.error(err);
    result.innerHTML = "⚠️ Lỗi kết nối server";
  }
}

/* ================== EXPORT ================== */
window.connectWallet = connectWallet;
window.addProduct = addProduct;
window.verifyProduct = verifyProduct;
window.loadTimeline = loadTimeline;
window.startQR = startQR;
