window.addEventListener('load', () => {

    let errores = {};
    let erroresLog = {};

    let inputNombre = document.getElementById('inputNombre');
    let inputDescripcion = document.getElementById('inputDescripcion');



    let nombreValidator = () => {
        switch (true) {
            case inputNombre.value.length == 0:
                errores.nombre = 'Debes ingresar un nombre';
                errorNombre.innerHTML = errores.nombre;
                inputNombre.classList.add('is-invalid');
                break;
            case inputNombre.value.length <= 2:
                errores.nombre = 'El campo nombre debe tener al menos tres letras';
                errorNombre.innerHTML = errores.nombre;
                inputNombre.classList.add('is-invalid');
                break;
            default:
                inputNombre.classList.remove('is-invalid');
                inputNombre.classList.add('is-valid');
                errorNombre.innerHTML = ''
        }
    }
    
    inputNombre.addEventListener('blur', () => {
        nombreValidator();
    })
    inputNombre.addEventListener('keyup', () => {
        nombreValidator();
    })

    let DescripcionValidator = () => {
        switch (true) {
            case inputDescripcion.value.length == 2:
                errores.Descripcion= 'Debes ingresar una descripcion';
                errorDescripcion.innerHTML = errores.Descripcion;
                inputDescripcion.classList.add('is-invalid');
                break;
            case inputDescripcion.value.length >= 400:
                errores.Descripcion = 'solo puedes ingresar hasta 400 caracteres';
                errorDescripcion.innerHTML = errores.Descripcion;
                inputDescripcion.classList.add('is-invalid');
                break;
            default:
                inputDescripcion.classList.remove('is-invalid');
                inputdescripcion.classList.add('is-valid');
                errorDescripcion.innerHTML = ''
        }
    }
    
    inputDescripcion.addEventListener('blur', () => {
        DescripcionValidator();
    })
    inputDescripcion.addEventListener('keyup', () => {
        DescripcionValidator()
    })
})