import type { Meta, StoryObj } from '@storybook/react';
import Signup from '../../features/login/components/Signup';


const meta = {
    title: 'User/Signup',
    component: Signup,
} satisfies Meta<typeof Signup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story = {

};