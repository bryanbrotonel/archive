import useSWR from 'swr';
import { MediaType } from '../../lib/types';
import { swrFetcher } from '../../lib/utils';
import MediaList from './mediaList';

const ArchiveList = (props: { type: MediaType }) => {
  const { type } = props;

  const { data, error, isLoading } = useSWR<
    {
      data: {
        id: string;
        name: string;
        imageurl: string;
        externalUrls: object;
        createdat: string;
      }[];
    },
    Error
  >(`/api/database/getItems?type=${type}`, swrFetcher, {});

  return (
    <div>
      <h2 className='mb-5 text-xl font-mono'>Archive List</h2>
      <h3 className='mb-5 text-lg font-sans font-semibold'>{type}</h3>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className='space-y-4'>
          <MediaList data={data.data} type={type} />
          <details>
            <summary>Show Raw Data</summary>
            <pre>{JSON.stringify(data.data, null, 1)}</pre>
          </details>
        </div>
      )}
    </div>
  );
};

export default ArchiveList;
