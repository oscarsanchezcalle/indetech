export const convertTipoDocumentosToSelect = ( tipoDocs = []) => {

    const result = [];

    tipoDocs.map( tipoDoc => {

        result.push({ value: tipoDoc.id, label: tipoDoc.descripcion });

    });

    return result;
}