$('#login').on('click', function () {
    let token = $('#token').val()
    console.log(token)

    let table = $('#table');
    token = ''
    fetch('https://www.pivotaltracker.com/services/v5/projects/2014673/stories', {
        headers: {
            "Content-Type": "application/json",
            "X-TrackerToken": token
        }
    })
        .then( async resp => {
            const result = await resp.json()
            table.bootstrapTable({data: result})

        })

})