class DateHandler {
  parseDate(date: string | Date) {
    const localDate = this.convertToDate(date);

    const weekday = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(localDate);
    const day = this.convertToDateString(localDate.getDate());
    const month = this.convertToDateString(localDate.getMonth() + 1);
    const year = localDate.getFullYear().toString();
    const hours = localDate.getHours();
    const minuts = localDate.getMinutes();
    const seconds = localDate.getSeconds();

    return {
      weekday,
      day,
      month,
      year,
      hours,
      minuts,
      seconds,
    };
  }

  parseToChatFormat(isoDate: string) {
    const date = this.parseDate(isoDate);
    const currentDate = this.parseDate(new Date());
    const dayDiff = Number(currentDate.day) - Number(date.day);

    if (date.year === currentDate.year && date.month === currentDate.month && date.day === currentDate.day) {
      return `${date.hours}:${date.minuts}`;
    }

    if (date.year === currentDate.year && date.month === currentDate.month && dayDiff === 1) {
      return 'вчера';
    }

    if (date.year === currentDate.year && date.month === currentDate.month && dayDiff > 1 && dayDiff < 5) {
      return date.weekday;
    }

    if (date.year === currentDate.year) {
      return `${date.day}.${date.month}`;
    }

    return `${date.day}.${date.month}.${date.year}`;
  }

  convertToDateString = (value: number) => {
    const localValue = value.toString();

    if (localValue.length === 1) {
      return `0${localValue}`;
    }

    return localValue;
  };

  convertToDate = (date: string | Date) => {
    if (typeof date === 'string') {
      return new Date(date);
    }

    return date;
  };

  convertWeekDay = (date: string | Date) => {
    if (typeof date === 'string') {
      return new Date(date);
    }

    return date;
  };
}

export const dateHandler = new DateHandler();
