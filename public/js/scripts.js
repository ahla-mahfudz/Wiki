const hr_after_head = () => {
    for (let i = 1; i <= 6; i++) {
        const element = document.querySelectorAll(`main h${i}`);
        element.forEach(e => e.appendChild(document.createElement("hr")));
    }
}

hr_after_head();