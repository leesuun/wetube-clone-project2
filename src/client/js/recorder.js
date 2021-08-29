import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
    input: "recording.webm",
    output: "output.mp4",
    thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    a.click();
    document.body.appendChild(a);
};

const handleDownload = async () => {
    actionBtn.removeEventListener("click", handleDownload);
    actionBtn.innerText = "Transcoding..";
    actionBtn.disabled = true;

    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
    await ffmpeg.run("-i", files.input, "-r", "60", files.output);

    const mp4File = ffmpeg.FS("readFile", files.output);
    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const mp4Url = URL.createObjectURL(mp4Blob);

    //영상이 1초미만이면 에러발생
    await ffmpeg.run(
        "-i",
        files.input,
        "-ss",
        "00:00:01",
        "-frames:v",
        "1",
        files.thumb
    );

    const thumbFile = ffmpeg.FS("readFile", files.thumb);
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
    const thumbUrl = URL.createObjectURL(thumbBlob);

    downloadFile(mp4Url, "Myrecording.mp4");
    downloadFile(thumbUrl, "Mythumbnail.jpg");

    ffmpeg.FS("unlink", files.input);
    ffmpeg.FS("unlink", files.output);
    ffmpeg.FS("unlink", files.thumb);

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbUrl);
    URL.revokeObjectURL(videoFile);

    actionBtn.disabled = false;
    actionBtn.innerText = "Record Again";
    actionBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
    actionBtn.innerText = "Recording";
    actionBtn.disabled = true;
    actionBtn.removeEventListener("click", handleStart);

    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
        actionBtn.innerText = "Download";
        actionBtn.disabled = false;
        actionBtn.addEventListener("click", handleDownload);
    };

    recorder.start();
    setTimeout(() => {
        recorder.stop();
    }, 5000);
};

const init = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 500, height: 250 },
        audio: true,
    });

    video.srcObject = stream;
    video.play();
};

init();

actionBtn.addEventListener("click", handleStart);
