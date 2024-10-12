import { useEffect, useState } from "react";
import { IUserService } from "../../../infrastructures/IUserService";
import { User } from "../../../types/User";
import UserInfoInput from "../../signin/components/UserInfoInput";

type UserSettingProps = {
    userService: IUserService;
};

export default function UserSetting({ userService }: UserSettingProps) {

    const defaultUser: User =
    {
        "name": "",
        "email": "",
        "password": "",
    }

    const [userInfo, setUserInfo] = useState<User>(defaultUser);

    async function fetchAndLogUserInfo(userService: IUserService) {
        const userData = await userService.fetchAuthUserInfo();
        const user: User =
        {
            "name": userData.name,
            "email": userData.email,
            "password": userData.password
        }
        setUserInfo(user);
        console.log(user);
    }

    // コンポーネントがマウントされた時にユーザー情報を取得
    useEffect(() => {
        fetchAndLogUserInfo(userService);
    }, [userService]);

    // 設定変更
    const handleChangeUserSetting = async (user: User) => {
        try {
            //await userService.signup(user);
        } catch (error) {
            console.error('ユーザー設定変更処理でエラーが発生しました:', error);
        }
    };

    return (
        <UserInfoInput functionKey={"usersetting"}
            functionDisplayTitleText={"ユーザー設定変更"}
            functionSusccessDialogTitleText={"ユーザー設定変更完了"}
            functionExeButtonText={"設定変更"}
            onClickExeButton={handleChangeUserSetting}
            settingName={userInfo.name}
            settingEmail={userInfo.email}
            settingPassword={userInfo.password}
        />
    );

}