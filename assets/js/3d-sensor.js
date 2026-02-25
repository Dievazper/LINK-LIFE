document.addEventListener('DOMContentLoaded', () => {
    const scene = document.getElementById('scene');
    const model = document.getElementById('model');

    if (!scene || !model) return;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    // Initial rotation state
    let rotation = { x: 15, y: 30 };

    scene.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
        model.style.transition = 'none'; // Disable smooth transition during drag
    });

    scene.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };

        // Update rotation based on mouse movement
        rotation.y += deltaMove.x * 0.5;
        rotation.x -= deltaMove.y * 0.5; // Invert Y axis for natural feel

        // Clamp X rotation to prevent flipping upside down
        rotation.x = Math.max(-60, Math.min(60, rotation.x));

        model.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });

    // Handle drag end
    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            model.style.transition = 'transform 0.1s ease-out';
        }
    });

    // Touch support for mobile
    scene.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
        model.style.transition = 'none';
    }, { passive: true });

    scene.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        const deltaMove = {
            x: touch.clientX - previousMousePosition.x,
            y: touch.clientY - previousMousePosition.y
        };

        rotation.y += deltaMove.x * 0.5;
        rotation.x -= deltaMove.y * 0.5;
        rotation.x = Math.max(-60, Math.min(60, rotation.x));

        model.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
        previousMousePosition = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            model.style.transition = 'transform 0.1s ease-out';
        }
    });
});
