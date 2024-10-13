import { useEffect, useState } from "react";
import { IUserService } from "../../../infrastructures/IUserService";
import { ExeResult } from "../../../types/ExeResult";
import UserInfoInput, { UserSettingInput } from "../../login/components/UserInfoInput";

type UserSettingChangeProps = {
    userService: IUserService;
};

export default function UserSettingChange({ userService }: UserSettingChangeProps) {

    const defaultUserSetting: UserSettingInput =
    {
        "name": "",
        "email": "",
        "password": "",
    }

    const [userInfo, setUserInfo] = useState<UserSettingInput>(defaultUserSetting);

    async function fetchAndLogUserInfo(userService: IUserService) {
        const fetchUserInfo = await userService.fetchAuthUserInfo();
        const user: UserSettingInput =
        {
            "name": fetchUserInfo.User.name,
            "email": fetchUserInfo.User.email,
            "password": fetchUserInfo.User.password
        }
        setUserInfo(user);
        console.log(user);
    }

    // コンポーネントがマウントされた時にユーザー情報を取得
    useEffect(() => {
        fetchAndLogUserInfo(userService);
    }, [userService]);

    // 設定変更
    async function handleChangeUserSetting(userSettingInput: UserSettingInput): Promise<ExeResult> {
        try {
            const fetchUserInfo = await userService.fetchAuthUserInfo();
            console.log(fetchUserInfo.Result);
            if (!fetchUserInfo.Result.Result) return fetchUserInfo.Result;
            const result: ExeResult = await userService.updateUser(fetchUserInfo.User.id, userSettingInput.name, userSettingInput.email, userSettingInput.password);
            return result;
        } catch {
            return new ExeResult(false, "ユーザー設定変更に失敗しました。");
        }
    };

    return (
        <UserInfoInput functionKey={"usersetting"}
            functionDisplayTitleText={""}
            functionSusccessDialogTitleText={"ユーザー設定変更完了"}
            functionExeButtonText={"設定変更"}
            onClickExeButton={handleChangeUserSetting}
            settingName={userInfo.name}
            settingEmail={userInfo.email}
            settingPassword={userInfo.password}
        />
    );

}