import { getDatabase, ref, child, push, update } from 'firebase/database';

async function shareArtist(artist, notable, handle) {
  const database = getDatabase();

  // Create new Share entry
  const share = {
    artist: artist,
    notable: notable,
    handle: handle,
  };

  // Generate key for new Share
  const newShareKey = push(child(ref(database), 'shares')).key;

  // Write new Share to database
  const updates = {};
  updates['shares/' + newShareKey] = share;

  return await update(ref(database), updates);
}

export default shareArtist
