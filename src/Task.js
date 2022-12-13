const taskFactory = (name, description, date, tag) => {
    const getName = () => {
        return name;
    }

    const getDescription = () => {
        return description;
    }

    const getDate = () => {
        const day = date.split('/')[0]
        const month = date.split('/')[1]
        const year = date.split('/')[2]
        return `${day}/${month}/${year}`;
    }

    const getTag = () => {
        return tag;
    }

    return {
        getName, getDate, getDescription, getTag, name, description, date, tag
    }
}

export default taskFactory