import type { Meta, StoryObj } from '@storybook/react';
import Register from '../../features/login/components/Register';


const meta = {
    title: 'User/Register',
    component: Register,
} satisfies Meta<typeof Register>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Story = {

};