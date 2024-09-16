import type { Meta, StoryObj } from '@storybook/react';

import Signin from '../../Forms/Signin/Signin';

const meta = {
    title: 'User/Signin',
    component: Signin,
} satisfies Meta<typeof Signin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {

};