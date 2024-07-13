'use client';

import { useState } from 'react';
import DeleteAlert from './DeleteAlert';


interface DeleteCourseProps  {
  courseId: number;
};

const DeleteCourse = ({ courseId }: DeleteCourseProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return <DeleteAlert courseId={courseId} open={open} setOpen={setOpen} />;
};
export default DeleteCourse;