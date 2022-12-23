const taskFactory = (name, description, date, _tag) => {
    let tag = _tag.replace(/\s/g, '')
    return {
        name, description, date, tag
    }
}

export default taskFactory