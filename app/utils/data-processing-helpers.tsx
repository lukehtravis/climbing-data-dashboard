import { CODE_TO_GRADE_MAPPING } from "../constants"

export const mappingMpCodesToYdsGrades = (mpCode: string): string => {
  const grade = CODE_TO_GRADE_MAPPING[mpCode]
  if (grade) {
    return grade
  }
  return "N/A"
}

export const eliminateSlashesFromGrades = (grade: string): string => {
  if (!grade.includes('/')) {
    return grade
  }
  let cutIndex = grade.indexOf('/')
  let preLetterPartOfString = grade.slice(0, cutIndex - 1)
  let gradeToGrabPostSlash = grade.slice(cutIndex + 1)
  return preLetterPartOfString + gradeToGrabPostSlash
}

export const flattenPlusAndMinusGrades = (grade: string): string => {
  if (grade.includes('+')) {
    // if grade is 5.9 or below, strings will always be 4 chars long, and there are no a - d modifier grades, so just remove the plus
    if (grade.length === 4) {
      return grade.slice(0, -1)
    }
    // if grade is 5.10 or above, there are a - d modifier grades, so do some logic
    let newGrade = grade.slice(0, -1)
    return newGrade + 'd'
  }
  if (grade.includes('-')) {
    // if grade is 5.9 or below, strings will always be 4 chars long, and there are no a - d modifier grades, so just remove the plus
    if (grade.length === 4) {
      return grade.slice(0, -1)
    }
    // if grade is 5.10 or above, there are a - d modifier grades, so do some logic
    let newGrade = grade.slice(0, -1)
    return newGrade + 'a'
  }
  return grade
}

export const removeRiskRating = (grade: string): string => {
  let riskFactors = ['PG13', 'R', 'X'];
  for (let item of riskFactors) {
    if (grade.includes(item)) {
      return grade.slice(0, (grade.indexOf(item))).trim()
    }
  }
  return grade
}