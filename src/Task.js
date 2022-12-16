const taskFactory = (name, description, date, tag) => {
    const getDate = () => {
        const day = date.split('/')[0]
        const month = date.split('/')[1]
        const year = date.split('/')[2]
        return `${day}/${month}/${year}`;
    }

    return {
        getDate, name, description, date, tag
    }
}

export default taskFactory