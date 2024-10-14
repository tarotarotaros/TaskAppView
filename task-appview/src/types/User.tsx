import { ExeResult } from "./ExeResult";

export interface LoginUser {
    email: string,
    password: string
}




export class fetchUserInfo {
    Result: ExeResult;
    User: User;

    constructor(Result: ExeResult, User: User) {
        this.Result = Result;
        this.User = User;
    }
};

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    projectId: number;

    // コンストラクタのオーバーロード
    constructor(name: string, email: string, password: string);
    constructor(name: string, email: string, password: string, id: number, projectId: number);

    // 実際のコンストラクタ実装
    constructor(name: string, email: string, password: string, id?: number, projectId?: number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id || 0; // IDが渡されなければデフォルトで0を設定
        this.projectId = projectId || 1; // projectIdが渡されなければnullを設定
    }


    // メソッド例: ユーザー情報を表示
    displayInfo(): string {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Project ID: ${this.projectId}`;
    }
}
