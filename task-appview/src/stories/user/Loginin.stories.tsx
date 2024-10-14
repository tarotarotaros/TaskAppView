import type { Meta, StoryObj } from '@storybook/react';

import Login from '../../features/login/components/Login';

const meta = {
    title: 'User/Login',
    component: Login,
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story = {

};