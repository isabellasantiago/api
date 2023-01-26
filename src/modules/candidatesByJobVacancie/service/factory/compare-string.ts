const cleanStr = (str: string) => {
    str = str?.toLowerCase();
    str = str?.replace(/\s+/g, '');
    str = str?.replace(/[|&;!$%@"<>()+,]+/g, '');

    return str;
};

export const breakStr = (str: string) => {
    const splitStr = str?.split(' ');
    return splitStr ? splitStr?.map(cleanStr) : [];
}

export const compareStr = (arrStr1: Array<string>, arrStr2: Array<string>) => {
    if (!arrStr1.length || !arrStr2.length) return 0;

    const reducePoints = (total: number, point:number) => total + point;
    const point = 25/arrStr1?.length;
    const percentage = arrStr1?.map(word => arrStr2?.map(word2 => word === word2 ? point : 0)).map((points) => points.reduce(reducePoints)).reduce(reducePoints)

    return percentage;
}