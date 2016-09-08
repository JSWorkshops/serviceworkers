"use strict";
async.task(function*() {
  if (!navigator.serviceWorker) {
    return;
  }
  const reg = yield navigator.serviceWorker.register("sw.js");

  if (!navigator.serviceWorker.controller) {
    console.log("First time running...");
    return;
  }

  if (reg.waiting) {
    console.log("Update is in waiting!");
    updateReady(reg.waiting);
    return;
  }

  if (reg.installing) {
    trackInstallation(reg.installing);
    return;
  }

  if (reg.active) {
    console.log("SW is installed and active!");
  }

  reg.addEventListener("updatefound", (ev) => {
    console.log("Found an update!");
    trackInstallation(reg.installing);
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log("Controller changed, so reloading");
    window.location.reload();
  });

  function trackInstallation(sw) {
    sw.addEventListener("statechange", (ev) => {
      console.log("state change", sw.state);
      if (sw.state === "installed") {
        updateReady(sw);
      }
    });
  }

  function updateReady(sw) {
    const toast = document.querySelector("#update-toast");
    const refresh = document.querySelector("#refresh");
    const dismiss = document.querySelector("#dismiss");
    toast.classList.add("show");
    dismiss.onclick = () => toast.classList.remove("show");
    refresh.onclick = () => {
      toast.classList.remove("show");
      sw.postMessage({ action: "skipWaiting" });
    }
  }
}).catch(err => console.log(err));
