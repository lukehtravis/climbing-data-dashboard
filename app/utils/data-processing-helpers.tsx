import { CODE_TO_GRADE_MAPPING } from "../constants"

export const mappingMpCodesToYdsGrades = (mpCode:string): string => {
  const grade = CODE_TO_GRADE_MAPPING[mpCode]
  if (grade) {
    return grade
  }
  return "N/A"
}