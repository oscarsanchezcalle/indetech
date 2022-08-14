export const convertCajasToSelect = ( cajas = []) => {

    const result = [];

    cajas.map( caja => {

        result.push({ value: caja.numero, label: `${caja.numero}`, cajaId: caja.id });

    });

    return result;
}