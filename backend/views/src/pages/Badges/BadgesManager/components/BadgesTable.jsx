import { Bars3Icon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Table from '../../../../components/Table';
import Toggler from '../../../../components/Toggler';

const BadgesTable = () => {
  return (
    <Table>
      <thead className='wmx-bg-white'>
        <tr>
          <Table.Heading className='wmx-pl-4'>
            <span></span>
          </Table.Heading>
          <Table.Heading>Status</Table.Heading>
          <Table.Heading>Badge Name</Table.Heading>
          <Table.Heading>Valid From</Table.Heading>
          <Table.Heading>Valid To</Table.Heading>

          <Table.Heading className='wmx-w-20 wmx-text-center'>Actions</Table.Heading>
        </tr>
      </thead>
      <tbody className='wmx-divide-y wmx-divide-gray-200 wmx-bg-white'>
        <tr>
          <Table.Data className='wmx-my-auto wmx-py-3 wmx-w-8'>
            <Bars3Icon className='wmx-size-6' />
          </Table.Data>
          <Table.Data>
            <Toggler onChange={() => {}} checked={false} />
          </Table.Data>
          <Table.Data>All Product Except New Arrival</Table.Data>
          <Table.Data>23 Jan, 2024</Table.Data>
          <Table.Data>23 Dec, 2024</Table.Data>
          <Table.Data>
            <span className='wmx-flex wmx-items-center wmx-justify-center wmx-gap-2'>
              <button>
                <PencilSquareIcon className='wmx-w-5 wmx-h-5' />
              </button>
              <button>
                <TrashIcon className='wmx-w-5 wmx-h-5' />
              </button>
            </span>
          </Table.Data>
        </tr>
        <tr>
          <Table.Data className='wmx-my-auto wmx-py-3 wmx-w-8'>
            <Bars3Icon className='wmx-size-6' />
          </Table.Data>

          <Table.Data>
            <Toggler onChange={() => {}} checked={true} />
          </Table.Data>

          <Table.Data>Only Winter Category Product Under 5$</Table.Data>
          <Table.Data>28 Jan, 2024</Table.Data>
          <Table.Data>22 Dec, 2024</Table.Data>
          <Table.Data>
            <span className='wmx-flex wmx-items-center wmx-justify-center wmx-gap-2'>
              <button>
                <PencilSquareIcon className='wmx-w-5 wmx-h-5' />
              </button>
              <button>
                <TrashIcon className='wmx-w-5 wmx-h-5' />
              </button>
            </span>
          </Table.Data>
        </tr>
      </tbody>
    </Table>
  );
};
export default BadgesTable;
