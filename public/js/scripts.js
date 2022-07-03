const hr_after_head = () => {
    for (let i = 1; i <= 6; i++) {
        const element = document.querySelectorAll(`main h${i}`);
        element.forEach(e => e.appendChild(document.createElement("hr")));
    }
}

const btn_edit = () => {
    const editor = document.getElementById("editor");
    editor.classList.toggle("d-none");
}

hr_after_head();