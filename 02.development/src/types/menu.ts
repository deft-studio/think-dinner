export type Menu = {
  name: string;
  canMakeNow: boolean;
  ingredients: {
    have: string[];
    needToBuy: string[];
  };
  amount: '2人分';
  steps: string;
};