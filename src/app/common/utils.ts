export function getObjectAtPath(object: any, path: string): any {
    if (path) {
        const segments: string[] = path.split('.');
        let itemProperty = object;
        for (let i = 0; i < segments.length; i++) {
            if (itemProperty) {
                itemProperty = itemProperty[segments[i]];
            }
        }
        return itemProperty;
    }
    return null;
}