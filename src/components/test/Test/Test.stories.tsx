import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import TestButton from '@components/test/Test/index';

const meta: Meta<typeof TestButton> = {
  title: 'Components/TestButton',
  component: TestButton,
  tags: ['autodocs'],
};

export default meta;

export const Basic: StoryObj<typeof TestButton> = {
  render: () => <TestButton />,
};
