const taskFactory = (name, description, date, tag) => {
    const getName = () => {
        return name;
    }

    const getDescription = () => {
        return description;
    }

    const getDate = () => {
        return date;
    }

    const getTag = () => {
        return tag;
    }

    return {
        getName, getDate, getDescription, getTag
    }
}

export default taskFactory