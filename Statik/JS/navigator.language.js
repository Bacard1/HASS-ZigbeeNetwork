function setUserLanguage() {
    let lang = navigator.language || navigator.userLanguage;
    console.log(lang);  // Тук се извежда стойността на езика в конзолата
    fetch("/api/states/input_text.user_language", {
        method: "POST",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyMjk1NWJiZGY0YTE0ZTI0ODNlNWNmNGM3ZTY4NTY5NCIsImlhdCI6MTczODU3MjgxMywiZXhwIjoyMDUzOTMyODEzfQ.QIxzjihEC5Gghb2_vr-5CvQuJo-HV34J9ETZ_mNaIE8",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            state: lang.substring(0, 2) // записва само 'de', 'bg', 'en' и т.н.
        })
    });
}

setUserLanguage();
