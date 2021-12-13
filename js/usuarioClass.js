export class Usuario {
    constructor(parametroNombre, parametroEmail, parametroTelefono, parametroContraseña) {
        this.nombre = parametroNombre;
        this.email = parametroEmail;
        this.telefono = parametroTelefono;
        this.contraseña = parametroContraseña;
    }

    // tarea agregar todos los get y set
    get mostrarNombre() {
        return this.nombre
    }
    get mostrarEmail() {
        return this.email
    }
    get mostrarTelefono() {
        return this.telefono
    }
    get mostrarContraseña() {
        return this.contraseña
    }
}