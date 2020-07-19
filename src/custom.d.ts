type RecordItem = {
    tags:DataSourceItem;
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
    id?:string
};
type RootState = {
    recordList: RecordItem[];
    tagList: {"+":Tag[],"-":Tag[]};
    total:{totalIncome:number,paytotal:number}
  }
type Tag = {
    tagName: string;
    currentTag:string;
}
type DataSourceItem = { text: string; value: string }
type newTag = {  name:string,item:string[]}