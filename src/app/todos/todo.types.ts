export interface Tag {
  id: number;
  tag: string;
}
export interface Todo
{
  id:number;
  title:string;
  description?: string;
  completed: boolean;
  tags?: Tag[];
}
