import { createContext, useEffect, useState } from 'react';

import StorageService from '../services/StorageService.js';

import school from '../data/school';

const DEFAULT_GRADE = -1;
const MIN_GRADE_ALLOWED_FOR_EXAM = 0.8;
const STORAGE_KEY = 'COURSES';

const structure = school.courses.map((course) => ({
  id: course.getId(),
  sections: course.getSections().map((section) => ({
    id: section.getId(),
    grade: DEFAULT_GRADE,
    topics: section.getTopics().map((topic) => ({
      id: topic.getId(),
      grade: DEFAULT_GRADE,
    })),
  })),
}));

export const ProgressContext = createContext({
  courses: [],
  calculateMeanGrade: () => {},
  canTakeExam: () => {},
  clearProgress: () => {},
  getCourseScore: () => {},
  getExamGrade: () => {},
  getFailingTopicIDs: () => {},
  getTopicGrade: () => {},
  setTopicGrades: () => {},
  tookExam: () => {},
  tookInitialExam: () => {},
  userHasMasteredSection: () => {},
});

export const ProgressProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const init = async () =>
      StorageService.getItem(STORAGE_KEY, []).then((data) => {
        setCourses(_merge(structure, data));
      });
    // StorageService.getItem(STORAGE_KEY, _deepCopy(structure)).then((data) =>
    //   setCourses(data)
    // );
    init();
  }, []);

  const _deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

  const _merge = (arrayA, arrayB) => {
    const res = _deepCopy(arrayA);

    res.forEach((course) => {
      const courseB = arrayB.find((c) => c.id === course.id);
      if (!courseB) return;

      course.sections.forEach((section) => {
        const sectionB = courseB.sections.find((s) => s.id === section.id);
        if (!sectionB) return;

        section.grade = sectionB.grade;
        section.topics.forEach((topic) => {
          const topicB = sectionB.topics.find((t) => t.id === topic.id);
          if (!topicB) return;

          topic.grade = topicB.grade;
        });
      });
    });

    return res;
  };

  const calculateMeanGrade = (topics) => {
    const grades = [];

    topics.forEach((_topic) => {
      for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        for (let j = 0; j < course.sections.length; j++) {
          const section = course.sections[j];
          for (let k = 0; k < section.topics.length; k++) {
            const topic = section.topics[k];
            if (topic.id === _topic.id) {
              topic.grade = _topic.grade;
              grades.push(topic.grade);
            }
          }
        }
      }
    });

    return grades.reduce((sum, num) => sum + num, 0) / grades.length;
  };

  const canTakeExam = (sectionId) => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      for (let j = 0; j < course.sections.length; j++) {
        const section = course.sections[j];
        if (section.id === sectionId) {
          return section.topics.every(
            (topic) => topic.grade >= MIN_GRADE_ALLOWED_FOR_EXAM
          );
        }
      }
    }
    return false;
  };

  const clearProgress = async () => {
    setCourses(_deepCopy(structure));
    await StorageService.setItem(STORAGE_KEY, _deepCopy(structure));
  };

  const getCourseScore = (courseId) => {
    const course = courses.find((course) => course.id === courseId);
    const successSections = course.sections.filter(
      (section) => section.grade >= MIN_GRADE_ALLOWED_FOR_EXAM
    );

    return successSections.length / course.sections.length;
  };

  const getExamGrade = (sectionId) => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      for (let j = 0; j < course.sections.length; j++) {
        const section = course.sections[j];
        if (section.id === sectionId) {
          return section.grade;
        }
      }
    }
  };

  const getFailingTopicIDs = (sectionId) => {
    const IDs = [];
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      for (let j = 0; j < course.sections.length; j++) {
        const section = course.sections[j];
        if (section.id === sectionId) {
          for (let k = 0; k < section.topics.length; k++) {
            const topic = section.topics[k];
            if (topic.grade < MIN_GRADE_ALLOWED_FOR_EXAM) {
              IDs.push(topic.id);
            }
          }
        }
      }
    }
    return IDs;
  };

  const getTopicGrade = (topicId) => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      for (let j = 0; j < course.sections.length; j++) {
        const section = course.sections[j];
        for (let k = 0; k < section.topics.length; k++) {
          const topic = section.topics[k];
          if (topic.id === topicId) {
            return topic.grade;
          }
        }
      }
    }
    return DEFAULT_GRADE;
  };

  const setTopicGrades = (topics, isExam) => {
    const _courses = JSON.parse(JSON.stringify(courses));

    let _section;
    const grades = [];

    topics.forEach((_topic) => {
      for (let i = 0; i < _courses.length; i++) {
        const course = _courses[i];
        for (let j = 0; j < course.sections.length; j++) {
          const section = course.sections[j];
          for (let k = 0; k < section.topics.length; k++) {
            const topic = section.topics[k];
            if (topic.id === _topic.id) {
              topic.grade = _topic.grade;
              _section = section;
              grades.push(topic.grade);
            }
          }
        }
      }
    });

    if (isExam) {
      const mean = grades.reduce((sum, num) => sum + num, 0) / grades.length;
      _section.grade = mean;
    }

    setCourses(_courses);
    StorageService.setItem(STORAGE_KEY, _courses);
  };

  const tookExam = (sectionId) => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      for (let j = 0; j < course.sections.length; j++) {
        const section = course.sections[j];
        if (section.id === sectionId) {
          return section.grade > DEFAULT_GRADE;
        }
      }
    }
    return false;
  };

  const tookInitialExam = (sectionId) => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      for (let j = 0; j < course.sections.length; j++) {
        const section = course.sections[j];
        if (section.id === sectionId) {
          return section.topics.every((topic) => topic.grade > DEFAULT_GRADE);
        }
      }
    }
    return false;
  };

  const userHasMasteredSection = (sectionId) => {
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      for (let j = 0; j < course.sections.length; j++) {
        const section = course.sections[j];
        if (section.id === sectionId) {
          return section.grade >= MIN_GRADE_ALLOWED_FOR_EXAM;
        }
      }
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        courses,
        calculateMeanGrade,
        canTakeExam,
        clearProgress,
        getCourseScore,
        getExamGrade,
        getFailingTopicIDs,
        getTopicGrade,
        setTopicGrades,
        tookExam,
        tookInitialExam,
        userHasMasteredSection,
      }}>
      {children}
    </ProgressContext.Provider>
  );
};
