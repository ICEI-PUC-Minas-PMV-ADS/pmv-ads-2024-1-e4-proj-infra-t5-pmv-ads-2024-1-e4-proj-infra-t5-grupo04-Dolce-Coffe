document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cartButton');
    cartButton.addEventListener('click', function() {
        window.open('/src/Cart/index.html', '_blank');
    });
});
