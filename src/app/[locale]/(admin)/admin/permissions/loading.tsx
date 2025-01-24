import TableLoading from '@/components/admin/table-loading';
import { PageHeader } from '@/components/page-header';
import React from 'react';

export default function LoadingPermissions() {
  return (
    <>
      <PageHeader.Skeleton />
      <TableLoading />
    </>
  );
}
