export function getById<T>(collection: T[], id: number): T {
	return collection.find(x => x['id'] === id);
}

export function save<T>(collection: T[], toSave: T): T {
	if (toSave['id']) {
		const existingIndex: number = collection.findIndex(x => x['id'] === toSave['id']);
		collection.splice(existingIndex, 1, toSave);
	} else {
		const biggestId: number = Math.max(...collection.map(item => item['id']));
		toSave['id'] = biggestId + 1;
		collection.push(toSave);
	}

	return toSave;
}

export function deleteById<T>(collection: T[], id: number): void {
	const existingIndex: number = collection.findIndex(x => x.id === id);
	collection.splice(existingIndex, 1);
}
