async function checkWallet() {
  if (typeof window.ethereum !== "undefined") {
    var style = document.createElement("style");
    style.innerHTML = ".wallet-related {display: inline-block !important;}";
    document.head.appendChild(style);

    return true;
  } else {
    return false;
  }
}

// Connect Wallet
async function connectWalletAndAddNetwork() {
  const walletAvailable = await checkWallet();
  if (!walletAvailable) return;

  try {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    addNetwork();
  } catch (error) {
    console.error("Error connecting to wallet network:", error);
  }
}

// Add a Custom Network
async function addNetwork() {
  const walletAvailable = await checkWallet();
  if (!walletAvailable) return;

  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xC3B8",
          chainName: "Sophon",
          rpcUrls: ["https://rpc.sophon.xyz/"],
          nativeCurrency: {
            name: "Sophon",
            symbol: "SOPH",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer.sophon.xyz"],
        },
      ],
    });
    alert("Network added");
  } catch (error) {
    console.error("Error adding network:", error);
  }
}

checkWallet();
