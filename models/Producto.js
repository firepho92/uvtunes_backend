'use strict';

module.exports = function ProductoModel() {
    return {
        id_producto: 0,
        id_producto_proveedor: '',
        id_productora: '',
        id_proveedor: '',
        nombre: '',
        descripcion: '',
        ano: '',
        foto: '',
        peso: 0.0,
        tipo_producto: '',
        fisico: 0,
        digital: false,
        precio_fisico: 0.0,
        precio_digital: 0.0,
        permitir_consulta: false,
        habilitado: false
    };
};
