function AttendanceCourseSelector({ courses, onCourseChange }) {

  return (
    <div className="mb-6">

      <label className="block text-gray-700 mb-2">
        Select Course
      </label>

      <select
        onChange={(e) => onCourseChange(e.target.value)}
        className="w-full border p-3 rounded-lg"
      >

        <option value="">Choose Course</option>

        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}

      </select>

    </div>
  );
}

export default AttendanceCourseSelector;