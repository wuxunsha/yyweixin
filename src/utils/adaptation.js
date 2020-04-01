function selfAdaption() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 16 + 'px';
}

selfAdaption()
window.onresize = () => selfAdaption()