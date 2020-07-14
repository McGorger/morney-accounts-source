type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
};
type DataSourceItem = { text: string; value: string }