export function getDefaultItemFromObjectList(items: object[], value: number|string|null, key: number|string): Object|false
{
    if(items.length === 0) return false;

    const item = items.find(item => item[key as keyof object] === value);

    if(item) return item;

    return items[0];
}