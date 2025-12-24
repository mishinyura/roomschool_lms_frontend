// Форматирование дат



export const convertDatetime = (deadline, timeZone = "Europe/Moscow", mode = "full") => {
    const date = new Date(deadline);

    const options = {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
    };

    if (mode === "short") {
        options.hour = "numeric";
        options.minute = "numeric";
    } else if (mode === "full") {
        options.year = "numeric"
    }

    const formatted = new Intl.DateTimeFormat("ru-RU", options).format(date);

    return formatted.replace(" г.", "").replace(" в", ",");
}

export const formatDateWithTime = (datetime, timeZone = "Europe/Moscow") => {
    const date = new Date(datetime);

    const options = {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
    };

    const formatted = new Intl.DateTimeFormat("ru-RU", options).format(date);

    return formatted.replace(",", " в");
};

export const formatDateOnly = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const options = {
        day: "numeric",
        month: "long",
    };

    return new Intl.DateTimeFormat("ru-RU", options)
        .format(date)
        .replace(",", "");
};

export const getAmountOfDays = (datetime) => {
    const now = new Date();
    const target = new Date(datetime);

    const diffMs = target.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays
}

export const formatDateOrTime = (datetime, timeZone = "Europe/Moscow") => {
    const date = new Date(datetime);
    const now = new Date();

    const localDate = new Date(date.toLocaleString("en-US", { timeZone }));
    const localNow = new Date(now.toLocaleString("en-US", { timeZone }));

    const isSameDay =
        localDate.getDate() === localNow.getDate() &&
        localDate.getMonth() === localNow.getMonth() &&
        localDate.getFullYear() === localNow.getFullYear();

    const isSameYear = localDate.getFullYear() === localNow.getFullYear();

    // Функция, сокращающая месяц до двух букв
    const shortMonth = (date, opts = {}) => {
        const formatted = new Intl.DateTimeFormat("ru-RU", {
            month: "long",
            ...opts,
        }).format(date);

        // Возьмём первые две буквы, сохранив регистр (январь → ян)
        return formatted.slice(0, 3);
    };

    if (isSameDay) {
        // если сегодня → только время
        return new Intl.DateTimeFormat("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone,
        })
            .format(localDate)
            .replace(",", "");
    }

    const day = localDate.getDate();
    const month = shortMonth(localDate);

    if (isSameYear) {
        // если в этом году → день + короткий месяц
        return `${day} ${month}`;
    }

    // если в другом году → день + короткий месяц + год
    return `${day} ${month} ${localDate.getFullYear()}`;
};


export const convertSecondsIntoTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
};