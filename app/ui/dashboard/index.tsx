'use client';

import React, { useState } from 'react';
import Data from './data';

export default function Dashboard() {
  const [data, setData] = useState<string | null>(null);
  async function handleFormSubmit(formData: FormData) {
    const rawFormData = {
      mediaType: formData.get('mediaType'),
    };
    setData(String(rawFormData.mediaType));
  }

  return (
    <div>
      <div>Dashboard</div>
      <form action={handleFormSubmit}>
        <select name='mediaType' className='bg-blue-700'>
          <option value='artist'>Artist</option>
          <option value='album'>Album</option>
          <option value='track'>Track</option>
        </select>
        <button className='bg-red-900 p-2 rounded-full' type='submit'>
          Submit
        </button>
      </form>
      <Data mediaType={data} />
    </div>
  );
}
