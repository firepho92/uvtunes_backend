'use strict';

module.exports = function ClienteModel() {
    return {
        id_cliente: 0,
        nombre: '',
        apellido: '',
        fecha_nacimiento: null,
        email: '',
        contrasena: '',
        direccion: '',
        cp: '',
        ciudad: '',
        estado: '',
        token: '',
        fecha_registro: null,
        activado: false,
        habilitado: false
    };
};
