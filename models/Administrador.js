'use strict';

module.exports = function AdministradorModel() {
    return {
        id_administrador: 0,
        nombre: '',
        usuario: '',
        contrasena: '',
        email: '',
        superadministrador: false,
        habilitado: false
    };
};
