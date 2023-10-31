import React, { useState } from 'react';
import { trpc } from '@/utils/trpc';


const UpdateProgressForm = () => {
  const [formData, setFormData] = useState({

    courseId: '',
    unitId: '',
    subunitId: '',
    newProgress: 0,
  });
  const [message, setMessage] = useState('');

  const { mutateAsync: updateProgress } = trpc.user.updateProgress.useMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(typeof formData.newProgress + ' ' + formData.newProgress)
      await updateProgress(formData);
      setMessage('Progress updated successfully.');
    } catch (error) {
      setMessage('Error updating progress.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Update Progress</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="courseId"
          placeholder="Course ID"
          value={formData.courseId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="unitId"
          placeholder="Unit ID"
          value={formData.unitId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="subunitId"
          placeholder="Subunit ID"
          value={formData.subunitId}
          onChange={handleChange}
        />
        <input
          type="number"
          name="newProgress"
          placeholder="New Progress"
          value={formData.newProgress}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UpdateProgressForm;

//653f3d53bc356cc992c57291
//653f3d53bc356cc992c57292
//653f3d53bc356cc992c57293