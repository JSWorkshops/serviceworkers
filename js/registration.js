"use strict";
async.task(function*() {

  function updateReady(sw) {
    const toast = document.querySelector("#update-toast");
    const refresh = document.querySelector("#refresh");
    const dismiss = document.querySelector("#dismiss");
    toast.classList.add("show");
    dismiss.onclick = () => toast.classList.remove("show");
    refresh.onclick = () => {
      toast.classList.remove("show");
      // Let SW know it can take over
    }
  }
}).catch(err => console.log(err));
