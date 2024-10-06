// @ts-nocheck
import { Bars3Icon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../../../components/Table';
import Toggler from '../../../../components/Toggler';
import { useDeleteBadgeMutation, useGetBadgesQuery } from '../../../../features/badges/badgesApi';
import booleanConverter from '../../../../utils/booleanConverter';
import cn from '../../../../utils/cn';
import formatISODate from '../../../../utils/formatISODate';

const BadgesTable = ({ setSelectedBadge, selectedBadge }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBadgesQuery();
  const [deleteBadge] = useDeleteBadgeMutation();
  const [sortedData, setSortedData] = useState([]);

  const handleDelete = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this badge?');
    if (confirmation) {
      const result = await deleteBadge(id).unwrap();
      if (result.id) {
        toast.success('Badge Deleted Successfully');
      }
    }
  };

  const handleBadgeSelect = (badge) => {
    if (selectedBadge.id !== badge.id) {
      setSelectedBadge(badge);
    }
  };

  useEffect(() => {
    if (isError) {
      setSortedData([]);
      return;
    }

    if (data && data.length > 0) {
      const dataCopy = [...data];
      setSortedData(dataCopy.sort((a, b) => Number(b.priority) - Number(a.priority)));
      setSelectedBadge(dataCopy[0]);
    }
  }, [data, isError]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        {sortedData.map((badge) => (
          <tr
            className={cn({
              'wmx-bg-primary/10': selectedBadge?.id === badge.id,
            })}
          >
            <Table.Data className='wmx-my-auto wmx-py-3 wmx-w-8'>
              <Bars3Icon className='wmx-size-6' />
            </Table.Data>
            <Table.Data>
              <Toggler onChange={() => {}} checked={booleanConverter(badge.status)} />
            </Table.Data>
            <Table.Data onClick={() => handleBadgeSelect(badge)} className={cn('wmx-cursor-pointer')}>
              {badge.badge_name}
            </Table.Data>
            <Table.Data>{formatISODate(badge.valid_from)}</Table.Data>
            <Table.Data>{formatISODate(badge.valid_to)}</Table.Data>
            <Table.Data>
              <span className='wmx-flex wmx-items-center wmx-justify-center wmx-gap-2'>
                <button
                  onClick={() => {
                    navigate(`editor?id=${badge.id}`, { state: { badge } });
                  }}
                >
                  <PencilSquareIcon className='wmx-w-5 wmx-h-5' />
                </button>
                <button onClick={() => handleDelete(badge.id)}>
                  <TrashIcon className='wmx-w-5 wmx-h-5' />
                </button>
              </span>
            </Table.Data>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default BadgesTable;
