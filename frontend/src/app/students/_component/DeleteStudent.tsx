'use client';

import { useState } from 'react';
import DeleteAlert from './DeleteAlert';


interface DeleteStudentProps  {
  studentId: number;
};

const DeleteStudent = ({ studentId }: DeleteStudentProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return <DeleteAlert studentId={studentId} open={open} setOpen={setOpen} />;
};
export default DeleteStudent;