// import regeneratorRuntime from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const commentList = document.querySelector(".video__comment ul");
const deleteBtn = commentList.querySelectorAll("#delBtn");

let newCommentId;

const addComment = (text, newCommentId) => {
    const comment = document.createElement("li");
    const icon = document.createElement("i");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");

    icon.classList = "fas fa-comment fa-lg";
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.dataset.commentid = newCommentId;
    delBtn.id = "delBtn";

    comment.appendChild(icon);
    comment.appendChild(span);
    comment.appendChild(delBtn);
    commentList.appendChild(comment);

    delBtn.addEventListener("click", handleDelete);
};

const deleteComment = (commentid) => {
    for (let i = 0; i < deleteBtn.length; i++) {
        if (deleteBtn[i].dataset.commentid === commentid) {
            deleteBtn[i].parentNode.remove();
        }
    }
};

console.log("sad");

const handleSubmit = async (event) => {
    event.preventDefault();
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;

    if (text === "") {
        return;
    }

    const response = await fetch(`/api/video/${videoId}/createComment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text,
        }),
    });

    const body = await response.json();
    newCommentId = body.newCommentId;

    if (response.status === 201) {
        addComment(text, newCommentId);
    }
    textarea.value = "";
};

const handleDelete = async (event) => {
    const videoId = videoContainer.dataset.id;
    const {
        target: {
            dataset: { commentid },
        },
    } = event;

    const response = await fetch(`/api/video/${videoId}/deleteComment`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            commentid,
        }),
    });

    if (response.status === 202) {
        deleteComment(commentid);
        event.target.parentNode.remove();
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}

if (deleteBtn) {
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", handleDelete);
    }
}
