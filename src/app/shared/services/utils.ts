export const getEmploymentTypeLabel = (employmentType: 'FULL_TIME' | 'PART_TIME') => {
  switch (employmentType) {
    case 'FULL_TIME':
      return 'Full Time';
    case 'PART_TIME':
      return 'Part Time';
  }
};
