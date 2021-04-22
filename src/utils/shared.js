export function generateUpdatedAtText(updateAtTime) {
  const currentDate = Date.now();
  const updatedDate = new Date(updateAtTime);
  const days = (currentDate - updatedDate.getTime()) / (1000 * 24 * 3600);

  if (days < 1) {
    const hours = days * 24;

    if (hours < 1) {
      const minutes = Math.ceil(hours * 60);
      return `Updated ${minutes} minutes ago`;
    }
    return `Updated ${Math.ceil(hours)} hours ago`;
  }
  if (days > 1 && days < 30) {
    return `Updated ${Math.ceil(days)} days ago`;
  }
  if (days > 30 && days < 365) {
    const updatedDateArray = String(updatedDate).split(' ');
    const day = `${updatedDateArray[2]} ${updatedDateArray[1]}`;
    return `Updated on ${day}`;
  }
  if (days > 365) {
    const updatedDateArray = String(updatedDate).split(' ');
    const day = `${updatedDateArray[2]} ${updatedDateArray[1]} ${updatedDateArray[3]}`;
    return `Updated on ${day}`;
  }
  return '';
}

export default {
  generateUpdatedAtText,
};
