import { useEffect, useState } from "react";
import { IUserService } from "../../../infrastructures/IUserService";
import { ExeResult } from "../../../types/ExeResult";
import { User } from "../../../types/User";
import UserInfoInput from "../../login/components/UserInfoInput";

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
    async function handleChangeUserSetting(user: User): Promise<ExeResult> {
        const result: ExeResult = await userService.register(user);
        return result;
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