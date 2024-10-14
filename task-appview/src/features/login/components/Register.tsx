import { IUserService } from '../../../infrastructures/IUserService';
import { ExeResult } from '../../../types/ExeResult';
import { User } from '../../../types/User';
import UserInfoInput, { UserSettingInput } from './UserInfoInput';

type RegisterProps = {
    userService: IUserService;
};

export default function Register({ userService }: RegisterProps) {

    async function handleRegister(user: UserSettingInput): Promise<ExeResult> {
        const registerUser: User = new User(user.name, user.email, user.password);
        const result = await userService.register(registerUser);
        return result;
    };

    return (
        <UserInfoInput functionKey={"register"}
            functionDisplayTitleText={"アカウント登録"}
            functionSusccessDialogTitleText={"ユーザー登録完了（自動ログイン）"}
            functionExeButtonText={"登録"}
            onClickExeButton={handleRegister} />
    );
}