interface IHistoryEntry {
	id: number;
	originalCommand: string;
	optimizedCommand: string;
	dateTime: string;
	samplesBefore: number;
	samplesAfter: number;
}

export type {
	IHistoryEntry
}