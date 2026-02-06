import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, Sparkles, Filter, X } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const HOUR_LABELS = {
  1: '08:00 AM', 2: '09:00 AM', 3: '10:00 AM', 4: '11:00 AM',
  5: '12:00 PM', 6: '01:00 PM', 7: '02:00 PM', 8: '03:00 PM',
  9: '04:00 PM', 10: '05:00 PM', 11: '06:00 PM', 12: '07:00 PM'
};
const DAY_MAP = { M: 'Monday', T: 'Tuesday', W: 'Wednesday', TH: 'Thursday', F: 'Friday', S: 'Saturday' };

const courseData = `022983|BITS K101|Physical Fitness|0|0|1|I|1||W|11 12||
022983|BITS K101|Physical Fitness|0|0|1|I|1||TH|11 12||
022983|BITS K101|Physical Fitness|0|0|1|I|1||F|11 12||
023002|BITS F101-2|SOCIAL CONDUCT|1|0|1|L|1|Rayson||||
022861|BITS F102|INNOVATION DESIGN|0|1|1|L|1|Sanjay|W|11|LT4
022861|BITS F102|INNOVATION DESIGN|0|1|1|L|2|Sanjay|TH|11|LT4
022861|BITS F102|INNOVATION DESIGN|0|1|1|L|3|Sanjay|F|11|LT4
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|1|Arun|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|2|Debasis|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|3|Ganesh|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|4|Kizheppatt|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|5|Mali|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|6|Rajesh|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|7|Rajiv|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|8|Ramprasad|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|9|Ranjan|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|10|Saurabh|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|11|Sharad|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|12|Sonal|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|13|Subhadeep|TBA||C403
022861|BITS F102|INNOVATION DESIGN|0|1|1|T|14|Sumit|TBA||C403
022862|BITS F103|ENGINEERING DESIGN|0|4|4|L|1|Avinash|T|1|LT4
022862|BITS F103|ENGINEERING DESIGN|0|4|4|L|1|Avinash|F|7|LT4
022862|BITS F103|ENGINEERING DESIGN|0|4|4|L|2|Iniyan|T|9|LT4
022862|BITS F103|ENGINEERING DESIGN|0|4|4|L|2|Iniyan|F|1|LT4
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|1|Sandeep|M|8 9|CC219
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|1|Sandeep|TH|2 3|WS
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|2|Sandeep|M|8 9|CC219
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|2|Sandeep|F|4 5|WS
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|3|Avinash|W|4 5|CC219
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|3|Avinash|M|4 5|WS
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|4|Avinash|W|4 5|CC219
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|4|Avinash|F|4 5|WS
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|5|Nilesh|W|8 9|CC219
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|5|Nilesh|M|8 9|WS
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|6|Nilesh|W|8 9|CC219
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|6|Nilesh|M|2 3|WS
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|7|Avinash|F|2 3|CC219
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|7|Avinash|W|2 3|WS
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|8|Avinash|F|2 3|CC219
022862|BITS F103|ENGINEERING DESIGN|0|4|4|P|8|Avinash|M|2 3|WS
021004|BITS F111|THERMODYNAMICS|3|0|3|L|1|Saurabh|M|4|LT4
021004|BITS F111|THERMODYNAMICS|3|0|3|L|1|Saurabh|W|4|LT4
021004|BITS F111|THERMODYNAMICS|3|0|3|T|11|Saurabh|F|4|LT4
021004|BITS F111|THERMODYNAMICS|3|0|3|T|11|Saurabh|TH|1|LT4
021004|BITS F111|THERMODYNAMICS|3|0|3|T|12|Teny|F|4|C401
021004|BITS F111|THERMODYNAMICS|3|0|3|T|12|Teny|TH|1|C401
021004|BITS F111|THERMODYNAMICS|3|0|3|T|13|Aabhaas|F|4|C307
021004|BITS F111|THERMODYNAMICS|3|0|3|T|13|Aabhaas|TH|1|C307
021004|BITS F111|THERMODYNAMICS|3|0|3|L|2|Mrunalini|M|8|LT3
021004|BITS F111|THERMODYNAMICS|3|0|3|L|2|Mrunalini|W|8|LT3
021004|BITS F111|THERMODYNAMICS|3|0|3|T|21|Mrunalini|F|8|LT3
021004|BITS F111|THERMODYNAMICS|3|0|3|T|21|Mrunalini|TH|1|LT3
021004|BITS F111|THERMODYNAMICS|3|0|3|T|22|Samarshi|F|8|DLT6
021004|BITS F111|THERMODYNAMICS|3|0|3|T|22|Samarshi|TH|1|DLT6
021004|BITS F111|THERMODYNAMICS|3|0|3|T|23|Manas|F|8|A508
021004|BITS F111|THERMODYNAMICS|3|0|3|T|23|Manas|TH|1|A508
021004|BITS F111|THERMODYNAMICS|3|0|3|L|3|Jayadevan|T|4|LT2
021004|BITS F111|THERMODYNAMICS|3|0|3|L|3|Jayadevan|TH|4|LT2
021004|BITS F111|THERMODYNAMICS|3|0|3|T|31|Jayadevan|W|1|LT2
021004|BITS F111|THERMODYNAMICS|3|0|3|T|31|Jayadevan|TH|1|LT2
021004|BITS F111|THERMODYNAMICS|3|0|3|T|32|Rudranil|W|1|DLT8
021004|BITS F111|THERMODYNAMICS|3|0|3|T|32|Rudranil|TH|1|DLT8
022864|CHEM F101|CHEMISTRY|3|0|3|L|1|Bhavana|M|3|LT3
022864|CHEM F101|CHEMISTRY|3|0|3|L|1|Bhavana|W|3|LT3
022864|CHEM F101|CHEMISTRY|3|0|3|L|2|Bhavana|T|3|LT3
022864|CHEM F101|CHEMISTRY|3|0|3|L|2|Bhavana|TH|3|LT3
022864|CHEM F101|CHEMISTRY|3|0|3|T|1|Rabi|F|3|A501
022864|CHEM F101|CHEMISTRY|3|0|3|T|2|Sudipta|F|3|C404
022864|CHEM F101|CHEMISTRY|3|0|3|T|3|Vankayala|F|3|A603
022864|CHEM F101|CHEMISTRY|3|0|3|T|4|Woormileela|F|3|A601
022864|CHEM F101|CHEMISTRY|3|0|3|T|5|Rabi|W|10|A503
022864|CHEM F101|CHEMISTRY|3|0|3|T|6|Saurav|W|10|C402
022864|CHEM F101|CHEMISTRY|3|0|3|T|7|Subhadeep|W|10|C301
022864|CHEM F101|CHEMISTRY|3|0|3|T|8|Sandip|W|10|A601
022864|CHEM F101|CHEMISTRY|3|0|3|P|1|Jayadevan|M|2 3|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|2|Uttara|M|4 5|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|3|Amrita|T|2 3|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|4|Rashmi|T|4 5|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|5|Sudipta|W|2 3|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|6|Woormileela|W|4 5|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|7|Mainak|TH|2 3|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|8|Subhasish|TH|4 5|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|9|Narendra|F|2 3|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|10|Saurav|F|4 5|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|11|Uttara|F|7 8|Lab
022864|CHEM F101|CHEMISTRY|3|0|3|P|12|Anjan|F|9 10|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|L|1|Indrani|M|2|LT4
022863|BIO F101|BIO SCIENCES|2|1|3|L|1|Indrani|W|2|LT4
022863|BIO F101|BIO SCIENCES|2|1|3|L|2|Indrani|T|2|LT4
022863|BIO F101|BIO SCIENCES|2|1|3|L|2|Indrani|TH|2|LT4
022863|BIO F101|BIO SCIENCES|2|1|3|T|1|Aryamav|F|2|LT4
022863|BIO F101|BIO SCIENCES|2|1|3|T|2|Arundhoti|F|2|C301
022863|BIO F101|BIO SCIENCES|2|1|3|T|3|Sukanta|F|10|LT4
022863|BIO F101|BIO SCIENCES|2|1|3|T|4|Rameez|F|10|C301
022863|BIO F101|BIO SCIENCES|2|1|3|P|1|Abha|M|2 3|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|2|Dibakar|M|4 5|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|3|Sonal|M|8 9|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|4|Utpal|T|2 3|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|5|Judith|T|4 5|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|6|Vijayashree|T|8 9|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|7|Tusar|W|2 3|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|8|Angshuman|W|4 5|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|9|Haseeb|W|8 9|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|10|Samuel|TH|2 3|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|11|Saumya|TH|4 5|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|12|Rajesh|TH|8 9|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|13|Akhilesh|F|2 3|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|14|Anirvan|F|4 5|Lab
022863|BIO F101|BIO SCIENCES|2|1|3|P|15|Anushka|F|8 9|Lab
021009|EEE F111|ELEC SCIENCES|3|0|3|L|1|Souvik|M|2|LT2
021009|EEE F111|ELEC SCIENCES|3|0|3|L|1|Souvik|W|2|LT2
021009|EEE F111|ELEC SCIENCES|3|0|3|L|1|Souvik|F|2|LT2
021009|EEE F111|ELEC SCIENCES|3|0|3|T|1|Souvik|W|7|DLT7
021009|EEE F111|ELEC SCIENCES|3|0|3|L|2|Hrishi|M|3|LT4
021009|EEE F111|ELEC SCIENCES|3|0|3|L|2|Hrishi|W|3|LT4
021009|EEE F111|ELEC SCIENCES|3|0|3|L|2|Hrishi|F|3|LT4
021009|EEE F111|ELEC SCIENCES|3|0|3|T|2|Hrishi|W|7|LT4
021009|EEE F111|ELEC SCIENCES|3|0|3|L|3|Apurba|M|4|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|L|3|Apurba|W|4|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|L|3|Apurba|F|4|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|T|3|Apurba|W|7|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|L|4|Ethira|M|9|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|L|4|Ethira|W|9|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|L|4|Ethira|F|9|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|T|4|Ethira|W|7|DLT8
021009|EEE F111|ELEC SCIENCES|3|0|3|L|5|Manish|T|2|LT2
021009|EEE F111|ELEC SCIENCES|3|0|3|L|5|Manish|TH|2|LT2
021009|EEE F111|ELEC SCIENCES|3|0|3|L|5|Manish|F|10|LT2
021009|EEE F111|ELEC SCIENCES|3|0|3|T|5|Manish|W|7|LT2
021009|EEE F111|ELEC SCIENCES|3|0|3|L|6|Sudeep|T|3|LT4
021009|EEE F111|ELEC SCIENCES|3|0|3|L|6|Sudeep|TH|3|LT4
021009|EEE F111|ELEC SCIENCES|3|0|3|L|6|Sudeep|W|10|LT4
021009|EEE F111|ELEC SCIENCES|3|0|3|T|6|Sudeep|W|7|DLT5
021009|EEE F111|ELEC SCIENCES|3|0|3|L|7|Naveen|T|4|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|L|7|Naveen|TH|4|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|L|7|Naveen|W|1|LT3
021009|EEE F111|ELEC SCIENCES|3|0|3|T|7|Naveen|W|7|DLT6
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|1|Shilpa|M|3|DLT6
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|1|Shilpa|W|3|DLT6
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|1|Shilpa|F|3|DLT6
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|2|Jajati|M|5|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|2|Jajati|W|5|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|2|Jajati|F|5|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|3|Vaibhav|M|9|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|3|Vaibhav|W|9|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|3|Vaibhav|F|9|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|4|Anushaya|T|5|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|4|Anushaya|TH|5|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|4|Anushaya|M|10|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|5|Tiju|T|10|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|5|Tiju|TH|10|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|L|5|Tiju|M|7|LT4
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|1|Adeep|M|1|A605
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|2|Debendra|M|1|A602
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|3|Drishya|M|1|A501
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|4|Neha|M|1|A502
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|5|Raina|M|1|C301
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|6|Poonam|M|1|C302
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|7|Shambhavi|M|1|A601
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|8|Shikha|M|1|A603
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|9|Shivani|M|1|C402
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|10|Siddhant|T|1|A602
022888|MATH F102|LINEAR ALGEBRA|3|0|3|T|11|Tanisha|F|1|A508
021012|MATH F113|PROBABILITY|3|0|3|L|1|Pradeep|M|5|LT3
021012|MATH F113|PROBABILITY|3|0|3|L|1|Pradeep|W|5|LT3
021012|MATH F113|PROBABILITY|3|0|3|L|1|Pradeep|F|5|LT3
021012|MATH F113|PROBABILITY|3|0|3|L|2|Prabal|M|8|LT4
021012|MATH F113|PROBABILITY|3|0|3|L|2|Prabal|W|8|LT4
021012|MATH F113|PROBABILITY|3|0|3|L|2|Prabal|F|8|LT4
021012|MATH F113|PROBABILITY|3|0|3|T|1|Darshan|T|1|C301
021012|MATH F113|PROBABILITY|3|0|3|T|2|Desai|T|1|A603
021012|MATH F113|PROBABILITY|3|0|3|T|3|Gamini|T|1|A601
021012|MATH F113|PROBABILITY|3|0|3|T|4|Varada|F|1|A602
021012|MATH F113|PROBABILITY|3|0|3|T|5|Jatin|F|1|A603
021012|MATH F113|PROBABILITY|3|0|3|T|6|Ranjit|F|1|A601`;

