document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');

    // Validación del nombre
    const nombreInput = document.getElementById('nombre');
    nombreInput.addEventListener('input', () => {
        validarNombre();
    });

    // Validación del correo electrónico
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', () => {
        validarEmail();
    });
    

    // Validación del teléfono
    const telefonoInput = document.getElementById('telefono');
    telefonoInput.addEventListener('input', () => {
        validarTelefono();
    });

    // Validación de la contraseña
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', () => {
        validarPassword();
        validarConfirmPassword();
    });

    // Validación de la confirmación de la contraseña
    const confirmPasswordInput = document.getElementById('confirmPassword');
    confirmPasswordInput.addEventListener('input', () => {
        validarConfirmPassword();
    });

    // Validación de la fecha de nacimiento
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    fechaNacimientoInput.addEventListener('input', () => {
        validarFechaNacimiento();
    });

    // Validación del género
    const generoInput = document.getElementById('genero');
    generoInput.addEventListener('change', () => {
        validarGenero();
    });

    // Validación de términos y condiciones
    const terminosInput = document.getElementById('terminos');
    terminosInput.addEventListener('change', () => {
        validarTerminos();
    });

    // Validar todo el formulario al enviarlo
    form.addEventListener('submit', (event) => {
        if (!validarFormulario()) {
            event.preventDefault(); // Evita el envío si hay errores
        }
    });

    function validarNombre() {
        const nombreError = document.getElementById('nombreError');
        if (nombreInput.value.trim().length < 2) {
            nombreInput.classList.add('error');
            nombreInput.classList.remove('valid');
            nombreError.textContent = 'El nombre debe tener al menos 2 caracteres.';
            nombreError.style.display = 'block';
            return false;
        } else {
            nombreInput.classList.remove('error');
            nombreInput.classList.add('valid');
            nombreError.style.display = 'none';
            return true;
        }
    }

    function validarEmail() {
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add('error');
            emailInput.classList.remove('valid');
            emailError.textContent = 'Por favor ingrese un correo electrónico válido.';
            emailError.style.display = 'block';
            return false;
        } else {
            emailInput.classList.remove('error');
            emailInput.classList.add('valid');
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validarTelefono() {
        const telefonoError = document.getElementById('telefonoError');
        const telefonoInput = document.getElementById('telefono');
        const pais = document.getElementById('pais').value;
        let telefonoPattern;
    
        // Selecciona la expresión regular según el país
        switch (pais) {
            case 'US': // Estados Unidos
            case 'CA': // Canadá
                telefonoPattern = /^1\d{10}$/; // 11 dígitos comenzando con 1
                break;
            case 'UK': // Reino Unido
                telefonoPattern = /^07\d{9}$/; // 11 dígitos comenzando con 07
                break;
            case 'CO': // Colombia
                telefonoPattern = /^([36])\d{9}$/; // Comienza con 3 o 6 y tiene 10 dígitos en total
                break;
            case 'MX': // México
                telefonoPattern = /^\d{10}$/; // 10 dígitos
                break;
            default:
                telefonoPattern = /^\d{10}$/; // Patrón genérico para 10 dígitos
        }
    
        // Validar el número de teléfono según el patrón seleccionado
        if (!telefonoPattern.test(telefonoInput.value)) {
            telefonoInput.classList.add('error');
            telefonoInput.classList.remove('valid');
            telefonoError.textContent = 'Por favor ingrese un número de teléfono válido.';
            telefonoError.style.display = 'block';
            return false;
        } else {
            telefonoInput.classList.remove('error');
            telefonoInput.classList.add('valid');
            telefonoError.style.display = 'none';
            return true;
        }
    }
    
    
    function validarPassword() {
        const passwordError = document.getElementById('passwordError');
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordPattern.test(passwordInput.value)) {
            passwordInput.classList.add('error');
            passwordInput.classList.remove('valid');
            passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.';
            passwordError.style.display = 'block';
            return false;
        } else {
            passwordInput.classList.remove('error');
            passwordInput.classList.add('valid');
            passwordError.style.display = 'none';
            return true;
        }
    }

    function validarConfirmPassword() {
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add('error');
            confirmPasswordInput.classList.remove('valid');
            confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
            confirmPasswordError.style.display = 'block';
            return false;
        } else {
            confirmPasswordInput.classList.remove('error');
            confirmPasswordInput.classList.add('valid');
            confirmPasswordError.style.display = 'none';
            return true;
        }
    }

    function validarFechaNacimiento() {
        const fechaNacimientoError = document.getElementById('fechaNacimientoError');
        // Descomponemos la fecha manualmente para evitar problemas de zona horaria
        const [year, month, day] = fechaNacimientoInput.value.split('-').map(Number);
        const fechaNacimiento = new Date(year, month - 1, day); // month - 1 porque los meses en JS empiezan en 0

        const hoy = new Date();
        const edadMinima = 18;

        // Calculamos la edad del usuario
        let edadUsuario = hoy.getFullYear() - fechaNacimiento.getFullYear();

        // Comprobamos si el cumpleaños ha pasado este año
        const mesCumple = fechaNacimiento.getMonth();
        const diaCumple = fechaNacimiento.getDate();
        const haCumplidoEsteAño = hoy.getMonth() > mesCumple || (hoy.getMonth() === mesCumple && hoy.getDate() >= diaCumple);

        if (!haCumplidoEsteAño) {
            edadUsuario--;
        }

        if (edadUsuario < edadMinima) {
            fechaNacimientoInput.classList.add('error');
            fechaNacimientoInput.classList.remove('valid');
            fechaNacimientoError.textContent = 'Debes tener al menos 18 años.';
            fechaNacimientoError.style.display = 'block';
            return false;
        } else {
            fechaNacimientoInput.classList.remove('error');
            fechaNacimientoInput.classList.add('valid');
            fechaNacimientoError.style.display = 'none';
            return true;
        }
    }

    function validarGenero() {
        const generoError = document.getElementById('generoError');
        if (generoInput.value === '') {
            generoInput.classList.add('error');
            generoInput.classList.remove('valid');
            generoError.textContent = 'Por favor selecciona una opción.';
            generoError.style.display = 'block';
            return false;
        } else {
            generoInput.classList.remove('error');
            generoInput.classList.add('valid');
            generoError.style.display = 'none';
            return true;
        }
    }

    function validarTerminos() {
        const terminosError = document.getElementById('terminosError');
        if (!terminosInput.checked) {
            terminosInput.classList.add('error');
            terminosInput.classList.remove('valid');
            terminosError.textContent = 'Debes aceptar los términos y condiciones.';
            terminosError.style.display = 'block';
            return false;
        } else {
            terminosInput.classList.remove('error');
            terminosInput.classList.add('valid');
            terminosError.style.display = 'none';
            return true;
        }
    }

    function validarFormulario() {
        let esValido = true;

        esValido &= validarNombre();
        esValido &= validarEmail();
        esValido &= validarTelefono();
        esValido &= validarPassword();
        esValido &= validarConfirmPassword();
        esValido &= validarFechaNacimiento();
        esValido &= validarGenero();
        esValido &= validarTerminos();

        return esValido;
    }
});
