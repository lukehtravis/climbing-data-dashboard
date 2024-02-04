export function dateOrPrimitive(input: string | number | boolean | Date): string | number | boolean {
  if (input instanceof Date) {
    // Format the month as 'mm'. Get the month from the Date object, add 1 since it's zero-indexed, and ensure it's in 'mm' format.
    const month = (input.getMonth() + 1).toString().padStart(2, '0')
    // Get the full year from the Date object.
    const year = input.getFullYear()
    // Return the formatted string 'mm/yyyy'.
    return `${month}/${year}`
  } else {
    // Return the input as it is if it's not a Date object.
    return input
  }
}
