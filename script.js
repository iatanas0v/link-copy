const button = document.querySelector("#copy-btn");

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function setLinkInClipboard(title, url) {
  const str = `<a href="${url}">${title}</a>`;

  function listener(e) {
    e.clipboardData.setData("text/html", str);
    e.clipboardData.setData("text/plain", str);
    e.preventDefault();
  }
  document.addEventListener("copy", listener);
  document.execCommand("copy");
  document.removeEventListener("copy", listener);
}

button.addEventListener("click", async () => {
  const tab = await getCurrentTab();

  if (!tab) {
    return;
  }

  await setLinkInClipboard(tab.title, tab.url);

  button.textContent = "✅ Copied!";

  setTimeout(() => {
    button.textContent = "Copy Link";
  }, 2000);
});