const TimetableScheduler = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedSections, setSelectedSections] = useState({});
  const [schedule, setSchedule] = useState({});
  const [conflicts, setConflicts] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    parseCourseData();
  }, []);

  useEffect(() => {
    updateSchedule();
  }, [selectedSections, selectedCourses]);

  const parseCourseData = () => {
    const parsed = {};
    const depts = new Set();

    courseData.split('\n').forEach(line => {
      const parts = line.split('|');
      if (parts.length < 10) return;

      const [comCode, courseNo, title, l, p, u, stat, sec, instructor, days, hours, room] = parts;
      
      const courseMatch = courseNo.match(/([A-Z]+)\s+([FK])1\d+/);
      if (!courseMatch) return;

      const dept = courseMatch[1];
      depts.add(dept);

      const key = comCode + courseNo;
      
      if (!parsed[key]) {
        parsed[key] = {
          comCode,
          courseNo,
          title,
          credits: parseInt(u) || 0,
          dept,
          sections: {}
        };
      }

      if (!parsed[key].sections[stat]) {
        parsed[key].sections[stat] = [];
      }

      if (sec) {
        const dayList = days ? days.split(' ').filter(d => d) : [];
        const hourList = hours ? hours.split(' ').filter(h => h && !isNaN(h)).map(h => parseInt(h)) : [];

        if (dayList.length > 0 && hourList.length > 0) {
          const existing = parsed[key].sections[stat].find(s => s.section === sec);
          if (!existing) {
            parsed[key].sections[stat].push({
              section: sec,
              instructor: instructor || '',
              timeslots: [{
                days: dayList,
                hours: hourList,
                room: room || ''
              }]
            });
          } else {
            existing.timeslots.push({
              days: dayList,
              hours: hourList,
              room: room || ''
            });
          }
        }
      }
    });

    setCourses(Object.values(parsed).sort((a, b) => a.courseNo.localeCompare(b.courseNo)));
    setDepartments(['ALL', ...Array.from(depts).sort()]);
  };

  const addCourse = (course) => {
    if (selectedCourses.length >= 8) return;
    if (selectedCourses.find(c => c.comCode === course.comCode)) return;
    setSelectedCourses([...selectedCourses, course]);
  };

  const removeCourse = (comCode) => {
    setSelectedCourses(selectedCourses.filter(c => c.comCode !== comCode));
    const newSections = {};
    Object.keys(selectedSections).forEach(key => {
      if (!key.startsWith(comCode)) {
        newSections[key] = selectedSections[key];
      }
    });
    setSelectedSections(newSections);
  };

  const handleSectionChange = (comCode, stat, section) => {
    setSelectedSections({
      ...selectedSections,
      [comCode + '-' + stat]: section
    });
  };

  const detectConflicts = (scheduleData) => {
    const conflicts = [];
    const slots = {};

    Object.values(scheduleData).forEach(cls => {
      cls.days.forEach(day => {
        cls.hours.forEach(hour => {
          const slot = day + '-' + hour;
          if (!slots[slot]) slots[slot] = [];
          slots[slot].push(cls.courseNo);
        });
      });
    });

    Object.entries(slots).forEach(([slot, courseList]) => {
      if (courseList.length > 1) {
        const parts = slot.split('-');
        conflicts.push({
          day: DAY_MAP[parts[0]] || parts[0],
          hour: parseInt(parts[1]),
          courses: courseList
        });
      }
    });

    return conflicts;
  };

  const updateSchedule = () => {
    const newSchedule = {};

    selectedCourses.forEach(course => {
      Object.entries(course.sections).forEach(([stat, sectionList]) => {
        const selectedSection = selectedSections[course.comCode + '-' + stat];
        const section = sectionList.find(s => s.section === selectedSection);

        if (section && section.timeslots) {
          section.timeslots.forEach((slot, index) => {
            if (slot.days.length > 0 && slot.hours.length > 0) {
              const key = course.comCode + '-' + stat + '-' + section.section + '-' + index;
              
              newSchedule[key] = {
                courseCode: course.courseNo,
                courseNo: course.courseNo,
                comCode: course.comCode,
                title: course.title,
                stat,
                section: section.section,
                room: slot.room,
                days: slot.days,
                hours: slot.hours
              };
            }
          });
        }
      });
    });

    setConflicts(detectConflicts(newSchedule));
    setSchedule(newSchedule);
  };

  const generateOptimizedSchedule = () => {
    let bestSchedule = null;
    let minConflicts = Infinity;

    for (let attempt = 0; attempt < 100; attempt++) {
      const trialSections = {};
      const trialSchedule = {};
      
      selectedCourses.forEach(course => {
        Object.entries(course.sections).forEach(([stat, sectionList]) => {
          if (sectionList.length > 0) {
            const randomSection = sectionList[Math.floor(Math.random() * sectionList.length)];
            trialSections[course.comCode + '-' + stat] = randomSection.section;
            
            randomSection.timeslots.forEach((slot) => {
              if (slot.days.length > 0 && slot.hours.length > 0) {
                const key = course.comCode + '-' + stat + '-' + randomSection.section;
                trialSchedule[key] = {
                  courseNo: course.courseNo,
                  days: slot.days,
                  hours: slot.hours
                };
              }
            });
          }
        });
      });

      const conflictCount = detectConflicts(trialSchedule).length;
      
      if (conflictCount < minConflicts) {
        minConflicts = conflictCount;
        bestSchedule = trialSections;
      }
      
      if (conflictCount === 0) break;
    }
    
    setSelectedSections(bestSchedule);
  };

  const filteredCourses = departmentFilter === 'ALL' 
    ? courses 
    : courses.filter(c => c.dept === departmentFilter);

  const getClassAtSlot = (day, hour) => {
    const dayCode = Object.keys(DAY_MAP).find(key => DAY_MAP[key] === day);
    const classes = [];

    Object.values(schedule).forEach(cls => {
      if (cls.days && cls.hours && cls.days.includes(dayCode) && cls.hours.includes(hour)) {
        classes.push(cls);
      }
    });

    return classes;
  };

  const ButtonSave = () => {
    const [saved, setSaved] = useState(false);
    const handleClick = () => {
      const data = JSON.stringify({ selectedCourses, selectedSections }, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'timetable_' + new Date().toISOString().split('T')[0] + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    };
    return (
      <button onClick={handleClick} className={'px-4 py-2 ' + (saved ? 'bg-green-700' : 'bg-green-600') + ' text-white rounded-lg hover:bg-green-700 text-sm transition'}>
        {saved ? '✅ Saved!' : '💾 Save to File'}
      </button>
    );
  };

  const ButtonLoad = () => {
    const [loaded, setLoaded] = useState(false);
    const handleClick = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target.result);
              setSelectedCourses(data.selectedCourses || []);
              setSelectedSections(data.selectedSections || {});
              setLoaded(true);
              setTimeout(() => setLoaded(false), 2000);
            } catch (err) {
              alert('Error loading file');
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    };
    return (
      <button onClick={handleClick} className={'px-4 py-2 ' + (loaded ? 'bg-blue-700' : 'bg-blue-600') + ' text-white rounded-lg hover:bg-blue-700 text-sm transition'}>
        {loaded ? '✅ Loaded!' : '📂 Load from File'}
      </button>
    );
  };

  const ButtonExport = () => {
    const handleClick = () => {
      const elem = document.getElementById('timetable-grid');
      if (!elem) return;
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.onload = () => {
        window.html2canvas(elem, { scale: 2, backgroundColor: '#ffffff' }).then(canvas => {
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'timetable_' + new Date().toISOString().split('T')[0] + '.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          });
        });
      };
      document.head.appendChild(script);
    };
    return <button onClick={handleClick} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">📸 Export Image</button>;
  };

  const ButtonClearSections = () => {
    const handleClick = () => {
      setSelectedSections({});
      setSchedule({});
      setConflicts([]);
    };
    return <button onClick={handleClick} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm">🔄 Clear Sections</button>;
  };

  const ButtonClearAll = () => {
    const handleClick = () => {
      setSelectedCourses([]);
      setSelectedSections({});
      setSchedule({});
      setConflicts([]);
    };
    return <button onClick={handleClick} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">🗑️ Clear All</button>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Calendar className="w-10 h-10 text-indigo-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">BITS Timetable Scheduler</h1>
                <p className="text-gray-600">BITS Pilani Goa Campus 2025-2026 Sem 2</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <ButtonSave />
              <ButtonLoad />
              <ButtonExport />
              <ButtonClearSections />
              <ButtonClearAll />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="col-span-1 space-y-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Available Courses</h2>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <select 
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-white text-gray-800 text-sm"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                {filteredCourses.map(course => (
                  <div key={course.comCode} className="bg-white p-3 mb-2 rounded-lg shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-800">{course.courseNo}</p>
                        <p className="text-xs text-gray-600">{course.title}</p>
                      </div>
                      <button 
                        onClick={() => addCourse(course)}
                        className="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-3 space-y-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-lg">
                <h2 className="text-xl font-bold">Selected ({selectedCourses.length}/8)</h2>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-4 gap-3">
                  {selectedCourses.map(course => (
                    <div key={course.comCode} className="bg-white p-3 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-gray-800 truncate">{course.courseNo}</p>
                          <p className="text-xs text-gray-600 truncate">{course.title}</p>
                        </div>
                        <button 
                          onClick={() => removeCourse(course.comCode)}
                          className="text-red-600 hover:text-red-800 flex-shrink-0 ml-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {Object.entries(course.sections).map(([stat, sections]) => (
                        <div key={stat} className="mt-2 flex items-center gap-1">
                          <label className="text-xs font-semibold text-gray-700 whitespace-nowrap">{stat}:</label>
                          <select 
                            value={selectedSections[course.comCode + '-' + stat] || ''}
                            onChange={(e) => handleSectionChange(course.comCode, stat, e.target.value)}
                            className="flex-1 px-2 py-1 border rounded text-xs min-w-0"
                          >
                            <option value="">Select</option>
                            {sections.map(sec => (
                              <option key={sec.section} value={sec.section}>
                                {stat}{sec.section} - {sec.instructor || 'TBA'}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={generateOptimizedSchedule}
                disabled={selectedCourses.length === 0}
                className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <Sparkles className="w-6 h-6" />
                AI Optimize Timetable
              </button>

              {conflicts.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <h3 className="font-bold text-red-800">Conflicts!</h3>
                  </div>
                  {conflicts.map((c, i) => (
                    <p key={i} className="text-sm text-red-700">
                      {c.day} {HOUR_LABELS[c.hour]}: {c.courses.join(', ')}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden" id="timetable-grid">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
              <h2 className="text-2xl font-bold">Weekly Timetable</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-sm font-semibold w-24">Time</th>
                    {DAYS.map(day => (
                      <th key={day} className="border p-2 text-sm font-semibold">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HOURS.map(hour => (
                    <tr key={hour}>
                      <td className="border p-2 text-center font-bold bg-gray-50 text-xs">
                        {HOUR_LABELS[hour]}
                      </td>
                      {DAYS.map(day => {
                        const classes = getClassAtSlot(day, hour);
                        return (
                          <td key={day} className="border p-1 align-top h-20">
                            {classes.map((cls, idx) => (
                              <div 
                                key={idx}
                                className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded mb-1 text-xs"
                              >
                                <div className="font-bold">{cls.courseNo}</div>
                                <div className="text-xs opacity-90">{cls.stat}{cls.section}</div>
                                {cls.room && <div className="text-xs opacity-75">{cls.room}</div>}
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableScheduler;