import type { Meta, StoryObj } from '@storybook/react';

import PasswordForm from '../../Forms/Signup/PasswordForm';

const meta = {
    title: 'User/PasswordForm',
    component: PasswordForm,
} satisfies Meta<typeof PasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story = {

};