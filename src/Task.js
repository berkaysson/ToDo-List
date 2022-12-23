const taskFactory = (name, description, date, _tag) => {
    let tag = _tag.replace(/\s/g, '') // removes white spaces from tags
    return {
        name, description, date, tag
    }
}

export default taskFactory