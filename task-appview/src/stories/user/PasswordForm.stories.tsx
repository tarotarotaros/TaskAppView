import type { Meta, StoryObj } from '@storybook/react';
import PasswordForm from '../../common/components/PasswordForm';


const meta = {
    title: 'User/PasswordForm',
    component: PasswordForm,
} satisfies Meta<typeof PasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story = {

};