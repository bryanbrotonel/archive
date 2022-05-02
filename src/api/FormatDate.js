export default function formatDate(date) {
  const dateObj = new window.Date(date);
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Fromat date
  var dateFormatted = dateObj.toLocaleDateString('en-US', options);

  // Remove year if date is in current year
  if (dateObj.getFullYear() == new Date().getFullYear()) {
    dateFormatted = dateFormatted.split(',')[0];
  }

  return dateFormatted;
}
