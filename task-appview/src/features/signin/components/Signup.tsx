import { IUserService } from '../../../infrastructures/IUserService';
import { ExeResult } from '../../../types/ExeResult';
import { SigninUser, User } from '../../../types/User';
import UserInfoInput from './UserInfoInput';

type SignUpProps = {
    userService: IUserService;
};

export default function SignUp({ userService }: SignUpProps) {

    async function handleRegister(user: User): Promise<ExeResult> {
        const result = await userService.signup(user);
        return result;
        //window.location.reload();
    };

    function convertToSigninUser(user: User): SigninUser {
        return {
            email: user.email,
            password: user.password
        };
    }

    return (
        <UserInfoInput functionKey={"signup"}
            functionDisplayTitleText={"アカウント登録"}
            functionSusccessDialogTitleText={"ユーザー登録完了（自動ログイン）"}
            functionExeButtonText={"登録"}
            onClickExeButton={handleRegister} />
    );
}