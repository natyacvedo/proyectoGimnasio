export class Usuario {
    constructor(parametroNombre, parametroEmail, parametroTelefono) {
        this.nombre = parametroNombre;
        this.email = parametroEmail;
        this.telefono = parametroTelefono;
    }

    // tarea agregar todos los get y set
    get mostrarCodigo() {
        return this.nombre
    }
    get mostrarUsuario() {
        return this.email
    }
    get mostrarDescripcion() {
        return this.telefono
    }
}