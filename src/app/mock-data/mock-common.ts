export function getById<T>(collection: T[], id: number): T {
    return collection.find(x => x['id'] == id);
}

export function saveById<T>(collection: T[], toSave: T): T {
    const existingIndex: number = collection.findIndex(x => x['id'] == toSave['id'])
    if (existingIndex) 
        collection.splice(existingIndex, 1, toSave);
    else 
        collection.push(toSave);
    return toSave;
}

export function deleteById<T>(collection: T[], id: number): void {
    const existingIndex: number = collection.findIndex(x => x['id'] == id);
    collection.splice(existingIndex, 1);
}