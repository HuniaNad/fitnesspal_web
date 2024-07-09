export interface Exercise {
  exercise: string;
  sets: number;
  reps: number;
  completionStatus?: boolean;
}

export interface WorkoutDay {
  exercises: Exercise[];
  completionStatus?: boolean;
}

export interface MuscleGroup {
  [day: number]: WorkoutDay;
}

export interface WorkoutData {
  full_body: MuscleGroup;
  shoulder: MuscleGroup;
  arms: MuscleGroup;
  back: MuscleGroup;
  chest: MuscleGroup;
  core: MuscleGroup;
  legs: MuscleGroup;
  glutes: MuscleGroup;
}

export const workoutData: WorkoutData = {
  full_body: {
    1: {
      exercises: [
        { exercise: 'Push ups', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Squat', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 15, completionStatus: false },
      ],
      completionStatus: false,
    },
    2: {
      exercises: [
        { exercise: 'Push ups', sets: 3, reps: 12, completionStatus: false },
        { exercise: 'Squat', sets: 3, reps: 12, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 20, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    3: {
      exercises: [
        { exercise: 'Push ups', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Squat', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Sit ups', sets: 4, reps: 25, completionStatus: false },
      ],
      completionStatus: false,
    },
    4: {
      exercises: [
        { exercise: 'Push ups', sets: 4, reps: 14, completionStatus: false },
        { exercise: 'Squat', sets: 4, reps: 14, completionStatus: false },
        { exercise: 'Sit ups', sets: 4, reps: 30, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    5: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 30, completionStatus: false },
      ],
      completionStatus: false,
    },
    6: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    7: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 18, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 18, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 35, completionStatus: false },
      ],
      completionStatus: false,
    },
  },
  shoulder: {
    1: {
      exercises: [
        { exercise: 'Push ups', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 15, completionStatus: false },
        { exercise: 'Squat', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    2: {
      exercises: [
        { exercise: 'Push ups', sets: 3, reps: 12, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 20, completionStatus: false },
      ],
      completionStatus: false,
    },
    3: {
      exercises: [
        { exercise: 'Push ups', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Squat', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    4: {
      exercises: [
        { exercise: 'Push ups', sets: 4, reps: 14, completionStatus: false },
        { exercise: 'Sit ups', sets: 4, reps: 25, completionStatus: false },
      ],
      completionStatus: false,
    },
    5: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    6: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 30, completionStatus: false },
      ],
      completionStatus: false,
    },
    7: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 18, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 16, completionStatus: false },
      ],
      completionStatus: false,
    },
  },
  arms: {
    1: {
      exercises: [
        { exercise: 'Bicep curl (left)', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Push ups', sets: 3, reps: 15, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    2: {
      exercises: [
        { exercise: 'Bicep curl (left)', sets: 3, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 3, reps: 12, completionStatus: false },
        { exercise: 'Push ups', sets: 3, reps: 20, completionStatus: false }
      ],
      completionStatus: false,
    },
    3: {
      exercises: [
        { exercise: 'Bicep curl (left)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Push ups', sets: 4, reps: 15, completionStatus: false },
        { exercise: 'Squat', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    4: {
      exercises: [
        { exercise: 'Bicep curl (left)', sets: 4, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 14, completionStatus: false },
        { exercise: 'Sit ups', sets: 4, reps: 25, completionStatus: false },
      ],
      completionStatus: false,
    },
    5: {
      exercises: [
        { exercise: 'Bicep curl (left)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Push ups', sets: 5, reps: 15, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    6: {
      exercises: [
        { exercise: 'Bicep curl (left)', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 30, completionStatus: false },
      ],
      completionStatus: false,
    },
    7: {
      exercises: [
        { exercise: 'Bicep curl (left)', sets: 5, reps: 18, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 18, completionStatus: false },
        { exercise: 'Push ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 16, completionStatus: false },
      ],
      completionStatus: false,
    },
  },
  back: {
    1: {
      exercises: [
        { exercise: 'Push ups', sets: 3, reps: 15, completionStatus: false },
        { exercise: 'Squat', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    2: {
      exercises: [
        { exercise: 'Sit ups', sets: 3, reps: 20, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    3: {
      exercises: [
        { exercise: 'Push ups', sets: 4, reps: 15, completionStatus: false },
        { exercise: 'Sit ups', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    4: {
      exercises: [
        { exercise: 'Squat', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    5: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 15, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    6: {
      exercises: [
        { exercise: 'Squat', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    7: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 16, completionStatus: false },
      ],
      completionStatus: false,
    },
  },
  chest: {
    1: {
      exercises: [
        { exercise: 'Push ups', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 15, completionStatus: false },
        { exercise: 'Squat', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    2: {
      exercises: [
        { exercise: 'Push ups', sets: 3, reps: 12, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 20, completionStatus: false },
      ],
      completionStatus: false,
    },
    3: {
      exercises: [
        { exercise: 'Push ups', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Squat', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    4: {
      exercises: [
        { exercise: 'Push ups', sets: 4, reps: 14, completionStatus: false },
        { exercise: 'Sit ups', sets: 4, reps: 25, completionStatus: false },
      ],
      completionStatus: false,
    },
    5: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    6: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 30, completionStatus: false },
      ],
      completionStatus: false,
    },
    7: {
      exercises: [
        { exercise: 'Push ups', sets: 5, reps: 18, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 16, completionStatus: false },
      ],
      completionStatus: false,
    },
  },
  core: {
    1: {
      exercises: [
        { exercise: 'Sit ups', sets: 3, reps: 15, completionStatus: false },
        { exercise: 'Push ups', sets: 3, reps: 15, completionStatus: false },
        { exercise: 'Squat', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    2: {
      exercises: [
        { exercise: 'Sit ups', sets: 3, reps: 20, completionStatus: false },
        { exercise: 'Push ups', sets: 3, reps: 20, completionStatus: false },
      ],
      completionStatus: false,
    },
    3: {
      exercises: [
        { exercise: 'Sit ups', sets: 4, reps: 20, completionStatus: false },
        { exercise: 'Push ups', sets: 4, reps: 15, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    4: {
      exercises: [
        { exercise: 'Sit ups', sets: 4, reps: 25, completionStatus: false },
        { exercise: 'Squat', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    5: {
      exercises: [
        { exercise: 'Sit ups', sets: 5, reps: 25, completionStatus: false },
        { exercise: 'Push ups', sets: 5, reps: 15, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    6: {
      exercises: [
        { exercise: 'Sit ups', sets: 5, reps: 30, completionStatus: false },
        { exercise: 'Squat', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    7: {
      exercises: [
        { exercise: 'Sit ups', sets: 5, reps: 35, completionStatus: false },
        { exercise: 'Push ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 16, completionStatus: false },
      ],
      completionStatus: false,
    },
  },
  legs: {
    1: {
      exercises: [
        { exercise: 'Squat', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Push ups', sets: 3, reps: 15, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    2: {
      exercises: [
        { exercise: 'Squat', sets: 3, reps: 12, completionStatus: false },
        { exercise: 'Push ups', sets: 3, reps: 20, completionStatus: false },
      ],
      completionStatus: false,
    },
    3: {
      exercises: [
        { exercise: 'Squat', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Push ups', sets: 4, reps: 15, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    4: {
      exercises: [
        { exercise: 'Squat', sets: 4, reps: 14, completionStatus: false },
        { exercise: 'Sit ups', sets: 4, reps: 25, completionStatus: false },
      ],
      completionStatus: false,
    },
    5: {
      exercises: [
        { exercise: 'Squat', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Push ups', sets: 5, reps: 15, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    6: {
      exercises: [
        { exercise: 'Squat', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 30, completionStatus: false },
      ],
      completionStatus: false,
    },
    7: {
      exercises: [
        { exercise: 'Squat', sets: 5, reps: 18, completionStatus: false },
        { exercise: 'Push ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 16, completionStatus: false },
      ],
      completionStatus: false,
    },
  },
  glutes: {
    1: {
      exercises: [
        { exercise: 'Squat', sets: 3, reps: 10, completionStatus: false },
        { exercise: 'Push ups', sets: 3, reps: 15, completionStatus: false },
        { exercise: 'Sit ups', sets: 3, reps: 10, completionStatus: false },
      ],
      completionStatus: false,
    },
    2: {
      exercises: [
        { exercise: 'Squat', sets: 3, reps: 12, completionStatus: false },
        { exercise: 'Push ups', sets: 3, reps: 20, completionStatus: false },
      ],
      completionStatus: false,
    },
    3: {
      exercises: [
        { exercise: 'Squat', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Push ups', sets: 4, reps: 15, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 4, reps: 12, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 4, reps: 12, completionStatus: false },
      ],
      completionStatus: false,
    },
    4: {
      exercises: [
        { exercise: 'Squat', sets: 4, reps: 14, completionStatus: false },
        { exercise: 'Sit ups', sets: 4, reps: 25, completionStatus: false },
      ],
      completionStatus: false,
    },
    5: {
      exercises: [
        { exercise: 'Squat', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Push ups', sets: 5, reps: 15, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 14, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 14, completionStatus: false },
      ],
      completionStatus: false,
    },
    6: {
      exercises: [
        { exercise: 'Squat', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Sit ups', sets: 5, reps: 30, completionStatus: false },
      ],
      completionStatus: false,
    },
    7: {
      exercises: [
        { exercise: 'Squat', sets: 5, reps: 18, completionStatus: false },
        { exercise: 'Push ups', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (left)', sets: 5, reps: 16, completionStatus: false },
        { exercise: 'Bicep curl (right)', sets: 5, reps: 16, completionStatus: false },
      ],
      completionStatus: false,
    },
  },
};


export default workoutData;

