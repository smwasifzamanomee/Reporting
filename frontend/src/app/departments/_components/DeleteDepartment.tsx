'use client';

import { useState } from 'react';
import DeleteAlert from './DeleteAlert';


interface DeleteDepartmentProps  {
  departmentId: number;
};

const DeleteDepartment = ({ departmentId }: DeleteDepartmentProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return <DeleteAlert departmentId={departmentId} open={open} setOpen={setOpen} />;
};
export default DeleteDepartment;