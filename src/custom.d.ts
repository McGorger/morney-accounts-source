type RecordItem = {
    tags:DataSourceItem;
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
};
type RootState = {
    recordList: RecordItem[];
    tagList: {"+":Tag[],"-":Tag[]};
  }
type Tag = {
    id: string;
    text: string;
    value:string;
}
type DataSourceItem = { text: string; value: string }