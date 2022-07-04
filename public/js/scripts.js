const heading = () => {
    for (let i = 1; i <= 6; i++) {
        const element = document.querySelectorAll(`main h${i}`);
        element.forEach(e => {
            e.innerHTML = `${"#".repeat(i)} ${e.textContent}`;
            e.appendChild(document.createElement("hr"));
        });
    }
}

const btn_display = id => {
    const editor = document.getElementById(id);
    editor.classList.toggle("d-none");
}

heading();