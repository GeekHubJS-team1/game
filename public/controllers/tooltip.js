define(function () {
    var tooltip = document.getElementById('tooltip'),
        header = tooltip.querySelector('h2'),
        content = tooltip.querySelector('p'),
        visible = false;

    document.addEventListener('mousemove', function (event) {
        if (!visible) return;
        tooltip.style.left = event.clientX + 16 + 'px';
        tooltip.style.top = event.clientY + 16 + 'px';
    }, false);

    return {
        show: function (title, text) {
            tooltip.style.display = 'inline-table';
            visible = true;
            header.innerText = title;
            content.innerText = text;
        },
        hide: function () {
            tooltip.style.display = 'none';
            visible = false;
        }
    }
});