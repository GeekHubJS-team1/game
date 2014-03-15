define(function () {
    var tooltip = document.getElementById('tooltip'),
        header = tooltip.querySelector('h2'),
        content = tooltip.querySelector('p');

    function mouseMove(event) {
        tooltip.style.left = event.clientX + 16 + 'px';
        tooltip.style.top = event.clientY + 16 + 'px';
    }

    return {
        show: function (title, text) {
            tooltip.style.display = 'inline-table';
            document.addEventListener('mousemove', mouseMove, false);
            header.innerText = title;
            content.innerText = text;
        },
        hide: function () {
            tooltip.style.display = 'none';
            document.removeEventListener('mousemove', mouseMove, false);
        }
    }
});