export const convertOficinasToSelect = ( oficinas = []) => {

    const result = [];

    oficinas.map( oficina => {

        result.push({ value: oficina.id, label: `${oficina.codigo} - ${oficina.descripcion}` });

    });

    return result;
}