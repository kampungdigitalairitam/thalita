function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6V3pcdCDjuM":
        Script1();
        break;
      case "6jjm0mKlMtd":
        Script2();
        break;
      case "6Bys1awUNMk":
        Script3();
        break;
      case "6hk94kYVwzx":
        Script4();
        break;
      case "6AwFApDZyq6":
        Script5();
        break;
      case "6f5WLToa5aI":
        Script6();
        break;
  }
}

function Script1()
{
  if (void 0 === window.stencilsetanswers) {
    GetPlayer();
    let e = "https://cluelabs.com/ai/display/answers-init-sl";
    xhttp = new XMLHttpRequest;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200 && this.responseText !== "") {
            let scriptContent = this.responseText,
                head = document.getElementsByTagName("head")[0],
                scriptTag = document.createElement("script");
            head.appendChild(scriptTag);
            scriptTag.appendChild(document.createTextNode(scriptContent));
            window.stencilsetanswers = true;
        }
    };
    xhttp.open("GET", e, true);
    xhttp.send();
}

// Fungsi untuk membaca jawaban
function speakResponse(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';

    let voices = speechSynthesis.getVoices();
    const indoVoice = voices.find(v => v.lang.startsWith('id')) || voices[0];
    if (indoVoice) utterance.voice = indoVoice;

    // Safari fix: cancel dulu supaya tidak tumpang tindih
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

// Observer jawaban
function startObserver() {
    const player = GetPlayer();
    let lastValue = "";

    setInterval(() => {
        let response = player.GetVar("clabsAnswersResponseMessage");
        if (response && response !== lastValue) {
            lastValue = response;
            console.log("🗣️ Jawaban baru terdeteksi:", response);
            speakResponse(response);
        }
    }, 1000);
}

// Patch untuk iOS Safari — aktifkan suara saat submit pertanyaan pertama kali
if (!window.clabsObserverStarted) {
    window.clabsObserverStarted = true;

    document.addEventListener("click", function unlockAudioOnce() {
        // Tes suara 1x untuk buka izin iOS
        speakResponse("Audio diaktifkan");
        // Jalankan observer setelah audio diizinkan
        startObserver();
        // Hapus listener supaya tidak berulang
        document.removeEventListener("click", unlockAudioOnce);
    }, { once: true });
}

}

function Script2()
{
  clabsAnswersGetAnswer();
}

function Script3()
{
  clabsAnswersRecord();
}

function Script4()
{
  clabsAnswersSendRecording(false);
}

function Script5()
{
  clabsAnswersSendRecording(true);
}

function Script6()
{
  clabsAnswersSendRecording(false);
}

