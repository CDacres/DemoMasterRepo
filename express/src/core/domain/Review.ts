import { ID } from '@src/core';

export type ReviewRating = {
  avg: number;
  count: number;
};

export type Review = {
  created_at: string;
  id: ID;
  owner_first_name: string;
  owner_last_name: string;
  ranking: number;
  reply?: ReviewReply;
  text: string;
};

export type ReviewReply = {
  created_at: string;
  creator_first_name: string;
  creator_last_name: string;
  text: string;
};
