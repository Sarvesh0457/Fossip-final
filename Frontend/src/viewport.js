// Sets CSS custom properties for viewport units (fixes mobile vh issues)
function setViewportUnits() {
  const vw = window.innerWidth * 0.01;
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vw", `${vw}px`);
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setViewportUnits();
window.addEventListener("resize", setViewportUnits);

export default setViewportUnits;
