// UserInfoInput.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import UserInfoInput, { UserSettingInput } from '../../features/login/components/UserInfoInput';
import { ExeResult } from '../../types/ExeResult';

// メタデータを定義
export default {
    title: 'User/UserInfoInput', // Storybook で表示されるタイトル
    component: UserInfoInput,
    argTypes: {
        onClickExeButton: { action: 'clicked' }, // ボタンのアクションを表示
    },
} as Meta<typeof UserInfoInput>;

// `StoryObj` を使ったストーリー定義
export const Default: StoryObj<typeof UserInfoInput> = {
    args: {
        functionKey: 'register',
        functionDisplayTitleText: 'アカウント登録',
        functionSusccessDialogTitleText: 'ユーザー登録完了',
        functionExeButtonText: '登録',
        onClickExeButton: (user: UserSettingInput) => Promise.resolve(new ExeResult(true, '登録成功')),
        settingName: '',
        settingEmail: '',
        settingPassword: '',
    },
};

export const WithErrors: StoryObj<typeof UserInfoInput> = {
    args: {
        ...Default.args,
        settingName: '',
        settingEmail: 'invalidemail.com',
        settingPassword: '123',
    },
};