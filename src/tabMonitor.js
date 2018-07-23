function tabMonitor(minutes) {
    function timeCheck() {
        console.log(distance);
        let now = new Date().getTime();
        // Find the distance between now an the count down date
        let distance = timeToSuspend - now;
        // If the count down is finished, suspend tab
        console.log(distance);
        if (distance < 50000) {
            //alert("tab should be suspended");
            browser.runtime.sendMessage(
                {
                    actionType: "suspend_automatically",
                }
            );
            stopChecker();
        }
    };

    function stopChecker() {
        console.log("timer stopped");
        clearInterval(idleTabChecker);
    }

    let date = new Date();
    date = new Date(date.getTime() + minutes*60000);
    let timeToSuspend = new Date();
    console.log(timeToSuspend);
    let idleTabChecker = setInterval(timeCheck, 1000);
}



tabMonitor(2);


