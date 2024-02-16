const galleryLeftBtn = document.querySelector(".gallery-leftbtn");
const galleryRightBtn = document.querySelector(".gallery-rightbtn");
const galleryArea = document.querySelector(".gallery-area");

galleryLeftBtn.addEventListener("click", () => {
    let currentMarginLeft = parseInt(window.getComputedStyle(galleryArea).marginLeft);



    if (currentMarginLeft === 0) {
        return;
    }

    let newMarginLeft = currentMarginLeft + 203;
    galleryArea.style.marginLeft = newMarginLeft + 'px';
})

galleryRightBtn.addEventListener("click", () => {
    const breakpoints = [1260, 1023, 820, 510, 0];
    const marginValues = [-812, -1015, -1218, -1421, -1624]; //x * -203
    let currentMarginLeft = parseInt(window.getComputedStyle(galleryArea).marginLeft);
    let screenWidth = window.innerWidth;

    let targetMargin;
    for (let i = 0; i < breakpoints.length; i++) {
        if (screenWidth > breakpoints[i]) {
            targetMargin = marginValues[i];
            break;
        }
    }

    if (currentMarginLeft === targetMargin) {
        return;
    }

    let newMarginLeft = currentMarginLeft - 203;
    galleryArea.style.marginLeft = newMarginLeft + 'px';
})
