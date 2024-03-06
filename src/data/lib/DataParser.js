class DataParser {
  constructor(data) {
    this.data = data || {};
    this.data.courses = this.data.courses || [];
  }

  enrol(course) {
    let _course = this.findCourse(course.getId());
    if (_course) {
      console.log(`User is already enrolled in couse ${_course.id} ${_course.name}`);
      return _course;
    }

    _course = {
      name: course.getName(),
      id: course.getId(),
      sections: course.getSections().map(section => ({
        name: section.getName(),
        id: section.getId(),
        tookInitialTest: false,
        topics: section.getTopics().map(topic => ({
          name: topic.getName(),
          id: topic.getId(),
          grade: 0,
        }))
      }))
    };

    this.getCourses().push(_course);

    return _course;
  }

  findCourse(courseId) { return this.getCourses().find(course => course.id === courseId) || null; }

  findSection(sectionId) {
    for (let i = 0; i < this.getCourses().length; i ++) {
      const course = this.getCourses()[i];
      for (var j = 0; j < course.sections.length; j ++) {
        const section = course.sections[j];
        if (section.id === sectionId) {
          return section;
        }
      }
    }
    return null;
  }

  getCourses() { return this.data.courses; }

  canTakeExam(sectionId) {
    for (let i = 0; i < this.getCourses().length; i++) {
      const course = this.getCourses()[i];
      for (let j = 0; j < course.sections.length; j++) {
        const section = course.sections[j];
        if (section.id === sectionId) {
          return section.topics.every(topic => topic.grade >= 0.8);
        }
      }
    }
    return false;
  }
  
  setTopicGrade(topicId, grade) {
    this.getCourses().forEach(course => {
      course.sections.forEach(section => {
        section.topics.forEach(topic => {
          if (topic.id === topicId) {
            topic.grade = grade;
          }
        });
      });
    });
  }
}

module.exports = DataParser;