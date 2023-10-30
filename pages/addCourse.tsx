import React, { useState, ChangeEvent } from 'react';
import { trpc } from '@/utils/trpc';

interface Subunit {
  title: string;
}

interface Unit {
  title: string;
  subunits: Subunit[];
}

interface Course {
  name: string;
  code: string;
  description: string;
  units: Unit[];

}

const AddCourse: React.FC = () => {
  const addCourseMutation = trpc.course.addCourse.useMutation();

  // console.log(trpc.course.getCourses.useQuery().data);
  const [course, setCourse] = useState<Course>({
    name: '',
    code: '',
    description: '',
    units: [{ title: '', subunits: [{ title: '' }] }],

  });

  const addUnit = () => {
    setCourse({
      ...course,
      units: [...course.units, { title: '', subunits: [] }],
    });
  };

  const addSubunit = (unitIndex: number) => {
    const newUnits = [...course.units];
    newUnits[unitIndex].subunits.push({ title: '' });
    setCourse({
      ...course,
      units: newUnits,
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    unitIndex: number,
    subunitIndex: number,
    field: 'title'
  ) => {
    const newCourse = { ...course };
    newCourse.units[unitIndex].subunits[subunitIndex][field] = e.target.value;
    setCourse(newCourse);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await addCourseMutation.mutateAsync(course);
      alert('Course added successfully');
      setCourse({
        name: '',
        code: '',
        description: '',
        units: [{ title: '', subunits: [{ title: '' }] }],

      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Course Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-lg">
          Course Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      
      {/* Course Code */}
      <div className="space-y-2">
        <label htmlFor="code" className="block text-lg">
          Course Code
        </label>
        <input
          type="text"
          id="code"
          name="code"
          value={course.code}
          onChange={(e) => setCourse({ ...course, code: e.target.value })}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      
      {/* Course Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-lg">
          Course Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          required
          className="border rounded p-2 w-full"
        />
      </div>

      {/* Units */}
      {course.units.map((unit, unitIndex) => (
        <div key={unitIndex} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-lg">Unit {unitIndex + 1} Title</label>
            <input
              type="text"
              value={unit.title}
              onChange={(e) => {
                const newUnits = [...course.units];
                newUnits[unitIndex].title = e.target.value;
                setCourse({ ...course, units: newUnits });
              }}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            {unit.subunits.map((subunit, subunitIndex) => (
              <div key={subunitIndex} className="flex space-x-4">
                <div className="flex-1 space-y-2">
                  <label className="block">Subunit Title</label>
                  <input
                    type="text"
                    value={subunit.title}
                    onChange={(e) =>
                      handleInputChange(e, unitIndex, subunitIndex, 'title')
                    }
                    required
                    className="border rounded p-2 w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addSubunit(unitIndex)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Subunit
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addUnit}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Unit
      </button>

      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default AddCourse;
