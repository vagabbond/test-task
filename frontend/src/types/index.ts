export interface ITask {
 _id: string;
 title: string;
 caption: string;
 columnId: string;
 order: number;
}

export interface IColumn {
 _id: string;
 title: string;
 tasks: string[];
 board: string;
}

export interface IBoard {
 columns: string[];
 name: string;
 _id: string;
}
export interface IError {
 message: string;
 code: number;
}
