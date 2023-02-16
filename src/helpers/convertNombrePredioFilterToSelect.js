export const convertNombrePredioFilterToSelect = ( data = []) => {

    const result = [];

    data.map( item => {
        if(item != null){
            result.push({ value: item, label: item });
        }
    });

    return result;
}