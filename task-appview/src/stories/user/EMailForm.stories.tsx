import type { Meta, StoryObj } from '@storybook/react';

import EMailForm from '../../Forms/Signup/EMailForm';

const meta = {
    title: 'User/EMailForm',
    component: EMailForm,
} satisfies Meta<typeof EMailForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story = {

};