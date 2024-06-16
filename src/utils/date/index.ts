const deleteAccLife = process.env.NEXT_PUBLIC_DELETE_ACC_LIFE as string;

export const timer = (timeStamp: string | null) => {
  const now = new Date().getTime();
  const endTime = getDeadline(timeStamp || Date.now());
  const distance = endTime - now;

  const days = addLeadingZero(Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = addLeadingZero(
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = addLeadingZero(
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  );
  const seconds = addLeadingZero(Math.floor((distance % (1000 * 60)) / 1000));
  if (distance < 0)
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      distance: 0,
    };

  return { days, hours, minutes, seconds, distance };
};

function getDeadline(timeStamp: string | number): number {
  const date = new Date(timeStamp);
  date.setDate(date.getDate() + Number(deleteAccLife));
  return date.getTime();
}

function addLeadingZero(value: number) {
  return String(value).padStart(2, "0");
}
