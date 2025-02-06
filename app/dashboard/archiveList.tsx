import useSWR from 'swr';
import { MediaType } from '../lib/types';
import { swrFetcher } from '../lib/utils';

const ArchiveList = (props: { type: MediaType }) => {
  const { type } = props;

  const { data, error, isLoading } = useSWR<any, Error>(
    `/api/database/getItems?type=${type}`,
    swrFetcher,
    { revalidateOnFocus: false }
  );
  console.log('🚀 ~ ArchiveList ~ data:', data)
  console.log('🚀 ~ ArchiveList ~ error:', error)

  return (
    <div>
      <h2 className='mb-10 text-xl font-mono'>Archive List</h2>
      <h3>{type}</h3>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div>
          <h6>Data</h6>
          <pre>{JSON.stringify(data.data, null, 1)}</pre>
        </div>
      )}
    </div>
  );
};

export default ArchiveList;
