import { Album, Artist, Entity, MediaType, SortOptionsType, Track, Video } from "@/app/lib/types";
import { mutate } from "swr";

export const handleRefresh = (type: MediaType) => {
  mutate(`/api/database/getItems?type=${type}`);
};

export const deleteEntry = async (id: string, type: MediaType) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      entryID: id,
      entryType: type,
    }),
  };

  const response = await fetch('/api/database/deleteEntry', options);
  if (!response.ok) {
    throw new Error('Failed to delete entry');
  }

  const result = await response.json();
  console.log('Entry deleted:', result);
  mutate(`/api/database/getItems?type=${type}`);
};

export const seedDatabase = async (type: MediaType) => {
  const response = await fetch('/api/database/seed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to seed database');
  }
  const data = await response.json();
  console.log('Database seeded:', data);
  // Optionally, you can trigger a refresh of the data after seeding
  mutate(`/api/database/getItems?type=${type}`);
};