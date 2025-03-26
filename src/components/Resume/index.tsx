import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Skill {
  name: string;
  url: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  type: string;
  achievements: string[];
}

interface Education {
  university: string;
  degree: string;
  period: string;
  description: string;
  url: string;
}

interface Skills {
  languages: Skill[];
  frameworks: Skill[];
  tools: Skill[];
}

export interface ResumeData {
  experience: Experience[];
  education: Education;
  skills: Skills;
}

interface ResumeProps {
  data: ResumeData;
}

interface SkillButtonProps {
  skill: Skill;
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const SkillButton: React.FC<SkillButtonProps> = ({ skill }) => (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 cursor-pointer ${
        isDark 
          ? 'bg-[#1a1a1a] text-gray-400 hover:bg-[#252525] hover:text-gray-300' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {skill.name}
    </motion.a>
  );

  return (
    <div className="tablet:m-10 mt-2">
      <div className="w-full laptop:w-3/5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Experience & Skills
            </h2>
          </motion.div>

          {/* Experience */}
          <div className="space-y-8">
            <motion.h3 variants={itemVariants} className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Professional Experience
            </motion.h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`rounded-xl p-6 ${
                    isDark 
                      ? 'bg-gradient-to-b from-[#141414] to-black shadow-xl' 
                      : 'bg-white shadow-lg border border-gray-100'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {exp.title}
                      </h4>
                      <p className={isDark ? 'text-gray-500' : 'text-gray-600'}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center gap-2">
                      <span className={isDark ? 'text-gray-500' : 'text-gray-600'}>
                        {exp.period}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDark 
                          ? 'bg-[#1a1a1a] text-gray-400' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {exp.type}
                      </span>
                    </div>
                  </div>
                  <ul className={`list-disc list-inside space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Education
            </h3>
            <div className={`rounded-xl p-6 ${
              isDark 
                ? 'bg-gradient-to-b from-[#141414] to-black shadow-xl' 
                : 'bg-white shadow-lg border border-gray-100'
            }`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div>
                  <motion.a
                    href={data.education.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block text-lg font-semibold mb-1 transition-all duration-300 hover:scale-105 ${
                      isDark ? 'text-white hover:text-gray-300' : 'text-gray-900 hover:text-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {data.education.university}
                  </motion.a>
                  <p className={isDark ? 'text-gray-500' : 'text-gray-600'}>
                    {data.education.degree}
                  </p>
                </div>
                <span className={isDark ? 'text-gray-500' : 'text-gray-600'}>
                  {data.education.period}
                </span>
              </div>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {data.education.description}
              </p>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Languages */}
              <motion.div
                variants={itemVariants}
                className={`rounded-xl p-6 ${
                  isDark 
                    ? 'bg-gradient-to-b from-[#141414] to-black shadow-xl' 
                    : 'bg-white shadow-lg border border-gray-100'
                }`}
              >
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.languages.map((skill, index) => (
                    <SkillButton key={index} skill={skill} />
                  ))}
                </div>
              </motion.div>

              {/* Frameworks */}
              <motion.div
                variants={itemVariants}
                className={`rounded-xl p-6 ${
                  isDark 
                    ? 'bg-gradient-to-b from-[#141414] to-black shadow-xl' 
                    : 'bg-white shadow-lg border border-gray-100'
                }`}
              >
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.frameworks.map((skill, index) => (
                    <SkillButton key={index} skill={skill} />
                  ))}
                </div>
              </motion.div>

              {/* Tools */}
              <motion.div
                variants={itemVariants}
                className={`rounded-xl p-6 ${
                  isDark 
                    ? 'bg-gradient-to-b from-[#141414] to-black shadow-xl' 
                    : 'bg-white shadow-lg border border-gray-100'
                }`}
              >
                <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.tools.map((skill, index) => (
                    <SkillButton key={index} skill={skill} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume; 