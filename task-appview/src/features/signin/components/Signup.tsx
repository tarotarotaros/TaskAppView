import { IUserService } from '../../../infrastructures/IUserService';
import { User } from '../../../types/User';
import UserInfoInput from './UserInfoInput';

type SignUpProps = {
    userService: IUserService;
};

export default function SignUp({ userService }: SignUpProps) {

    const handleRegister = async (user: User) => {
        try {
            await userService.signup(user);
        } catch (error) {
            console.error('ユーザー登録処理でエラーが発生しました:', error);
        }
    };

    return (
        <UserInfoInput functionKey={"signup"}
            functionDisplayTitleText={"アカウント登録"}
            functionSusccessDialogTitleText={"ユーザー登録完了（自動ログイン）"}
            functionExeButtonText={"登録"}
            onClickExeButton={handleRegister} />
    );
}