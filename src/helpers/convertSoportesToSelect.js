export const convertSoportesToSelect = ( soportes = []) => {

    const result = [];

    soportes.map( soporte => {

        result.push({ value: soporte.id, label: soporte.descripcion });

    });

    return result;
}