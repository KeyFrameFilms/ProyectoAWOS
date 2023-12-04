    document.addEventListener('DOMContentLoaded', (event) => {
        // Obtener todas las alertas
        const alerts = document.querySelectorAll('.alert');
    
        // Mostrar cada alerta y programar su desaparición
        alerts.forEach((alert, index) => {
        setTimeout(() => {
            alert.classList.add('opacity-0'); // Agregar clase de desvanecimiento
            setTimeout(() => {
            alert.style.display = 'none'; // Ocultar la alerta después de desvanecerse
            }, 1000);
        }, index * 5000); // 5000 milisegundos (5 segundos) entre cada alerta
        });
    });
    